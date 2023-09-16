"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function EditProfile({ activeTab }) {
  const [previewImage, setPreviewImage] = useState(
    "/assets/img/dashboard/edit/1.png"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xdfggik7"); // replace 'your_upload_preset' with your actual preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dhwthoh1u/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Failed to upload to Cloudinary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedFile) {
        const cloudinaryUrl = await uploadToCloudinary(selectedFile);
        console.log("Image uploaded to Cloudinary:", cloudinaryUrl);

        // Once you have the Cloudinary URL, you can save it along with other profile information
        // SaveProfileFunction({ imageURL: cloudinaryUrl, ...otherProfileData })
      }

      // ... rest of your profile saving logic
    } catch (error) {
      console.error("There was an error:", error.message);
    }
  };
  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload"
          style={
            previewImage
              ? {}
              : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
          }
        >
          {previewImage && (
            <Image
              width={100}
              height={100}
              className="size-100"
              src={previewImage}
              alt={previewImage ? "image" : ""}
              style={{ objectFit: "cover", overflow: "hidden" }}
            />
          )}
        </label>

        <div className="col-auto">
          <div className="text-16 fw-500 text-dark-1">Your avatar</div>
          <div className="text-14 lh-1 mt-10">
            PNG or JPG no bigger than 800px wide and tall.
          </div>

          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="imageUpload1"
                  className="icon-cloud text-16"
                ></label>
                <input
                  required
                  id="imageUpload1"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  document.getElementById("imageUpload1").value = "";
                  setPreviewImage("");
                }}
                className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
              >
                <div className="icon-bin text-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              First Name
            </label>

            <input required type="text" placeholder="First Name" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Last Name
            </label>

            <input required type="text" placeholder="Last Name" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Phone
            </label>

            <input required type="text" placeholder="Phone" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Birthday
            </label>

            <input required type="text" placeholder="Birthday" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Address Line 1
            </label>

            <input required type="text" placeholder="Address Line 1" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Address Line 2
            </label>

            <input required type="text" placeholder="Address Line 2" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              State
            </label>

            <input required type="text" placeholder="State" />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Country
            </label>

            <input required type="text" placeholder="Country" />
          </div>

          <div className="col-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Personal info
            </label>

            <textarea required placeholder="Text..." rows="7"></textarea>
          </div>

          <div className="col-12">
            <button className="button -md -purple-1 text-white">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
