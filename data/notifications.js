export function getTranslatedNotifications(dashboardText) {
  return {
    notifications: [
      {
        id: 1,
        imageSrc: "/assets/img/dashboard/actions/1.png",
        heading: dashboardText.Notification1,
        time: 1, // Assuming time is in hours as mentioned in the example
      },
      {
        id: 2,
        imageSrc: "/assets/img/dashboard/actions/2.png",
        heading: dashboardText.Notification2,
        time: 1,
      },
      {
        id: 3,
        imageSrc: "/assets/img/dashboard/actions/3.png",
        heading: dashboardText.Notification3,
        time: 1,
      },
      // {
      //   id: 4,
      //   imageSrc: "/assets/img/dashboard/actions/4.png",
      //   heading: dashboardText.Notification4,
      //   time: 1,
      // },
    ],
  };
}
