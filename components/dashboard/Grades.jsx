"use client";
import React, { useState } from "react";
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

                <div className="border-light-bottom py-20 px-30">
                  {studentInfoArray.map((elm, i) => (
                    <div
                      key={i}
                      className={`row y-gap-20 justify-between items-center ${
                        i != 0 ? "border-top-light pt-20 mt-20" : ""
                      } `}
                    >
                      <div className="col-xl-3">
                        <div className="d-flex items-center">
                          <div className="d-flex x-gap-10 items-center mr-30">
                            <a href="#">
                              <i className="icon-calendar text-16"></i>
                            </a>
                            <a href="#">
                              <i className="icon-edit text-16"></i>
                            </a>
                          </div>

                          <Image
                            width={40}
                            height={40}
                            src={elm.avatar}
                            alt="image"
                            className="size-40"
                          />
                          <div className="text-dark-1 ml-10">
                            {elm.fullName}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-2">
                        <div className="d-flex justify-end">
                          <SelectGrade
                            studentId={elm.studentId}
                            subject={elm.subject}
                            onRateChange={(grade) =>
                              handleRateChange(grade, elm)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-xl-2">
                        <div className="d-flex justify-end">
                          <SelectType
                            onTypeChange={(type) => handleTypeChange(type, elm)}
                          />
                        </div>
                      </div>

                      <div className="col-xl-2">
                        {/* <div className="d-flex justify-end">
                          <SelectType
                            onTypeChange={(type) => handleTypeChange(type, elm)}
                          />
                        </div> */}
                      </div>

                      <div className="col-xl-2">
                        <div className="d-flex justify-end">
                          <button
                            onClick={() => handleAddGrade(elm)}
                            style={{
                              background: "#4A90E2", // Deep blue color
                              color: "white", // Text color
                              padding: "10px 20px", // Top-bottom padding, Left-right padding
                              borderRadius: "5px", // Rounded corners
                              border: "none", // Remove default borders
                              cursor: "pointer", // Change cursor on hover
                              transition: "0.3s", // Smooth transition effect on hover
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "#357ABD";
                            }} // Slightly darker blue on hover
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = "#4A90E2";
                            }} // Deep blue again when hover ends
                          >
                            Add Grade
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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
