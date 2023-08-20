"use client";

import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import FooterNine from "../../layout/footers/FooterNine";

export default function NewsEntry() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSmall, setImageSmall] = useState("");
  const [imageLarge, setImageLarge] = useState("");
  const [category, setCategory] = useState("");

  const editorRef = useRef(null);

  // useEffect(() => {
  //   const isDark = document
  //     .getElementsByTagName("html")[0]
  //     .classList.contains("-dark-mode");
  //   setIsDarkMode(isDark);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newsData = {
      title,
      content,
      imageSmall,
      imageLarge,
      category,
    };

    // TODO: Send newsData to the server for saving.
    console.log(newsData);
  };

  // Placeholder method, ideally you would fetch categories from your backend.
  const fetchCategories = () => {
    return ["Category1", "Category2", "Category3"];
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New News Entry</h1>
            <div className="mt-10">
              Provide information about the news entry.
            </div>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div style={{ padding: "33px" }}>
                {" "}
                {/* Add padding here */}
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row y-gap-30"
                >
                  <div className="col-12">
                    <label className="text-16 m-20 lh-1 fw-500 text-dark-1 mb-10">
                      Title*
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="News Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Content*
                    </label>
                    <Editor
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      value={content}
                      onEditorChange={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Image Small*
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setImageSmall(e.target.files[0])}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Image Large*
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setImageLarge(e.target.files[0])}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Category*
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {fetchCategories().map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row y-gap-20 justify-between pt-15">
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="button -md -purple-1 text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <FooterNine />
      </div>
    </div>
  );
}
