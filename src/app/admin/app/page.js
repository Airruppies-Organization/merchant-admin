"use client";

import React from "react";
import Header from "@/app/app_component/header";
import Card from "@/app/app_component/card";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";
import { RevenueChart } from "@/app/app_component/revenueChart";
import LinkModal from "./linkModal";
import { useLogout } from "@/app/hooks/useLogout";
import { useRouter } from "next/navigation";

const Admin = () => {
  const { dashboard, addAdmin, linkModal, setLinkModal, link, setLink } =
    useContext(AdminContext);

  const router = useRouter();

  const { logout } = useLogout();

  const logoutHandler = () => {
    const success = logout();
    if (success) {
      router.push("/admin/auth/login");
    }
  };

  return (
    <div className="pl-28 pr-48">
      {linkModal && <LinkModal link={link} />}
      <div>
        <Header name="Victor K. Okafor" role="Admin" />
        <div className="flex space-x-3">
          <div
            onClick={addAdmin}
            className="bg-purple-700 rounded-lg text-white px-4 py-1 w-max mb-3 cursor-pointer"
          >
            <p>Add Admin</p>
          </div>
          <div
            onClick={() => logoutHandler()}
            className="bg-purple-700 rounded-lg text-white px-4 py-1 w-max mb-3 cursor-pointer"
          >
            <p>Logout</p>
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
          {/* <div className="h-36 w-56 rounded-3xl bg-[#F2F2F2] p-3 mr-5">
            <div className="flex items-center mb-6">
              <div className="h-8 w-8 rounded-full bg-[#61088E] mr-2"></div>
              <div className="text-[#61088E] text-sm">Total Cashiers</div>
            </div>
            <div>
              <div className="flex items-baseline">
                <p className="text-2xl mr-1">40 </p>
                <p className="text-base">Cashiers</p>
              </div>
            </div>
          </div> */}
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
    </div>
  );
};

export default Admin;
