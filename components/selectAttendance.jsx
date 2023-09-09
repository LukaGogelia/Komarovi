"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SelectAttendance = ({ initialValue, onAttendanceChange }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue === "yes");

  useEffect(() => {
    setSelectedValue(initialValue === "yes");
  }, [initialValue]);

  const handleAttendanceChange = (event) => {
    const isChecked = event.target.checked;
    setSelectedValue(isChecked);

    if (typeof onAttendanceChange === "function") {
      onAttendanceChange(isChecked ? "yes" : "no");
    }
  };

  return (
    <div className="form-switch d-flex items-center mt-20">
      <div className="switch">
        <input
          type="checkbox"
          checked={selectedValue}
          onChange={handleAttendanceChange}
        />
        <span className="switch__slider"></span>
      </div>
      <div className="text-13 lh-1 text-dark-1 ml-10">
        {selectedValue ? "yes" : "no"}
      </div>
    </div>
  );
};

SelectAttendance.propTypes = {
  onAttendanceChange: PropTypes.func,
  initialValue: PropTypes.oneOf(["yes", "no"]),
};

SelectAttendance.defaultProps = {
  onAttendanceChange: () => {},
  initialValue: "yes",
};

export default SelectAttendance;
