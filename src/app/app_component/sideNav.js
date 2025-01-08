import React from "react";
import {
  LogoIcon,
  Setting,
  Sales,
  Dashboard,
  Cashier,
  Notifications,
} from "../../../public/icon";
import Link from "next/link";
import LogoutButton from "../components/logoutButton";

const SideNav = () => {
  return (
    <div className="fixed h-screen w-[20vw] bg-white left-0 top-0 pt-12 flex flex-col items-center shadow-md px-5 z-10">
      {/* <LogoIcon className="h-16 w-16 mb-12" />
       */}

      <div className="h-full w-full flex flex-col justify-between mt-10 pb-10">
        <div className="w-full flex flex-col">
          <Link
            className="flex space-x-2 items-center hover:bg-purple-100 flex-grow rounded-md px-3 py-3 transition-all duration-200"
            href="/admin/app"
          >
            <Dashboard className="stroke-neutral-600 w-5 h-full" />
            <p>Dashboard</p>
          </Link>
          <Link
            className="flex space-x-2 items-center hover:bg-purple-100 flex-grow rounded-md px-3 py-3 transition-all duration-200"
            href="/admin/app/sales"
          >
            <Sales className="stroke-neutral-600 stroke-2 w-5 h-full" />
            <p>Sales</p>
          </Link>
          <Link
            className="flex space-x-2 items-center hover:bg-purple-100 flex-grow rounded-md px-3 py-3 transition-all duration-200"
            href="/admin/app/cashiers"
          >
            <Cashier className="fill-neutral-600 w-5 h-full" />
            <p>Cashiers</p>
          </Link>

          <Link
            className="flex space-x-2 items-center hover:bg-purple-100 flex-grow rounded-md px-3 py-3 transition-all duration-200"
            href="/admin/app/notifications"
          >
            <Notifications className="fill-neutral-600 w-5 h-full" />
            <p>Notifications</p>
          </Link>
        </div>

        <div className="w-full flex flex-col">
          <Link
            className="flex space-x-2 items-center hover:bg-purple-100 flex-grow rounded-md px-3 py-3 transition-all duration-200"
            href="/admin/app/settings"
          >
            <Setting className="stroke-neutral-600 w-5 h-full" />
            <p>Settings</p>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
