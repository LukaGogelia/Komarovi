import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import EventsOne from "@/components/events/EventsOne";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import FooterThree from "@/components/layout/footers/FooterThree";
import React from "react";
export const metadata = {
  title:
    "Event-list-1 || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />

      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <EventsOne />
        <FooterThree />
      </div>
    </div>
  );
}
