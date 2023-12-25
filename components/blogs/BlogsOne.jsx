import Image from "next/image";
import Link from "next/link";
import NewsPagination from "./NewsPagination";
import { Category } from "@/data/mongoDb/models/category";
import { News } from "@/data/mongoDb/models/news";
import { newsCategories } from "@/data/newscategories";
import dbConnect from "@/data/mongoDb/utils/database";

const POSTS_ON_THE_PAGE = 9;

async function getData(t, props) {
  await dbConnect();

  const categories = newsCategories.map(elm => ({
    slug: elm.slug === "all" ? "" : elm.slug,
    name: t(elm.slug)
  }));

  let page;
  if (props.page) {
    page = parseInt(props.page);
  }
  else {
    page = 1;
  }

  const skip = (page - 1) * 9;

  const limit = 9;

  const query = { isDeleted: false };

  let category;
  if (props.selectedCategory) {
    const { selectedCategory } = props;
    category = selectedCategory;
  }
  else {
    category = '';
  }

  if (category) {
    query.category = category;
  }
  const totalItemCount = await News.countDocuments(query);

  const newsItems = await News.find(
    query,
    // {},
    "_id title imageLarge datePosted category content"
  )
    .skip(skip)
    .limit(limit);

  const totalPageCount = Math.ceil(totalItemCount / POSTS_ON_THE_PAGE);


  return { categories, newsItems, totalPageCount };
}

export default async function BlogsOne({ searchParams, t, categoryT }) {



  const { categories, newsItems, totalPageCount } = await getData(categoryT,
    searchParams && searchParams.category
      ? { selectedCategory: searchParams.category, page: searchParams.page }
      : { page: searchParams.page }
  );

  console.log('total', totalPageCount);
  let currentPage = '';
  let currentCategory = '';
  if (searchParams.page) {
    currentPage = parseInt(searchParams.page);
  }
  else {
    currentPage = 1;
  }

  if (searchParams.category) {
    currentCategory = searchParams.category;
  }

  console.log(currentCategory, currentPage);
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
                          {/* <div style={{ , width: '410px', height: '350px' }}> */}
                          <Image
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                            cover
                            width="410"
                            height="350"
                            className="w-1/1 rounded-8"
                            src={elm.imageLarge}
                            alt="image"
                          />
                          {/* </div> */}

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

                {totalPageCount > 1 && <NewsPagination currentPage={currentPage} totalPageCount={totalPageCount} baseUrl={`/news${currentCategory ? `?category=${currentCategory}` : '?'}`} />}

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
