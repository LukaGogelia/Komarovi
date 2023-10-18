"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const QuizPerformanceDropdown = ({
  options,
  setSelectedValue,
  selectedValue,
  onFilter,
  arr,
  dashboardText,
}) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    const filteredArr = arr.filter(
      (item) => item.mathYear === value || item.physicsYear === value
    );
    onFilter(filteredArr);
    setDdOpen(false); // Close the dropdown
  };

  return (
    <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
      <div>
        <h3
          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
          style={{ textAlign: "center" }}
        >
          {dashboardText.QuizPerformance}
        </h3>
      </div>

      <div>
        <div
          className={`dropdown js-dropdown js-category-active ${
            darkMode ? "-dark-bg-dark-2 " : ""
          }`}
          data-select-value=""
          style={{ margin: "auto" }}
        >
          <button
            onClick={() => setDdOpen((prev) => !prev)}
            className={`dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12 ${
              darkMode ? "-dark-bg-dark-1 -dark-border-white-10" : ""
            }`}
          >
            <span
              className="js-dropdown-title"
              style={{ width: "6rem", textAlign: "left" }}
            >
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
            style={{ minHeight: "20px" }}
          >
            <div className="select__options js-options">
              {options
                ? options.map((option, i) => (
                    <div
                      onClick={() => handleSelectChange(option.label)}
                      className={`select__options__button js-target-title${
                        selectedValue === option.label ? "-is-choosen" : ""
                      }`}
                      data-value={option.label}
                      key={i}
                    >
                      <span>{option.label}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPerformanceDropdown;
