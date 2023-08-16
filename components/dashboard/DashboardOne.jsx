import { states } from "@/data/dashboard";
import { teamMembers } from "@/data/instractors";
import { notifications } from "@/data/notifications";
import React from "react";
import FooterNine from "../layout/footers/FooterNine";
import Image from "next/image";
import Link from "next/link";
import ApplyGauge from "../ApplyGauge";
import GradeIndicator from "../GradeIndicator";
import { fetchData } from "./Reviews";
import QuizPerformance from "./QuizPerformance";
import { Quiz } from "@/data/mongoDb/models";
import { QuizEntry } from "@/data/mongoDb/models";
import mongoose from "mongoose";
import Cards from "./Cards";

export async function useFetchQuizData() {
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mathId = await Quiz.find({ subject: "math" }, "_id");
  const physicsId = await Quiz.find({ subject: "physics" }, "_id");
  const extractIds = (arr) => arr.map((item) => item._id);
  const mathArray = extractIds(mathId);
  const physicsArray = extractIds(physicsId);

  const mathList = await QuizEntry.find({
    studentId: "64db5e53c84450e9247d9940",
    quizId: { $in: mathArray },
  }).populate({
    path: "quizId",
    select: "totalPoints quizNumber academicYear", // Add date here
  });

  const physicsList = await QuizEntry.find({
    studentId: "64db5e53c84450e9247d9940",
    quizId: { $in: physicsArray },
  }).populate({
    path: "quizId",
    select: "totalPoints quizNumber academicYear", // Add date here
  });
  // Calculate the percentage for math
  const mathPercentage = mathList.map(
    (Quiz) => (Quiz.totalPoints / Quiz.quizId.totalPoints) * 100
  );

  const physicsPercentage = physicsList.map(
    (Quiz) => (Quiz.totalPoints / Quiz.quizId.totalPoints) * 100
  );

  //   console.log(mathPercentage);
  //   console.log(physicsPercentage);

  mongoose.disconnect();

  const arr = [];
  const names = [
    "Quiz 1",
    "Quiz 2",
    "Quiz 3",
    "Quiz 4",
    "Quiz 5",
    "Quiz 6",
    "Quiz 7",
    "Quiz 8",
    "Quiz 9",
    "Quiz 10",
  ]; // Replace with the appropriate names

  for (let i = 1; i < 11; i++) {
    let obj = { name: names[i - 1] };
    let mathQuiz = mathList.find((em) => em.quizId.quizNumber === i);
    if (mathQuiz) {
      obj.math = (mathQuiz.totalPoints / mathQuiz.quizId.totalPoints) * 100;
      obj.mathYear = mathQuiz.quizId.academicYear; // Add date here
    }
    let physicsQuiz = physicsList.find((em) => em.quizId.quizNumber === i);
    if (physicsQuiz) {
      obj.physics =
        (physicsQuiz.totalPoints / physicsQuiz.quizId.totalPoints) * 100;
      obj.physicsYear = physicsQuiz.quizId.academicYear; // Add date here
    }

    if (Object.keys(obj).length > 1) {
      arr.push(obj);
    }
  }

  return arr;
}
export default async function DashboardOne() {
  const { lastThreeDecisions } = await fetchData();
  const arr = await useFetchQuizData();

  const academicYearsSet = new Set();
  arr.forEach((item) => {
    academicYearsSet.add(item.mathYear);
    academicYearsSet.add(item.physicsYear);
  });

  // Convert the set to an array and create the options array
  const options = Array.from(academicYearsSet).map((year) => {
    return { label: year };
  });

  options.push({ label: "All" });

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
          <Cards />

          <ApplyGauge />
        </div>
        <div className="row y-gap-30 pt-30">
          <QuizPerformance options={options} arr={arr} />
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
                          src={decision.studentId.avatarSrc}
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
