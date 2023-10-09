"use client";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const UploadPage = () => {
  return (
    <CldUploadWidget uploadPreset="xdfggik7">
      {({ open }) => <button onClick={open}>upload</button>}
    </CldUploadWidget>
  );
};

export default UploadPage;
