import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Listing from "@/components/dashboard/listing/Listing";
import MyCourses from "@/components/dashboard/MyCourses";
import Reviews from "@/components/dashboard/Reviews";
import Sidebar from "@/components/dashboard/Sidebar";
import { useTranslations } from "next-intl";
import ServerHeaderDashboard from "@/components/layout/headers/headerDashboard/ServerDashboardHeader";
import React from "react";
export const metadata = {
  title:
    "Dashboard-reviews || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function page() {
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
            <Reviews />
          </div>
        </div>
      </main>
    </div>
  );
}
