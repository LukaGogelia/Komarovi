"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import { getTranslatedFeatures } from "../../../data/features";
import { testimonials } from "../../../data/tesimonials";
import { getTranslatedTestimonials } from "../../../data/tesimonials";
import "swiper/css/effect-cards";

export default function TestimonialsSix({ testimonialsText }) {
  const [showSlider, setShowSlider] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [roteteSwiper, setRoteteSwiper] = useState(4);
  const [darkMode, setDarkMode] = useState(true);

  const { statictis } = getTranslatedFeatures(testimonialsText);
  const { testimonials } = getTranslatedTestimonials(testimonialsText);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  const handleSlideChange = (slide) => {
    setRoteteSwiper((1 - slide.activeIndex / 1) * 4);
  };

  return (
    <section
      className={`layout-pt-lg bg-dark-2  ${
        darkMode ? "-dark-bg-dark-2 " : ""
      }`}
      style={{ backgroundColor: "#6440FB" }}
    >
      <div className="container">
        <div className="row y-gap-30 items-center">
          <div className="col-lg-6 col-md-10">
            <h2 className="text-30 lh-15 text-white">
              {testimonialsText.PeopleLoveToLearnWithEducrat}
            </h2>
            <p className="text-white mt-10">{testimonialsText.Lorem1}</p>
            <div className="row x-gap-50 y-gap-30 pt-60 lg:pt-40 pr-40 md:pr-0">
              {statictis.slice(0, 2).map((elm, i) => (
                <div key={i} className="col-sm-6 text-white">
                  <div className="text-45 lh-11 fw-700">{elm.rating}</div>
                  <div className="mt-10">{elm.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1">
            <div className="testimonials-slider-2 js-testimonials-slider-2">
              {showSlider && (
                <Swiper
                  className="overflow-visible w-[100%] custom-transition"
                  effect={"cards"}
                  grabCursor={true}
                  modules={[Navigation, Pagination, EffectCards]}
                  pagination={{
                    el: ".pagination-testimonial-6",
                    clickable: true,
                  }}
                  navigation={{
                    nextEl: ".icon-arrow-right-6",
                    prevEl: ".icon-arrow-left-6",
                  }}
                  spaceBetween={40}
                  slidesPerView={1}
                  onSlideChange={handleSlideChange}
                  style={{
                    transform: `rotate(${roteteSwiper}deg)`,
                    transition: "1.5s",
                    transformOrigin: "center bottom",
                  }}
                >
                  {testimonials.slice(0, 3).map((elm, i) => (
                    <SwiperSlide
                      key={i}
                      className="swiper-slide scaleOne"
                      style={{
                        width: "100%",
                        transform: "rotate(90deg)",
                      }}
                    >
                      <div
                        className="swiper-slide shadow-2"
                        style={{ width: "100%" }}
                      >
                        <div className="testimonials -type-1">
                          <div className="testimonials__content">
                            <h4 className={`testimonials__title`}>
                              {elm.comment}
                            </h4>
                            <p
                              className="testimonials__text"
                              style={{ color: "black" }}
                            >
                              “{elm.description}”
                            </p>
                            <div className="testimonials-footer">
                              <div className="testimonials-footer__image">
                                <Image
                                  width={60}
                                  height={60}
                                  src={elm.imageSrc}
                                  alt="image"
                                />
                              </div>
                              <div className="testimonials-footer__content">
                                <div className="testimonials-footer__title">
                                  {elm.name}
                                </div>
                                <div className="testimonials-footer__text">
                                  {elm.position}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className="d-flex x-gap-15 items-center justify-center pt-30">
                <div className="col-auto">
                  <button className="d-flex items-center text-24 arrow-left-hover text-white js-prev icon-arrow-left-6">
                    <i className="icon icon-arrow-left"></i>
                  </button>
                </div>
                <div className="col-auto">
                  <div className="pagination -arrows text-white js-pagination pagination-testimonial-6 pagination-white-dot"></div>
                </div>
                <div className="col-auto">
                  <button className="d-flex items-center text-24 arrow-right-hover text-white js-next icon-arrow-right-6">
                    <i className="icon icon-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
