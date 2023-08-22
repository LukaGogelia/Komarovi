// არ არის შევსებული ქართულად არის გასაკეთებელი
"use client";
import React, { useState } from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";
import Buttons from "./AssignmentComponents/Buttons";
import UserCard from "./AssignmentComponents/UserCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Assignment() {
  const [users, setUsers] = useState([]);
  const [ddOpen, setDdOpen] = useState(false);
  const [familyAdded, setFamilyAdded] = useState(false);

  const roles = {
    "Add Teacher": "Teacher",
    "Add Care Manager": "Care Manager",
    "Add House Mentor": "House Mentor",
    "Add Admin": "Admin",
    "Add User": "User",
  };

  const options = [
    { label: "Parent" },
    { label: "Student" },
    { label: "Teacher" },
    { label: "Admin" },
    { label: "Club President" },
    { label: "Care Manager" },
    { label: "House Mentor" },
  ];

  const addFamily = () => {
    if (familyAdded) {
      alert("A family has already been added to this form.");
      return;
    }

    const familyMembers = [
      {
        role: "parent",
        text: "Father",
        visible: false,
        ddElements: [],
        firstName: "",
        lastName: "",
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
      },
      {
        role: "parent",
        text: "Mother",
        visible: false,
        ddElements: [],
        firstName: "",
        lastName: "",
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
      },
      {
        role: "student",
        text: "Child",
        visible: false,
        ddElements: [],
        firstName: "",
        lastName: "",
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
      },
    ];

    setUsers([
      ...users,
      {
        isFamily: true,
        members: familyMembers,
      },
    ]);
    setFamilyAdded(true);
  };

  const updateUserDetails = (index, updatedFields) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => {
        if (i !== index) return user;

        return {
          ...user,
          ...updatedFields,
        };
      })
    );
  };

  const handleRemoveIndividual = (userIndex, memberIndex) => {
    setUsers((prevUsers) => {
      return prevUsers
        .map((user, index) => {
          if (index !== userIndex || !user.isFamily) return user;

          const updatedMembers = [...user.members];
          updatedMembers.splice(memberIndex, 1);

          if (updatedMembers.length === 0) {
            setFamilyAdded(false);
            return null; // return null to remove this family from the users array
          }

          return {
            ...user,
            members: updatedMembers,
          };
        })
        .filter(Boolean); // This will remove any null values from the users array
    });
  };

  const handleRemoveUser = (indexToRemove) => {
    const updatedUsers = users.filter((user, index) => index !== indexToRemove);
    setUsers(updatedUsers);
  };

  const handleselectedElm = (index, label) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => {
        if (i !== index) return user;

        if (user.ddElements.includes(label)) {
          return {
            ...user,
            ddElements: user.ddElements.filter((l) => l !== label),
          };
        } else {
          return {
            ...user,
            ddElements: [...user.ddElements, label],
          };
        }
      })
    );
  };

  const handleButtonClick = (role) => {
    setUsers([
      ...users,
      {
        role,
        visible: true,
        ddElements: [],
        firstName: "",
        lastName: "",
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const toggleExpandUser = (userIndex, memberIndex = null) => {
    const updatedUsers = [...users];
    if (memberIndex !== null) {
      // if it's a family member
      updatedUsers[userIndex].members[memberIndex].visible =
        !updatedUsers[userIndex].members[memberIndex].visible;
    } else {
      updatedUsers[userIndex].visible = !updatedUsers[userIndex].visible;
    }
    setUsers(updatedUsers);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedUsers = [...users];
    const [removed] = reorderedUsers.splice(result.source.index, 1);
    reorderedUsers.splice(result.destination.index, 0, removed);

    setUsers(reorderedUsers);
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create Invitation</h1>
            <PageLinksTwo />
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12 ">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Page Head</h2>
              </div>

              <div className="py-30 px-30">
                <Buttons
                  roles={roles}
                  handleButtonClick={handleButtonClick}
                  addFamily={addFamily}
                  className="my-7"
                />

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {users.map((user, index) => {
                          // Render family members
                          if (user.isFamily) {
                            return (
                              <div
                                key={index}
                                className="bg-green-1 rounded-4 p-3"
                              >
                                {user.members.map((member, memberIndex) => (
                                  <UserCard
                                    key={memberIndex}
                                    familyIndex={index}
                                    user={member}
                                    index={index}
                                    memberIndex={memberIndex}
                                    toggleExpandUser={() =>
                                      toggleExpandUser(index, memberIndex)
                                    }
                                    handleRemoveIndividual={
                                      handleRemoveIndividual
                                    }
                                    options={options}
                                    setDdOpen={setDdOpen}
                                    ddOpen={ddOpen}
                                    updateUser={(fields) =>
                                      updateUserDetails(
                                        index,
                                        fields,
                                        memberIndex
                                      )
                                    }
                                    ddElements={member.ddElements}
                                    handleselectedElm={(label) =>
                                      handleselectedElm(
                                        index,
                                        label,
                                        memberIndex
                                      )
                                    }
                                  />
                                ))}
                              </div>
                            );
                          }
                          // Render non-family members
                          return (
                            <UserCard
                              key={index}
                              user={user}
                              index={index}
                              options={options}
                              handleRemoveUser={handleRemoveUser}
                              toggleExpandUser={toggleExpandUser}
                              setDdOpen={setDdOpen}
                              ddOpen={ddOpen}
                              handleRemoveIndividual={() =>
                                handleRemoveIndividual()
                              }
                              updateUser={(fields) =>
                                updateUserDetails(index, fields)
                              }
                              ddElements={user.ddElements}
                              handleselectedElm={(label) =>
                                handleselectedElm(index, label)
                              }
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
}
