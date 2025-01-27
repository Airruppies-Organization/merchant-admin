"use client";

import React from "react";
import { useContext } from "react";
import AdminContext from "../context/adminContext";

const Header = ({ name, role }) => {
  const { profile } = useContext(AdminContext);

  return (
    <div className="w-full h-20 flex justify-between items-center px-10 bg-white shadow-md sticky top-0 z-20">
      <p className="text-xl text-[#61088E] font-bold ">JustRuppies</p>
      <div className="flex items-center justify-end">
        <div className="ml-1">
          <p>
            {profile?.firstName || name} {profile?.lastName || ""}
          </p>
          <p className="text-[10px]">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
