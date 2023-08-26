"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { categories, sortingOptions } from "@/data/instractors";
import PaginationTwo from "@/components/common/PaginationTwo";
import Link from "next/link";

export default function InatractorsTwo({ teamMembers, subjects }) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const validTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];
  const allSubjectNames = subjects.map((subj) => subj.subject);

  const [filterCategories, setFilterCategories] = useState([]);
  const [filteredData, setFilteredData] = useState(validTeamMembers);
  const [currentSortingOption, setCurrentSortingOption] = useState("Default");
  const [sortedFilteredData, setSortedFilteredData] =
    useState(validTeamMembers);
  useEffect(() => {
    // Helper function to check inclusion
    const shouldInclude = (elm) => {
      // If there's no subjectId in the elm, exclude it
      if (!elm.subjectId || !Array.isArray(elm.subjectId)) return false;

      // Check if any of the subject IDs in elm.subjectId matches an ID in subjects
      const matches = elm.subjectId.some((subjectId) =>
        subjects.some((subject) => subject.id === subjectId)
      );

      return matches;
    };

    // If filterCategories is empty, simply use validTeamMembers
    const refItems =
      filterCategories.length > 0
        ? validTeamMembers.filter(shouldInclude)
        : validTeamMembers;

    setFilteredData(refItems);
  }, [filterCategories, validTeamMembers, subjects]);

  useEffect(() => {
    switch (currentSortingOption) {
      case "Rating (asc)":
        setSortedFilteredData(
          [...filteredData].sort((a, b) => a.rating - b.rating)
        );
        break;
      case "Rating (dsc)":
        setSortedFilteredData(
          [...filteredData].sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        setSortedFilteredData(filteredData);
        break;
    }
  }, [currentSortingOption, filteredData]);

  const handleFilterCategories = (item) => {
    if (filterCategories.includes(item)) {
      setFilterCategories((prev) =>
        prev.filter((category) => category !== item)
      );
    } else {
      setFilterCategories((prev) => [...prev, item]);
    }
  };

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Instructors</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    We’re on a mission to deliver engaging, curated courses at a
                    reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50">
            <div className="col-lg-3 pr-50">
              <div className="sidebar -courses">
                <div className="sidebar__item">
                  <div className="accordion js-accordion">
                    <div
                      className={`accordion__item js-accordion-item-active ${
                        categoryOpen ? "is-active" : ""
                      } `}
                    >
                      <div
                        className="accordion__button items-center"
                        onClick={() => setCategoryOpen((pre) => !pre)}
                      >
                        <h5 className="sidebar__title">Subjects</h5>

                        <div className="accordion__icon">
                          <div className="icon icon-chevron-down"></div>
                          <div className="icon icon-chevron-up"></div>
                        </div>
                      </div>

                      <div
                        className="accordion__content"
                        style={categoryOpen ? { maxHeight: "350px" } : {}}
                      >
                        <div className="accordion__content__inner">
                          <div className="sidebar-checkbox">
                            <div
                              onClick={() => setFilterCategories([])}
                              className="sidebar-checkbox__item"
                            >
                              <div className="form-checkbox">
                                <input
                                  type="checkbox"
                                  checked={
                                    filterCategories.length ? false : true
                                  }
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check"></div>
                                </div>
                              </div>

                              <div className="sidebar-checkbox__title">All</div>
                              <div className="sidebar-checkbox__count"></div>
                            </div>
                            {allSubjectNames.map((subjectName, i) => (
                              <div
                                key={i}
                                onClick={() =>
                                  handleFilterCategories(subjectName)
                                }
                                className="sidebar-checkbox__item cursor"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={filterCategories.includes(
                                      subjectName
                                    )}
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  {subjectName}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    teamMembers.filter(
                                      (itm) =>
                                        itm.subject &&
                                        itm.subject.subject === subjectName // Updated itm.subject.name to itm.subject.subject
                                    ).length
                                  }
                                  )
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">
                      {sortedFilteredData.length}
                    </span>{" "}
                    total results
                  </div>
                </div>

                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                      Sort by:
                    </div>

                    <div
                      id="dd33button"
                      className="dropdown js-dropdown js-category-active"
                    >
                      <div
                        onClick={() => {
                          document
                            .getElementById("dd33button")
                            .classList.toggle("-is-dd-active");
                          document
                            .getElementById("dd33content")
                            .classList.toggle("-is-el-visible");
                        }}
                        className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10 text-14 lh-12"
                        data-el-toggle=".js-category-toggle"
                        data-el-toggle-active=".js-category-active"
                      >
                        <span className="js-dropdown-title">
                          {currentSortingOption}
                        </span>
                        <i className="icon text-9 ml-40 icon-chevron-down"></i>
                      </div>

                      <div
                        id="dd33content"
                        className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                      >
                        <div className="text-14 y-gap-15 js-dropdown-list">
                          {sortingOptions.map((elm, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setCurrentSortingOption((pre) =>
                                  pre == elm ? "Default" : elm
                                );
                                document
                                  .getElementById("dd33button")
                                  .classList.toggle("-is-dd-active");
                                document
                                  .getElementById("dd33content")
                                  .classList.toggle("-is-el-visible");
                              }}
                            >
                              <span
                                className={`d-block js-dropdown-link cursor ${
                                  currentSortingOption == elm
                                    ? "activeMenu"
                                    : ""
                                } `}
                              >
                                {elm}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row y-gap-30">
                {sortedFilteredData.map((elm, i) => (
                  <div key={i} className="col-lg-4 col-md-6">
                    <div className="teamCard -type-1 px-10 py-10 rounded-8 border-light">
                      <div className="teamCard__image">
                        <Image
                          width={488}
                          height={537}
                          src={elm.image}
                          alt="image"
                        />
                      </div>
                      <div className="teamCard__content mt-10 px-10 pb-5">
                        <h4 className="teamCard__title">
                          <Link
                            className="linkCustom"
                            href={`/instructors/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                        </h4>
                        <p className="teamCard__text">{elm.role}</p>
                        <div className="d-flex x-gap-10 pt-10">
                          <div className="d-flex items-center">
                            <div className="text-13 lh-1 ml-8">
                              {elm.rating}
                            </div>
                          </div>

                          <div className="d-flex items-center">
                            <div className="icon-person-3 text-14"></div>
                            <div className="text-13 lh-1 ml-8">
                              {elm.students} Classes
                            </div>
                          </div>

                          <div className="d-flex items-center">
                            <div className="icon-play text-14"></div>
                            <div className="text-13 lh-1 ml-8">
                              {elm.courses} subject
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="row justify-center pt-60 lg:pt-40">
                <div className="col-auto">
                  <PaginationTwo
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    data={sortedFilteredData}
                    pageCapacity={6}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
