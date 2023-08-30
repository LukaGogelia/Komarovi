"use client";
import React, { useState } from "react";
import Link from "next/link";
import SelectClass from "../SelectClass";
import GradeSubject from "../GradeSubject";

export default function GradesList({ updatedArray, options }) {
  const [value, setValue] = useState();
  const [subject, setSubject] = useState("");

  const handleRateChange = (rate) => {
    setValue(Number(rate));
  };

  const handleSubjectChange = (subject) => {
    setSubject(String(subject));
  };

  return (
    <>
      <div className="dashboard__main" style={{ minHeight: "70vh" }}>
        <div className="dashboard__content bg-light-4">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700 pl-9">Classes List</h1>
          </div>
          <div className="row pb-50 mb-10">
            <div
              className="col-lg-8 col-md-8 col-sm-12"
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className="input-group"
                style={{ flex: "1", marginRight: "10px" }}
              >
                <SelectClass onRateChange={handleRateChange} />
              </div>

              <div className="input-group" style={{ flex: "1" }}>
                <GradeSubject
                  onSubjectChange={handleSubjectChange}
                  options={options}
                />
              </div>
            </div>
          </div>

          <div className="row y-gap-30 justify-between pt-60 lg:pt-50">
            {updatedArray
              .filter(
                (elm) =>
                  (!value || elm.gradeLevel === value) &&
                  (!subject || elm.subject === subject)
              )
              .map((elm) => (
                <div
                  key={elm.id}
                  className="col-lg-5 col-md-6 transform hover:-translate-y-2"
                >
                  <Link href={`dshb-grades/${elm.id}`}>
                    <div
                      className="coursesCard -type-2 text-center pt-40 pb-40 px-30 rounded-8"
                      style={{ backgroundColor: "#6440FB" }}
                    >
                      <div className="coursesCard__content mt-30">
                        <h5
                          className="coursesCard__title text-18 lh-1 fw-700"
                          style={{ color: "#140342" }}
                        >
                          Grade Level: {elm.gradeLevel}
                        </h5>
                        <p
                          className="coursesCard__text text-14 mt-10"
                          style={{ color: "white" }}
                        >
                          Parallel Number: {elm.parallelNumber}
                        </p>
                        <p
                          className="coursesCard__text text-14 mt-10"
                          style={{ color: "white" }}
                        >
                          Academic Year: {elm.academicYear}
                        </p>
                        <p
                          className="coursesCard__text text-14 mt-10"
                          style={{ color: "white" }}
                        >
                          Subject: {elm.subject}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
