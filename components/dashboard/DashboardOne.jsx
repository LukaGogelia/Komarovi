import { teamMembers } from "@/data/instractors";
import { notifications } from "@/data/notifications";
import React from "react";
const FooterNine = dynamic(() => import("../layout/footers/FooterNine"));
import Image from "next/image";
import Link from "next/link";
const ApplyGauge = dynamic(() => import("../ApplyGauge"));
const GradeIndicator = dynamic(() => import("../GradeIndicator"));
const QuizPerformance = dynamic(() => import("./QuizPerformance"));
import { Quiz } from "@/data/mongoDb/models/quiz";
import { Student } from "@/data/mongoDb/models/student";
import { Teacher } from "@/data/mongoDb/models/teacher";
import { QuizEntry } from "@/data/mongoDb/models";
import mongoose from "mongoose";
import dynamic from "next/dynamic";
import { GradeEntry } from "@/data/mongoDb/models/gradeEntry";
import { User } from "@/data/mongoDb/models/user";
import { PointsCommissionDecision } from "@/data/mongoDb/models/pointsCommissionDecision";
import { connectDb } from "./ConnectToDb";
import { fetchTeachers } from "@/app/[locale]/(aboutCourses)/instructors-list-2/page";
import { fetchData } from "./Reviews";
import { Attendance } from "@/data/mongoDb/models/";

export async function fetchGradesData() {
  try {
    await connectDb();

    const studentId = "64e52ffb1436edfda9379761";

    // Populate both the receivedGrade and the subject inside it
    const student = await Student.findOne({ _id: studentId })
      .populate({
        path: "receivedGrade",
        populate: {
          path: "subject",
        },
      })
      .exec();

    const pointsDecisions = await PointsCommissionDecision.find({
      _id: { $in: student.pointsCommissionDecision },
    });

    let personalPoints = 0;
    let obtainedPointsForHouse = 0;

    pointsDecisions.forEach((decision) => {
      personalPoints += Math.round(decision.pointsAwarded * 0.15);
      obtainedPointsForHouse += Math.round(decision.pointsAwarded * 0.85);
    });

    const gradeCounts = new Array(10).fill(0);
    const gradeNames = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];

    const gradeEntries = student.receivedGrade;

    if (gradeEntries && Array.isArray(gradeEntries)) {
      gradeEntries.forEach((entry) => {
        const grade = entry.grade;

        if (grade >= 1 && grade <= 10) {
          gradeCounts[10 - grade]++;
        }
      });

      const gradeList = gradeCounts.map((count, index) => ({
        name: gradeNames[9 - index],
        value: count,
      }));

      // Deduplicate subjects by name
      const uniqueSubjectNames = [
        ...new Set(gradeEntries.map((entry) => entry.subject.subject)),
      ];
      const subjectList = uniqueSubjectNames.map((subjectName) => ({
        label: subjectName,
      }));

      return {
        subjectList,
        gradeList,
        gradeEntries,
        states: [
          {
            id: 1,
            title: "Obtained house points",
            value: obtainedPointsForHouse,
            iconClass: "icon-coupon",
          },
          {
            id: 2,
            title: "personal points",
            value: personalPoints,
            iconClass: "icon-play-button",
          },
          {
            id: 3,
            title: "Total Students",
            value: 129786,
            iconClass: "icon-graduate-cap",
          },
          {
            id: 4,
            title: "Total Instructors",
            value: 22786,
            iconClass: "icon-online-learning",
          },
        ],
      };
    }
  } catch (error) {
    console.error("Error fetching grades data:", error);
    throw error;
  }
}

export async function useFetchQuizData() {
  await connectDb();

  // const mathId = await Quiz.find({ subject: "math" }, "_id");
  // const physicsId = await Quiz.find({ subject: "physics" }, "_id");
  // const extractIds = (arr) => arr.map((item) => item._id);
  // const mathArray = extractIds(mathId);
  // const physicsArray = extractIds(physicsId);
  const studentId = "64e52ffb1436edfda9379761";

  const mathList = await Student.findOne({ _id: studentId })
    .populate({
      path: "quizEntries",
      select: "openQuestionPoints closedQuestionPoints",
      populate: {
        path: "quizId", // Assuming quizId is the reference to the quiz collection
        select: "quizNumber academicYear", // Selecting only the quizNumber field
      },
    })
    .exec();

  const physicsList = await Student.findOne({ _id: studentId })
    .populate({
      path: "quizEntries",
      select: "openQuestionPoints closedQuestionPoints",
      populate: {
        path: "quizId", // Assuming quizId is the reference to the quiz collection
        select: "quizNumber academicYear", // Selecting only the quizNumber field
      },
    })
    .exec();

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

    let mathQuiz = mathList.quizEntries.find(
      (em) => em.quizId.quizNumber === i
    );
    let physicsQuiz = physicsList.quizEntries.find(
      (em) => em.quizId.quizNumber === i
    );

    if (mathQuiz) {
      obj.math =
        ((mathQuiz.openQuestionPoints + mathQuiz.closedQuestionPoints) / 100) *
        100; // Assuming total points are 100
      obj.mathYear = mathQuiz.quizId.academicYear; // Access academicYear here
    }

    if (physicsQuiz) {
      obj.physics =
        ((physicsQuiz.openQuestionPoints + physicsQuiz.closedQuestionPoints) /
          100) *
        100; // Assuming total points are 100
      obj.physicsYear = physicsQuiz.quizId.academicYear; // Access academicYear here
    }
    if (Object.keys(obj).length > 1) {
      arr.push(obj);
    }
  }

  // Return the array
  return arr;
}

