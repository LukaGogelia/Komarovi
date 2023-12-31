import React from "react";
const Links = dynamic(() => import("../component/Links"));
const Socials = dynamic(() => import("@/components/common/Socials"));
const FooterLinks = dynamic(() => import("../component/FooterLinks"));
import Image from "next/image";
import dynamic from "next/dynamic";

export default function FooterThree({ foooterText }) {
  return (
    <footer
      className="footer -type-5 pt-60"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container">
        <div className="row y-gap-30 pb-60">
          <div className="col-xl-4 col-lg-5 col-md-6">
            <div className="footer-header__logo">
              <Image
                width={140}
                height={50}
                src="/assets/img/general/logo-black.png"
                alt="logo"
              />
            </div>

            <div className="mt-30">
              <div className="text-17" style={{ color: "black" }}>
                {foooterText.CallUs}
              </div>
              <div className="text-17 lh-1 fw-500 text-purple-1 mt-5">
                (+995) 0322391562
              </div>
            </div>

            <div className="mt-30 pr-20">
              <div className="lh-17">{foooterText.Address}</div>
            </div>
            <div className="mt-30 pr-20">
              <div className="lh-17"> tbilisi199@mes.gov.ge </div>
            </div>

            <div className="footer-header-socials mt-30">
              <div className="footer-header-socials__list d-flex items-center">
                <Socials
                  componentsClass={
                    "size-40 d-flex justify-center items-center "
                  }
                />
              </div>
            </div>
          </div>

          <FooterLinks
            allClasses={"text-17 fw-500 uppercase mb-25"}
            foooterText={foooterText}
          />
        </div>

        <div className="py-30 border-top-light">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="footer-footer__copyright d-flex items-center h-100">
                © {new Date().getFullYear()} Komarovi. All Right Reserved.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15">
                    <Links />
                  </div>
                </div>

                <div>
                  <a
                    href="#"
                    className="button -md -light-4 px-20 -purple-3 text-purple-1"
                  >
                    <i className="icon-worldwide mr-5"></i>English
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
