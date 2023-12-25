export function getTranslatedFeatures(testimonialsText) {
  // const testimonialsText = {
  //   PeopleLoveToLearnWithEducrat: t("PeopleLoveToLearnWithEducrat"),
  //   Lorem1: t("Lorem1"),
  //   studentsReported: t("studentsReported"),
  //   StudentsSee: t("StudentsSee"),
  //   note1: t("note1"),
  //   note2: t("note2"),
  //   note3: t("note3"),
  // };

  const statictis = [
    {
      id: 1,
      rating: "9/10",
      description: testimonialsText.studentsReported,
    },
    {
      id: 2,
      rating: "70%",
      description: testimonialsText.StudentsSee,
    },
  ];

  const featureOne = [
    {
      id: 1,
      title: "Hand-picked authors",
    },
    {
      id: 2,
      title: "Easy to follow curriculum",
    },
    {
      id: 3,
      title: "Free courses",
    },
    {
      id: 4,
      title: "Money-back guarantee",
    },
  ];

  const featureTwo = [
    {
      id: 1,
      imgSrc: "/assets/img/home-3/masthead/icons/1.svg",
      title: "100,000 online courses",
      description: "Explore a variety of fresh topics",
    },
    {
      id: 2,
      imgSrc: "/assets/img/home-3/masthead/icons/2.svg",
      title: "Expert instruction",
      description: "Find the right instructor for you",
    },
    {
      id: 3,
      imgSrc: "/assets/img/home-3/masthead/icons/3.svg",
      title: "Lifetime access",
      description: "Learn on your schedule",
    },
  ];

  const featureSix = [
    {
      id: 1,
      imageSrc: "/assets/img/home-6/hero/icons/1.svg",
      text: "Over 12 million students",
    },
    {
      id: 2,
      imageSrc: "/assets/img/home-6/hero/icons/2.svg",
      text: "More than 60,000 courses",
    },
    {
      id: 3,
      imageSrc: "/assets/img/home-6/hero/icons/3.svg",
      text: "Learn anything online",
    },
  ];

  const teachingFeatures = [
    {
      id: 1,
      title: "Last Education of Bachelor Degree",
    },
    {
      id: 2,
      title: "More Than 15 Years Experience",
    },
    {
      id: 3,
      title: "12 Education Award Winning",
    },
  ];

  const featuresEight = [
    {
      id: 1,
      icon: "/assets/img/home-8/what/icons/1.svg",
      title: "Industry expert teachers",
      text: "Lorem ipsum dolor sit amet, consectetur dolorili adipiscing elit. Felis donec massa aliquam id dolor .",
      delay: 2,
    },
    {
      id: 2,
      icon: "/assets/img/home-8/what/icons/2.svg",
      title: "Up-to-date course content",
      text: "Lorem ipsum dolor sit amet, consectetur dolorili adipiscing elit. Felis donec massa aliquam id dolor .",
      delay: 3,
    },
    {
      id: 3,
      icon: "/assets/img/home-8/what/icons/3.svg",
      title: "Students community",
      text: "Lorem ipsum dolor sit amet, consectetur dolorili adipiscing elit. Felis donec massa aliquam id dolor .",
      delay: 4,
    },
  ];

  const statictisEight = [
    {
      id: 1,
      score: "9/10",
      text: "Overall courses satisfaction score",
      className: "-el-1",
    },
    {
      id: 2,
      score: "10K+",
      text: "Happy Students Worldwide",
      className: "-el-2",
    },
    {
      id: 3,
      score: "96%",
      text: "Completition Rate On All Courses",
      className: "-el-3",
    },
  ];

  return {
    statictis,
    featureOne,
    featureTwo,
    featureSix,
    teachingFeatures,
    featuresEight,
    statictisEight,
  };
}

export const featureOne = [
  {
    id: 1,
    title: "Hand-picked authors",
  },
  {
    id: 2,
    title: "Easy to follow curriculum",
  },
  {
    id: 3,
    title: "Free courses",
  },
  {
    id: 4,
    title: "Money-back guarantee",
  },
];
