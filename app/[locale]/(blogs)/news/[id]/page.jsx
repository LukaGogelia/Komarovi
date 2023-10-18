import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import PageLinks from "@/components/common/PageLinks";
import ServerMenu from "@/components/layout/component/ServerMenu";
import FooterThree from "@/components/layout/footers/FooterThree";
import Header from "@/components/layout/headers/Header";

import { useTranslations } from "next-intl";
import React from "react";
import BlogDetails from "@/components/blogs/BlogDetails";
import Preloader from "@/components/common/Preloader";

export const metadata = {
  title:
    "Blog-details || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page({ params }) {
  const t = useTranslations("/");
  const foooterText = {
    CallUs: t("CallUs"),
    Address: t("Address"),
    About: t("About"),
    AboutUs: t("AboutUs"),
    ContactUs: t("ContactUs"),
    Categories: t("Categories"),
    Subject1: t("Subject1"),
    Subject2: t("Subject2"),
    Subject3: t("Subject3"),
    Subject4: t("Subject4"),
    Subject5: t("Subject5"),
    Subject7: t("Subject7"),
    Subject8: t("Subject8"),
    Subject9: t("Subject9"),
    Subject10: t("Subject10"),
    Subject11: t("Subject11"),
    Subject12: t("Subject12"),
    Subject13: t("Subject13"),
    Subject14: t("Subject14"),
    Subject15: t("Subject15"),
    Subject16: t("Subject16"),
    Weekend: t("Weekend"),
    Stem: t("Stem"),
    Evening: t("Evening"),
    Projects: t("Projects"),
  };
  return (
    <div className="main-content  ">
      <Preloader />

      <Header><ServerMenu allClasses={"menu__nav text-white -is-active"} /></Header>
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <BlogDetails id={params.id} key={params.id} />

        <RelatedBlogs />

        <FooterThree foooterText={foooterText} />
      </div>
    </div>
  );
}
