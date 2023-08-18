import dynamic from "next/dynamic";

import FindCourse from "@/components/homes/FindCourse";
import LearningJourney from "@/components/common/LearningJourney";
import LearningPathSeven from "@/components/homes/LearningPath/LearningPathSeven";

const Statictis = dynamic(() =>
  import("@/components/homes/Statistics/Statictis")
);
import CategoriesSeven from "@/components/homes/categories/CategoriesSeven";
const BrandsTwo = dynamic(() => import("@/components/homes/brands/BrandsTwo"));
const EventsSeven = dynamic(() =>
  import("@/components/homes/events/EventsSeven")
);
const HeroSeven = dynamic(() => import("@/components/homes/heros/HeroSeven"));
import SkillsOne from "@/components/homes/skills/SkillsOne";
import Pricing from "@/components/common/Pricing";
import TestimonialsSix from "@/components/homes/testimonials/TestimonialsSix";
import FooterThree from "@/components/layout/footers/FooterThree";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import React from "react";
import Preloader from "@/components/common/Preloader";
import HomeHero from "@/components/homes/heros/HomeHero";
import CoursesSlider from "@/components/homes/courses/CoursesSlider";
export const metadata = {
  title:
    "Home-7 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderSeven />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroSeven />
        <TestimonialsSix />
        <Statictis />

        <CoursesSlider />

        <EventsSeven />
        <Pricing />
        <HomeHero />
        <div
          style={{ backgroundColor: "white", height: "4rem", width: "100%" }}
        />
        <BrandsTwo />
        <FooterThree />
      </div>
    </div>
  );
}
