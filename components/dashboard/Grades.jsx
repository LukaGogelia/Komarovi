"use client";
import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";
import SelectGrade from "../SelectGrade";
import SelectType from "../SelectType";
import axios from "axios"; // at the top of your component file

export default function Grades({ studentInfoArray }) {
  const [value, setValue] = useState();
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState("Some Type");
  const [gradesData, setGradesData] = useState({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // 'success' or 'error'
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleCalendars, setVisibleCalendars] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Add this state for search feature
  const [visibleRows, setVisibleRows] = useState(
    studentInfoArray.map((student) => student.studentId)
  );

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

  const saveGradeData = (data) => {
    // Assuming date is required and using today's date for now
    const currentDate = new Date().toISOString();

    // Construct the data object to send to the server
    const gradeData = {
      ...data,
      date: currentDate,
    };

    // Make the API call
    axios
      .post("/api/accountingGrades", gradeData)
      .then((response) => {
        if (response.status === 200) {
          setToastMessage("Grade saved successfully!");
          setToastType("success");
        } else {
          setToastMessage("Error saving grade.");
          setToastType("error");
        }
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);
      })
      .catch((error) => {
        setToastMessage("Network error. Please try again.");
        setToastType("error");
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);
        console.error(error);
      });
  };

  const handleRateChange = (grade, currentStudent) => {
    setGradesData((prevData) => ({
      ...prevData,
      [currentStudent.studentId]: {
        ...prevData[currentStudent.studentId],
        grade: Number(grade),
      },
    }));
  };

  const handleTypeChange = (type, currentStudent) => {
    setGradesData((prevData) => ({
      ...prevData,
      [currentStudent.studentId]: {
        ...prevData[currentStudent.studentId],
        type,
      },
    }));
  };

  const handleAddGrade = (currentStudent) => {
    const studentData = gradesData[currentStudent.studentId];
    if (studentData && studentData.grade && studentData.type) {
      saveGradeData({
        studentId: currentStudent.studentId,
        subject: currentStudent.subject,
        grade: studentData.grade,
        type: studentData.type,
      });
    } else {
      setToastMessage("Please select both grade and type before adding.");
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
        if (response.status === 200) {
          const gradeData = response.data.data;
          setGradesData((prevData) => ({
            ...prevData,
            [studentId]: gradeData,
          }));
        } else {
          console.warn("Received unexpected status:", response.status);
        }
      })
      .catch((error) => {
        console.error("API Call Error:", error);
      });
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
                    if (!visibleRows.includes(elm.studentId)) return null;

                    const studentGrades = Array.isArray(
                      gradesData[elm.studentId]
                    )
                      ? gradesData[elm.studentId]
                      : [{}];

                    return studentGrades.map((entry, index) => (
                      <div
                        key={`${elm.studentId}-${index}`}
                        style={centeredStyles}
                        className={`row y-gap-20 justify-between items-center ${
                          i !== 0 && index === 0
                            ? "border-top-light pt-40 mt-40"
                            : ""
                        }`}
                      >
                        <div style={columnStyles} className="col-xl-3">
                          <div className="d-flex items-center">
                            <div className="d-flex x-gap-10 items-center mr-30">
                              {index === 0 && (
                                <>
                                  <i
                                    className="icon-calendar text-16"
                                    onClick={() =>
                                      toggleCalendar(elm.studentId)
                                    }
                                  ></i>
                                  {visibleCalendars[elm.studentId] && (
                                    <input
                                      type="date"
                                      onChange={(e) => {
                                        console.log(
                                          "Selected Date:",
                                          e.target.value
                                        );
                                        fetchGradesForDate(
                                          e.target.value,
                                          elm.studentId
                                        );
                                      }}
                                    />
                                  )}
                                </>
                              )}
                              <a href="#">
                                <i className="icon-edit text-16"></i>
                              </a>
                            </div>
                            <div className="text-dark-1 ml-10">
                              {elm.fullName}
                            </div>
                          </div>
                        </div>

                        <div style={columnStyles} className="col-xl-2">
                          <SelectGrade
                            initialValue={entry.grade || undefined}
                            studentId={elm.studentId}
                            subject={elm.subject}
                            onRateChange={(grade) =>
                              handleRateChange(grade, elm, index)
                            }
                          />
                        </div>

                        <div style={columnStyles} className="col-xl-3">
                          <SelectType
                            initialValue={entry.type || undefined}
                            onTypeChange={(type) =>
                              handleTypeChange(type, elm, index)
                            }
                          />
                        </div>

                        <div style={columnStyles} className="col-xl-2">
                          {!entry.grade && !entry.type ? (
                            <button
                              onClick={() => handleAddGrade(elm)}
                              style={{
                                background: "#4A90E2",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                transition: "0.3s",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = "#357ABD";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = "#4A90E2";
                              }}
                            >
                              Add Grade
                            </button>
                          ) : (
                            <button
                              // Logic or handlers for the Remove Data action
                              style={{
                                background: "red",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                border: "none",
                                cursor: "pointer",
                                transition: "0.3s",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background = "darkred";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = "red";
                              }}
                            >
                              Remove Data
                            </button>
                          )}
                        </div>
                      </div>
                    ));
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
