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
  const [familyUsers, setFamilyUsers] = useState([]);
  const [codesGenerated, setCodesGenerated] = useState(false);

  const roles = {
    "Add Teacher": "Teacher",
    "Add Care Manager": "Care Manager",
    "Add House Mentor": "House Mentor",
    "Add Admin": "Admin",
    "Add User": null,
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
    invitationCode: "",
  };

  const starterFamily = [
    {
      role: "Parent",
      text: "Father",
      visible: false,
      ddElements: ["Parent"],
      firstName: "",
      lastName: "",
      nationalId: "",
      birthDate: "",
      phone: "",
      email: "",
      isFamilyMember: true,
      invitationCode: "",
    },
    {
      role: "Parent",
      text: "Mother",
      visible: false,
      ddElements: ["Parent"],
      firstName: "",
      lastName: "",
      nationalId: "",
      birthDate: "",
      phone: "",
      email: "",
      isFamilyMember: true,
      invitationCode: "",
    },
    {
      role: "Student",
      text: "Child",
      visible: false,
      ddElements: ["Student"],
      firstName: "",
      lastName: "",
      nationalId: "",
      birthDate: "",
      phone: "",
      email: "",
      isFamilyMember: true,
      invitationCode: "",
    },
  ];

  useEffect(() => {
    if (familyUsers.length === 0) {
      setFamilyAdded(false);
    }
  }, [familyUsers]);

  useEffect(() => {
    let allCodesGenerated = codesGenerated;
    allCodesGenerated =
      users.every((user) => user.invitationCode !== "") &&
      familyUsers.every((user) => user.invitationCode !== "") &&
      (users.length !== 0 || familyUsers.length !== 0);
    setCodesGenerated(allCodesGenerated);
  }, [users, familyUsers]);

  const addFamily = () => {
    if (familyAdded) {
      alert("A family has already been added to this form.");
      return;
    }

    setFamilyUsers(starterFamily);
    setFamilyAdded(true);
  };

  const generateCodes = () => {
    const generateSevenDigitNumber = () =>
      Math.floor(1000000 + Math.random() * 9000000).toString();

    if (users.length) {
      const updatedUsers = users.map((user) =>
        user.invitationCode
          ? user
          : {
              ...user,
              invitationCode: generateSevenDigitNumber(),
            }
      );
      setUsers(updatedUsers);
    }

    if (familyUsers.length) {
      const updatedFamilyUsers = familyUsers.map((user) =>
        user.invitationCode
          ? user
          : {
              ...user,
              invitationCode: generateSevenDigitNumber(),
            }
      );
      setFamilyUsers(updatedFamilyUsers);
    }
  };

  const saveCodes = () => {
    // Logic to save codes to the backend
    console.log("Codes saved:", generatedCodes);
    // Call your backend API to save the codes here
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

  const handleselectedElm = (index, label, isFamily) => {
    const setArr = isFamily ? setFamilyUsers : setUsers;
    setArr((prevUsers) =>
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
    setCodesGenerated(false);
  };

  const handleButtonClick = (role) => {
    setUsers([
      ...users,
      {
        role,
        visible: true,
        ddElements: role === null ? [] : [role],
        firstName: "",
        lastName: "",
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
        isFamilyMember: false,
        invitationCode: "",
      },
    ]);
    setCodesGenerated(false);
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

              <div className="py-30 px-30 mx-7">
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
                            handleselectedElm={handleselectedElm}
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
                              handleselectedElm(index, label, false)
                            }
                            isFamily={false}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <div className="col-auto mb-30">
                  <div className="row x-gap-10 y-gap-10 justify-content-center">
                    <div className="col-auto">
                      {users.length || familyUsers.length ? (
                        <button
                          type="button"
                          className="button -md -purple-1 text-white"
                          onClick={() => generateCodes()}
                        >
                          Generate codes
                        </button>
                      ) : null}
                    </div>
                    <div className="col-auto">
                      {codesGenerated && (
                        <button
                          type="button"
                          className="button -md -dark-1 text-white"
                          onClick={() => saveCodes()}
                        >
                          Save the codes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
}
