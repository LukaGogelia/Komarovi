"use client";
import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";
import SelectGrade from "../SelectGrade";
import SelectType from "../SelectType";
import axios from "axios"; // at the top of your component file

export default function Grades({ studentInfoArray }) {
  const buttonStyles = {
    blue: {
      style: {
        background: "#4A90E2",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
      },
      onMouseOver: (e) => {
        e.currentTarget.style.background = "#357ABD";
      },
      onMouseOut: (e) => {
        e.currentTarget.style.background = "#4A90E2";
      },
    },
    red: {
      style: {
        background: "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
      },
      onMouseOver: (e) => {
        e.currentTarget.style.background = "darkred";
      },
      onMouseOut: (e) => {
        e.currentTarget.style.background = "red";
      },
    },
  };

  const [value, setValue] = useState();
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState("Some Type");
  const [gradesData, setGradesData] = useState({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // 'success' or 'error'
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleCalendars, setVisibleCalendars] = useState({});
  const [selectedDates, setSelectedDates] = useState({});

  const [searchTerm, setSearchTerm] = useState(""); // Add this state for search feature
  const [editingRow, setEditingRow] = useState({
    studentId: null,
    entryId: null,
  });
  const [tempGrade, setTempGrade] = useState("");
  const [tempType, setTempType] = useState("");

  const [visibleRows, setVisibleRows] = useState(
    studentInfoArray.map((student) => {
      return { studentId: student.studentId, entryId: null }; // or whatever initial entryId should be
    })
  );
  const [editingEntryId, setEditingEntryId] = useState(null);

  const [studentGrades, setStudentGrades] = useState([]); // Initial data or an empty array

  const filteredStudents = studentInfoArray.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCalendar = (studentId) => {
    setVisibleCalendars((prevVisible) => ({
      ...prevVisible,
      [studentId]: !prevVisible[studentId],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  const handleAddGrade = async (student) => {
    try {
      // Prepare data to send to the server
      const gradeData = {
        studentId: student.studentId,
        subject: student.subject,
        grade: tempGrade,
        type: tempType,
        date: selectedDates[student.studentId] || new Date().toISOString(),
      };

      // POST request to your server using Fetch API
      const response = await fetch(
        "http://localhost:3000/api/accountingGrades",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed (like authorization headers)
          },
          body: JSON.stringify(gradeData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to add grade.");
      }

      // Show success toast
      setToastMessage("Grade saved successfully!");
      setToastType("success");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);

      // Update the gradesData state with the new grade
      const newGrade = responseData.data.gradeEntry;

      setGradesData((prevData) => {
        const updatedData = { ...prevData };
        if (updatedData[student.studentId]) {
          updatedData[student.studentId].push(newGrade);
        } else {
          updatedData[student.studentId] = [newGrade];
        }
        return updatedData;
      });

      // Clear the temporary states after saving
      setTempGrade(null);
      setTempType(null);
    } catch (error) {
      console.error("Error:", error);

      // Show error toast
      setToastMessage(`Error: ${error.message}`);
      setToastType("error");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
  };

  const fetchGradesForDate = (date, studentId) => {
    axios
      .get(`/api/accountingGrades?date=${date}&studentId=${studentId}`)
      .then((response) => {
        const gradeData = response.data.data;

        // Map the _id from the response to entryId for the grade data
        const transformedGradeData = gradeData.map((grade) => ({
          ...grade,
          entryId: grade._id,
        }));

        // Create new visible rows using the transformed data
        const newVisibleRows = transformedGradeData.map((grade) => {
          return { studentId: studentId, entryId: grade.entryId };
        });

        setVisibleRows((prevRows) => {
          // Remove previous entries for that student, and add new ones
          const filteredRows = prevRows.filter(
            (row) => row.studentId !== studentId
          );
          return [...filteredRows, ...newVisibleRows];
        });

        if (response.status === 200) {
          setGradesData((prevData) => ({
            ...prevData,
            [studentId]: transformedGradeData,
          }));
        } else {
          console.warn("Received unexpected status:", response.status);
        }
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
  };

  const handleDateChange = (date, studentId) => {
    // Update the selectedDates state
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [studentId]: date,
    }));

    // Fetch the grades for the selected date and student
    fetchGradesForDate(date, studentId);
  };

  const centeredStyles =
    windowWidth <= 1200
      ? {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }
      : {};

  const columnStyles =
    windowWidth <= 1200
      ? {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }
      : {};

  const handleRemoveData = async (studentId, entryId) => {
    if (!studentId || !entryId) {
      console.error("Student ID or Entry ID is missing. Aborting removal.");

      setToastMessage("Required data missing! Unable to remove entry.");
      setToastType("error");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);

      return;
    }

    console.log(
      `Attempting to remove entry with ID: ${entryId} for student ID: ${studentId}`
    );

    try {
      const response = await axios.post("/api/deleteGrade", {
        studentId,
        entryId,
      });

      if (response.data.success) {
        console.log("Data removed successfully.");

        setToastMessage("Data removed successfully!");
        setToastType("success");
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);

        // Update gradesData state to reflect removed data
        setGradesData((prevData) => {
          const updatedGrades = { ...prevData };

          if (updatedGrades[studentId]) {
            updatedGrades[studentId] = updatedGrades[studentId].filter(
              (grade) => grade._id !== entryId
            );
          }

          // Remove studentId from gradesData if they have no grades
          if (
            !updatedGrades[studentId] ||
            updatedGrades[studentId].length === 0
          ) {
            delete updatedGrades[studentId];
          }

          return updatedGrades;
        });

        // Remove the specific studentId and entryId combination from visibleRows
        setVisibleRows((prevRows) =>
          prevRows.filter((row) => {
            return !(row.studentId === studentId && row.entryId === entryId);
          })
        );
      } else {
        console.error("Server responded with an error:", response.data.error);

        setToastMessage(`Server error: ${response.data.error}`);
        setToastType("error");
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error deleting data:", err);

      setToastMessage(`Error: ${err.message}`);
      setToastType("error");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
  };

  const startEditing = (studentId, entry) => {
    setEditingRow({ studentId, entryId: entry.entryId });
    setTempGrade(entry.grade);
    setTempType(entry.type);
  };

  // Handler to save edited grade

  const updateDataToBackend = async (
    studentId,
    entryId,
    gradeValue,
    gradeType
  ) => {
    try {
      const response = await fetch(`/api/deleteGrade`, {
        // Make sure the endpoint name is accurate for updating.
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          studentId,
          entryId,
          gradeValue, // changed from 'grade'
          gradeType, // changed from 'type'
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMessage =
          data.message || response.statusText || "Something went wrong!";
        throw new Error(errorMessage);
      }

      alert("Grade updated successfully!");
    } catch (error) {
      console.error("Failed to update the grade:", error);
      alert(error.message || "Failed to update the grade.");
    }
  };

  const saveEditedGrade = (studentId, entryId) => {
    updateDataToBackend(studentId, entryId, tempGrade, tempType);
    setEditingRow({ studentId: null, entryId: null }); // reset editing mode
    setTempGrade(""); // clear temp data
    setTempType(""); // clear temp data
  };

  const resetGradeInputs = () => {
    setTempGrade(""); // or some default value if not an empty string
    setTempType(""); // or some default value if not an empty string
  };

  // Rest of your component logic and rendering...
  console.log("visible rows:", visibleRows);

  return (
    <div className="dashboard__main">
      <div
        className="dashboard__content bg-light-4"
        style={{ minHeight: "80vh", marginBottom: "5rem" }}
      >
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Grades</h1>

            <PageLinksTwo />
          </div>
        </div>

        {toastVisible && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              padding: "10px 20px",
              backgroundColor: toastType === "success" ? "green" : "red",
              color: "white",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            {toastMessage}
          </div>
        )}

        {/* Adding the search feature here */}
        <div className="row mb-4">
          <div className="col-12">
            <input
              type="text"
              placeholder="Search student by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
          </div>
        </div>

        <div className="row y-gap-30" style={{ marginBottom: "3rem" }}>
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Grades</h2>
              </div>

              <div className="py-30 px-30">
                <div className="py-25 px-30 bg-light-7 -dark-bg-dark-2 rounded-8 mt-25">
                  <div className="row y-gap-20 justify-between items-center">
                    <div className="col-xl-3">
                      <div className="text-purple-1 fw-500">
                        First name / Surname
                      </div>
                    </div>
                    <div className="col-xl-2">
                      <div className="d-flex justify-between items-center">
                        <div className="text-purple-1 fw-500">Grade</div>
                        <div className="d-flex y-gap-5 x-gap-10 items-center pl-10">
                          <a href="#">
                            <i className="icon-edit text-16 text-purple-1"></i>
                          </a>
                          <a href="#">
                            <i className="icon-up_down text-20 text-purple-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-2">
                      <div className="d-flex justify-between items-center">
                        <div className="text-purple-1 fw-500">Type</div>
                        <div className="d-flex y-gap-5 x-gap-10 items-center pl-10">
                          <a href="#">
                            <i className="icon-edit text-16 text-purple-1"></i>
                          </a>
                          <a href="#">
                            <i className="icon-up_down text-20 text-purple-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-2">
                      <div className="d-flex justify-between items-center">
                        <div className="text-purple-1 fw-500">
                          Accounting Attendance
                        </div>
                        <div className="d-flex y-gap-5 x-gap-10 items-center pl-10">
                          <a href="#">
                            <i className="icon-edit text-16 text-purple-1"></i>
                          </a>
                          <a href="#">
                            <i className="icon-up_down text-20 text-purple-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-2">
                      <div className="d-flex justify-between items-center">
                        <div className="text-purple-1 fw-500">
                          Save The Changes
                        </div>
                        <div className="d-flex y-gap-5 x-gap-10 items-center pl-10">
                          <a href="#">
                            <i className="icon-edit text-16 text-purple-1"></i>
                          </a>
                          <a href="#">
                            <i className="icon-up_down text-20 text-purple-1"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ ...centeredStyles, padding: "20px 30px" }}
                  className="border-light-bottom"
                >
                  {filteredStudents.map((elm, i) => {
                    const isVisible = visibleRows.some(
                      (row) => row.studentId === elm.studentId
                    );
                    if (!isVisible) return null;

                    const studentGrades = Array.isArray(
                      gradesData[elm.studentId]
                    )
                      ? gradesData[elm.studentId]
                      : [{}];

                    return (
                      <div key={elm.studentId}>
                        {/* Main Row for adding grades */}
                        <div
                          style={centeredStyles}
                          className={`row y-gap-20 justify-between items-center ${
                            i !== 0 ? "border-top-light pt-40 mt-40" : ""
                          }`}
                        >
                          <div style={columnStyles} className="col-xl-3">
                            <div className="d-flex items-center">
                              <i
                                className="icon-calendar text-16"
                                style={{
                                  paddingLeft: "0.7rem",
                                  paddingBottom: "1rem",
                                }}
                                onClick={() => toggleCalendar(elm.studentId)}
                              ></i>
                              {visibleCalendars[elm.studentId] && (
                                <input
                                  type="date"
                                  style={{
                                    paddingBottom: "0.6rem",
                                    paddingLeft: "0.5rem",
                                  }}
                                  onChange={(e) =>
                                    handleDateChange(
                                      e.target.value,
                                      elm.studentId
                                    )
                                  }
                                />
                              )}
                            </div>
                            <div className="text-dark-1 ml-10">
                              {elm.fullName}
                            </div>
                          </div>
                          <div style={columnStyles} className="col-xl-2">
                            <SelectGrade
                              initialValue={tempGrade}
                              studentId={elm.studentId}
                              subject={elm.subject}
                              onRateChange={(grade) => setTempGrade(grade)}
                            />
                          </div>
                          <div style={columnStyles} className="col-xl-3">
                            <SelectType
                              initialValue={tempType}
                              onTypeChange={(type) => setTempType(type)}
                            />
                          </div>
                          <div style={columnStyles} className="col-xl-2">
                            <button
                              onClick={() => handleAddGrade(elm)}
                              {...buttonStyles.blue}
                            >
                              Add Grade
                            </button>
                          </div>
                        </div>

                        {/* Rows for existing grades */}
                        {selectedDates[elm.studentId] &&
                          studentGrades.map((entry, index) => (
                            <div
                              key={`${elm.studentId}-${index}`}
                              style={centeredStyles}
                              className="row y-gap-20 justify-between items-center"
                            >
                              <div style={columnStyles} className="col-xl-3">
                                <div className="d-flex items-center">
                                  <div className="d-flex x-gap-10 items-center mr-30">
                                    {editingRow.studentId === elm.studentId &&
                                    editingRow.entryId === entry.entryId ? (
                                      <span
                                        onClick={() => {
                                          saveEditedGrade(
                                            elm.studentId,
                                            entry.entryId
                                          );
                                          resetGradeInputs();
                                        }}
                                      >
                                        ✅
                                      </span>
                                    ) : (
                                      <span
                                        onClick={() =>
                                          startEditing(elm.studentId, entry)
                                        }
                                      >
                                        🖊️
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-dark-1 ml-10">
                                    {elm.fullName}
                                  </div>
                                </div>
                              </div>

                              <div style={columnStyles} className="col-xl-2">
                                <SelectGrade
                                  initialValue={
                                    editingRow.studentId === elm.studentId &&
                                    editingRow.entryId === entry.entryId
                                      ? tempGrade
                                      : entry.grade
                                  }
                                  studentId={elm.studentId}
                                  subject={elm.subject}
                                />
                              </div>

                              <div style={columnStyles} className="col-xl-3">
                                <SelectType
                                  initialValue={
                                    editingRow.studentId === elm.studentId &&
                                    editingRow.entryId === entry.entryId
                                      ? tempType
                                      : entry.type
                                  }
                                />
                              </div>

                              <div style={columnStyles} className="col-xl-2">
                                {entry.grade && entry.type && (
                                  <button
                                    onClick={() =>
                                      handleRemoveData(elm.studentId, entry._id)
                                    }
                                    {...buttonStyles.red}
                                  >
                                    Remove Data
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    );
                  })}
                  <hr />
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
