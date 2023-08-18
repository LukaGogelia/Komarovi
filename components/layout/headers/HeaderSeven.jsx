"use client";

import React, { useState, useEffect } from "react";
const CartToggle = dynamic(() => import("../component/CartToggle"));
import { HeaderExplore } from "../component/header-explore";
const Menu = dynamic(() => import("../component/Menu"));
const MobileMenu = dynamic(() => import("../component/MobileMenu"));
const SearchToggle = dynamic(() => import("../component/SearchToggle"));
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
export default function HeaderSeven() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleDarkmode = () => {
    if (document) {
      const htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.classList.toggle("-dark-mode");

      // Trigger the custom event
      const event = new Event("darkmodechange");
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header -type-4 js-header ${
        scrollPosition > 40 ? "bg-white" : ""
      }`}
    >
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left d-flex items-center">
              <div className="header__logo pr-30 xl:pr-20 md:pr-0">
                <Link href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo-dark.svg"
                    alt="logo"
                  />
                </Link>
              </div>

              <HeaderExplore allClasses={"header__explore xl:d-none"} />
            </div>
          </div>

          <div className="col-auto">
            <Menu allClasses={"menu__nav -is-active"} />
            <MobileMenu
              activeMobileMenu={activeMobileMenu}
              setActiveMobileMenu={setActiveMobileMenu}
            />
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <div className="header-right__icons text-white d-flex items-center">
                <button
                  onClick={handleDarkmode}
                  className="js-darkmode-toggle d-flex items-center justify-center size-50 rounded-16 "
                  style={{ color: "#6440FB", paddingRight: "2rem" }}
                >
                  <i className="text-24 icon icon-night"></i>
                </button>

                <SearchToggle />

                <CartToggle
                  parentClassess={"relative pl-30 sm:pl-15"}
                  allClasses={"d-flex items-center "}
                />

                <div className="d-none xl:d-block pl-30 sm:pl-15">
                  <button
                    className=" items-center"
                    onClick={() => setActiveMobileMenu(true)}
                    data-el-toggle=".js-mobile-menu-toggle"
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>

              <div className="header-right__buttons d-flex items-center ml-30 xl:ml-20 lg:d-none">
                <Link href="/login" className="button -underline text-purple-1">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="button h-50 px-30 -purple-3 -rounded text-purple-1 ml-15"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
