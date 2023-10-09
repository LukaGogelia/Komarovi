"use client";

import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export default function Password({ activeTab }) {

  const initialPasswordState = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  const [passwordFields, setPasswordFields] = useState(initialPasswordState);

  const hasChanges = () => {
    return Object.keys(initialPasswordState).some(key => initialPasswordState[key] !== passwordFields[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process password change...
  };

  const handleInputChange = (field) => (e) => {
    setPasswordFields(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""}`}>
      <form onSubmit={handleSubmit} className="new-input row y-gap-30">
        <div className="col-md-7">
          <TextField
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
