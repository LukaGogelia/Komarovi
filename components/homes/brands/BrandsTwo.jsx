import React from "react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";
export default function BrandsTwo() {
  return (
    <section
      className="layout-pt-sm layout-pb-sm bg-light-6"
      style={{ backgroundColor: "#F5F7FE" }}
    >
      <div className="container">
        <div className="row y-gap-30 justify-between sm:justify-start items-center">
          {brands.map((elm, i) => (
            <div key={i} className="col-lg-auto col-md-2 col-sm-3 col-4">
              <div className="d-flex justify-center items-center px-4">
                <Link target="_blank" href={elm.url}>
                  <Image
                    width={140}
                    height={90}
                    style={{ objectFit: "contain", cursor: "pointer" }}
                    className="w-1/1"
                    src={elm.svg}
                    alt="clients image"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
