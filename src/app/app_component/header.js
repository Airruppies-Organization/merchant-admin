import React from "react";
import { Avatar, Box } from "@mui/material";

const Header = ({ name, role }) => {
  return (
    <div className="w-full h-20 flex justify-between items-center px-10 bg-white shadow-md sticky top-0 z-50">
      <p className="text-xl text-[#61088E] font-bold ">JustRuppies</p>
      <div className="flex items-center justify-end">
        <Avatar src="/avatar.png" alt="Samuel" />
        <div className="ml-1">
          <p>{name}</p>
          <p className="text-[10px]">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
