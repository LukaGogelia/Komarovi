"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const UserCard = ({
  user,
  index,
  ddElements,
  options,
  handleRemoveUser,
  toggleExpandUser,
  handleselectedElm,
  updateUser,
}) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [birthDate, setBirthDate] = useState(
    new Date(user.birthDate || Date.now())
  );
  return (
    <Draggable key={index} draggableId={`draggable-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="user-card"
          style={{
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "20px",
            margin: "10px 0",
            ...provided.draggableProps.style,
          }}
        >
          {user.visible ? (
            // The expanded state with the form and all details
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "13px",
                }}
              >
                <div>
                  {/* Red X for delete or close */}
                  <span
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontWeight: "bold",
                      stroke: "1px black",
                      marginBottom: "15px", // this style may not work on a span, you might need to adjust
                    }}
                    onClick={() => handleRemoveUser(index)}
                  >
                    ❌ Remove User
                  </span>
                </div>
                <div onClick={() => toggleExpandUser(index)}>
                  <div
                    style={{
                      width: "20px",
                      borderBottom: "2px solid black",
                      marginTop: "4px",
                      marginBottom: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20px",
                      borderBottom: "2px solid black",
                      marginBottom: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20px",
                      borderBottom: "2px solid black",
                    }}
                  ></div>
                </div>
              </div>

              <form className="contact-form">
                <div
                  className="input-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    style={{
                      flex: "1",
                      marginRight: "10px",
                    }}
                    value={user.firstName}
                    onChange={(e) => updateUser({ firstName: e.target.value })}
                    required
                    type="text"
                    placeholder="First Name"
                  />
                  <input
                    value={user.lastName}
                    onChange={(e) => updateUser({ lastName: e.target.value })}
                    style={{
                      flex: "1",
                      marginLeft: "10px",
                    }}
                    required
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="input-row" style={{ marginTop: "10px" }}>
                  <input
                    value={user.nationalId}
                    onChange={(e) => updateUser({ nationalId: e.target.value })}
                    style={{ width: "100%" }}
                    required
                    type="text"
                    placeholder="National ID"
                  />
                </div>
                <div className="input-row" style={{ marginTop: "10px" }}>
                  <Form.Group>
                    <Form.Label>Birth Date</Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={
                        birthDate instanceof Date && !isNaN(birthDate)
                          ? birthDate
                          : new Date()
                      }
                      onChange={(date) => {
                        setBirthDate(date);
                        updateUser({ birthDate: date.toISOString() });
                      }}
                      dateFormat="MMMM d, yyyy"
                    />
                  </Form.Group>
                </div>
                <div className="input-row" style={{ marginTop: "10px" }}>
                  <input
                    value={user.phone}
                    onChange={(e) => updateUser({ phone: e.target.value })}
                    style={{ width: "100%" }}
                    required
                    type="text"
                    placeholder="Phone"
                  />
                </div>
                <div className="input-row" style={{ marginTop: "10px" }}>
                  <input
                    value={user.email}
                    onChange={(e) => updateUser({ email: e.target.value })}
                    style={{ width: "100%" }}
                    required
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div
                  className="select js-multiple-select"
                  data-select-value=""
                  style={{ marginTop: "10px" }}
                >
                  <button
                    onClick={() => setDdOpen((pre) => !pre)}
                    className="select__button js-button"
                  >
                    <span className="js-button-title">
                      {ddElements.length > 0
                        ? ddElements.join(", ")
                        : user.role}
                    </span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={ddOpen ? "carrot-flip" : ""}
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
                          onClick={() => handleselectedElm(elm.label)}
                          className={`select__options__button js-target-title -is-choosen ${
                            ddElements.includes(elm.label) ? "-is-choosen" : ""
                          }`}
                          data-value={elm.label}
                          key={i}
                        >
                          <div className="form-checkbox pointer-events-none">
                            <input
                              required
                              checked={
                                ddElements.includes(elm.label) ? true : false
                              }
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
                  </div>
                </div>
              </form>
            </>
          ) : (
            // The collapsed state with only basic details
            <div onClick={() => toggleExpandUser(index)}>
              {/* Sample data, you can adjust as needed */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {user.firstName} {user.lastName}
                  {new Date().getFullYear() -
                  new Date(user.birthDate).getFullYear()
                    ? ", " +
                      (new Date().getFullYear() -
                        new Date(user.birthDate).getFullYear()) +
                      " years"
                    : ""}
                  {user.nationalId ? ", " + user.nationalId : ""}
                </div>
                <div>
                  <div
                    style={{
                      width: "20px",
                      borderBottom: "2px solid black",
                      marginTop: "4px",
                      marginBottom: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20px",
                      borderBottom: "2px solid black",
                      marginBottom: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "20px",
                      borderBottom: "2px solid black",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default UserCard;
