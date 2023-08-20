"use client";
import React, { useState } from "react";
import QuizPerformanceDropdown from "./QuizPerformanceDropdown";
import Charts from "./Charts";

export default function QuizPerformance({ options, arr }) {
  const [selectedValue, setSelectedValue] = useState("2021-2022");

  if (selectedValue === "All") {
    arr = arr.map((item) => ({
      ...item,
      name: `${item.mathYear || item.physicsYear}\n${item.name[5]}`,
    }));
    arr[arr.length - 1].name = "Last";
    arr[0].name = "First";
  } else {
    arr.filter(
      (item) =>
        item.mathYear === selectedValue || item.physicsYear === selectedValue
    );
  }

  return (
    <div className="col-xl-8 col-md-6">
      <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
        <QuizPerformanceDropdown
          options={options}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <Charts arr={arr} />
      </div>
    </div>
  );
}
