import React from "react";
import Header from "../app_component/header";
import Card from "../app_component/card";
import GraphCard from "./graphCard";

const Admin = () => {
  return (
    <div className="pl-28 pr-48">
      <div>
        <Header name="Victor K. Okafor" role="Admin" />
        <div className="flex mb-10">
          {/* for "type" prop, options are price or amount */}
          <Card name="Monthly Sales" type="price" value={305.6} sub="3.5%" />
          <Card
            name="Monthly Transactions"
            type="amount"
            value={208.2}
            sub="3.5%"
          />
          <div className="h-36 w-56 rounded-3xl bg-[#F2F2F2] p-3 mr-5">
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
          </div>
          <Card
            name="Total Transactions"
            type="amount"
            value={643}
            sub="3.5%"
          />
        </div>
        <div className="flex">
          <GraphCard />
        </div>
      </div>
    </div>
  );
};

export default Admin;
