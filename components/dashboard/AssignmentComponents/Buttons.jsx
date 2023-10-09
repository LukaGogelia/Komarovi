"use client";
import React from "react";

export default function Buttons({ roles, handleButtonClick, addFamily }) {
  return (
    <div className="col-auto mb-30">
      <div className="row x-gap-10 y-gap-10 justify-content-center">
        <div className="col-auto">
          <button
            className="button -md -green-1 xl"
            onClick={() => addFamily()}
          >
            Add Family
          </button>
        </div>
        {Object.keys(roles).map((key) => (
          <div className="col-auto" key={key}>
            <button
              className="button -md -purple-3 text-purple-1"
              onClick={() => handleButtonClick(roles[key])}
            >
              {key}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AddChildButton({ handleAddChildButtonClick }) {
  return (
    <button
      className="button -md -purple-3 text-purple-1"
      onClick={() => handleAddChildButtonClick()}
    >
      Add another child
    </button>
  );
}
