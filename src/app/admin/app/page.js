"use client";

import React from "react";
import Header from "@/app/app_component/header";
import Card from "@/app/app_component/card";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";
import { RevenueChart } from "@/app/app_component/revenueChart";
import LinkModal from "./linkModal";

const Admin = () => {
  const { dashboard, addAdmin, linkModal, setLinkModal, link, setLink } =
    useContext(AdminContext);

  return (
    <div className="w-full bg-[#f6f6f6] pt-10">
      <div className="px-10">
        <div className="flex space-x-3">
          <div
            onClick={addAdmin}
            className="bg-purple-700 rounded-lg text-white px-4 py-1 w-max mb-3 cursor-pointer"
          >
            <p>Add Admin</p>
          </div>
        </div>

        <div className="flex mb-10">
          {/* for "type" prop, options are price or amount */}
          <Card
            name="Today's sales"
            type="price"
            value={dashboard.daily?.totalSales ?? 0}
            sub="3.5%"
          />

          <Card
            name="Today's total transactions"
            type="amount"
            value={dashboard.daily?.transactionCount ?? 0}
            sub="3.5%"
          />

          <Card
            name="Monthly sales"
            type="amount"
            value={dashboard.monthly?.totalSales ?? 0}
            sub="3.5%"
          />

          <Card
            name="Monthly Transactions"
            type="amount"
            value={dashboard.monthly?.transactionCount}
            sub="3.5%"
          />
        </div>
        <div className="flex">
          <RevenueChart />
        </div>
      </div>
      {/* To add to cart */}
      {linkModal && <LinkModal link={link} />}
    </div>
  );
};

export default Admin;
