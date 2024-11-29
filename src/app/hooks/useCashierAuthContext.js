"use client";

import { CashierAuthContext } from "../context/cashierRegContext";
import { useContext } from "react";

export const useCashierAuthContext = () => {
  const context = useContext(CashierAuthContext);

  if (!context) {
    throw Error(
      "useCashierAuthContext must be used inside the CashierContextProvider"
    );
  }

  return context;
};
