"use client";

import React, { useState } from "react";
import TextField from '@mui/material/TextField';

export default function CloseAccount({ activeTab, w }) {

  const [password, setPassword] = useState('');
  const [hasChanges, setHasChanges] = useState(false); // To track changes

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would add functionality to close the account
    // If successful, you can clear the password state, reset hasChanges, and possibly redirect the user
    setPassword('');
    setHasChanges(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasChanges(true);
  };

  return (
    <div className={`tabs__pane -tab-item-5 ${activeTab == 5 ? "is-active" : ""} `}>
      <form onSubmit={handleSubmit} className="new-input row y-gap-30">
        <div className="col-12">
          <div className="text-16 fw-500 text-dark-1">{w.closeAccount}</div>
          <p className="mt-10">
            {w.closeAccountWarning}
          </p>
        </div>

        <div className="col-md-7">
          <TextField
            id="close-account-password"
            label={w.enterPassword}
            variant="outlined"
            fullWidth
            type="password" // This should be password type for hiding the characters
            value={password}
            onChange={handlePasswordChange}
            placeholder={w.enterPassword}
          />
        </div>

        <div className="col-12">
          <button
            className={`button -md ${hasChanges ? '-purple-1 text-white' : '-purple-3 text-purple-1 btn-disabled'}`}
            disabled={!hasChanges}>
            {w.closeAccount}
          </button>
        </div>
      </form>
    </div>
  );
}
