"use client";
import Image from "next/image";
import React, { useState } from "react";
import ServerMenu from "../component/ServerMenu";
import MobileMenu from "../component/MobileMenu";
import Link from "next/link";

export default function HeaderAuth({ children }) {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  return (
    <header className="header -base js-header">
      <div className="header__container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo ">
                <Link data-barba href="/">
                  <Image
                    width={140}
                    height={50}
                    src="/assets/img/general/logo-white.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              {children}
              <MobileMenu
                activeMobileMenu={activeMobileMenu}
                setActiveMobileMenu={setActiveMobileMenu}
              />

              <div className="mr-30">
                <div className="d-none xl:d-block ml-20">
                  <button
                    className="text-dark-1 items-center"
                    data-el-toggle=".js-mobile-menu-toggle"
                    onClick={() => setActiveMobileMenu(true)}
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>

              <div className="header-right__buttons md:d-none">
                <a
                  href="signup"
                  className="button -sm -rounded -dark-1 text-white"
                >
                  რეგისტრაცია
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
