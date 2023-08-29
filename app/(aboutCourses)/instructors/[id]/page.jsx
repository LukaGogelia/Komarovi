import InstractorSingle from "@/components/aboutCourses/instractors/InstractorSingle";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import FooterThree from "@/components/layout/footers/FooterThree";
import Header from "@/components/layout/headers/Header";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";

export const metadata = {
  title:
    "Instractors-single || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader />
      <HeaderSeven />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <InstractorSingle id={params.id} />
        <FooterThree />
      </div>
    </div>
  );
}
