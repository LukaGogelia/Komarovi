"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { categories, sortingOptions } from "@/data/instractors";
import PaginationTwo from "@/components/common/PaginationTwo";
import Link from "next/link";

export default function InatractorsTwo({ teamMembers, subjects }) {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const validTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];
  // Now filterCategories will be an array of subject IDs
  const [filterCategories, setFilterCategories] = useState([]);
  const [filteredData, setFilteredData] = useState(validTeamMembers);
  const [currentSortingOption, setCurrentSortingOption] = useState("Default");
  const [sortedFilteredData, setSortedFilteredData] =
    useState(validTeamMembers);
  const allSubjects = subjects.map((subj) => ({
    name: subj.subject,
    id: subj._id,
  }));

  const shouldInclude = (elm) => {
    if (!elm.subjectId || !Array.isArray(elm.subjectId)) return false;

    // If there are no filterCategories, it means we want all the data
    if (filterCategories.length === 0) return true;

    // Check if any of the subject IDs in elm.subjectId are in filterCategories
    return elm.subjectId.some((subjectId) =>
      filterCategories.includes(subjectId.toString())
    );
  };

  useEffect(() => {
    const refItems = validTeamMembers.filter(shouldInclude);
    setFilteredData(refItems);
  }, [filterCategories, validTeamMembers]);

  useEffect(() => {
    let sortedData = [...filteredData];

    switch (currentSortingOption) {
      case "Rating (asc)":
        sortedData.sort((a, b) => a.rating - b.rating);
        break;
      case "Rating (dsc)":
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setSortedFilteredData(sortedData);
  }, [currentSortingOption, filteredData]);

  useEffect(() => {
    console.log("Saving to localStorage:", sortedFilteredData);
    if (sortedFilteredData) {
      localStorage.setItem(
        "sortedFilteredData",
        JSON.stringify(sortedFilteredData)
      );
    }
  }, [sortedFilteredData]);

  // Update this function to work with subject IDs
  const handleFilterCategories = (subjectId) => {
    if (filterCategories.includes(subjectId)) {
      setFilterCategories((prev) => prev.filter((id) => id !== subjectId));
    } else {
      setFilterCategories((prev) => [...prev, subjectId]);
    }
  };

  // console.log("sorted data", sortedFilteredData[0].name);
  // console.log("subjects", subjects);
  // console.log("teamMembers", teamMembers);
  // return <></>;

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
                            {allSubjects.map((subject, i) => (
                              <div
                                key={i}
                                onClick={() =>
                                  handleFilterCategories(subject.id)
                                }
                                className="sidebar-checkbox__item cursor"
                              >
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={filterCategories.includes(
                                      subject.id
                                    )}
                                  />
                                  <div className="form-checkbox__mark">
                                    <div className="form-checkbox__icon icon-check"></div>
                                  </div>
                                </div>
                                <div className="sidebar-checkbox__title">
                                  {subject.name}
                                </div>
                                <div className="sidebar-checkbox__count">
                                  (
                                  {
                                    teamMembers.filter(
                                      (itm) =>
                                        itm.subjectId &&
                                        itm.subjectId.includes(subject.id)
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
                          <Link href={`/instructors/${elm.id}`}>
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
