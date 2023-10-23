"use client";
import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";
import SelectGrade from "../SelectGrade";
import SelectType from "../SelectType";
import axios from "axios"; // at the top of your component file
import SelectAttendance from "../selectAttendance";

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

  const showToast = (message, type = "info", duration = 3000) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, duration);
  };
  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
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
  const [editGrade, setEditGrade] = useState("");
  const [editType, setEditType] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);
  const [tempAttendance, setTempAttendance] = useState("yes");
  const [attendanceData, setAttendanceData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState({
    studentId: null,
    entryId: null,
  });
  const [tempGrade, setTempGrade] = useState(null);
  const [tempType, setTempType] = useState(null);
  const [visibleRows, setVisibleRows] = useState(
    studentInfoArray.map((student) => {
      return { studentId: student.studentId, entryId: null };
    })
  );
  const [updatingAttendanceId, setUpdatingAttendanceId] = useState(null);

  const [attendanceCount, setAttendanceCount] = useState({});
  const [attendanceDataForDate, setAttendanceDataForDate] = useState({});

  const [editingEntryId, setEditingEntryId] = useState(null);
  const [studentGrades, setStudentGrades] = useState([]);
  const [mainRow, setMainRow] = useState({
    date: new Date().toISOString().split("T")[0],
    studentId: "defaultStudentId",
    grades: [],
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedAttendanceId, setEditedAttendanceId] = useState(null);
  const [editedAttendanceValue, setEditedAttendanceValue] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddGrade = async (student) => {
    const gradeData = createGradeData(student);
    const optimisticGradeEntry = optimisticallyUpdateUI(gradeData, student);

    try {
      const newGrade = await sendGradeToServer(gradeData);
      confirmOptimisticUpdate(optimisticGradeEntry, newGrade, student);
      showToast("Grade saved successfully!", "success");
    } catch (error) {
      rollbackOptimisticUpdate(optimisticGradeEntry, student);
      showToast(`Error: ${error.message}`, "error");
    }
  };

  const createGradeData = (student) => {
    const currentDate = selectedDates[student.studentId] || getCurrentDate();
    return {
      studentId: student.studentId,
      subject: student.subjectId, // Assuming student has a subjectId property pointing to the ObjectId of the subject
      grade: tempGrade || "N/A",
      type: tempType || "N/A",
      date: currentDate,
    };
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const optimisticallyUpdateUI = (gradeData, student) => {
    const optimisticID = Math.random().toString();
    const optimisticGradeEntry = { ...gradeData, _id: optimisticID };

    setGradesData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData[student.studentId]) {
        updatedData[student.studentId] = [];
      }
      updatedData[student.studentId].push(optimisticGradeEntry);
      return updatedData;
    });

    return optimisticGradeEntry;
  };

  const sendGradeToServer = async (gradeData) => {
    const response = await fetch("http://localhost:3000/api/accountingGrades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gradeData),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Failed to add grade.");
    }

    return (await response.json()).data.gradeEntry;
  };

  const confirmOptimisticUpdate = (optimisticGradeEntry, newGrade, student) => {
    setGradesData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[student.studentId] = updatedData[student.studentId].map(
        (entry) => (entry._id === optimisticGradeEntry._id ? newGrade : entry)
      );
      return updatedData;
    });

    if (editingRow.entryId === optimisticGradeEntry._id) {
      setEditingRow({ studentId: student.studentId, entryId: newGrade._id });
    }
  };

  const fetchGradesForDate = async (date, studentId) => {
    try {
      const response = await axios.get(
        `/api/accountingGrades?date=${date}&studentId=${studentId}`
      );
      const gradeData = response.data.data;

      const transformedGradeData = gradeData.map((grade) => ({
        ...grade,
        entryId: grade._id,
      }));

      const newVisibleRows = transformedGradeData.map((grade) => ({
        studentId: studentId,
        entryId: grade.entryId,
      }));

      setVisibleRows((prevRows) => {
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
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  const fetchAttendanceForDate = async (date, studentId) => {
    const response = await fetch(
      `/api/attendance?date=${date}&studentId=${studentId}`
    );

    if (!response.ok) {
      console.error("Failed to fetch attendance for date:", date);
      return;
    }

    const data = await response.json();
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: data,
    }));
  };

  const handleDateChange = (date, studentId) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [studentId]: date,
    }));

    fetchGradesForDate(date, studentId);

    fetchAttendanceForDate(date, studentId);
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
      console.log({ studentId, entryId, gradeValue, gradeType });

      const response = await fetch(`/api/deleteGrade`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          studentId,
          entryId,
          gradeValue,
          gradeType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }

      showToast("Grade updated successfully!", "success");

      // Use the returned updatedGrade from the backend
      const updatedGrade = data.updatedGrade;

      // Update the gradesData state
      setGradesData((prevGrades) => {
        const updatedGrades = { ...prevGrades };

        if (!updatedGrades[studentId]) {
          updatedGrades[studentId] = [];
        }

        const gradeIndex = updatedGrades[studentId].findIndex(
          (grade) => grade._id === updatedGrade._id
        );

        if (gradeIndex !== -1) {
          updatedGrades[studentId][gradeIndex].grade = updatedGrade.grade;
          updatedGrades[studentId][gradeIndex].type = updatedGrade.type;
        }

        return updatedGrades;
      });

      // Update the visibleRows state to reflect recent changes
      setVisibleRows((prevVisibleRows) => {
        return prevVisibleRows.map((row) => {
          if (row.studentId === studentId && row.entryId === updatedGrade._id) {
            return {
              ...row,
              grade: updatedGrade.grade,
              type: updatedGrade.type,
            };
          }
          return row;
        });
      });
    } catch (error) {
      console.error("Failed to update the grade:", error);
      showToast(error.message || "Failed to update the grade.", "error");
    }
  };

  const saveEditedGrade = async (studentId, entryId) => {
    await updateDataToBackend(studentId, entryId, tempGrade, tempType);
    setEditingRow({ studentId: null, entryId: null });
    setTempGrade("");
    setTempType("");
  };

  const resetGradeInputs = () => {
    setTempGrade(""); // or some default value if not an empty string
    setTempType(""); // or some default value if not an empty string
  };

  // add attendance

  const handleAddAttendance = async (student) => {
    let optimisticAttendanceEntry; // Declare it outside the try block

    try {
      // Extracting necessary data
      const currentDate =
        selectedDates[student.studentId] ||
        new Date().toISOString().split("T")[0];
      const dayOfWeek = getDayOfWeek(currentDate);
      const studentTimeTable = student.timeTables.find(
        (tt) => tt.day === dayOfWeek
      );

      if (!studentTimeTable) {
        return showToast(
          `No timetable found for the student on ${dayOfWeek}.`,
          "error"
        );
      }

      const lessonsForTheDay = studentTimeTable.lessons;
      if (!lessonsForTheDay || lessonsForTheDay.length === 0) {
        return showToast(`No lessons scheduled for ${dayOfWeek}.`, "error");
      }

      const selectedSubjectName = student.subjectName;
      const lessonsForSelectedSubject = lessonsForTheDay.filter(
        (lesson) => String(lesson.subject) === selectedSubjectName
      );

      if (lessonsForSelectedSubject.length === 0) {
        return showToast(
          `No lessons on ${dayOfWeek} for the selected subject.`,
          "error"
        );
      }

      // const response = await fetch(
      //   `http://localhost:3000/api/attendance?studentId=${student.studentId}&date=${currentDate}`
      // );
      // const responseData = await response.json();

      // if (
      //   responseData.data &&
      //   responseData.data.length >= lessonsForSelectedSubject.length
      // ) {
      //   showToast(
      //     `Attendance already recorded for all lessons of the subject on ${dayOfWeek}.`,
      //     "error"
      //   );

      const attendanceData = {
        studentId: student.studentId,
        subject: student.subjectName, // Sending the subject name as the 'subject'
        subjectId: student.subjectId,
        attendance: tempAttendance,
        date: currentDate,
      };

      console.log("About to send attendance data:", attendanceData);

      const optimisticID = Math.random().toString();
      const optimisticAttendanceEntry = {
        ...attendanceData,
        _id: optimisticID,
      };
      updateAttendanceData(optimisticAttendanceEntry, student.studentId);

      const postResponse = await sendAttendanceDataToAPI(attendanceData);
      const postResponseData = await postResponse.json();
      if (!postResponse.ok || !postResponseData.data) {
        throw new Error(postResponseData.error || "Failed to add attendance.");
      }
      showToast("Attendance saved successfully!", "success");
      replaceOptimisticUpdateWithRealData(attendanceData, student.studentId);
    } catch (error) {
      showToast(`Error: ${error.message}`, "error");
      if (optimisticAttendanceEntry) {
        rollbackOptimisticUpdate(
          optimisticAttendanceEntry._id,
          student.studentId
        );
      }
    }
  };

  const sendAttendanceDataToAPI = async (data) => {
    const response = await fetch("http://localhost:3000/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add attendance.");
    }
    return response;
  };

  const updateAttendanceData = (entry, studentId) => {
    console.log("[updateAttendanceData] - Updating with entry:", entry);
    setAttendanceData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData[studentId] || !Array.isArray(updatedData[studentId])) {
        updatedData[studentId] = [];
      }
      updatedData[studentId].push(entry);
      return updatedData;
    });
  };

  const replaceOptimisticUpdateWithRealData = (newAttendance, studentId) => {
    console.log(
      "[replaceOptimisticUpdateWithRealData] - Replacing optimistic update with:",
      newAttendance
    );
    setAttendanceData((prevData) => {
      const updatedData = { ...prevData };
      const studentAttendance = updatedData[studentId].map((entry) =>
        entry._id === newAttendance._id ? newAttendance : entry
      );
      updatedData[studentId] = studentAttendance;
      return updatedData;
    });
  };

  const rollbackOptimisticUpdate = (id, studentId) => {
    console.log(
      "[rollbackOptimisticUpdate] - Rolling back update with id:",
      id
    );
    setAttendanceData((prevData) => {
      const updatedData = { ...prevData };
      if (updatedData[studentId] && Array.isArray(updatedData[studentId])) {
        const studentAttendance = updatedData[studentId].filter(
          (entry) => entry._id !== id
        );
        updatedData[studentId] = studentAttendance;
      } else {
        console.warn(
          `No data found for studentId: ${studentId} or it's not an array.`
        );
      }
      return updatedData;
    });
  };

  const resetStates = () => {
    console.log("[resetStates] - Resetting states.");
    setTempAttendance(null);
    setEditingRow({ studentId: null, entryId: null });
    setForceUpdate((prev) => prev + 1);
  };

  const handleButtonClick = async (student) => {
    if (tempGrade && tempType) {
      await handleAddGrade(student);
    } else {
      await handleAddAttendance(student);
    }
  };

  function getDayOfWeek(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date(date).getDay()];
  }

  useEffect(() => {
    async function fetchAttendanceDataForSelectedDate(studentId, selectedDate) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/attendance?studentId=${studentId}&date=${selectedDate}`
        );
        const responseData = await response.json();

        if (responseData.success && responseData.data) {
          setAttendanceDataForDate((prevData) => ({
            ...prevData,
            [studentId]: responseData.data,
          }));
        } else {
          console.error("Failed to fetch attendance data:", responseData.error);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    }

    Object.entries(selectedDates).forEach(([studentId, date]) => {
      fetchAttendanceDataForSelectedDate(studentId, date);
    });
  }, [selectedDates]);

  const currentDate = new Date().toISOString().split("T")[0];

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
              className="-dark-bg-dark-1"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                color: "#fff", // adjust the text color to white for better readability against a dark background
              }}
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
                    const studentGrades = gradesData[elm.studentId] || [];
                    const attendanceForStudentDate =
                      attendanceDataForDate[elm.studentId] || [];

                    console.log(
                      "attendanceForStudentDate for student:",
                      elm.studentId,
                      "is:",
                      attendanceForStudentDate
                    );

                    // Logging selected dates
                    console.log("selectedDates:", selectedDates);

                    const lessonsOnSelectedDate =
                      attendanceForStudentDate.filter(
                        (entry) =>
                          new Date(entry.date).toISOString().split("T")[0] ===
                          selectedDates[elm.studentId]
                      );

                    if (lessonsOnSelectedDate.length === 0) {
                      lessonsOnSelectedDate.push({ status: "no" });
                    }

                    const renderMainRow = (attendanceRecord) => (
                      <div
                        style={centeredStyles}
                        className={`row y-gap-20 justify-between items-center ${
                          i !== 0 ? "border-top-light pt-40 mt-40" : ""
                        }`}
                      >
                        <div style={columnStyles} className="col-xl-3">
                          <div className="d-flex align-items-center">
                            <i
                              className="icon-calendar text-16"
                              style={{
                                paddingLeft: "0.7rem",
                                paddingBottom: "0.45rem",
                              }}
                              onClick={() => toggleCalendar(elm.studentId)}
                            ></i>
                            {visibleCalendars[elm.studentId] && (
                              <input
                                type="date"
                                value={
                                  selectedDates[elm.studentId] ||
                                  getCurrentDate()
                                }
                                max={currentDate} // This restricts the date selection
                                style={{ paddingLeft: "0.5rem" }}
                                onChange={(e) => {
                                  const selectedDate = e.target.value;
                                  if (
                                    new Date(selectedDate) >
                                    new Date(currentDate)
                                  ) {
                                    showToastMessage(
                                      "Cannot select the future date!"
                                    );
                                  } else {
                                    handleDateChange(
                                      selectedDate,
                                      elm.studentId
                                    );
                                  }
                                }}
                                className="-dark-bg-dark-1"
                              />
                            )}
                            <div
                              className="text-dark-1 mt-10"
                              style={{ paddingLeft: "0.5rem" }}
                            >
                              {elm.fullName}
                            </div>
                          </div>
                        </div>
                        <div style={columnStyles} className="col-xl-2">
                          <SelectGrade
                            studentId={elm.studentId}
                            subject={elm.subjectId}
                            onRateChange={setTempGrade}
                          />
                        </div>
                        <div style={columnStyles} className="col-xl-3">
                          <SelectType onTypeChange={setTempType} />
                        </div>
                        <div
                          style={{ ...columnStyles, marginTop: "-1.3rem" }} // added marginTop to existing styles
                          className="col-xl-2"
                        >
                          <SelectAttendance
                            studentId={elm.studentId}
                            onAttendanceChange={setTempAttendance}
                            style={{ paddingBottom: "10px" }}
                            initialValue={
                              attendanceRecord?.key === "no" ? "no" : "yes"
                            }
                          />
                        </div>

                        <div style={columnStyles} className="col-xl-2">
                          <button
                            onClick={() => handleButtonClick(elm)}
                            {...buttonStyles.blue}
                          >
                            Add Grade
                          </button>
                        </div>
                        <hr className="hr-style" />
                      </div>
                    );

                    const renderAttendanceRow = (attendanceRecord) => (
                      <div
                        style={{
                          ...centeredStyles,
                          padding: "10px 0",
                        }}
                        className="row y-gap-20 justify-between items-center"
                      >
                        <div
                          style={{
                            color: "#333",
                          }}
                          className="col-xl-3"
                        >
                          {elm.fullName}
                        </div>

                        <div
                          style={{
                            ...columnStyles,
                            fontStyle: "italic",
                            paddingRight: "25px",
                          }}
                          className="col-xl-3"
                        ></div>

                        <div style={columnStyles} className="col-xl-2">
                          <SelectAttendance
                            studentId={elm.studentId}
                            onAttendanceChange={(status) => {
                              if (
                                updatingAttendanceId === attendanceRecord._id
                              ) {
                                setEditedAttendanceValue(status);
                              } else {
                                handleAttendanceUpdate(
                                  elm.studentId,
                                  attendanceRecord.date,
                                  status
                                );
                              }
                            }}
                            style={{
                              paddingBottom: "10px",
                              paddingTop: "10px",
                              border: "1px solid #d1d1d1",
                              borderRadius: "5px",
                            }}
                            initialValue={
                              attendanceRecord.key === "no" ? "no" : "yes"
                            }
                          />
                        </div>

                        <div style={columnStyles} className="col-xl-2">
                          <button
                            onClick={async () => {
                              if (
                                updatingAttendanceId === attendanceRecord._id
                              ) {
                                try {
                                  const response = await fetch(
                                    "/api/attendance",
                                    {
                                      method: "PUT",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        attendanceId: attendanceRecord._id,
                                        key: editedAttendanceValue,
                                      }),
                                    }
                                  );

                                  const responseData = await response.json();

                                  if (responseData.success) {
                                    showToastMessage(
                                      "Data saved successfully!"
                                    );
                                  } else {
                                    showToastMessage(
                                      "Failed to save data!",
                                      "error"
                                    );
                                  }

                                  setUpdatingAttendanceId(null);
                                } catch (error) {
                                  showToastMessage(
                                    "Failed to save data!",
                                    "error"
                                  );
                                }
                              } else {
                                setUpdatingAttendanceId(attendanceRecord._id);
                              }
                            }}
                            style={{
                              padding: "10px 15px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              backgroundColor:
                                updatingAttendanceId === attendanceRecord._id
                                  ? "green"
                                  : "#4a90e2",
                              color: "white",
                              transition: "0.3s ease",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor =
                                updatingAttendanceId === attendanceRecord._id
                                  ? "darkgreen"
                                  : "#357ABD";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor =
                                updatingAttendanceId === attendanceRecord._id
                                  ? "green"
                                  : "#4a90e2";
                            }}
                          >
                            {updatingAttendanceId === attendanceRecord._id
                              ? "Save Data"
                              : "Update Data"}
                          </button>
                        </div>
                        <hr className="hr-style" />
                      </div>
                    );

                    const renderGradesRow = (student, entry, index) => {
                      const isEditingCurrentEntry =
                        editingRow.studentId === student.studentId &&
                        editingRow.entryId === entry.entryId;

                      return (
                        <div
                          key={`${student.studentId}-${index}`}
                          style={centeredStyles}
                          className="row y-gap-20 justify-between items-center"
                        >
                          <div style={columnStyles} className="col-xl-3">
                            <div className="d-flex items-center">
                              <div className="d-flex x-gap-10 items-center mr-30">
                                {isEditingCurrentEntry ? (
                                  <span
                                    onClick={() => {
                                      saveEditedGrade(
                                        student.studentId,
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
                                      startEditing(student.studentId, entry)
                                    }
                                  >
                                    🖊️
                                  </span>
                                )}
                              </div>
                              <div className="text-dark-1 ml-10">
                                {student.fullName}
                              </div>
                            </div>
                          </div>
                          <div style={columnStyles} className="col-xl-2">
                            <SelectGrade
                              initialValue={
                                isEditingCurrentEntry ? tempGrade : entry.grade
                              }
                              studentId={student.studentId}
                              subject={student.subject}
                              onRateChange={
                                isEditingCurrentEntry ? setTempGrade : null
                              }
                            />
                          </div>
                          <div style={columnStyles} className="col-xl-3">
                            <SelectType
                              initialValue={
                                isEditingCurrentEntry ? tempType : entry.type
                              }
                              onTypeChange={
                                isEditingCurrentEntry ? setTempType : null
                              }
                            />
                          </div>
                          <div style={columnStyles} className="col-xl-2">
                            {entry.grade && entry.type && (
                              <button
                                onClick={() =>
                                  handleRemoveData(
                                    student.studentId,
                                    entry.entryId
                                  )
                                }
                                {...buttonStyles.red}
                              >
                                Remove Data
                              </button>
                            )}
                          </div>
                          <hr className="hr-style" />
                        </div>
                      );
                    };

                    return (
                      <div key={elm.studentId}>
                        {renderMainRow()}

                        {/* Check if a date has been selected for this student */}
                        {selectedDates[elm.studentId] &&
                          lessonsOnSelectedDate.map((attendanceRecord, idx) => (
                            <div key={idx}>
                              {renderAttendanceRow(attendanceRecord)}
                            </div>
                          ))}

                        {studentGrades.map((entry, index) =>
                          renderGradesRow(elm, entry, index)
                        )}
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
