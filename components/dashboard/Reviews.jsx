import React from "react";
import mongoose from "mongoose";
import { PointsCommissionDecision } from "../../data/mongoDb/models.js";
import Star from "../common/Star";
import Image from "next/image";

export async function fetchData() {
  // Consider moving the connection logic outside this function so that
  // you don't connect every time you fetch data
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const decisionsList = await PointsCommissionDecision.find().populate(
    "studentId"
  );
  const lastThreeDecisions = decisionsList.slice(-5);
  return { decisionsList, lastThreeDecisions };
}

export default async function DecisionsDisplay() {
  const { decisionsList, lastThreeDecisions } = await fetchData();

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Reviews</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">All Reviews</h2>
              </div>

              <div className="py-30 px-30">
                <div className="row y-gap-30">
                  {decisionsList.map((decision, i) => (
                    <div key={i} className="md:direction-column">
                      <div
                        className={`d-flex ${
                          i != 0 ? "border-top-light" : ""
                        }  pt-30`}
                      >
                        <div className="mr-20">
                          {/* Assuming the `studentId` is a reference and has an avatarSrc, 
                 you would need to populate and destructure the student data. 
                 This is a placeholder. */}
                          <Image
                            width={60}
                            height={60}
                            src={
                              decision.studentId.avatarSrc ||
                              "/path/to/default/avatar.png"
                            }
                            alt="student-avatar"
                          />
                        </div>

                        <div className="comments__body md:mt-15">
                          <div className="comments__header">
                            <h4 className="text-17 fw-500 lh-15">
                              {decision.studentId.name}{" "}
                              {/* Assuming studentId is populated with student details */}
                              <span className="text-13 text-light-1 fw-400 ml-5">
                                {new Date(decision.date).toLocaleDateString()}{" "}
                                {/* Format the date */}
                              </span>
                            </h4>

                            <div className="d-flex x-gap-5 items-center mt-15">
                              <Star star={decision.pointsAwarded} />
                            </div>
                          </div>

                          <h5 className="text-15 fw-500 mt-15">Good Deed</h5>
                          <div className="comments__text mt-10">
                            <p>{decision.description}</p>
                          </div>

                          <div className="comments__helpful mt-20">
                            <button className="button text-13 -sm -light-7 -dark-button-dark-2 text-purple-1">
                              Status: {decision.status}
                            </button>
                          </div>
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
    </div>
  );
}
