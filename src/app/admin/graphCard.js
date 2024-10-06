import React from "react";
import BarChart from "../app_component/revenueChart";

const GraphCard = () => {
  return (
    <div className=" relative h-[60vh] mb-10 w-[29rem] bg-[#FBFBFB] p-3 rounded-3xl mr-5">
      <div className="flex mb-6">
        <div className="h-8 w-8 rounded-full bg-[#61088E] mr-2"></div>
        <div className="w-[90%] h-max">
          <div className="text-[#61088E] text-sm mb-5">
            Monthly Recurring Revenue
          </div>
          <div>
            <p className="text-xs">Income</p>
            <div className="flex mb-5">
              <p className="text-sm pt-[2px] text-[#61088E] font-semibold">N</p>
              <p className="text-2xl font-semibold">37,756,000</p>
            </div>
          </div>
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
