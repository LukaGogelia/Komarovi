"use client";
import React from "react";
import { HeaderExplore } from "../component/header-explore";

import SearchToggle from "../component/SearchToggle";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MobileMenu from "../component/MobileMenu";

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  return (
    <>
      <header className="header -type-1 ">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo ">
                  <Link href="/">
                    <Image
                      width={140}
                      height={50}
                      src="/assets/img/general/logo-white.png"
                      alt="logo"
                    />
                  </Link>
                </div>

                {/* header explore start */}
                <HeaderExplore
                  allClasses={
                    "header__explore text-green-1 ml-60 xl:ml-30 xl:d-none"
                  }
                />
                {/* header explore end */}
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />
            <MobileMenu
              setActiveMobileMenu={setActiveMobileMenu}
              activeMobileMenu={activeMobileMenu}
            />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center">
                  {/* search toggle start */}
                  <SearchToggle />
                  {/* search toggle end */}

                  {/* cart toggle start */}
                  <CartToggle
                    parentClassess={"relative ml-30 xl:ml-20"}
                    allClasses={"d-flex items-center text-white"}
                  />
                  {/* cart toggle end */}

                  <div className="d-none xl:d-block ml-20">
                    <button
                      onClick={() => setActiveMobileMenu(true)}
                      className="text-white items-center"
                      data-el-toggle=".js-mobile-menu-toggle"
                    >
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>

                <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                  <Link href="/login" className="button -underline text-white">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="button -sm -white text-dark-1 ml-30"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
