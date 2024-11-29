import React from "react";
import { Filter, Add, Search } from "../../../../public/icon";

const Sub = ({ setModal, modal }) => {
  return (
    <div>
      <div className="w-full h-12 flex justify-between items-center px-4 mb-3">
        <div className="flex items-end">
          <p className="text-lg mr-4 h-min text-end">Sales</p>
          <div className="border-b-2 border-b-[#61088E] px-2 flex">
            <Search className="stroke-neutral-500 mr-3" />
            <input
              placeholder="Search Cashier..."
              type="text"
              className="focus:outline-none text-sm"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 cursor-pointer">
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sub;
