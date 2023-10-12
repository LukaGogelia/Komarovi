"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

export default function ConfirmModal({
    open,
    onClose,
    profiles,
    initialProfiles,
}) {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    const handleSaveChanges = async () => {
        try {
            console.log("Sending data:", { ...profiles, password });
            const response = await fetch("/api/saveSocialProfiles", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...profiles, password }),
            });

            const responseData = await response.json();

            if (response.ok) {
                window.location.reload();
            } else {
                if (responseData.error && responseData.error.includes("password")) {
                    setPasswordError(responseData.error);
                } else {
                    console.error("Error updating social profiles", responseData.error);
                    setPasswordError("");
                }
            }
        } catch (error) {
            console.error("Error sending data to server", error);
        }
    };

    const computeProfileChanges = () => {
        const changes = [];

        for (const platform in initialProfiles) {
            if (initialProfiles[platform] !== profiles[platform]) {
                // Check if the profile was emptied
                if (!profiles[platform]) {
                    changes.push(
                        <Typography variant="body1" gutterBottom key={platform}>
                            {platform.charAt(0).toUpperCase() + platform.slice(1)} profile has been removed.
                        </Typography>
                    );
                } else {
                    changes.push(
                        <Typography variant="body1" gutterBottom key={platform}>
                            {platform.charAt(0).toUpperCase() + platform.slice(1)} {(<ArrowForwardIcon />)} {profiles[platform]}
                        </Typography>
                    );
                }
            }
        }

        return changes;
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className="confirmModalBox new-input">
                <IconButton
                    style={{ position: "absolute", right: 19, top: 19 }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>

                <Typography id="modal-title" variant="h4" component="h2">
                    Confirm Social Profile Changes
                </Typography>

                <Box mt={2}>{computeProfileChanges()}</Box>

                <Box mt={3}>
                    <TextField
                        sx={{
                            "& .MuiFormLabel-root.Mui-error": {
                                color: "#D32F2F",
                            },
                        }}
                        type="password"
                        label="Password"
                        placeholder="Enter password to confirm"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                    />
                </Box>
                <Box mt={3} display="flex" justifyContent="flex-end">
                    <button
                        onClick={() => onClose()}
                        className={"button -sm -cancel text-purple-1"}
                        style={{ marginRight: "10px" }}
                    >
                        Cancel
                    </button>
                    <button
                        className={`button -sm ${password.length
                            ? "btn-save btn-saveble text-white"
                            : "btn-save -purple-3 btn-unsaveble text-purple-1 cursor-normal"
                            }`}
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </Box>
            </Box>
        </Modal>
    );
}
