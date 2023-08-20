"use client";
import React from "react";
import { useState } from "react";
import SelectSubject from "./SelectSubject";
import Gauge from "./Gauge";

const ApplyGauge = () => {
  const [value, setValue] = useState(50);

  const handleRateChange = (rate) => {
    setValue(Number(rate));
  };

  return (
    <div className="col-xl-4 col-md-6">
      <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100 ">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          // className="d-flex justify-between items-center py-20 px-30 border-bottom-light"
        >
          <SelectSubject onRateChange={handleRateChange} />
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
