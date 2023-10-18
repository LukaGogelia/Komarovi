"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SelectSubject = ({ onRateChange, attendances, dashboardText }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(dashboardText.ThisWeek);
  const [darkMode, setDarkMode] = useState(true);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    onRateChange(value);
    setDdOpen(false);
  };

  console.log("attendance", attendances);

  return (
    <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
      <div style={{ textAlign: "center", margin: "auto" }}>
        <h3
          className="lh-1 fw-500 text-dark-1 mb-10"
          style={{ textAlign: "center", fontSize: "1rem" }}
        >
          {dashboardText.Attendance}
        </h3>
      </div>

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
        >
          <div className="select__options js-options">
            {attendances.map((option, i) => (
              <div
                onClick={() => handleSelectChange(option.subject)}
                className={`select__options__button js-target-title${
                  selectedValue === option.subject ? "-is-choosen" : ""
                }`}
                data-value={option.subject}
                key={i}
              >
                {/* Checkbox removed */}
                <span className="ml-10">{option.subject}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSubject;
