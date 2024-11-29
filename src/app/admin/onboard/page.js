"use client";

import React from "react";
import Input from "../components/input";
import Header from "../components/header";
import Link from "next/link";
import { useContext } from "react";
import AdminContext from "../context/adminContext";

const index = () => {
  const { onboardField, setOnboardField } = useContext(AdminContext);

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Register Business</p>
        <div className="flex flex-col">
          <Input
            label="Name of organisation"
            type="text"
            value={onboardField.name}
            handler={(e) =>
              setOnboardField((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <Input
            label="State"
            type="text"
            value={onboardField.state}
            handler={(e) =>
              setOnboardField((prev) => {
                return { ...prev, state: e.target.value };
              })
            }
          />
          <Input
            label="Address"
            type="text"
            value={onboardField.address}
            handler={(e) =>
              setOnboardField((prev) => {
                return { ...prev, address: e.target.value };
              })
            }
          />
          <Link href={"/onboard/upload"}>
            <button className="bg-[#61088E] w-24 h-10 rounded-md text-white">
              Next
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default index;
