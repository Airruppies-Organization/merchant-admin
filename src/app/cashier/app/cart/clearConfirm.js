"use client";

import React from "react";
import CashierContext from "@/app/context/cashierContext";
import { useContext } from "react";

const ClearConfirm = () => {
  const { voidHandler } = useContext(CashierContext);
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
      <div className="w-[30vw] h-[20vw] bg-white rounded-xl p-4 flex flex-col items-center justify-center">
        <div className="">
          <p>Are you sure?</p>
        </div>
        <div className="mt-4 flex w-full justify-center items-center">
          <div
            onClick={() => voidHandler("no")}
            className="h-10 w-20 flex items-center justify-center bg-[#61088E] rounded-md mr-7 cursor-pointer"
          >
            <p className="text-white ">No</p>
          </div>
          <div onClick={() => voidHandler("yes")}>
            <p className="text-[#61088E] underline underline-offset-4 cursor-pointer">
              Yes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearConfirm;
