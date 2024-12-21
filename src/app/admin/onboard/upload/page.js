"use client";

import React, { useState, useContext } from "react";
import Header from "@/app/components/header";
import AdminContext from "@/app/context/adminContext";
import Image from "next/image";

const Upload = () => {
  const { onboardHandler, setOnboardField, onboardField } =
    useContext(AdminContext);

  // const [logo, setLogo] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const imageHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Airruppies logo upload");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvcam4i4t/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setOnboardField((prev) => ({ ...prev, logo: data.secure_url }));
      // setLogo(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-10">Register Business</p>
        <div>
          <p>Upload Business Logo</p>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={imageHandler}
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />
          <button
            onClick={triggerFileInput}
            className={`${
              isUploading ? "bg-gray-400" : "bg-[#61088E]"
            } w-max px-3 py-1 rounded-md text-white`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Logo"}
          </button>
        </div>
        {onboardField.logo && (
          <div className="mt-4">
            <p>Uploaded Logo:</p>
            <div>
              <Image
                src={onboardField.logo}
                alt="Uploaded Logo"
                height={30}
                width={100}
              />
            </div>
          </div>
        )}

        <button
          className="bg-[#61088E] px-4 py-2 rounded-md text-white mt-8"
          onClick={onboardHandler}
        >
          Onboard business
        </button>
      </section>
    </div>
  );
};

export default Upload;
