export function getFooterLinks(foooterText) {
  return {
    footerLinks: [
      {
        title: foooterText.About,
        links: [
          { href: "/about-1", label: foooterText.AboutUs },
          { href: "/blog-list-1", label: "Learner Stories" },
          { href: "/instructor-become", label: "Careers" },
          { href: "/blog-list-1", label: "Press" },
          { href: "#", label: "Leadership" },
          { href: "/contact-1", label: foooterText.ContactUs },
        ],
      },
      {
        title: foooterText.Categories,
        links: [
          { label: foooterText.Subject1 },
          { label: foooterText.Subject2 },
          { label: foooterText.Subject3 },
          { label: foooterText.Subject4 },
          { label: foooterText.Subject5 },
          { label: foooterText.Subject7 },
          { label: foooterText.Subject8 },
        ],
      },
      {
        title: foooterText.Others,
        links: [
          { label: foooterText.Subject9 },
          { label: foooterText.Subject10 },
          { label: foooterText.Subject11 },
          { label: foooterText.Subject12 },
          { label: foooterText.Subject13 },
          { label: foooterText.Subject14 },
          { label: foooterText.Subject15 },
          { label: foooterText.Subject16 },
        ],
      },
      {
        title: foooterText.SUPPORT,
        links: [
          { label: foooterText.Weekend },
          { label: foooterText.Stem },
          { label: foooterText.Evening },
        ],
      },
    ],
  };
}
