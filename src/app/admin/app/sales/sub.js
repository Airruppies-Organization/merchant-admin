import React from "react";
import { Filter, Add, Search } from "../../../../../public/icon";

const Sub = ({
  setModal,
  modal,
  salesSearch,
  setSalesSearch,
  handleSearchSale,
  paymentMethodFilter,
}) => {
  return (
    <div>
      <div className="w-full h-12 flex justify-between items-center px-4 mb-3">
        <div className="flex items-end">
          <p className="text-lg mr-4 h-min text-end">Sales</p>
          <form
            onSubmit={handleSearchSale}
            className="border-b-2 border-b-[#61088E] px-2 flex"
          >
            <Search className="stroke-neutral-500 mr-3" />
            <input
              placeholder="Search Cashier..."
              type="text"
              value={salesSearch}
              onChange={(e) => {
                setSalesSearch(e.target.value);
              }}
              className="focus:outline-none text-sm"
            />
          </form>
        </div>
        <div className="flex items-center">
          <div className="mr-3 cursor-pointer flex items-center space-x-2">
            <p className="text-xs">Filter:</p>
            <div
              onClick={() => paymentMethodFilter("Card")}
              className="px-3 py-1 rounded-lg cursor-pointer hover:bg-neutral-200 bg-neutral-100 transition-color duration-200 text-xs"
            >
              Card
            </div>

            <div
              onClick={() => paymentMethodFilter("Cash")}
              className="px-3 py-1 rounded-lg cursor-pointer hover:bg-neutral-200 bg-neutral-100 transition-color duration-200 text-xs"
            >
              Cash
            </div>
            <div
              onClick={() => paymentMethodFilter("Transfer")}
              className="px-3 py-1 rounded-lg cursor-pointer hover:bg-neutral-200 bg-neutral-100 transition-color duration-200 text-xs"
            >
              Transfer
            </div>
            {/* <Filter /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sub;
