"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "./editProfileComponents/ImageUpload";
import TextField from "@mui/material/TextField";
import ConfirmModal from "./editProfileComponents/ConfirmModal";
import Grid from "@mui/material/Grid";
import RegionDropdowns from "./editProfileComponents/RegionDropdowns";

export default function EditProfile({ activeTab, editProfileProps: data }) {
  console.log(data);

  const initialState = { ...data.initialState };

  const [state, setState] = useState(initialState);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);

  useEffect(() => {
    // Validate email on initial load
    if (state.email && !isValidEmail(state.email)) {
      setEmailError("Invalid email format");
    }

    // Validate phone on initial load
    if (state.phone && !isValidPhone(state.phone)) {
      setPhoneError("Invalid phone format");
    }
  }, []);

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    // Here, we validate the email when the user clicks out of the input field
    if (!isValidEmail(state.email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email.length === 0 ? true : pattern.test(email);
  };

  const isValidPhone = (phone) => {
    const pattern = /^[\d\s()-]+$/;
    return phone.length === 0 ? true : pattern.test(phone);
  };

  const handleInputChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    handleInputChange("email", value);
    if (!isValidEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    handleInputChange("phone", value);
    if (!isValidPhone(value)) {
      setPhoneError("Invalid phone format");
    } else {
      setPhoneError("");
    }
  };

  const handleRegionSelection = (type, region) => {
    setState((prev) => ({
      ...prev,
      selectedRegions: { ...prev.selectedRegions, [type]: region },
    }));
  };

  const handleUnitSelection = (type, unit) => {
    setState((prev) => ({
      ...prev,
      selectedUnits: { ...prev.selectedUnits, [type]: unit },
    }));
  };

  const handleAddressChange = (type, address) => {
    setState((prev) => ({
      ...prev,
      addresses: { ...prev.addresses, [type]: address },
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState((prev) => ({
          ...prev,
          previewImage: reader.result,
          selectedFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClear = () => {
    setState((prev) => ({ ...prev, previewImage: "" }));
  };

  const hasStateChanged = () => {
    return (
      JSON.stringify(initialState) !== JSON.stringify(state) &&
      !phoneError &&
      !emailError
    );
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Return early if there are no changes.
    if (!hasStateChanged()) {
      return;
    }

    try {
      // Define the request data here
      const requestData = {
        email: state.email === initialState.email ? "" : state.email,
        phone: state.phone === initialState.phone ? "" : state.phone,
        actualAddress: {
          region: state.selectedRegions.actual,
          administrativeUnit: state.selectedUnits.actual,
        },
        registrationAddress: {
          region: state.selectedRegions.registration,
          administrativeUnit: state.selectedUnits.registration,
        },
      };

      const response = await fetch("/api/validateProfileEdit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.status !== 200) {
        if (data.error) {
          if (data.error.includes("Email")) {
            setEmailError(data.error);
          }
          if (data.error.includes("Phone")) {
            setPhoneError(data.error);
          }
        }
      } else {
        // Display the modal if the request was successful
        handleOpenModal();
      }
    } catch (error) {
      console.error("There was an error:", error.message);
    }
  };

  // ... [the rest of your imports and code above]

  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""}`}
    >
      <ConfirmModal
        selectedFile={state.selectedFile}
        open={isModalOpen}
        onClose={() => handleCloseModal()}
        state={JSON.stringify(state)}
        initialState={JSON.stringify(initialState)}
      />
      <ImageUpload
        handleImageChange={handleImageChange}
        handleImageClear={handleImageClear}
        previewImage={state.previewImage}
      />

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="new-input">
          <Grid container spacing={3}>
            {" "}
            {/* Start of the Grid container */}
            <Grid item xs={12} md={6}>
              <TextField
                id="first-name"
                label="First Name"
                variant="outlined"
                fullWidth
                className="new-disabled-input"
                disabled
                value={data?.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="last-name"
                label="Last Name"
                variant="outlined"
                fullWidth
                className="new-disabled-input"
                disabled
                value={data?.lastName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="national-id"
                label="National ID Number"
                variant="outlined"
                fullWidth
                className="new-disabled-input"
                disabled
                value={data?.nationalId}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="birthday"
                label="Birthday"
                variant="outlined"
                fullWidth
                className="new-disabled-input"
                disabled
                value={data?.birthDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{
                  "& .MuiFormLabel-root.Mui-error": {
                    color: "#D32F2F", // This will make the label red when there's an error
                  },
                }}
                id="telephone-number"
                label="Telephone Number"
                placeholder="Enter your primary phone number"
                variant="outlined"
                fullWidth
                value={state.phone}
                onChange={handlePhoneChange}
                error={Boolean(phoneError)}
                helperText={phoneError}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{
                  "& .MuiFormLabel-root.Mui-error": {
                    color: "#D32F2F", // This will make the label red when there's an error
                  },
                }}
                id="email"
                label="Email"
                placeholder="Enter your active email address"
                variant="outlined"
                fullWidth
                value={state.email}
                onFocus={handleEmailFocus}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                error={Boolean(emailError) && !isEmailFocused}
                helperText={isEmailFocused ? "" : emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <RegionDropdowns
                type="registration"
                onRegionChange={handleRegionSelection}
                onUnitChange={handleUnitSelection}
                onAddressChange={handleAddressChange}
                addressState={{
                  region: state.selectedRegions.registration,
                  adminUnit: state.selectedUnits.registration,
                  addressLine: state.addresses.registration,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <RegionDropdowns
                type="actual"
                onRegionChange={handleRegionSelection}
                onUnitChange={handleUnitSelection}
                onAddressChange={handleAddressChange}
                addressState={{
                  region: state.selectedRegions.actual,
                  adminUnit: state.selectedUnits.actual,
                  addressLine: state.addresses.actual,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <button
                className={`button -md ${
                  hasStateChanged()
                    ? "-purple-1 text-white"
                    : "-purple-3 text-purple-1 btn-disabled"
                }`}
                disabled={!hasStateChanged()}
              >
                Update Profile
              </button>
            </Grid>
          </Grid>{" "}
          {/* End of the Grid container */}
        </form>
      </div>
    </div>
  );
}
