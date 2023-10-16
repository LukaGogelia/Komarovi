import ServerHeaderDashboard from "@/components/layout/headers/headerDashboard/ServerDashboardHeader";
import React from "react";
import Preloader from "@/components/common/Preloader";
import Sidebar from "@/components/dashboard/Sidebar";
import GradesList from "@/components/dashboard/GradesList";
// import Teacher from "@/data/mongoDb/models/teacher";
import dbConnect from "@/data/mongoDb/utils/database";
import Teacher from "@/data/mongoDb/models/teacher";
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
