"use client";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AddChildButton } from "./Buttons";
import UserCard from "./UserCard";

const FamilyCard = ({
  family,
  familyIndex,
  options,
  familyUsers,
  setFamilyUsers,
  handleRemove,
  toggleExpand,
  updateDetails,
  handleAddChildButtonClick,
  handleselectedElm,
  handleFamilyResponse,
  classOptions,
  ...otherProps
}) => {
  console.log(family);

  return (
    <Draggable>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="non-draggable-item"
          style={{
            border: "2px solid #ddd",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "20px",

            ...provided.draggableProps.style,
          }}
        >
          <h3>Family</h3>
          {familyUsers.map((user, userIndex) => {
            console.log("user:" + user, userIndex);
            return (
              <UserCard
                key={userIndex}
                user={user}
                ddElements={user.ddElements}
                index={userIndex}
                updateUser={(fields) => updateDetails(userIndex, fields, true)}
                handleselectedElm={(label) =>
                  handleselectedElm(userIndex, label, true)
                }
                handleFamilyResponse={handleFamilyResponse}
                options={options}
                familyIndex={familyIndex}
                handleRemove={handleRemove}
                toggleExpand={toggleExpand}
                isFamily={true}
                classOptions={classOptions}
                {...otherProps}
              />
            );
          })}
          {/* Adding the AddChildButton at the bottom of the card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "33px",
            }}
          >
            <AddChildButton
              handleAddChildButtonClick={handleAddChildButtonClick}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default FamilyCard;
