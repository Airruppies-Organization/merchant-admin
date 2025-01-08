"use client";

import React from "react";
import { useContext } from "react";
import AdminContext from "../context/adminContext";

const LogoutButton = () => {
  const { logoutHandler } = useContext(AdminContext);
  return (
    <div
      className="flex space-x-2 items-center bg-[#f75757] hover:bg-red-500 flex-grow rounded-md px-3 py-3 transition-all duration-200"
      onClick={() => logoutHandler()}
    >
      {/* <Sales className="stroke-neutral-600 stroke-2 w-5 h-full" /> */}
      <p>Logout</p>
    </div>
  );
};

export default LogoutButton;
