"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const GradeSubject = ({ onSubjectChange, options }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("All");
  const [darkMode, setDarkMode] = useState(true);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    onSubjectChange(value); // Call the passed-in function
    setDdOpen(false); // Close the dropdown
  };

  return (
    <div
      className="py-20  border-bottom-light"
      style={{ zIndex: "22", marginTop: "5rem" }}
    >
      <div>
        <h3 className="text-16 lh-1 fw-500 text-dark-1 mb-10 ">
          Select Subject
        </h3>
      </div>

      <div className={`select js-multiple-select  ${darkMode ? " " : ""}`}>
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
    </div>
  );
};

export default GradeSubject;
