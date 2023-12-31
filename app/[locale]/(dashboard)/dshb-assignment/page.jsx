import Preloader from "@/components/common/Preloader";
import Assignment from "@/components/dashboard/Assignment";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/Sidebar";
import { getCurrentClassesByYear } from "@/data/mongoDb/currentClasses";
import ServerHeaderDashboard from "@/components/layout/headers/headerDashboard/ServerDashboardHeader";
import { useTranslations } from "next-intl";
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

  const t = useTranslations("Dashboard");
  const dashboardText = {
    ClassesList: t("ClassesList"),
    ObtainedPoints: t("ObtainedPoints"),
    PersonalPoints: t("PersonalPoints"),
    TotalStudents: t("TotalStudents"),
    TotalInstructors: t("TotalInstructors"),
    Attendance: t("Attendance"),
    ThisWeek: t("ThisWeek"),
    QuizPerformance: t("QuizPerformance"),
    Grades: t("Grades"),
    Grade: t("Grade"),
    AverageGrade: t("AverageGrade"),
    ten: t("ten"),
    nine: t("nine"),
    eight: t("eight"),
    seven: t("seven"),
    six: t("six"),
    five: t("five"),
    four: t("four"),
    three: t("three"),
    two: t("two"),
    one: t("one"),
    Count: t("Count"),
    Subject: t("Subject"),
    Classes: t("Classes"),
    Instructors: t("Instructors"),
    RecentPoints: t("RecentPoints"),
    ViewAll: t("ViewAll"),
    Points: t("Points"),
    Status: t("Status"),
    Notification: t("Notification"),
    Notification1: t("Notification1"),
    Notification2: t("Notification2"),
    Notification3: t("Notification3"),
    Hours: t("Hours"),
    Dashboard: t("Dashboard"),
    MyCourses: t("MyCourses"),
    Bookmarks: t("Bookmarks"),
    Messages: t("Messages"),
    Reviews: t("Reviews"),
    Settings: t("Settings"),
    Administration: t("Administration"),
    Assignment: t("Assignment"),
    Calendar: t("Calendar"),
    Dictionary: t("Dictionary"),
    Quiz: t("Quiz"),
    LogOut: t("LogOut"),
    CreateCourse: t("CreateCourse"),
  };

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
              <Sidebar dashboardText={dashboardText} />
            </div>
            <Assignment currentClasses={JSON.stringify(currentClasses)} />
          </div>
        </div>
      </main>
    </div>
  );
}
