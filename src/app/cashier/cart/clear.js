"use client";

import React from "react";
import { useContext } from "react";
import CashierContext from "@/app/context/cashierContext";

const Clear = () => {
  const { clearItem } = useContext(CashierContext);
  return (
    <div className="mt-6">
      <p>Clear as:</p>
      <div className="flex justify-between items-center rounded-xl p-1 bg-[#F9F9F9]">
        <span
          onClick={() => clearItem("Card")}
          className="hover:bg-white h-14 w-full text-xs hover:rounded-lg hover:shadow-xl flex items-center justify-center hover:cursor-pointer"
        >
          POS
        </span>
        <span
          onClick={() => clearItem("Bank Trf.")}
          className="hover:bg-white h-14 w-full text-xs hover:rounded-lg hover:shadow-xl flex items-center justify-center hover:cursor-pointer"
        >
          Transfer
        </span>
        <span
          onClick={() => clearItem("Cash")}
          className="hover:bg-white h-14 w-full text-xs hover:rounded-lg hover:shadow-xl flex items-center justify-center hover:cursor-pointer"
        >
          Cash
        </span>
      </div>
    </div>
  );
};

export default Clear;
