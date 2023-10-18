import ServerHomeHero from "@/components/homes/heros/ServerHomeHero";
import dynamic from "next/dynamic";

const Statictis = dynamic(() =>
  import("@/components/homes/Statistics/Statictis")
);
const BrandsTwo = dynamic(() => import("@/components/homes/brands/BrandsTwo"));
const EventsSeven = dynamic(() =>
  import("@/components/homes/events/EventsSeven")
);
const HeroSeven = dynamic(() => import("@/components/homes/heros/HeroSeven"));

const Pricing = dynamic(() => import("@/components/common/Pricing"));
const TestimonialsSix = dynamic(() =>
  import("@/components/homes/testimonials/TestimonialsSix")
);
const FooterThree = dynamic(() =>
  import("@/components/layout/footers/FooterThree")
);
const HeaderSeven = dynamic(() =>
  import("@/components/layout/headers/HeaderSeven")
);
import React from "react";
const Preloader = dynamic(() => import("@/components/common/Preloader"));
const HomeHero = dynamic(() => import("@/components/homes/heros/HomeHero"));
const CoursesSlider = dynamic(() =>
  import("@/components/homes/courses/CoursesSlider")
);
export const metadata = {
  title:
    "Home-7 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page({ params: { locale } }) {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderSeven locale={locale} />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroSeven />
        <TestimonialsSix />
        <Statictis />

        <CoursesSlider />

        <EventsSeven />
        <Pricing />
        <ServerHomeHero />
        <div
          style={{ backgroundColor: "white", height: "4rem", width: "100%" }}
        />
        <BrandsTwo />
        <FooterThree />
      </div>
    </div>
  );
}
