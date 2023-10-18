"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
const MobileFooter = dynamic(() => import("./MobileFooter"));
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

export default function Menu({ allClasses, headerPosition, words }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  const w = JSON.parse(words)
  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${headerPosition ? headerPosition : ""
        }`}
      style={{ color: "#6440FB" }}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link href="/login" className="text-dark-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className={`menu js-navList`}>
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem == "Home" ? "activeMenu" : ""}
              >
                {w.home}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>

              {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Home
                  </Link>
                </li>

                {menuList[0].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split("/")[1] == elm.href.split("/")[1]
                        ? "activeMenu"
                        : "inActiveMenu"
                    }
                  >
                    <Link href={elm.href}>{elm.label}</Link>
                  </li>
                ))}
              </ul> */}
            </li>

            <li className="menu-item-has-children -has-mega-menu">
              <Link
                data-barba
                href="#"
                className={menuItem == "Courses" ? "activeMenu" : ""}
              >
                {w.clubs}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>

              {/* <div className="mega xl:d-none">
                <div className="mega__menu">
                  <div className="row x-gap-40" style={{ color: "black" }}>
                    <div className={`col`}>
                      <h4
                        className={`text-17 fw-500 mb-20`}
                        style={{ color: "black" }}
                      >
                        Course List Layouts
                      </h4>

                      <ul className="mega__list">
                        {menuList[1].links[0].links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] == elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba href={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col">
                      <h4
                        className="text-17 fw-500 mb-20"
                        style={{ color: "black" }}
                      >
                        Course Single Layouts
                      </h4>

                      <ul className="mega__list">
                        {menuList[1].links[1].links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] == elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba href={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col">
                      <h4
                        className="text-17 fw-500 mb-20"
                        style={{ color: "black" }}
                      >
                        About Courses
                      </h4>

                      <ul className="mega__list">
                        {menuList[1].links[2].links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] == elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba href={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col">
                      <h4
                        className="text-17 fw-500 mb-20"
                        style={{ color: "black" }}
                      >
                        Dashboard Pages
                      </h4>

                      <ul className="mega__list">
                        {menuList[1].links[3].links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] == elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba href={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col">
                      <h4
                        className="text-17 fw-500 mb-20"
                        style={{ color: "black" }}
                      >
                        Popular Courses
                      </h4>

                      <ul className="mega__list">
                        {menuList[1].links[4].links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] == elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba href={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
            </li>

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem == "Events" ? "activeMenu" : ""}
              >
                {w.events}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
              {/* <ul className="subnav">
                <li
                  className="menu__backButton js-nav-list-back"
                  style={{ color: "black" }}
                >
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Events
                  </Link>
                </li>

                {menuList[2].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split("/")[1] == elm.href.split("/")[1]
                        ? "activeMenu"
                        : "inActiveMenu"
                    }
                  >
                    <Link data-barba href={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </li>

            <li>
              <Link
                data-barba
                href="/news"
                className={menuItem == "Blogs" ? "activeMenu" : ""}
              >
                {w.news}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
              {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Blog
                  </Link>
                </li>

                {menuList[3].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split("/")[1] == elm.href.split("/")[1]
                        ? "activeMenu"
                        : "inActiveMenu"
                    }
                  >
                    <Link data-barba href={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </li>

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem == "Pages" ? "activeMenu" : ""}
              >
                {w.projects}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>

              {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    {/* <i className="icon-chevron-left text-13 mr-10"></i>  
                    Pages
                  </Link>
                </li>
                 <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "About Us" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    About Us<div className="icon-chevron-right text-11"></div>
                  </Link>

                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        About Us
                      </Link>
                    </li>

                    {menuList[4].links[0].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li> 

                <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "Contact" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    Contact<div className="icon-chevron-right text-11"></div>
                  </Link>
                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        Contact
                      </Link>
                    </li>

                    {menuList[4].links[1].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "Shop" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    Shop<div className="icon-chevron-right text-11"></div>
                  </Link>
                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i> Shop
                      </Link>
                    </li>

                    {menuList[4].links[2].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {menuList[4].links
                  .filter((el) => el.href)
                  .map((elm, i) => (
                    <li
                      key={i}
                      className={
                        pathname.split("/")[1] == elm.href.split("/")[1]
                          ? "activeMenu"
                          : "inActiveMenu"
                      }
                    >
                      <Link key={i} data-barba href={elm.href}>
                        {elm.label}
                      </Link>
                    </li>
                  ))}
              </ul> */}
            </li>

            <li>
              <Link
                data-barba
                href="/contact-1"
                className={
                  pathname == "/contact-1" ? "activeMenu" : "inActiveMenuTwo"
                }
              >
                {w.contact}
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div >

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div >
  );
}
