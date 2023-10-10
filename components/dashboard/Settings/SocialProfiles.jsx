"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import isEqual from "lodash/isEqual";

export default function SocialProfiles({
  activeTab,
  socialProfilesProps: data,
}) {
  console.log(data);
  const initialProfileState = { ...data };

  const [profiles, setProfiles] = useState(initialProfileState);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Iterate over each profile and validate
    const initialErrors = {};
    for (const profile in profiles) {
      if (profiles[profile] && !isValidURL(profiles[profile])) {
        initialErrors[profile] = "Invalid URL";
      }
    }
    setErrors(initialErrors);
  }, []);

  const isValidURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url);
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    let error = "";

    if (value && !isValidURL(value)) {
      error = "Invalid URL";
    }

    setProfiles((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      // Handle or display a global error message if needed here
      return;
    }

    // Save or process the profiles logic here
    setHasChanges(false);
  };

  useEffect(() => {
    const hasChanged = !isEqual(initialProfileState, profiles);
    const hasErrors = Object.values(errors).some((error) => error !== "");

    setHasChanges(hasChanged && !hasErrors);
  }, [profiles, errors]);

  return (
    <div
      className={`tabs__pane -tab-item-3 ${activeTab == 3 ? "is-active" : ""}`}
    >
      <form onSubmit={handleSubmit} className="new-input row y-gap-30">
        <div className="col-md-6">
          <TextField
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="x-profile"
            label="X (formerly Twitter)"
            variant="outlined"
            fullWidth
            value={profiles.x}
            onChange={handleInputChange("x")}
            placeholder="X Profile URL"
            error={Boolean(errors.x)}
            helperText={errors.x}
          />
        </div>
        <div className="col-md-6">
          <TextField
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="facebook-profile"
            label="Facebook"
            variant="outlined"
            fullWidth
            value={profiles.facebook}
            onChange={handleInputChange("facebook")}
            placeholder="Facebook Profile URL"
            error={Boolean(errors.facebook)}
            helperText={errors.facebook}
          />
        </div>
        <div className="col-md-6">
          <TextField
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="instagram-profile"
            label="Instagram"
            variant="outlined"
            fullWidth
            value={profiles.instagram}
            onChange={handleInputChange("instagram")}
            placeholder="Instagram Profile URL"
            error={Boolean(errors.instagram)}
            helperText={errors.instagram}
          />
        </div>
        <div className="col-md-6">
          <TextField
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="linkedin-profile"
            label="LinkedIn"
            variant="outlined"
            fullWidth
            value={profiles.linkedIn}
            onChange={handleInputChange("linkedIn")}
            placeholder="LinkedIn Profile URL"
            error={Boolean(errors.linkedIn)}
            helperText={errors.linkedIn}
          />
        </div>
        <div className="col-12">
          <button
            className={`button -md ${
              hasChanges
                ? "-purple-1 text-white"
                : "-purple-3 text-purple-1 btn-disabled"
            }`}
            disabled={!hasChanges}
          >
            Save Social Profile
          </button>
        </div>
      </form>
    </div>
  );
}
