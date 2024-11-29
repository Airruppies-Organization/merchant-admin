import React from "react";
import { Filter, Add, Search } from "../../../../public/icon";

const Sub = ({ setModal, modal }) => {
  return (
    <div>
      <div className="w-full h-12 flex justify-between items-center px-4 mb-3">
        <div className="flex items-end">
          <p className="text-lg mr-4 h-min text-end">Cashiers</p>
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
          <button
            onClick={() => setModal(!modal)}
            className="flex items-center px-3 py-2 text-xs bg-[#61088E] text-white rounded-lg"
          >
            <Add className="fill-white mr-2 text-xs" />
            Add Cashier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sub;
