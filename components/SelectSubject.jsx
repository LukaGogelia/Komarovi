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
  const [ddElement, setDdElement] = useState(""); // String to hold a single element
  const [rate, setRate] = useState(0);

  const handleselectedElm = (elm) => {
    setDdElement(elm);
    setRate(elm);
    onRateChange(elm); // Call the passed in function
    setDdOpen(false); // Close the dropdown
  };

  return (
    <div className="py-20 border-bottom-light text-center">
      <div>
        <h3
          className="text-16 lh-1 fw-500 text-dark-1 mb-10"
          style={{ textAlign: "center" }}
        >
          Attendance rate
        </h3>
      </div>

      <div
        className="select js-multiple-select col-lg-6 col-md-3 col-sm-2"
        data-select-value=""
        style={{ margin: "auto" }}
      >
        <button
          onClick={() => setDdOpen((pre) => !pre)}
          className="select__button js-button"
        >
          <span className="js-button-title">
            {ddElement ? ddElement : "Default"}
          </span>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div
          className={`select__dropdown js-dropdown ${
            ddOpen ? "-is-visible" : ""
          }`}
        >
          <div className="select__options js-options">
            {options.map((elm, i) => (
              <div
                onClick={() => handleselectedElm(elm.label)}
                className={`select__options__button js-target-title ${
                  ddElement === elm.label ? "-is-choosen" : ""
                }`}
                data-value={elm.label}
                key={i}
              >
                <div className="form-checkbox pointer-events-none">
                  <input
                    required
                    checked={ddElement === elm.label}
                    type="checkbox"
                  />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check"></div>
                  </div>
                </div>
                <span className="ml-10">{elm.label}</span>
              </div>
            ))}
          </div>
          <select
            className="select__select js-select-tag"
            name="name2"
            onChange={(e) => setRate(e.target.value)}
            value={rate}
          >
            <option value="20">20</option>
            <option value="10">10</option>
            <option value="73">73</option>
            <option value="62">62</option>
            <option value="90">90</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectSubject;
