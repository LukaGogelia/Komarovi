"use client";
import React, { useState, useEffect } from "react";

const SelectAttendance = ({ initialValue, studentId, onAttendanceChange }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue === "yes");
  const [darkMode, setDarkMode] = useState(true); // I've retained this, but it's unclear if you're still using it

  useEffect(() => {
    setSelectedValue(initialValue === "yes"); // Update attendance when initialValue changes
  }, [initialValue]);

  const handleSwitchToggle = (event) => {
    const isChecked = event.target.checked;
    setSelectedValue(isChecked);

    if (typeof onAttendanceChange === "function") {
      onAttendanceChange(isChecked);
    }
  };

  return (
    <div className="form-switch d-flex items-center mt-20">
      <div className="switch">
        <input
          type="checkbox"
          checked={selectedValue}
          onChange={handleSwitchToggle}
        />
        <span className="switch__slider"></span>
      </div>
      <div className="text-13 lh-1 text-dark-1 ml-10">yes</div>
    </div>
  );
};

SelectAttendance.defaultProps = {
  onAttendanceChange: () => {},
  initialValue: "yes", // Default prop for initialValue set to "yes"
};

export default SelectAttendance;
