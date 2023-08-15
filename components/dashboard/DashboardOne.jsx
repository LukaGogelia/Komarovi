import { resentCourses } from "@/data/courses";
import { states } from "@/data/dashboard";
import { teamMembers } from "@/data/instractors";
import { notifications } from "@/data/notifications";
import React from "react";
import FooterNine from "../layout/footers/FooterNine";
import Charts from "./Charts";
import PieChartComponent from "./PieCharts";
import Image from "next/image";
import Link from "next/link";
import ApplyGauge from "../ApplyGauge";
import GradeIndicator from "../GradeIndicator";
import { fetchData } from "./Reviews";

export default async function DashboardOne() {
  const { lastThreeDecisions } = await fetchData();
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div
          className="row y-gap-30"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div
            className=" y-gap-30 col-lg-8 col-md-12 col-sm-12 x-gap-30"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {states.map((elm, i) => (
              <div
                key={i}
                className="responsive-card col-lg-6 col-md-8 col-sm-12 "
              >
                <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <div>
                    <div className="lh-1 fw-500">{elm.title}</div>
                    <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                      ${elm.value}
                    </div>
                    <div className="lh-1 mt-25">
                      <span className="text-purple-1">${elm.new}</span> New
                      Sales
                    </div>
                  </div>
                  <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
                </div>
              </div>
            ))}
          </div>

          <ApplyGauge />
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-8 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Earning Statistics</h2>
                <div className="">
                  <select className="select__select js-select-tag" name="name2">
                    <option value="20">20</option>
                    <option value="10">10</option>
                    <option value="73">73</option>
                    <option value="62">62</option>
                    <option value="90">90</option>
                  </select>
                </div>
              </div>
              <div className="py-40 px-30">
                <Charts />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <GradeIndicator />
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 fw-500">Popular Instructor</h2>
                <Link
                  href="/instructors-list-2"
                  className="text-14 text-purple-1 underline"
                >
                  View All
                </Link>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {teamMembers.slice(0, 5).map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <Image
                        width={40}
                        height={40}
                        className="size-40"
                        src={elm.image}
                        alt="avatar"
                      />
                      <div className="ml-10 w-1/1">
                        <h4 className="text-15 lh-1 fw-500">
                          <Link
                            className="linkCustom"
                            href={`/instructors/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                        </h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <i className="icon-message text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.reviews} Reviews
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-online-learning text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.students} Students
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-play text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.courses} Course
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Recent house points</h2>
                <Link
                  href="/dshb-reviews"
                  className="text-14 text-purple-1 underline"
                >
                  View All
                </Link>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {lastThreeDecisions.map((decision, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <div className="shrink-0">
                        <Image
                          width={90}
                          height={80}
                          src={
                            decision.studentId.avatarSrc ||
                            "/path/to/default/avatar.png"
                          }
                          alt="student-avatar"
                        />
                      </div>
                      <div className="ml-15">
                        <h4 className="text-15 lh-16 fw-500">
                          {decision.studentId.name}
                        </h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="text-14 lh-1">
                            {new Date(decision.date).toLocaleDateString()}{" "}
                            {/* Format the date */}
                          </div>
                          <div className="text-14 lh-1">
                            Points: {decision.pointsAwarded}
                          </div>
                          <div className="text-14 lh-1">
                            Status: {decision.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Notifications</h2>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {notifications.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex items-center ${
                        i != 0 ? "border-top-light" : ""
                      } `}
                    >
                      <div className="shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={elm.imageSrc}
                          alt="image"
                        />
                      </div>
                      <div className="ml-12">
                        <h4 className="text-15 lh-1 fw-500">{elm.heading}</h4>
                        <div className="text-13 lh-1 mt-10">
                          {elm.time} Hours Ago
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
