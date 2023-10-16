// არ არის შევსებული ქართულად არის გასაკეთებელი
"use client";
import React, { useEffect, useState } from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";

import Buttons from "./AssignmentComponents/Buttons";
import FamilyCard from "./AssignmentComponents/FamilyCard";
import UserCard from "./AssignmentComponents/UserCard";
import UsersTable from "./AssignmentComponents/UsersTable";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";
// import "font-awesome/css/font-awesome.min.css";

export default function Assignment({ currentClasses }) {
  const [codesSaved, setCodesSaved] = useState(false);
  const [users, setUsers] = useState([]);
  const [familyUsers, setFamilyUsers] = useState([]);
  const [familyAdded, setFamilyAdded] = useState(false);
  const [codesGenerated, setCodesGenerated] = useState(false);

  const toSuperscript = (num) => {
    const superscripts = {
      0: "⁰",
      1: "¹",
      2: "²",
      3: "³",
      4: "⁴",
      5: "⁵",
      6: "⁶",
      7: "⁷",
      8: "⁸",
      9: "⁹",
      10: "¹⁰",
      11: "¹¹",
      12: "¹²",
      13: "¹³",
      14: "¹⁴",
      15: "¹⁵",
      16: "¹⁶",
      17: "¹⁷",
    };
    return superscripts[num.toString()] || num;
  };

  let classOptions = JSON.parse(currentClasses);
  classOptions = classOptions.map(
    (classItem) =>
      `${classItem.gradeLevel}${toSuperscript(classItem.parallelNumber)} Class`
  );

  const roles = {
    "Add Teacher": "Teacher",
    "Add Care Manager": "Care Manager",
    "Add House Mentor": "House Mentor",
    "Add Admin": "Admin",
    "Add Student": "Student",
    "Add Parent": "Student",
    "Add User": undefined,
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
    role: "Student",
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

  const handleFamilyResponse = (
    response,
    requesterFirstName,
    requesterLastName,
    requesterText
  ) => {
    // You'll receive response and the first and last names of the familyUser that made the request

    // Clone your familyUsers state
    const updatedFamilyUsers = [...familyUsers];

    const updaterIndex = updatedFamilyUsers.findIndex(
      (user) =>
        user.firstName === requesterFirstName &&
        user.lastName === requesterLastName
    );

    const updater = updatedFamilyUsers[updaterIndex];

    let isFather = false;
    let isMother = false;

    updatedFamilyUsers.forEach((user, index) => {
      if (user.text === "Mother") {
        user.firstName = response.mother.firstName;
        user.lastName = response.mother.lastName;
        isMother = true;
        user.visible = true;
      } else if (user.text === "Father") {
        user.firstName = response.father.firstName;
        user.lastName = response.father.lastName;
        isFather = true;
        user.visible = true;
      } else if (user.text === "Child") {
        updatedFamilyUsers.splice(index, 1);
        if (index === updatedFamilyUsers.length - 1) {
          updatedFamilyUsers.pop();
        }
      }
    });

    response.children.forEach((em) => {
      if (
        !(
          em.firstName === requesterFirstName &&
          em.lastName === requesterLastName &&
          requesterText === "Child"
        )
      ) {
        updatedFamilyUsers.push({
          ...starterChild,
          firstName: em.firstName,
          lastName: em.lastName,
          visible: true,
        });
      }
    });

    if (updater.text === "Child") {
      updatedFamilyUsers.splice(updaterIndex, 0, updater);
    }

    if (!isFather) {
      updatedFamilyUsers.unshift({
        role: "Parent",
        text: "Father",
        visible: true,
        ddElements: ["Parent"],
        firstName: response.father.firstName,
        lastName: response.father.lastName,
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
        isFamilyMember: true,
        invitationCode: "",
      });
    }

    if (!isMother) {
      updatedFamilyUsers.splice(1, 0, {
        role: "Parent",
        text: "Mother",
        visible: true,
        ddElements: ["Parent"],
        firstName: response.mother.firstName,
        lastName: response.mother.lastName,
        nationalId: "",
        birthDate: "",
        phone: "",
        email: "",
        isFamilyMember: true,
        invitationCode: "",
      });
    }

    setFamilyUsers(updatedFamilyUsers);
  };

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

  const saveCodes = async () => {
    try {
      const response = await axios.post("/api/saveInvitations", {
        users,
        familyUsers,
      });

      console.log(response.data.message);
      setCodesSaved(true);
      // Handle success, like showing a success message, etc.
    } catch (error) {
      console.error("Error saving invitations:", error);
      // Handle error, like showing an error message to the user.
    }
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
            <h1 className="text-30 lh-12 fw-700">
              {!codesSaved
                ? "Create Invitation"
                : `Invitation${
                    users.length + familyUsers.length > 1 ? "s" : ""
                  } Saved!`}
            </h1>
            <PageLinksTwo />
          </div>
        </div>

        {!codesSaved ? (
          <div className="row y-gap-30">
            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-19 lh-1 fw-500 mt-3 ">Invitation Form</h2>
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
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
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
                              classOptions={classOptions}
                              handleselectedElm={handleselectedElm}
                              handleFamilyResponse={handleFamilyResponse}
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
                              classOptions={classOptions}
                              isFamily={false}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div className="col-auto mb-30 d-flex justify-content-center">
                    {!codesGenerated &&
                      (users.length > 0 || familyUsers.length > 0) && (
                        <button
                          type="button"
                          className="button -md -purple-1 text-white mr-2"
                          onClick={() => generateCodes()}
                        >
                          Generate codes
                        </button>
                      )}
                    {codesGenerated && (
                      <button
                        type="button"
                        className="button -md -dark-3 text-white"
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
        ) : (
          <div className="row y-gap-30 text-5">
            <div className="col-12">
              <UsersTable users={users} familyUsers={familyUsers} />
            </div>
          </div>
        )}
      </div>
      <FooterNine />
    </div>
  );
}
