const Preloader = dynamic(() => import("@/components/common/Preloader"));
const DashboardOne = dynamic(() =>
  import("@/components/dashboard/DashboardOne")
);
const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar"));
const HeaderDashboard = dynamic(() =>
  import("@/components/layout/headers/HeaderDashboard")
);
import dynamic from "next/dynamic";
import React from "react";

export const metadata = {
  title:
    "Dashboard || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page() {
  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <DashboardOne />
          </div>
        </div>
      </main>
    </div>
  );
}
