import React from "react";
import { Logo } from "../../../public/icon";

const Header = () => {
  return (
    <div className="w-full h-16 border-b-[0.5px] border-b-black flex items-center">
      <div className="mr-auto ml-auto h-full w-[52vw] flex items-center">
        <Logo className="w-32 h-10" />
      </div>
    </div>
  );
};

export default Header;
