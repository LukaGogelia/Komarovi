import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Grades from "@/components/dashboard/Grades";
import Sidebar from "@/components/dashboard/Sidebar";
import ServerHeaderDashboard from "@/components/layout/headers/headerDashboard/ServerDashboardHeader";
import React from "react";
import Subject from "@/data/mongoDb/models/subject";
import { fetchClasses } from "../../dshb-grades-list/page";
import Student from "@/data/mongoDb/models/student";
import CurrentClass from "@/data/mongoDb/models/currentClass";
import TimeTable from "@/data/mongoDb/models/timeTable";
import Person from "@/data/mongoDb/models/person";
import TimeSlot from "@/data/mongoDb/models/timeSlot";
import { useTranslations } from "next-intl";
// Utility functions:

function countLessonsUpToDate(timeTable, subject, targetDate) {
  return timeTable.lessons.filter((lesson) => {
    const lessonDate = new Date(lesson.date);
    return (
      lessonDate <= targetDate && lesson.subject._id.toString() === subject
    );
  }).length;
}
const fetchStudentInfo = async (classId, _, subjectId) => {
  // _ represents an unused parameter
  // Fetch the subject name using subjectId
  const subjectDoc = await Subject.findById(subjectId).lean();
  console.log("Fetched Subject Document:", subjectDoc);

  if (!subjectDoc) {
    throw new Error(
      `No subject found for the provided subjectId: ${subjectId}`
    );
  }
  const actualSubjectName = subjectDoc.subject || "Unknown Subject";

  // Fetch the associated timetable IDs for the class
  const currentClass = await CurrentClass.findById(classId).lean();
  const timetableIds = currentClass.timeTableIds;
  if (!timetableIds || timetableIds.length === 0) {
    throw new Error("No timetables associated with this class.");
  }

  // Fetch timetable details for associated timetables
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

  // Error handling for missing subjects
  for (const timeTable of timeTables) {
    for (const lesson of timeTable.lessons) {
      if (!lesson.subject) {
        console.error(`Missing subject for lesson:`, lesson);
      }
    }
  }

  // Fetch all students associated with the classId
  const students = await Student.find({ classIds: classId });
  const studentIds = students.map((student) => student._id);

  // Fetch persons with role type 'Student'
  const studentsInClass = await Person.find({
    roles: {
      $elemMatch: {
        roleType: "Student",
        refId: { $in: studentIds },
      },
    },
  });

  const today = new Date();

  const studentInfoArray = studentsInClass.map((student) => {
    const studentTimeTables = timeTables.map((timeTableInfo) => ({
      day: timeTableInfo.day,
      lessons: timeTableInfo.lessons.map((lesson) => ({
        subject: lesson.subject?.subject || "Unknown Subject",
        timeSlot: lesson.timeSlotId?.time || "Unknown TimeSlot",
      })),
      lessonsUntilToday: countLessonsUpToDate(timeTableInfo, subjectId, today),
    }));
    const studentRole = student.roles.find(
      (role) => role.roleType === "Student"
    );
    const studentRefId = studentRole ? studentRole.refId : undefined;

    return {
      studentId: studentRefId,
      fullName: `${student.firstName} ${student.lastName}`,
      email: student.email,
      subjectName: actualSubjectName, // Use the fetched subject name
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

  console.log("student info array", studentInfoArray);

  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <ServerHeaderDashboard />
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
