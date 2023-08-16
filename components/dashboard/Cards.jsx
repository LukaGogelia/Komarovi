import React from "react";

const Cards = () => {
  return (
    <div
      className=" y-gap-30 col-lg-8 col-md-12 col-sm-12 x-gap-30"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {states.map((elm, i) => (
        <div key={i} className="responsive-card col-lg-6 col-md-8 col-sm-12 ">
          <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
            <div>
              <div className="lh-1 fw-500">{elm.title}</div>
              <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                ${elm.value}
              </div>
              <div className="lh-1 mt-25">
                <span className="text-purple-1">${elm.new}</span> New Sales
              </div>
            </div>
            <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
