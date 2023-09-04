import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function ClassesDropdown({ options, selectedClasses, setSelectedClasses }) {
  const [ddOpen, setDdOpen] = React.useState(false);

  const handleSelectClass = (label) => {
    if (selectedClasses.includes(label)) {
      setSelectedClasses((prev) => prev.filter((item) => item !== label));
    } else {
      setSelectedClasses((prev) => [...prev, label]);
    }
  };

  return (
    <div className="col-lg-6">
      <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
        Select Classes
      </label>

      <div
        className="select js-multiple-select bg-transparent"
        data-select-value=""
        style={{ marginTop: "10px" }}
      >
        <button
          onClick={() => setDdOpen((pre) => !pre)}
          className="select__button js-button"
          style={{ backgroundColor: "transparent" }}
        >
          <span className="js-button-title">
            {selectedClasses.length > 0
              ? selectedClasses.join(", ")
              : "Select Classes"}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`me-1 ${ddOpen ? "carrot-flip" : ""}`}
          />
        </button>

        <div
          className={`select__dropdown js-dropdown ${
            ddOpen ? "-is-visible" : ""
          }`}
        >
          <div className="select__options js-options">
            {options.map((elm, i) => (
              <div
                onClick={() => handleSelectClass(elm)}
                className={`select__options__button js-target-title ${
                  selectedClasses.includes(elm) ? "-is-choosen" : ""
                }`}
                data-value={elm.label}
                key={i}
              >
                <div className="form-checkbox pointer-events-none">
                  <input
                    required
                    checked={selectedClasses.includes(elm) ? true : false}
                    type="checkbox"
                  />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check"></div>
                  </div>
                </div>

                <span className="ml-10">{elm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassesDropdown;
