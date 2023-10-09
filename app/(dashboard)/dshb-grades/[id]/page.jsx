import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Grades from "@/components/dashboard/Grades";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import { fetchClasses } from "../../dshb-grades-list/page";
import { Student } from "@/data/mongoDb/models";
import { connectDb } from "@/components/dashboard/ConnectToDb";
import { CurrentClass } from "@/data/mongoDb/models";
import { TimeTable } from "@/data/mongoDb/models";
import { ObjectId } from "mongodb";

// Utility functions:

function countLessonsUpToDate(timeTable, subject, targetDate) {
  return timeTable.lessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    return (
      lessonDate <= targetDate && lesson.subject._id.toString() === subject
    );
  }).length;
}
const fetchStudentInfo = async (classId, subjectName, subjectId) => {
  // 1. Fetch the associated timetable IDs for the class
  const currentClass = await CurrentClass.findById(classId).lean();
  const timetableIds = currentClass.timeTableIds;

  if (!timetableIds || timetableIds.length === 0) {
    throw new Error("No timetables associated with this class.");
  }

  // 2. Fetch the timetable details for all associated timetables
  const timeTables = await TimeTable.find({ _id: { $in: timetableIds } })
    .populate({
      path: "lessons.subject",
      model: "Subject",
      select: "subject",
    })
    .populate({
      path: "lessons.timeSlotId",
      model: "TimeSlot",
      select: "time",
    })
    .lean();

  // Debugging output
  console.log("Fetched timeTables:", timeTables);

  for (const timeTable of timeTables) {
    for (const lesson of timeTable.lessons) {
      if (!lesson.subject) {
        console.error(`Missing subject for lesson:`, lesson);
      }
    }
  }

  const studentsInClass = await Student.find({ classIds: classId }).populate(
    "userId"
  );
  const today = new Date();

  const studentInfoArray = studentsInClass.map((student) => {
    if (!student.userId) return null;

    const studentTimeTables = timeTables.map((timeTableInfo) => ({
      day: timeTableInfo.day,
      lessons: timeTableInfo.lessons.map((lesson) => ({
        subject: lesson.subject?.subject || "Unknown Subject",
        timeSlot: lesson.timeSlotId?.time || "Unknown TimeSlot",
      })),
      lessonsUntilToday: countLessonsUpToDate(timeTableInfo, subjectId, today),
    }));

    return {
      studentId: student._id,
      fullName: `${student.userId.firstName} ${student.userId.lastName}`,
      email: student.userId.email,
      subjectName: subjectName,
      subjectId: subjectId,
      timeTables: studentTimeTables,
    };
  });

  return studentInfoArray.filter((info) => info !== null);
};

export const metadata = {
  title:
    "Dashboard-grades || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default async function page({ params }) {
  const { updatedArray } = await fetchClasses();

  // Find the matching class object based on the provided id from params
  const classObj = updatedArray.find(
    (item) => String(item.id) === String(params.id)
  );

  // If no matching class is found, throw an error or handle it as needed
  if (!classObj) {
    throw new Error(`No class found with ID: ${params.id}`);
  }

  // Extract the class ID from the found class object
  const classId = classObj._id;

  // Fetch student information based on the class's details
  const studentInfoArray = await fetchStudentInfo(
    classId,
    classObj.subject,
    classObj.subjectId
  );

  // if (studentInfoArray && studentInfoArray.length > 0) {
  //   console.log(studentInfoArray[0].timeTables[0]);
  // }

  // return <></>;

  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <Grades studentInfoArray={studentInfoArray} />
          </div>
        </div>
      </main>
    </div>
  );
}
