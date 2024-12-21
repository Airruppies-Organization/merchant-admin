"use client";

import React from "react";
import Script from "next/script";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import Link from "next/link";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";
import PlaceAutocomplete from "./places";

const Index = () => {
  const { onboardField, setOnboardField } = useContext(AdminContext);

  const handleFieldChange = (field) => (e) => {
    setOnboardField((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <Header />

      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Register Business</p>
        <div className="flex flex-col">
          {/* <Input
            label="Name of Business"
            type="text"
            value={onboardField.name}
            handler={handleFieldChange("name")}
          /> */}
          {/* <Input
            label="Address"
            type="text"
            value={onboardField.address}
            handler={handleFieldChange("address")}
          /> */}
          <PlaceAutocomplete />
          <Link href="/admin/onboard/upload">
            <button className="bg-[#61088E] w-24 h-10 rounded-md text-white">
              Next
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
