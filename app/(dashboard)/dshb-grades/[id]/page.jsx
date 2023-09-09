import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Grades from "@/components/dashboard/Grades";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import { fetchClasses } from "../../dshb-grades-list/page";
import { Student } from "@/data/mongoDb/models";
import { connectDb } from "@/components/dashboard/ConnectToDb";

async function fetchStudentInfo(classId, subjectName, subjectId) {
  const studentsInClass = await Student.find({ classIds: classId }).populate(
    "userId"
  );

  // Map to extract required student information
  const studentInfoArray = studentsInClass
    .map((student) => {
      // Check if student has an associated user
      if (student.userId) {
        return {
          studentId: student._id, // Include student's ID
          fullName: `${student.userId.firstName} ${student.userId.lastName}`, // Concatenating firstName and lastName
          email: student.userId.email, // Access user's email
          subjectName: subjectName, // Include the subject's name
          subjectId: subjectId, // Include the subject's ID
        };
      } else {
        return null;
      }
    })
    .filter((info) => info !== null);
  // Filter out any null values

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
  const classObj = updatedArray.find((item) => item.id === parseInt(params.id));
  const classId = classObj._id;

  // Assuming fetchStudentInfo has been updated accordingly
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
