import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const typeOptions = [
  { label: "Test" },
  { label: "Assignment" },
  { label: "Quiz" },
  { label: "Final" },
  // Add other types as needed
];

const SelectType = ({ onTypeChange }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Assuming you want dark mode here too

  const handleDropdownClick = () => {
    setDdOpen((prev) => !prev);
  };

  const handleSelectChange = (value) => {
    setSelectedType(value);
    onTypeChange(value);
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
            {selectedType ? selectedType : "Default"}
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
            {typeOptions.map((option, i) => (
              <div
                onClick={() => handleSelectChange(option.label)}
                className={`select__options__button js-target-title${
                  selectedType === option.label ? "-is-choosen" : ""
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

export default SelectType;
