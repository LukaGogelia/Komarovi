import React from "react";
import Link from "next/link";
import { getFooterLinks } from "../../../data/footerLinks";

export default function FooterLinks({ allClasses, foooterText }) {
  const { footerLinks } = getFooterLinks(foooterText);

  return (
    <>
      {footerLinks.map((elm, i) => (
        <div key={i} className="col-xl-2 col-lg-4 col-md-6">
          <div className={`${allClasses ? allClasses : ""}`}>{elm.title}</div>
          <div className="d-flex y-gap-10 flex-column">
            {elm.links.map((itm, index) =>
              itm.href ? (
                <Link key={index} href={itm.href}>
                  {itm.label}
                </Link>
              ) : (
                <span key={index}>{itm.label}</span>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
}
