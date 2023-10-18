"use client";

import { sidebarItems } from "@/data/dashBoardSidebar";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { getTranslatedSideBarItems } from "@/data/translatedSidebar";
export default function Sidebar({ dashboardText }) {
  const pathname = usePathname();
  const { sidebarItems } = getTranslatedSideBarItems(dashboardText);
  return (
    <ChakraProvider>
      <div className="sidebar -dashboard">
        {sidebarItems.map((elm, i) => (
          <div
            key={i}
            className={`sidebar__item ${
              pathname == elm.href ? "-is-active " : ""
            }`}
            style={{
              background: pathname === elm.href ? "#2B1C55" : "inherit",
            }}
          >
            <Link
              key={i}
              href={elm.href}
              className={`d-flex items-center text-17 lh-1 fw-500 ${
                pathname == elm.href ? "is-active " : ""
              }`}
            >
              <i className={`${elm.iconClass} mr-15`}></i>
              {elm.text}
            </Link>
          </div>
        ))}
      </div>
    </ChakraProvider>
  );
}
