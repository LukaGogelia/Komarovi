"use client";
import React from "react";

const HamburgerIcon = ({ onClick }) => {
  return (
    <div onClick={onClick} className="pointer">
      <div
        style={{
          marginTop: "4px",
          marginBottom: "4px",
        }}
        className="hamburger-line"
      ></div>
      <div
        style={{
          marginBottom: "4px",
        }}
        className="hamburger-line"
      ></div>
      <div
        style={{
          width: "20px",
        }}
        className="hamburger-line"
      ></div>
    </div>
  );
};

export default HamburgerIcon;
