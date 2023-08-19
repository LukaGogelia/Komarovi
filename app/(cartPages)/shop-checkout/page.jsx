import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import ShopCheckOut from "@/components/cartsAndCheckout/ShopCheckOut";
import React from "react";
import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import FooterThree from "@/components/layout/footers/FooterThree";
export const metadata = {
  title:
    "Shop-checkout || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <ShopCheckOut />

        <FooterThree />
      </div>
    </div>
  );
}
