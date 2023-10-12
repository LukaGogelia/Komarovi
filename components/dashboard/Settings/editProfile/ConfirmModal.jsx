"use client";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

export default function ConfirmModal({
  selectedFile,
  open,
  onClose,
  state,
  setState,
  initialState,
}) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xdfggik7"); // replace 'your_upload_preset' with your actual preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhwthoh1u/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Failed to upload to Cloudinary");
    }
  };



  const handleSaveChanges = async () => {
    console.log("we are here");
    try {
      // setSubmitting(true);
      const uploadedImageUrl = await uploadToCloudinary(selectedFile);

      console.log("Sending data:", {
        profilePictureUrl: uploadedImageUrl,
        email: parsedState.email,
        phone: parsedState.phone,
        actualAddress: {
          region: parsedState.selectedRegions?.actual,
          adminUnit: parsedState.selectedUnits?.actual,
          addressLine: parsedState.addresses?.actual,
        },
        registrationAddress: {
          region: parsedState.selectedRegions?.registration,
          adminUnit: parsedState.selectedUnits?.registration,
          addressLine: parsedState.addresses?.registration,
        },
        password: password,
      });
      const response = await fetch("/api/saveProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          profilePictureUrl: uploadedImageUrl,
          email: parsedState.email,
          phone: parsedState.phone,
          actualAddress: {
            region: parsedState.selectedRegions.actual,
            adminUnit: parsedState.selectedUnits.actual,
            addressLine: parsedState.addresses.actual,
          },
          registrationAddress: {
            region: parsedState.selectedRegions.registration,
            adminUnit: parsedState.selectedUnits.registration,
            addressLine: parsedState.addresses.registration,
          },
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        window.location.reload();

      } else {
        if (response.status !== 200) {
          if (responseData.error && responseData.error.includes("password")) {
            setPasswordError(responseData.error);
          }
        } else {
          console.error("Error updating profile", responseData.error);
          setPasswordError("");
          // ... existing code ...
        }
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error sending data to server", error);
    }
  };

  useEffect(() => {
    if (open) {
      setPassword("");
    }
  }, [open]);
  const parsedState = JSON.parse(state);
  const parsedInitialState = JSON.parse(initialState);

  const constructAddressString = (region, unit, address) => {
    const parts = [];
    if (region) parts.push(region);
    if (unit) parts.push(unit);
    if (address) parts.push(address);
    return parts.join(", ");
  };

  const computeChanges = () => {
    const changes = [];

    if (parsedState.previewImage !== parsedInitialState.previewImage) {
      changes.push(
        <Typography variant="body1" gutterBottom key="profilePic">
          Profile Picture <ArrowForwardIcon /> Changed
        </Typography>
      );
    }
    // Assuming you have parsedState.email, parsedState.phone, parsedInitialState.email, and parsedInitialState.phone
    if (parsedState.email !== parsedInitialState.email) {
      changes.push(
        <Typography variant="body1" gutterBottom key="email">
          Email <ArrowForwardIcon /> {parsedState.email}
        </Typography>
      );
    }

    if (parsedState.phone !== parsedInitialState.phone) {
      changes.push(
        <Typography variant="body1" gutterBottom key="phone">
          Phone <ArrowForwardIcon /> {parsedState.phone}
        </Typography>
      );
    }

    const registrationAddressString = constructAddressString(
      parsedState.selectedRegions.registration,
      parsedState.selectedUnits.registration,
      parsedState.addresses.registration
    );
    const initialRegistrationAddressString = constructAddressString(
      parsedInitialState.selectedRegions.registration,
      parsedInitialState.selectedUnits.registration,
      parsedInitialState.addresses.registration
    );

    if (registrationAddressString !== initialRegistrationAddressString) {
      changes.push(
        <Typography variant="body1" gutterBottom key="registrationAddress">
          Registration Address <ArrowForwardIcon /> {registrationAddressString}
        </Typography>
      );
    }

    const actualAddressString = constructAddressString(
      parsedState.selectedRegions.actual,
      parsedState.selectedUnits.actual,
      parsedState.addresses.actual
    );
    const initialActualAddressString = constructAddressString(
      parsedInitialState.selectedRegions.actual,
      parsedInitialState.selectedUnits.actual,
      parsedInitialState.addresses.actual
    );

    if (actualAddressString !== initialActualAddressString) {
      changes.push(
        <Typography variant="body1" gutterBottom key="actualAddress">
          Actual Address <ArrowForwardIcon /> {actualAddressString}
        </Typography>
      );
    }

    // Add checks for other fields if needed...

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
          className="close-x"
        >
          <CloseIcon />
        </IconButton>

        <Typography id="modal-title" variant="h4" component="h2">
          Confirm Profile Changes
        </Typography>
        {/* Displaying changed states */}
        <Box mt={2}>{computeChanges()}</Box>

        {/* Password input */}
        <Box mt={3}>
          <TextField
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
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
            className={`button -sm ${!submitting || password.length
              ? "btn-save btn-saveble text-white"
              : "btn-save -purple-3 btn-unsaveble text-purple-1 cursor-normal"
              }`}
            onClick={handleSaveChanges}
            disabled={submitting || !password.length}
          >
            Save Changes
          </button>
        </Box>
      </Box>
    </Modal>
  );
}
