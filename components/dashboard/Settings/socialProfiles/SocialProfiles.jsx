"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ConfirmModal from "./ConfirmModal";
import isEqual from "lodash/isEqual";

export default function SocialProfiles({
  activeTab,
  socialProfilesProps: data, w
}) {
  console.log(data);
  const initialProfileState = { ...data };

  const [profiles, setProfiles] = useState(initialProfileState);
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    // Iterate over each profile and validate
    const initialErrors = {};
    for (const profile in profiles) {
      if (profiles[profile] && !isValidURL(profiles[profile])) {
        initialErrors[profile] = w.invalidURL;
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
      error = w.invalidURL;
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

    // Open the confirmation modal:
    setIsModalOpen(true);

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
      <ConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profiles={profiles}
        initialProfiles={initialProfileState}
      />
      <form onSubmit={handleSubmit} className="new-input row y-gap-30">
        <div className="col-md-6">
          <TextField
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="x-profile"
            label={w.formerTwitter}
            variant="outlined"
            fullWidth
            value={profiles.x}
            onChange={handleInputChange("x")}
            placeholder={w.xProfileURL}
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
            label={w.facebook}
            variant="outlined"
            fullWidth
            value={profiles.facebook}
            onChange={handleInputChange("facebook")}
            placeholder={w.facebookProfileURL}
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
            label={w.instagram}
            variant="outlined"
            fullWidth
            value={profiles.instagram}
            onChange={handleInputChange("instagram")}
            placeholder={w.instagramProfileURL}
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
            label={w.linkedin}
            variant="outlined"
            fullWidth
            value={profiles.linkedIn}
            onChange={handleInputChange("linkedIn")}
            placeholder={w.linkedinProfileURL}
            error={Boolean(errors.linkedIn)}
            helperText={errors.linkedIn}
          />
        </div>
        <div className="col-12">
          <button
            className={`button -md ${hasChanges
              ? "-purple-1 text-white"
              : "-purple-3 text-purple-1 btn-disabled"
              }`}
            disabled={!hasChanges}
          >
            {w.saveSocialProfile}
          </button>
        </div>
      </form>
    </div>
  );
}
