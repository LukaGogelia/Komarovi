import InatractorsTwo from "@/components/aboutCourses/instractors/InatractorsTwo";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterThree from "@/components/layout/footers/FooterThree";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
import { fetchTeachersData } from "@/data/instractors";
import PaginationTwo from "@/components/common/PaginationTwo";

export const metadata = {
  title:
    "Instractors-list-2 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default async function page() {
  const teamMembers = await fetchTeachersData();
  console.log(teamMembers);

  return <h1></h1>;

  return (
    <div className="main-content  ">
      <HeaderSeven />
      <Preloader />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <InatractorsTwo
          teamMembers={teamMembers}
          // PaginationTwo={<PaginationTwo />}
        />
        <FooterThree />
      </div>
    </div>
  );
}
