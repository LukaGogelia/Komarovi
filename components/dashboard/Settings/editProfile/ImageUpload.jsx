"use client";
import React from 'react';
import Image from 'next/image';

const ImageUpload = ({ previewImage, handleImageChange, handleImageClear, w }) => {
    return (
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
                        style={{ objectFit: "cover", overflow: "hidden", borderRadius: "93%" }}
                    />
                )}
            </label>

            <div className="col-auto">
                <div className="text-16 fw-500 text-dark-1">{w.yourAvatar}</div>
                <div className="text-14 lh-1 mt-10">
                    {w.imageRequirementDescription}
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
                    <div
                        style={{ cursor: "pointer", marginTop: 5 }}
                        onClick={() => {
                            document.getElementById("imageUpload1").value = "";
                            handleImageClear();
                        }}
                        className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
                    >
                        <div className="icon-bin text-16"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
