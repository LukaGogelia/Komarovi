"use client";

import "../../public/assets/sass/styles.scss";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { AuthProvider } from "@/components/AuthProvider";
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
config.autoAddCss = false;

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
import Context from "@/context/Context";

const locales = ['en', 'ge'];

export default function RootLayout({ children, params: { locale } }) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);
  return (
    <html lang={locale} className="">
      <head></head>
      <body>
        <Context>
          <AuthProvider>{children}</AuthProvider>
        </Context>
      </body>
    </html>
  );
}
