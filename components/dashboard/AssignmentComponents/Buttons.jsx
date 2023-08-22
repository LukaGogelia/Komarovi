import React, { useState } from "react";

export default function Buttons({ roles, handleButtonClick, addFamily }) {
  const [numChildren, setNumChildren] = useState(0); // Default value

  const increaseChildren = () => {
    if (numChildren < 17) {
      setNumChildren((prevCount) => prevCount + 1);
    }
  };

  const decreaseChildren = () => {
    if (numChildren > 0) {
      setNumChildren((prevCount) => prevCount - 1);
    }
  };

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

          {/* Controls and Display for Number of Children */}
          <div
            style={{
              display: "inline-flex",
              marginLeft: "10px",
              alignItems: "center",
            }}
          >
            <button onClick={decreaseChildren} disabled={numChildren === 0}>
              -
            </button>
            <div style={{ padding: "0 15px" }}>
              {numChildren} Child{numChildren !== 1 ? "ren" : ""}
            </div>
            <button onClick={increaseChildren} disabled={numChildren === 17}>
              +
            </button>
          </div>
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
