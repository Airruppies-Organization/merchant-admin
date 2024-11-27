"use client";

import { AdminAuthContext } from "../context/adminRegContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside the AuthContextProvider");
  }

  return context;
};
