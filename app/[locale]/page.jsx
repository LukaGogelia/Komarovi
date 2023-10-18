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
import { useTranslations } from "next-intl";
import BlogsFive from "@/components/homes/blogs/BlogsFive";
export const metadata = {
  title:
    "Home-7 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};


export default function page() {
  const t = useTranslations("/");
  const heroText = {
    Explore: t("Explore"),
    Home: t("Home"),
    Courses: t("Courses"),
    Events: t("Events"),
    News: t("News"),
    Contact: t("Contact"),
    LogIn: t("LogIn"),
    BuildDataSkills: t("BuildDataSkills"),
    Online: t("Online"),
    DataDrivesEverything: t("DataDrivesEverything"),
    JoinForFree: t("JoinForFree"),
    FindCourses: t("FindCourses"),
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

  const statisticsText = {
    Proud: t("Proud"),
    ProudUnder: t("ProudUnder"),
    AllStudents: t("AllStudents"),
    ExistingStudents: t("ExistingStudents"),
    GoldMedal: t("GoldMedal"),
    StudentsCommunity: t("StudentsCommunity"),
  };

  const coursesSliderText = {
    TopCourses: t("TopCourses"),
    AllCourses: t("AllCourses"),
  };
  const eventsText = {
    UpcomingEvents: t("UpcomingEvents"),
    BrowseEvents: t("BrowseEvents"),
  };

  const pricingText = {
    SimplePricing: t("SimplePricing"),
    Monthly: t("Monthly"),
    Annually: t("Annually"),
    Save: t("Save"),
    Basic: t("Basic"),
    Free: t("Free"),
    PerMonth: t("PerMonth"),
    Professional: t("Professional"),
    PerYear: t("PerYear"),
    Business: t("Business"),
    School1: t("School1"),
    School2: t("School2"),
    School3: t("School3"),
    School4: t("School4"),
    School5: t("School5"),
  };

  const homeHeroText = {
    Clubs: t("Clubs"),
    ClubsUnder: t("ClubsUnder"),
  };
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

export default function page({ params: { locale } }) {

  return (
    <div className="main-content">
      <Preloader />
      <HeaderSeven locale={locale} />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <HeroSeven heroText={heroText} />
        <TestimonialsSix testimonialsText={testimonialsText} />
        <Statictis statisticsText={statisticsText} />

        <BlogsFive coursesSliderText={coursesSliderText} />


        <EventsSeven eventsText={eventsText} />
        <Pricing pricingText={pricingText} />
        <HomeHero homeHeroText={homeHeroText} />

        <div
          style={{ backgroundColor: "white", height: "4rem", width: "100%" }}
        />
        <BrandsTwo />
        <FooterThree foooterText={foooterText} />
      </div>
    </div>
  );
}
