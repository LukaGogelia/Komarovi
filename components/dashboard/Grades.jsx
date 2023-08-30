"use client";
import React, { useState } from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import PageLinksTwo from "../common/PageLinksTwo";
import SelectGrade from "../SelectGrade";

export default function Grades({ studentInfoArray }) {
  const [value, setValue] = useState();

  const handleRateChange = (rate) => {
    setValue(Number(rate));
  };

  return (
    <div className="dashboard__main">
      <div
        className="dashboard__content bg-light-4"
        style={{ minHeight: "80vh" }}
      >
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Grades</h1>

            <PageLinksTwo />
          </div>
        </div>

        <div className="row y-gap-30">
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
                      <div className="text-purple-1 fw-500">Email address</div>
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
                        <div className="text-purple-1 fw-500">Course total</div>
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
                        <div className="text-dark-1">{elm.email}</div>
                      </div>

                      <div className="col-xl-2">
                        <div className="d-flex justify-end">
                          <SelectGrade />
                        </div>
                      </div>

                      <div className="col-xl-2">
                        <div className="d-flex justify-end">
                          <a href="#">
                            <i className="icon-zoom-in text-20"></i>
                          </a>
                        </div>
                      </div>

                      <div className="col-xl-2">
                        <div className="d-flex justify-end">
                          <a href="#">
                            <i className="icon-zoom-in text-20"></i>
                          </a>
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
