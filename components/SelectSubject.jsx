import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const options = [
  { label: "20" },
  { label: "10" },
  { label: "73" },
  { label: "62" },
  { label: "90" },
];

const SelectSubject = ({ onRateChange }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("This Week");
  const [darkMode, setDarkMode] = useState(true);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    onRateChange(value); // Call the passed-in function
    setDdOpen(false); // Close the dropdown
  };

  return (
    <div className={`py-20 border-bottom-light text-center `}>
      <div>
        <h3
          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
          style={{ textAlign: "center" }}
        >
          Attendance rate
        </h3>
      </div>

      <div
        className={`select js-multiple-select col-lg-6 col-md-3 col-sm-2 ${
          darkMode ? "-dark-bg-dark-2 " : ""
        }`}
        data-select-value=""
        style={{ margin: "auto" }}
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
          <FontAwesomeIcon icon={faChevronDown} />
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
                <div className="form-checkbox pointer-events-none">
                  <input
                    required
                    checked={selectedValue === option.label}
                    type="checkbox"
                    readOnly
                  />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check"></div>
                  </div>
                </div>
                <span className="ml-10">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSubject;
