export function getTranslatedTestimonials(testimonialsText) {
  return {
    testimonials: [
      {
        id: 0,
        imageSrc: "/assets/img/testimonials/a1.jpg",
        name: "ივანე კვიტაშვილი",
        position: testimonialsText.Principal,
        comment: "მაგარი სკოლაა",
        description: testimonialsText.note1,
      },
      {
        id: 1,
        imageSrc: "/assets/img/testimonials/2.png",
        name: "გიორგი გედენიძე",
        position: testimonialsText.Teacher,
        comment: "Great Work",
        description: testimonialsText.note2,
      },
      {
        id: 2,
        imageSrc: "/assets/img/testimonials/3.png",
        name: "ალექსანდრე ჯეჯელავა",
        position: testimonialsText.Student,
        comment: "Great Work",
        description: testimonialsText.note3,
      },
      {
        id: 3,
        imageSrc: "/assets/img/testimonials/4.png",
        name: "Courtney Henry",
        position: "Web Designer",
        comment: "Great Work",
        description: `I think Educrat is the best theme I ever seen this year.
        Amazing design, easy to customize and a design quality
        superlative account on its cloud platform for the
        optimized performance`,
      },
    ],

    testimonialsTwo: [
      {
        id: 1,
        author: "Ali Tufan",
        position: "Product Manager, Apple Inc",
        text: "It is no exaggeration to say this Educrat experience was transformative–both professionally and personally. This workshop will long remain a high point of my life.",
      },
      {
        id: 2,
        author: "John Smith",
        position: "Marketing Director, XYZ Company",
        text: "Educrat has helped me acquire valuable skills that have greatly enhanced my career prospects. The courses are comprehensive and taught by industry experts.",
      },
      {
        id: 3,
        author: "Emily Johnson",
        position: "Freelance Graphic Designer",
        text: "I've been using Educrat for several months now, and I'm impressed by the quality of the courses. They cover a wide range of topics and are easy to follow.",
      },
      {
        id: 4,
        author: "David Brown",
        position: "Software Engineer, ABC Corporation",
        text: "I highly recommend Educrat for anyone looking to upskill or learn new technologies. The platform is user-friendly, and the instructors are knowledgeable.",
      },
      {
        id: 5,
        author: "Sarah Thompson",
        position: "Digital Marketing Specialist",
        text: "Educrat has been a game-changer for me. The courses are up-to-date and relevant, helping me stay ahead in the ever-changing field of digital marketing.",
      },
      // Add more testimonial objects as needed
    ],

    paginationImages: [
      "/assets/img/home-3/testimonials/1.png",
      "/assets/img/home-3/testimonials/2.png",
      "/assets/img/home-3/testimonials/3.png",
      "/assets/img/home-3/testimonials/4.png",
      "/assets/img/home-3/testimonials/5.png",
    ],

    testimonialsTwoFour: [
      {
        id: 1,
        image: "/assets/img/home-4/testimonials/1.png",
        rating: 4.5,
        numRatings: 1991,
        text: "I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design.",
        name: "Courtney Henry",
        profession: "Web Designer",
      },
      {
        id: 2,
        image: "/assets/img/home-4/testimonials/2.png",
        rating: 4.5,
        numRatings: 1991,
        text: "I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design.",
        name: "Courtney Henry",
        profession: "Web Designer",
      },
      {
        id: 3,
        image: "/assets/img/home-4/testimonials/3.png",
        rating: 4.5,
        numRatings: 1991,
        text: "I think Educrat is the best theme I ever seen this year. Amazing design, easy to customize and a design.",
        name: "Courtney Henry",
        profession: "Web Designer",
      },
    ],
  };
}
