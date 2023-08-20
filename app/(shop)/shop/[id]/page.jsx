import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterThree from "@/components/layout/footers/FooterThree";

import HeaderSeven from "@/components/layout/headers/HeaderSeven";
import ProductDetails from "@/components/shop/ProductDetails";
import RelatedProducts from "@/components/shop/RelatedProducts";
import React from "react";
export const metadata = {
  title:
    "Shop-details || Educrat - Professional LMS Online Education Course NextJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderSeven />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <ProductDetails id={params.id} />
        <RelatedProducts />

        <FooterThree />
      </div>
    </div>
  );
}
