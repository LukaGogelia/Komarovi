"use client"

import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export default function Password({ activeTab }) {

  const initialPasswordState = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const [passwordFields, setPasswordFields] = useState(initialPasswordState);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!passwordFields.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!passwordFields.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (passwordFields.newPassword.length < 8) { // Assume a minimum length of 8
      newErrors.newPassword = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }
    try {
      const response = await fetch('/api/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordFields)
      });

      if (!response.ok) {
        const responseData = await response.json();
        // Assume responseData.errors is an object with error messages
        setErrors(responseData.errors || {});
        return;
      }

      setPasswordFields(initialPasswordState);
      // Consider a user-friendly method to show success and/or navigate/redirect user
    } catch (error) {
      console.error('Error during fetch: ', error);
      setErrors({
        ...errors,
        global: 'An unexpected error occurred. Please try again later.',
      });
    }
  };
  const hasChanges = () => {
    return Object.keys(initialPasswordState).some(key => initialPasswordState[key] !== passwordFields[key]);
  };


  const handleInputChange = (field) => (e) => {
    setPasswordFields(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Optionally: Clear the related field error upon change
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };
  return (
    <div className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""}`}>
      <form onSubmit={handleSubmit} className="new-input row y-gap-30">
        <div className="col-md-7">

          <TextField
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword}
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="current-password"
            label="Current password"
            variant="outlined"
            fullWidth
            type="password"
            value={passwordFields.currentPassword}
            onChange={handleInputChange('currentPassword')}
            placeholder="Current password"
          />
        </div>
        <div className="col-md-7">
          <TextField
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword}
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="new-password"
            label="New password"
            variant="outlined"
            fullWidth
            type="password"
            value={passwordFields.newPassword}
            onChange={handleInputChange('newPassword')}
            placeholder="New password"
          />
        </div>
        <div className="col-md-7">
          <TextField
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "#D32F2F", // This will make the label red when there's an error
              },
            }}
            id="confirm-password"
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={passwordFields.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            placeholder="Confirm New Password"
          />
        </div>

        <div className="col-12">
          <button
            className={`button -md ${hasChanges() ? '-purple-1 text-white' : '-purple-3 text-purple-1 btn-disabled'}`}
            disabled={!hasChanges()}>
            Save Password
          </button>
        </div>
      </form>
    </div>
  );
}
