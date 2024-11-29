"use client";

import React from "react";
import Header from "@/app/components/header";
import Link from "next/link";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";

const Upload = () => {
  const { onboardHandler } = useContext(AdminContext);

  return (
    <div>
      <div>
        <Header />
        <section className="w-[52vw] ml-auto mr-auto pt-8">
          <p className="text-3xl mb-10">Register Business</p>

          <div>
            <p>Upload Business Logo</p>
            {/* <Link href={"/admin"}> */}
            <button
              onClick={onboardHandler}
              className="bg-[#61088E] w-24 h-10 rounded-md text-white"
            >
              Upload
            </button>
            {/* </Link> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Upload;
