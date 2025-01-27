"use client";

import React from "react";
import Header from "@/app/app_component/header";
import Card from "@/app/app_component/card";
import { useContext, useState } from "react";
import AdminContext from "@/app/context/adminContext";
import { RevenueChart } from "@/app/app_component/revenueChart";
import LinkModal from "./linkModal";

const Admin = () => {
  const [linkModal, setLinkModal] = useState(false);

  const { dashboard, addAdmin, link } = useContext(AdminContext);

  return (
    <div className="w-full bg-[#f6f6f6] pt-10">
      <div className="px-10">
        <div className="flex space-x-3">
          <div
            onClick={() => setLinkModal((prev) => !prev)}
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
            suffix="so far"
            value={dashboard.daily?.totalSales ?? 0}
            sub="3.5%"
          />

          <Card
            name="Today's transactions"
            type="amount"
            suffix="transactions so far"
            value={dashboard.daily?.transactionCount ?? 0}
            sub="3.5%"
          />

          <Card
            name="Monthly sales"
            type="price"
            suffix="this month"
            value={dashboard.monthly?.totalSales ?? 0}
            sub="3.5%"
          />

          <Card
            name="Monthly Transactions"
            type="amount"
            suffix="transactions this month"
            value={dashboard.monthly?.transactionCount ?? 0}
            sub="3.5%"
          />
        </div>
        <div className="flex">
          <RevenueChart />
        </div>
      </div>
      {/* To add to cart */}
      {linkModal && <LinkModal setLinkModal={setLinkModal} link={link} />}
    </div>
  );
};

export default Admin;
