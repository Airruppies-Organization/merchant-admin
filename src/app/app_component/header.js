import React from "react";
import { Avatar, Box } from "@mui/material";

const Header = ({ name, role }) => {
  return (
    <div className="w-full h-20 flex items-center justify-end pr-10">
      <Avatar src="/avatar.png" alt="Samuel" />
      <div className="ml-1">
        <p>{name}</p>
        <p className="text-[10px]">{role}</p>
      </div>
    </div>
  );
};

export default Header;
