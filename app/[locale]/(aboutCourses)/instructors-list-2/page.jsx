import InatractorsTwo from "@/components/aboutCourses/instractors/InatractorsTwo";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterThree from "@/components/layout/footers/FooterThree";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
// import { teamMembers } from "@/data/instractors";
import PaginationTwo from "@/components/common/PaginationTwo";
import Teacher from "@/data/mongoDb/models/teacher";
import Person from "@/data/mongoDb/models/person";
import Subject from "@/data/mongoDb/models/subject";
import dbConnect from "@/data/mongoDb/utils/database";

export async function fetchTeachers() {
  await dbConnect();

  const teachers = await Teacher.find().lean();
  const teacherIds = teachers.map((teacher) => teacher._id);
  const subjects = await Subject.find().lean();

  const persons = await Person.find().lean();
  console.log("persons", persons);

  const personNames = await Person.find({
    "roles.refId": { $in: teacherIds },
  })
    .select("firstName lastName")
    .lean();
  console.log("personNames", personNames);

  const nameMap = personNames.reduce((acc, person) => {
    // Changed variable from user to person
    acc[person._id.toString()] = `${person.firstName} ${person.lastName}`; // Changed variable from user to person
    return acc;
  }, {});

  const teamMembers = teachers.map((teacher, index) => {
    let teacherName = nameMap[teacher._id.toString()];
    if (!teacherName) {
      console.warn(
        `Warning: Name not found for teacher with ID: ${teacher._id}`
      );
      teacherName = `Teacher ID: ${teacher._id}`;
    }

    // console.log("teacherName", teacherName);
    // Extract subject names
    const uniqueSubjects = new Set(
      teacher.classTaught.map((classObj) => classObj.subjectName)
    );

    // Extract subject IDs
    const subjectIds = teacher.classTaught
      .map((classObj) => classObj.subject)
      .filter((id) => id !== null && id !== undefined);

    const deduplicatedSubjectIds = Array.from(new Set(subjectIds));

    // Check if deduplicatedSubjectIds array is empty
    let finalSubjectIds =
      deduplicatedSubjectIds.length > 0 ? deduplicatedSubjectIds : null;

    return {
      id: index + 1,
      name: teacherName,
      role: "Teacher",
      image: "/assets/img/team/default.png",
      category: uniqueSubjects.size,
      students: teacher.classTaught.length,
      courses: teacher.quiz.length,
      socialProfile: teacher.socialProfiles, // Adjusted to use the structure of personSchema
      subjectId: finalSubjectIds,
    };
  });

  const lastFiveTeamMembers = teamMembers.slice(-5);

  return { teamMembers, subjects, lastFiveTeamMembers };
}

export const metadata = {
  title:
    "Instractors-list-2 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default async function page() {
  const { teamMembers, subjects } = await fetchTeachers();

  return (
    <div className="main-content  ">
      <HeaderSeven />
      <Preloader />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <InatractorsTwo
          teamMembers={teamMembers}
          subjects={subjects}
        // PaginationTwo={<PaginationTwo />}
        />
        <FooterThree />
      </div>
    </div>
  );
}