export async function fetchAttendance() {
  await connectDb();

  const studentId = "64e52ffb1436edfda9379761";

  try {
    // Fetch the student by their ID
    const student = await Student.findById(studentId).exec();

    // If student doesn't exist or if they have no attendance IDs, return an empty array
    if (!student || !student.attendanceIds || !student.attendanceIds.length) {
      return [];
    }

    // Fetch the attendance records for the student using the attendanceIds
    const attendances = await Attendance.find({
      _id: { $in: student.attendanceIds },
    })
      .populate("subject")
      .exec();
    // console.log("attendance", attendances);
    return attendances;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  }
}

const getCurrentSemester = (date) => {
  const firstSemesterStart = new Date(date.getFullYear(), 8, 15); // 15 September
  const firstSemesterEnd = new Date(date.getFullYear(), 11, 29); // 29 December

  const secondSemesterStart = new Date(date.getFullYear(), 0, 15); // 15 January
  const secondSemesterEnd = new Date(date.getFullYear(), 5, 15); // 15 June

  if (date >= firstSemesterStart && date <= firstSemesterEnd) {
    return 1;
  } else if (date >= secondSemesterStart && date <= secondSemesterEnd) {
    return 2;
  } else {
    return null; // Not in any semester (e.g., during vacations)
  }
};

export default async function DashboardOne() {
  const { lastFiveDecisionsList } = await fetchData();
  const arr = await useFetchQuizData();
  const { lastFiveTeamMembers } = await fetchTeachers();
  const attendancesResult = await fetchAttendance();
  const uniqueSubjectSet = new Set(
    attendancesResult.map((item) => item.subject.subject)
  );

  // Transforming the unique subject set into the desired attendance format
  const attendances = [...uniqueSubjectSet].map((subjectName) => {
    const subjectAttendances = attendancesResult.filter(
      (item) => item.subject.subject === subjectName
    );

    const attended = subjectAttendances.filter(
      (item) => item.key === "yes"
    ).length;
    const total = subjectAttendances.length;

    // We'll use the date of the first attendance record for this subject to determine its semester.
    // This assumes that each subject has at least one attendance record.
    const semester = getCurrentSemester(new Date(subjectAttendances[0].date));

    return {
      subject: subjectName,
      attended: attended,
      total: total,
      semester: semester,
    };
  });

  const { subjectList, gradeList, gradeEntries, states } =
    await fetchGradesData();

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
  // return <></>;

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700"> Classes List </h1>
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
            className="card-container col-xl-8 col-lg-8 col-md-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
              margin: "auto",
            }}
          >
            {states.map((elm, i) => (
              <div
                key={i}
                className="responsive-card -dark-bg-dark-1 -dark-text-white"
                style={{
                  flex: "1 0 calc(50% - 30px)",
                  maxWidth: "calc(50% - 10px)",
                  minHeight: "11rem",
                  // maxWidth: "600px",
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "35px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ lineHeight: "1", fontWeight: "500" }}>
                    {elm.title}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      lineHeight: "1",
                      fontWeight: "700",
                      marginTop: "20px",
                      color: "#333",
                    }}
                    className="-dark-text-white"
                  >
                    {elm.value}
                  </div>
                </div>
                <i
                  className={`text-40 ${elm.iconClass}`}
                  style={{ color: "#9b59b6" }}
                ></i>
              </div>
            ))}
          </div>

          <ApplyGauge attendances={attendances} />
        </div>
        <div className="row y-gap-30 pt-30">
          <QuizPerformance options={options} arr={arr} />
          <div className="col-xl-4 col-md-6">
            <GradeIndicator
              subjectList={JSON.stringify(subjectList)}
              gradeList={JSON.stringify(gradeList)}
              gradeEntries={JSON.stringify(gradeEntries)}
            />

            {/* <p> {JSON.stringify(gradeEntries)} </p>
            <p> {JSON.stringify(gradeList)} </p>
            <p> {JSON.stringify(subjectList)} </p> */}
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
                  {lastFiveTeamMembers.map((elm, i) => (
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
                            <i className="icon-online-learning text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.students} Classes
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-play text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.courses} Subject
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
                  {lastFiveDecisionsList.map((decision, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      {/* <div className="shrink-0">
                        {decision.studentId && decision.studentId.avatarSrc ? (
                          <img
                            width={90}
                            height={80}
                            src={decision.studentId.avatarSrc}
                            alt="student-avatar"
                          />
                        ) : (
                          <div>No Avatar</div>
                        )}
                      </div> */}
                      <div className="ml-15">
                        {/* <h4 className="text-15 lh-16 fw-500">
                          {decision.studentId && decision.studentId.name
                            ? decision.studentId.name
                            : "No Name"}
                        </h4> */}
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="text-14 lh-1">
                            {new Date(decision.date).toLocaleDateString()}{" "}
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
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100 ">
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
