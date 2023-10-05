"use client";
import React from "react";
import { useState } from "react";
import SelectSubject from "./SelectSubject";
import Gauge from "./Gauge";

const ApplyGauge = ({ attendances }) => {
  const [value, setValue] = useState(50); // default value

  const handleRateChange = (selectedSubject) => {
    // Find the attendance data for the selected subject
    const attendanceData = attendances.find(
      (item) => item.subject === selectedSubject
    );

    if (attendanceData) {
      const percentage = Math.round(
        (attendanceData.attended / attendanceData.total) * 100
      );
      setValue(percentage);
    } else {
      console.warn(`No attendance data found for ${selectedSubject}`);
    }
  };

  console.log("attendance data passed as prop:", attendances); // Log the initial attendance data

  return (
    <div className="col-xl-4 col-md-12">
      <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100 ">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          // className="d-flex justify-between items-center py-20 px-30 border-bottom-light"
        >
          <SelectSubject
            onRateChange={handleRateChange}
            attendances={attendances}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              paddingTop: "2.2rem",
            }}
          >
            <div style={{ alignItems: "center" }}>
              <Gauge value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyGauge;
