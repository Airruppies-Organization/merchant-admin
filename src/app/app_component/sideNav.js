import React from "react";
import {
  LogoIcon,
  Sales,
  Dashboard,
  Cashier,
  Notifications,
} from "../../../public/icon";
import Link from "next/link";

const SideNav = () => {
  return (
    <div className="fixed h-screen w-20 bg-[#61088E] left-0 top-0 pt-12 flex flex-col items-center">
      <LogoIcon className="h-16 w-16 mb-12" />

      <div className="flex flex-col items-center">
        <Link href="/admin">
          <Dashboard className="h-10 w-10 mb-5 hover:cursor-pointer hover:bg-[#7F1AB2] p-2 rounded-lg" />
        </Link>
        <Link href="/admin/sales">
          <Sales className="h-10 w-10 mb-5 hover:cursor-pointer hover:bg-[#7F1AB2] p-2 rounded-lg" />
        </Link>
        <Link href="/admin/cashiers">
          <Cashier className="fill-white h-11 w-11 mb-5 hover:cursor-pointer hover:bg-[#7F1AB2] p-2 rounded-lg" />
        </Link>
        <Link href="/admin/notifications">
          <Notifications className="fill-white h-10 w-10 mb-5 hover:cursor-pointer hover:bg-[#7F1AB2] p-2 rounded-lg" />
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
