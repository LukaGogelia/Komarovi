"use client";
import React, { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubjectDropdown = ({ onSubjectChange, options }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("This Week");
  const [darkMode, setDarkMode] = useState(true);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    onSubjectChange(value); // Call the passed-in function
    setDdOpen(false); // Close the dropdown
  };
  return (
    <div
      className={`select js-multiple-select col-lg-6 col-md-6 col-sm-4 ${
        darkMode ? " " : ""
      }`}
      style={{ textAlign: "center", margin: "auto" }}
    >
      <button
        onClick={() => setDdOpen((prev) => !prev)}
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
        style={{ width: "10rem" }}
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
              {/* Checkbox removed */}
              <span className="ml-10">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectDropdown;
