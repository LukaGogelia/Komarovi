"use client";

import { useState, useEffect } from "react";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import React from "react";
import { skillsOne } from "../../../data/skills";
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"));


export default function SkillsOne({ clubWords, homeHeroText }) {

  const [showSlider, setShowSlider] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const w = JSON.parse(clubWords);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <section className={`layout-pt-lg layout-pb-lg`}>
      <div className="container">
        <div className="row y-gap-20 justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title text-white">
                {homeHeroText.Clubs}
              </h2>

              <p className="sectionTitle__text ">{homeHeroText.ClubsUnder}</p>
            </div>
          </div>
        </div>

        <div className="pt-60 lg:pt-50">
          <div className="overflow-hidden js-section-slider">
            <div className="swiper-wrapper">
              {showSlider && (
                <Swiper
                  // {...setting}

                  modules={[Navigation, Pagination]}
                  pagination={{
                    el: ".pagination-skils",
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: ".arrow-right-one",
                    prevEl: ".arrow-left-one",
                  }}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    // when window width is >= 576px
                    450: {
                      slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                      slidesPerView: 4,
                    },
                    1200: {
                      // when window width is >= 992px
                      slidesPerView: 6,
                    },
                  }}
                  loop={true}
                >
                  {skillsOne.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="swiper-slide h-100 overflow-visible">
                        <div
                          className={`infoCard -type-1  ${darkMode ? "-dark-bg-dark-2 " : ""
                            }`}
                          data-aos="fade-left"
                          data-aos-duration={(i + 1) * 300}
                        >
                          <div className={`infoCard__image`}>
                            <Image
                              width={150}
                              height={100}
                              style={{ width: "100%", objectFit: "contain" }}
                              src={elm.imageSrc}
                              alt="image"
                            />
                          </div>
                          <h5 className="infoCard__title text-13 lh-15 mt-10">
                            {w[elm.skill]}
                          </h5>
                        </div>
                      </div>
                    </SwiperSlide>
                    // 140,90
                  ))}
                </Swiper>
              )}
            </div>

            <div className="d-flex justify-center x-gap-15 items-center pt-60 lg:pt-40">
              <div className="col-auto">
                <div className="pagination-skils -arrows js-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
