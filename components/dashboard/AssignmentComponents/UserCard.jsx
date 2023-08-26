"use client";
import React, { useState } from "react";

import HamburgerIcon from "./userCardComponents/HamburgerIcon";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

const UserCard = ({
  user,
  index,
  ddElements,
  options,
  isFamily,
  handleselectedElm,
  updateUser,
  handleRemove,
  toggleExpand,
}) => {
  const [ddOpen, setDdOpen] = useState(false);

  return (
    <>
      <Draggable
        key={index}
        draggableId={isFamily ? "" : `draggable-${index}`}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="user-card bg-purple-3 card-input"
            style={{
              border: "1px solid #ccc",
              borderRadius: "15px",
              padding: "20px",
              margin: "23px 0",
              position: "relative",
              cursor: `${isFamily ? "default" : ""}`,
              ...provided.draggableProps.style,
            }}
          >
            {isFamily && (
              <div
                style={{
                  position: "absolute",
                  width: "9em",
                  textAlign: "center",
                  top: "-17px",
                  left: user.invitationCode ? "calc(50% - 9px)" : "50%",
                  transform: user.invitationCode
                    ? "translateX(-100%)"
                    : "translateX(-50%)",
                  padding: "5px 10px",
                }}
                className="bg-green-1 rounded-2 text-white"
              >
                {user.text}
              </div>
            )}
            {user.invitationCode && (
              <div
                style={{
                  position: "absolute",
                  top: "-17px",
                  left: isFamily ? "calc(50% + 9px)" : "50%",
                  transform: isFamily ? "translateX(0%)" : "translateX(-50%)",
                  padding: "5px 10px",
                  cursor: "default",
                }}
                className="bg-purple-1 rounded-2 text-white"
              >
                Code: {user.invitationCode}
              </div>
            )}
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
                        marginBottom: "15px",
                      }}
                      onClick={() => {
                        handleRemove(index, isFamily);
                      }}
                    >
                      ❌ Remove User
                    </span>

                    {/* Display the generated code here */}
                  </div>
                  <HamburgerIcon
                    onClick={() => {
                      toggleExpand(index, isFamily);
                    }}
                  />
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
                      className="card-input"
                      style={{
                        flex: "1",
                        marginRight: "10px",
                      }}
                      value={user.firstName}
                      onChange={(e) =>
                        updateUser({ firstName: e.target.value })
                      }
                      required
                      type="text"
                      placeholder="First Name"
                    />
                    <input
                      className="card-input"
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
                      className="card-input"
                      value={user.nationalId}
                      onChange={(e) =>
                        updateUser({ nationalId: e.target.value })
                      }
                      style={{ width: "100%" }}
                      required
                      type="text"
                      placeholder="National ID"
                    />
                  </div>
                  <div
                    className="input-row"
                    style={{ marginTop: "10px" }}
                  ></div>

                  <div className="input-row" style={{ marginTop: "10px" }}>
                    <input
                      className="card-input"
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
                      className="card-input"
                      value={user.email}
                      onChange={(e) => updateUser({ email: e.target.value })}
                      style={{ width: "100%" }}
                      required
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div
                    className="date-input-wrapper"
                    style={{ position: "relative" }}
                  >
                    <label htmlFor="birthDate" className="my-1 ms-3">
                      Birth Date:
                    </label>

                    <input
                      id="birthDate"
                      className="card-input"
                      value={user.birthDate}
                      onChange={(e) =>
                        updateUser({ birthDate: e.target.value })
                      }
                      style={{
                        width: "100%",
                        borderColor: "rgba(255, 255, 255, 0.6) !important",
                      }}
                      required
                      type="date"
                    />
                  </div>

                  <div
                    className="select js-multiple-select bg-transparent"
                    data-select-value=""
                    style={{ marginTop: "10px" }}
                  >
                    <button
                      onClick={() => setDdOpen((pre) => !pre)}
                      style={{ backgroundColor: "transparent" }}
                      className="select__button js-button"
                    >
                      <span className="js-button-title">
                        {ddElements.length > 0
                          ? ddElements.join(", ")
                          : "User roles"}
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
                            onClick={() => handleselectedElm(elm.label)}
                            className={`select__options__button js-target-title -is-choosen ${
                              ddElements.includes(elm.label)
                                ? "-is-choosen"
                                : ""
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {`${user.firstName} ${user.lastName}` !== " "
                    ? `${user.firstName} ${user.lastName}`
                    : `New ${user.role}`}
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
                  <HamburgerIcon
                    onClick={() => {
                      toggleExpand(index, isFamily);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default UserCard;
