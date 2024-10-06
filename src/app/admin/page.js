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
          <Card name="Daily Sales" type="price" value={305.6} sub="3.5%" />
          <Card
            name="Daily Transactions"
            type="amount"
            value={208.2}
            sub="3.5%"
          />
          <Card name="Monthly Sales" type="price" value={981.7} sub="3.5%" />
          <Card
            name="Monthly Transactions"
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
