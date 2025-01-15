"use client";

import React from "react";
import Clear from "./clear";
import CashierContext from "@/app/context/cashierContext";
import { useContext } from "react";

const Detail = ({ status, method, total }) => {
  const { setVoidModal, clearItem, cart } = useContext(CashierContext);
  return (
    <div className="w-[22vw] h-full">
      <div className="bg-[#F9F9F9] rounded-xl">
        <div className="px-3 pt-3 pb-1 border-b-black border-b">
          <p className="text-sm font-semibold">Payment Summary</p>
        </div>

        <div className="py-1 px-3 border-b border-b-black">
          <span className="flex justify-between mb-2 text-xs">
            <p>Sub Total:</p>
            <p>{total && total.toFixed(2)}</p>
          </span>
          <span className="flex justify-between mb-2 text-xs">
            <p>VAT:</p>
            <p>0.00</p>
          </span>
          <span className="flex justify-between mb-2 text-xs">
            <p>Voucher</p>
            <p>-0.00%</p>
          </span>
        </div>
        <div className="py-1 px-3 font-semibold">
          <span className="flex justify-between mb-2 text-sm">
            <p>Total</p>
            <p>{total && total.toFixed(2)}</p>
          </span>
          <span className="flex justify-between mb-2 text-sm">
            <p>Status</p>
            <p
              className={`${
                status === "paid" ? "text-[#0FBD00]" : "text-[#e02121]"
              }`}
            >
              {status}
            </p>
            {/* {status === "paid" ? (
              <p className="text-[#0FBD00]">Paid</p>
            ) : (
              <p className="">Not Paid</p>
            )} */}
          </span>
          <span className="flex justify-between mb-2 text-sm">
            <p>Mode of Payment:</p>
            <p>{method}</p>
          </span>
        </div>
      </div>

      {/* <Clear /> */}
      <button
        onClick={clearItem}
        className="px-6 py-3 rounded-lg text-xs bg-[#61088E] text-white mt-6"
      >
        Clear order
      </button>
      {/* <button
        onClick={() => setVoidModal(() => true)}
        className="px-6 py-3 rounded-lg text-xs bg-[#D50F0F] text-white mt-6"
      >
        Void Products
      </button> */}
    </div>
  );
};

export default Detail;
