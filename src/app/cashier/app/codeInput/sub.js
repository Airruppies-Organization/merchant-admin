import React from "react";
import { Notifications, Setting } from "../../../../../public/icon";

const Sub = () => {
  return (
    <div className="flex w-full justify-between mt-10">
      <button className="p-2 bg-[#61088E] text-white rounded-lg text-sm">
        View Sales
      </button>
      <div className="flex ">
        <Notifications className="fill-neutral-700 w-5 h-5 mr-6" />
        <Setting className="fill-neutral-700 w-5 h-5" />
      </div>
    </div>
  );
};

export default Sub;
