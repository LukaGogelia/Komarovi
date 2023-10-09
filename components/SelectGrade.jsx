"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const options = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "10" },
];

const SelectGrade = ({ initialValue, studentId, subject, onRateChange }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setSelectedValue(initialValue); // Update grade when initialValue changes
  }, [initialValue]);

  const handleDropdownClick = () => {
    setDdOpen((prev) => !prev);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    if (typeof onRateChange === "function") {
      onRateChange(value); // Send the selected grade to the parent
    }
    setDdOpen(false); // Close the dropdown
  };

  return (
    <div style={{ zIndex: "22", width: "100%" }}>
      <div className={`select js-multiple-select ${darkMode ? " " : ""}`}>
        <button
          onClick={handleDropdownClick}
          className={`select__button js-button ${
            darkMode ? "-dark-bg-dark-1 -dark-border-white-10" : ""
          }`}
        >
          <span className="js-button-title">
            {selectedValue ? selectedValue : "Default"}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              transform: ddOpen ? "rotate(180deg)" : "",
              transition: "transform 0.3s ease",
              fontSize: "9px",
            }}
          />
        </button>
        <div
          className={`select__dropdown js-dropdown ${
            darkMode ? "-dark-bg-dark-2" : ""
          } ${ddOpen ? "-is-visible" : ""}`}
        >
          <div className="select__options js-options">
            {options.map((option, i) => (
              <div
                onClick={() => handleSelectChange(option.label)}
                className={`select__options__button js-target-title${
                  selectedValue === option.label ? "-is-choosen" : ""
                }`}
                data-value={option.label}
                key={i}
              >
                <span className="ml-10">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

SelectGrade.defaultProps = {
  onRateChange: () => {},
};

export default SelectGrade;
