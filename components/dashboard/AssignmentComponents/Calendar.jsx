"use client";
import React, { useState } from "react";

function Calendar() {
  const [date, setDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const handlePreviousYear = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth(), 1)
    );
  };

  const handleNextYear = () => {
    setDate(
      (prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth(), 1)
    );
  };

  return (
    <div className="custom-calendar">
      <div className="custom-calendar-controls">
        <button className="custom-calendar-btn" onClick={handlePreviousYear}>
          &lt;&lt;
        </button>
        <button className="custom-calendar-btn" onClick={handlePreviousMonth}>
          &lt;
        </button>
        <span className="custom-calendar-date">{`${
          date.getMonth() + 1
        }/${date.getFullYear()}`}</span>
        <button className="custom-calendar-btn" onClick={handleNextMonth}>
          &gt;
        </button>
        <button className="custom-calendar-btn" onClick={handleNextYear}>
          &gt;&gt;
        </button>
      </div>
      {/* You can integrate the actual days and weeks rendering logic here */}
    </div>
  );
}

export default Calendar;
