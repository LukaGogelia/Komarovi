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

async function fetchStudentInfo(classId, subjectName, subjectId) {
  // 1. Fetch the associated timetable ID for the class
  const currentClass = await CurrentClass.findById(classId).lean();
  const timetableId = currentClass.timeTableId;

  // 2. Fetch the timetable details
  const timeTableInfo = await TimeTable.findById(timetableId).lean();

  const studentsInClass = await Student.find({ classIds: classId }).populate(
    "userId"
  );

  const studentInfoArray = studentsInClass
    .map((student) => {
      if (student.userId) {
        return {
          studentId: student._id,
          fullName: `${student.userId.firstName} ${student.userId.lastName}`,
          email: student.userId.email,
          subjectName: subjectName,
          subjectId: subjectId,
          timeTable: {
            day: timeTableInfo.day,
            date: timeTableInfo.date,
            lessons: timeTableInfo.lessons.map((lesson) => ({
              subject: lesson.subject, // Assuming each lesson has a 'subject' field
              timeSlot: lesson.timeSlot, // Assuming each lesson has a 'timeSlot' field
            })),
          },
        };
      } else {
        return null;
      }
    })
    .filter((info) => info !== null);

  return studentInfoArray;
}

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
