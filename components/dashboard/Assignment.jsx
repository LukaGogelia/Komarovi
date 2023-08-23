// არ არის შევსებული ქართულად არის გასაკეთებელი
"use client";
import React, { useEffect, useState } from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";

import Buttons from "./AssignmentComponents/Buttons";
import FamilyCard from "./AssignmentComponents/FamilyCard";
import UserCard from "./AssignmentComponents/UserCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Assignment() {
  const [users, setUsers] = useState([]);
  const [familyAdded, setFamilyAdded] = useState(false);
  const [familyUsers, setFamilyUsers] = useState(1);

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

  const starterChild = {
    role: "student",
    text: "Child",
    visible: true,
    ddElements: [],
    firstName: "",
    lastName: "",
    nationalId: "",
    birthDate: "",
    phone: "",
    email: "",
    isFamilyMember: true,
  };

  const starterFamily = [
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
      isFamilyMember: true,
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
      isFamilyMember: true,
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
      isFamilyMember: true,
    },
  ];

  useEffect(() => {
    if (familyUsers.length === 0) {
      setFamilyAdded(false);
    }
  }, [familyUsers]);

  const addFamily = () => {
    if (familyAdded) {
      alert("A family has already been added to this form.");
      return;
    }

    setFamilyUsers(starterFamily);

    setFamilyAdded(true);
  };

  const updateDetails = (index, updatedFields, isFamily) => {
    const setArr = isFamily ? setFamilyUsers : setUsers;
    setArr((prevUsers) =>
      prevUsers.map((user, i) => {
        if (i !== index) return user;

        return {
          ...user,
          ...updatedFields,
        };
      })
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

  const handleAddChildButtonClick = () => {
    const updatedFamilyUsers = [...familyUsers, { ...starterChild }];
    setFamilyUsers(updatedFamilyUsers);
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
        isFamilyMember: false,
      },
    ]);
  };

  const toggleExpand = (userIndex, isFamily) => {
    const arr = isFamily ? familyUsers : users;
    const setArr = isFamily ? setFamilyUsers : setUsers;

    const updatedUsers = [...arr];

    updatedUsers[userIndex].visible = !updatedUsers[userIndex].visible;

    setArr(updatedUsers);
  };

  const handleRemove = (indexToRemove, isFamily) => {
    const arr = isFamily ? familyUsers : users;
    const setArr = isFamily ? setFamilyUsers : setUsers;

    const updatedUsers = arr.filter((_, index) => index !== indexToRemove);
    setArr(updatedUsers);
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
                        {familyAdded && (
                          <FamilyCard
                            options={options}
                            familyUsers={familyUsers}
                            toggleExpand={toggleExpand}
                            updateDetails={updateDetails}
                            setFamilyUsers={setFamilyUsers}
                            handleRemove={handleRemove}
                            handleAddChildButtonClick={() =>
                              handleAddChildButtonClick()
                            }
                          />
                        )}
                        {users.map((userOrFamily, index) => (
                          <UserCard
                            key={index}
                            user={userOrFamily}
                            index={index}
                            options={options}
                            handleRemove={handleRemove}
                            toggleExpand={toggleExpand}
                            updateUser={(fields) =>
                              updateDetails(index, fields, false)
                            }
                            ddElements={userOrFamily.ddElements}
                            handleselectedElm={(label) =>
                              handleselectedElm(index, label)
                            }
                            isFamily={false}
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
