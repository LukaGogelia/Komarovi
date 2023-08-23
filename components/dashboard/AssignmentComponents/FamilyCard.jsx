"use client";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import UserCard from "./UserCard";

const FamilyCard = ({
  family,
  familyIndex,
  options,
  familyUsers,
  setFamilyUsers,
  handleRemove,
  toggleExpandFamilyUser,
  handleRemoveFamilyUser,
  ...otherProps
}) => {
  console.log(family);

  return (
    <Draggable key={familyIndex}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
                options={options}
                familyIndex={familyIndex}
                handleRemoveFamilyUser={handleRemoveFamilyUser}
                toggleExpandFamilyUser={toggleExpandFamilyUser}
                {...otherProps}
              />
            );
          })}
        </div>
      )}
    </Draggable>
  );
};

export default FamilyCard;
