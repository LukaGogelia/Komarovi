import Preloader from "@/components/common/Preloader";
import Assignment from "@/components/dashboard/Assignment";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/Sidebar";
import { getCurrentClassesByYear } from "@/data/mongoDb/currentClasses";
import ServerHeaderDashboard from "@/components/layout/headers/headerDashboard/ServerDashboardHeader";

import React from "react";

export const metadata = {
  title:
    "Dashboard-assignment || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

const getCurrentAcademicYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // If before August (0-based month index: January is 0, December is 11)
  if (currentDate.getMonth() < 9) {
    return `${currentYear - 1}-${currentYear}`;
  } else {
    return `${currentYear}-${currentYear + 1}`;
  }
};

export default async function page() {
  const currentClasses = await getCurrentClassesByYear(
    getCurrentAcademicYear()
  );

  return (
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
            <Assignment currentClasses={JSON.stringify(currentClasses)} />
          </div>
        </div>
      </main>
    </div>
  );
}
