import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import Preloader from "@/components/common/Preloader";
import Sidebar from "@/components/dashboard/Sidebar";
import GradesList from "@/components/dashboard/GradesList";
import { Teacher } from "@/data/mongoDb/models";
import { connectDb } from "@/components/dashboard/ConnectToDb";

export async function fetchClasses() {
  await connectDb();

  const teacherId = "64e8d8e05ab36dd9eb96add1";

  // Fetching the teacher's data and populating both classId and subject inside classTaught
  const classData = await Teacher.findById(teacherId).populate([
    {
      path: "classTaught.classId",
      select: "parallelNumber gradeLevel academicYear",
    },
    {
      path: "classTaught.subject",
      select: "subject", // Only populate the 'subject' property from the Subject schema.
    },
  ]);

  // If no classData found, return an empty array
  if (!classData) return [];

  // Map over the classTaught array to get the desired format
  const classInfoArray = classData.classTaught.map((entry) => {
    return {
      _id: entry.classId._id,
      parallelNumber: entry.classId.parallelNumber,
      gradeLevel: entry.classId.gradeLevel,
      academicYear: entry.classId.academicYear,
      subject: entry.subject.subject, // Accessing the populated 'subject' property from the Subject schema.
    };
  });
  const updatedArray = classInfoArray.map((classInfo, index) => {
    return {
      ...classInfo,
      id: index + 1, // This makes sure the first object gets id of 1, second gets 2, and so on
    };
  });

  const options = [
    ...new Set(updatedArray.map((classInfo) => classInfo.subject)),
  ].map((subject) => {
    return {
      label: subject,
    };
  });

  return { updatedArray, options };
}

export default async function page() {
  const { updatedArray, options } = await fetchClasses();

  return (
    <>
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

              <GradesList updatedArray={updatedArray} options={options} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
