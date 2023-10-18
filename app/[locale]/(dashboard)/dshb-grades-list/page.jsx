import ServerHeaderDashboard from "@/components/layout/headers/headerDashboard/ServerDashboardHeader";
import React from "react";
import Preloader from "@/components/common/Preloader";
import Sidebar from "@/components/dashboard/Sidebar";
import GradesList from "@/components/dashboard/GradesList";
// import Teacher from "@/data/mongoDb/models/teacher";
import dbConnect from "@/data/mongoDb/utils/database";
import Teacher from "@/data/mongoDb/models/teacher";
import { useTranslations } from "next-intl";
export async function fetchClasses() {
  await dbConnect();

  const teacherId = "64e8d8e05ab36dd9eb96add1";

  // Fetching the teacher's data and populating both classId and subject inside classTaught
  const classData = await Teacher.findById(teacherId).populate([
    {
      path: "classTaught.classId",
      select: "parallelNumber gradeLevel academicYear",
    },
    {
      path: "classTaught.subject",
      model: "Subject", // Specify the model name for proper population
      select: "subject _id", // Include both 'subject' and '_id' from the Subject schema
    },
  ]);

  // If no classData found, return an empty array
  if (!classData) return [];

  console.log("entry", classData.classTaught);

  // Map over the classTaught array to get the desired format
  const classInfoArray = classData.classTaught
    .map((entry) => {
      if (!entry.classId) {
        console.error("entry.classId is null or undefined:", entry);
        return null;
      }

      return {
        _id: entry.classId._id,
        parallelNumber: entry.classId.parallelNumber,
        gradeLevel: entry.classId.gradeLevel,
        academicYear: entry.classId.academicYear,
        subjectName: entry.subject.subject, // add this line
        subjectId: entry.subject._id, // add this line if you need the id
      };
    })
    .filter(Boolean);

  const updatedArray = classInfoArray.map((classInfo, index) => {
    return {
      ...classInfo,
      id: index + 1, // This makes sure the first object gets id of 1, second gets 2, and so on
    };
  });

  const options = [
    ...new Set(updatedArray.map((classInfo) => classInfo.subjectName)),
  ].map((subjectName) => {
    return {
      label: subjectName,
    };
  });

  return { updatedArray, options };
}

export default async function page() {
  const { updatedArray, options } = await fetchClasses();

  const t = useTranslations("Dashboard");
  const dashboardText = {
    ClassesList: t("ClassesList"),
    ObtainedPoints: t("ObtainedPoints"),
    PersonalPoints: t("PersonalPoints"),
    TotalStudents: t("TotalStudents"),
    TotalInstructors: t("TotalInstructors"),
    Attendance: t("Attendance"),
    ThisWeek: t("ThisWeek"),
    QuizPerformance: t("QuizPerformance"),
    Grades: t("Grades"),
    Grade: t("Grade"),
    AverageGrade: t("AverageGrade"),
    ten: t("ten"),
    nine: t("nine"),
    eight: t("eight"),
    seven: t("seven"),
    six: t("six"),
    five: t("five"),
    four: t("four"),
    three: t("three"),
    two: t("two"),
    one: t("one"),
    Count: t("Count"),
    Subject: t("Subject"),
    Classes: t("Classes"),
    Instructors: t("Instructors"),
    RecentPoints: t("RecentPoints"),
    ViewAll: t("ViewAll"),
    Points: t("Points"),
    Status: t("Status"),
    Notification: t("Notification"),
    Notification1: t("Notification1"),
    Notification2: t("Notification2"),
    Notification3: t("Notification3"),
    Hours: t("Hours"),
    Dashboard: t("Dashboard"),
    MyCourses: t("MyCourses"),
    Bookmarks: t("Bookmarks"),
    Messages: t("Messages"),
    Reviews: t("Reviews"),
    Settings: t("Settings"),
    Administration: t("Administration"),
    Assignment: t("Assignment"),
    Calendar: t("Calendar"),
    Dictionary: t("Dictionary"),
    Quiz: t("Quiz"),
    LogOut: t("LogOut"),
    CreateCourse: t("CreateCourse"),
  };

  return (
    <>
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
                <Sidebar dashboardText={dashboardText} />
              </div>

              <GradesList updatedArray={updatedArray} options={options} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
