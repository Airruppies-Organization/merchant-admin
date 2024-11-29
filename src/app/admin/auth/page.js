"use client";

import React from "react";
import Input from "../components/input";
import Header from "../components/header";
import Link from "next/link";
import { useContext } from "react";
import AdminContext from "../context/adminContext";

const adminMerchantId = () => {
  const { adminField, setAdminField } = useContext(AdminContext);
  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <Input
          label="Merchant id"
          type="text"
          value={adminField.merchant_id}
          handler={(e) =>
            setAdminField((prev) => {
              return { ...prev, merchant_id: e.target.value };
            })
          }
        />
        <p className="text-xs text-red-600">
          If you are registering a new business, skip this field
        </p>

        <Link href={"/auth/signup"}>
          <button className="bg-[#61088E] w-24 h-10 rounded-md text-white mt-4">
            Next
          </button>
        </Link>
      </section>
    </div>
  );
};

export default adminMerchantId;
