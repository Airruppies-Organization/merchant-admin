import React from "react";
import { Filter, Add, Search, Angle } from "../../../../../public/icon";

const Sub = ({
  setModal,
  modal,
  cashierSearch,
  setCashierSearch,
  handleSearchCashier,
  handleActiveCashier,
}) => {
  return (
    <div>
      <div className="w-full h-12 flex justify-between items-center px-4 mb-3">
        <div className="flex items-end">
          <p className="text-lg mr-4 h-min text-end">Cashiers</p>
          <form
            onSubmit={handleSearchCashier}
            className="border-b-2 border-b-[#61088E] px-2 flex"
          >
            <Search className="stroke-neutral-500 mr-3" />
            <input
              placeholder="Search Cashier..."
              type="text"
              value={cashierSearch}
              onChange={(e) => {
                setCashierSearch(e.target.value);
              }}
              className="focus:outline-none text-sm"
            />
          </form>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="flex space-x-2 cursor-pointer items-center">
            <p className="text-xs">Sort by</p>
            <Angle className="size-2" />
          </div> */}
          <div className="mr-3 cursor-pointer flex items-center space-x-2">
            <p className="text-xs">Filter:</p>
            <div
              onClick={() => handleActiveCashier(true)}
              className="px-3 py-1 rounded-lg cursor-pointer hover:bg-neutral-200 bg-neutral-100 transition-color duration-200 text-xs"
            >
              Active cashiers
            </div>

            <div
              onClick={() => handleActiveCashier(false)}
              className="px-3 py-1 rounded-lg cursor-pointer hover:bg-neutral-200 bg-neutral-100 transition-color duration-200 text-xs"
            >
              Inactive cashiers
            </div>
            {/* <Filter /> */}
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
