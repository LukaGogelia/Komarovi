"use client";
// არ არის შევსებული ქართულად არის გასაკეთებელი
import React, { useState } from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";
import Buttons from "./AssignmentComponents/Buttons";
import UserCard from "./AssignmentComponents/UserCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Assignment() {
  const [users, setUsers] = useState([]);
  const [ddOpen, setDdOpen] = useState(false);

  const roles = {
    "Add Teacher": "Teacher",
    "Add Care Manager": "Care Manager",
    "Add House Mentor": "House Mentor",
    "Add Admin": "Admin",
    "Add User": "User",
  };

  const options = [
    { label: "Banking" },
    { label: "Digital & Creative" },
    { label: "Retail" },
    { label: "Designer" },
    { label: "Developer" },
  ];

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

  const handleRemoveUser = (indexToRemove) => {
    setUsers((prevUsers) =>
      prevUsers.filter((_, index) => index !== indexToRemove)
    );
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

  const toggleExpandUser = (index) => {
    setUsers(
      users.map((em, i) => (i === index ? { ...em, visible: !em.visible } : em))
    );
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
          <div className="col-xl-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Page Head</h2>
              </div>

              <div className="py-30 px-30">
                <Buttons roles={roles} handleButtonClick={handleButtonClick} />

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {users.map((user, index) => (
                          <UserCard
                            key={index}
                            user={user}
                            index={index}
                            options={options}
                            handleRemoveUser={handleRemoveUser}
                            toggleExpandUser={toggleExpandUser}
                            setDdOpen={setDdOpen}
                            ddOpen={ddOpen}
                            updateUser={(fields) =>
                              updateUserDetails(index, fields)
                            }
                            ddElements={user.ddElements}
                            handleselectedElm={(label) =>
                              handleselectedElm(index, label)
                            }
                          />
                        ))}
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
