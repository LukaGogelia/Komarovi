export function getTranslatedSideBarItems(dashboardText) {
  return {
    sidebarItems: [
      {
        id: 1,
        href: "/dashboard",
        iconClass: "text-20 icon-discovery",
        text: dashboardText?.Dashboard || "Dashboard",
      },
      {
        id: 2,
        href: "/dshb-courses",
        iconClass: "text-20 icon-play-button",
        text: dashboardText?.MyCourses || "Events",
      },

      {
        id: 3,
        href: "/dshb-bookmarks",
        iconClass: "text-20 icon-bookmark",
        text: dashboardText?.Bookmarks || "Bookmarks",
      },
      {
        id: 4,
        href: "/dshb-messages",
        iconClass: "text-20 icon-message",
        text: dashboardText?.Messages || "Messages",
      },
      {
        id: 5,
        href: "/dshb-listing",
        iconClass: "text-20 icon-list",
        text: dashboardText?.CreateCourse || "Write a post",
      },
      {
        id: 6,
        href: "/dshb-reviews",
        iconClass: "text-20 icon-comment",
        text: dashboardText?.Reviews || "Reviews",
      },
      {
        id: 7,
        href: "/dshb-settings",
        iconClass: "text-20 icon-setting",
        text: dashboardText?.Settings || "Settings",
      },

      {
        id: 9,
        href: "/dshb-administration",
        text: dashboardText?.Administration || "Administration",
        iconClass: "text-20 icon-person-2",
      },
      {
        id: 10,
        href: "/dshb-assignment",
        text: dashboardText?.Assignment || "Assignment",
        iconClass: "text-20 icon-edit",
      },
      {
        id: 11,
        href: "/dshb-calendar",
        text: dashboardText?.Calendar || "Calendar",
        iconClass: "text-20 icon-calendar",
      },
      // {
      //   id: 12,
      //   href: "/dshb-dashboard",
      //   text: "Single Dashboard",
      //   iconClass: "text-20 icon-discovery",
      // },
      {
        id: 13,
        href: "/dshb-dictionary",
        text: dashboardText?.Dictionary || "Dictionary",
        iconClass: "text-20 icon-book",
      },
      // {
      //   id: 14,
      //   href: "/dshb-forums",
      //   text: "Forums",
      //   iconClass: "text-20 icon-access",
      // },
      {
        id: 15,
        href: "/dshb-grades-list",
        text: dashboardText?.Grades || "Grades",
        iconClass: "text-20 icon-badge",
      },
      // {
      //   id: 16,
      //   href: "/dshb-messages",
      //   text: "Messages",
      //   iconClass: "text-20 icon-message",
      // },
      // {
      //   id: 17,
      //   href: "/dshb-participants",
      //   text: "Participants",
      //   iconClass: "text-20 icon-person-3",
      // },
      {
        id: 18,
        href: "/dshb-quiz",
        text: dashboardText?.Quiz || "Quiz",
        iconClass: "text-20 icon-time-management",
      },
      // {
      //   id: 19,
      //   href: "/dshb-survey",
      //   text: "Survey",
      //   iconClass: "text-20 icon-list",
      // },
      {
        id: 8,
        href: "/api/auth/signout",
        iconClass: "text-20 icon-power",
        text: dashboardText?.LogOut || "Log Out",
      },
    ],
  };
}
