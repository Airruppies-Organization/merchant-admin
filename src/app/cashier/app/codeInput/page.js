"use client";

import React from "react";
import Header from "@/app/app_component/header";
import Sub from "./sub";
import CodeInput from "./codeInput";
import { useContext } from "react";
import CashierContext from "../../../context/cashierContext";

const Cashier = () => {
  const { cartItems } = useContext(CashierContext);

  return (
    <div className="w-[70vw] mr-auto ml-auto relative">
      <Header name="Samuel T. Kayode" role="Cashier" />
      {/* <Sub /> */}

      <div className="w-full h-screen absolute flex flex-col items-center justify-center top-0 z-[-1]">
        <p className="text-2xl">Enter New Code</p>

        <CodeInput />

        <button
          onClick={cartItems}
          className="text-white bg-[#61088E] py-2 px-8 text-sm rounded-lg mt-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Cashier;
