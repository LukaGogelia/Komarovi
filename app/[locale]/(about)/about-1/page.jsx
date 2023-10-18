import About from "@/components/about/About";

import Brands from "@/components/common/Brands";
import Instructors from "@/components/common/Instructors";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import TestimonialsOne from "@/components/common/TestimonialsOne";
import WhyCourse from "@/components/homes/WhyCourse";
import { useTranslations } from "next-intl";
import FooterThree from "@/components/layout/footers/FooterThree";
import Header from "@/components/layout/headers/Header";
import React from "react";

export const metadata = {
  title:
    "About-1 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page() {
  const t = useTranslations("/");

  const foooterText = {
    CallUs: t("CallUs"),
    Address: t("Address"),
    About: t("About"),
    AboutUs: t("AboutUs"),
    ContactUs: t("ContactUs"),
    Categories: t("Categories"),
    Subject1: t("Subject1"),
    Subject2: t("Subject2"),
    Subject3: t("Subject3"),
    Subject4: t("Subject4"),
    Subject5: t("Subject5"),
    Subject7: t("Subject7"),
    Subject8: t("Subject8"),
    Subject9: t("Subject9"),
    Subject10: t("Subject10"),
    Subject11: t("Subject11"),
    Subject12: t("Subject12"),
    Subject13: t("Subject13"),
    Subject14: t("Subject14"),
    Subject15: t("Subject15"),
    Subject16: t("Subject16"),
    Weekend: t("Weekend"),
    Stem: t("Stem"),
    Evening: t("Evening"),
    Projects: t("Projects"),
  };

  const testimonialsText = {
    PeopleLoveToLearnWithEducrat: t("PeopleLoveToLearnWithEducrat"),
    Lorem1: t("Lorem1"),
    studentsReported: t("studentsReported"),
    StudentsSee: t("StudentsSee"),
    note1: t("note1"),
    note2: t("note2"),
    note3: t("note3"),
    Student: t("Student"),
    Teacher: t("Teacher"),
    Principal: t("Principal"),
  };
  return (
    <div className="main-content  ">
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <About />
        <WhyCourse />

        <TestimonialsOne testimonialsText={testimonialsText} />
        <Instructors />
        <Brands />

        <FooterThree foooterText={foooterText} />
      </div>
    </div>
  );
}
