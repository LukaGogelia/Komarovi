import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import ServerMenu from "@/components/layout/component/ServerMenu";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import ServerLoginForm from "@/components/others/ServerLoginForm";
import Terms from "@/components/terms/Terms";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
export const metadata = {
  title:
    "Login || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  console.log("andrew");
  if (session) console.log("tate");

  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderAuth><ServerMenu allClasses={"menu__nav text-dark-1 -is-active"} /></HeaderAuth >
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <ServerLoginForm />
        </section>
      </div>
    </div>
  );
}
