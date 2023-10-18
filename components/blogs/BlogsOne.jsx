import Image from "next/image";
import React from "react";
import mongoose from "mongoose";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { News } from "@/data/mongoDb/models/news";
import { Category } from "@/data/mongoDb/models/category";
import dbConnect from "@/data/mongoDb/utils/database";

async function getData(props) {
  await dbConnect();

  const categories = await Category.find({});

  const query = { isDeleted: false };

  let categoryId;

  if (props) {
    const { selectedCategory } = props;
    const category = await Category.findOne({ slug: selectedCategory });
    if (category) {
      categoryId = category._id;
    }
  }

  if (categoryId) {
    query.category = categoryId;
  }

  const newsItems = await News.find(
    // query,
    {},
    "_id title imageLarge datePosted category content"
  )


  console.log();
  return { categories, newsItems };
}

export default async function BlogsOne({ searchParams, t }) {


  const { categories, newsItems } = await getData(
    searchParams && searchParams.category
      ? { selectedCategory: searchParams.category }
      : null
  );
  console.log(searchParams);

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">
                    {t('title1')}
                    {searchParams.category &&
                      ` ${searchParams.category[0].toUpperCase()}${searchParams.category.slice(
                        1
                      )}`}{" "}
                    {t('title2')}
                  </h1>
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

      <section className="layout-pt-sm layout-pb-lg">
        <div className="container">
          <div className="tabs -pills js-tabs">
            <div className="tabs__controls d-flex justify-center flex-wrap y-gap-20 x-gap-10 js-tabs-controls">
              {categories.map((elm, i) => (
                <div key={i}>
                  <Link
                    href={
                      elm.slug !== ""
                        ? {
                          pathname: "/news",
                          query: { category: elm.slug },
                        }
                        : { pathname: "/news" }
                    }
                  >
                    <button
                      className={`tabs__button px-15 py-8 rounded-8 js-tabs-button
                        ${searchParams.category === elm.slug ||
                          (!searchParams.category && elm.slug === "")
                          ? "is-active"
                          : ""
                        } `}
                      data-tab-target=".-tab-item-1"
                      type="button"
                    >
                      {elm.name}
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="tabs__content pt-40 js-tabs-content">
              <div className="tabs__pane -tab-item-1 is-active">
                <div className="row y-gap-30">
                  {newsItems.map((elm, i) => (
                    <div key={i} className="col-lg-4 col-md-6">
                      <div className="blogCard -type-1">
                        <div className="blogCard__image">
                          <div style={{ position: 'relative', width: '410px', height: '300px' }}>
                            <Image
                              layout="fill"
                              objectFit="cover"
                              className="w-1/1 rounded-8"
                              src={elm.imageLarge}
                              alt="image"
                            />
                          </div>

                        </div>
                        <div className="blogCard__content mt-20">
                          <div className="blogCard__category">
                            {elm.category?.name}
                          </div>
                          <h4 className="blogCard__title text-20 lh-15 fw-500 mt-5">
                            <Link
                              className="linkCustom"
                              href={`/news/${elm._id}`}
                            >
                              {elm.title}
                            </Link>
                          </h4>
                          <div className="blogCard__date text-14 mt-5">
                            {elm.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row justify-center pt-60 lg:pt-40">
                  <div className="col-auto">
                    <div className="pagination -buttons">
                      <button className="pagination__button -prev">
                        <i className="icon icon-chevron-left"></i>
                      </button>

                      <div className="pagination__count">
                        <a href="#">1</a>
                        <a className="-count-is-active" href="#">
                          2
                        </a>
                        <a href="#">3</a>
                        <span>...</span>
                        <a href="#">67</a>
                      </div>

                      <button className="pagination__button -next">
                        <i className="icon icon-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
