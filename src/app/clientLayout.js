// app/ClientLayout.js
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import SideNav from "./app_component/sideNav";
import Header from "./app_component/header";
import { useContext } from "react";
import AdminContext from "./context/adminContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin") && pathname.includes("/app");

  if (isAdmin) {
    return (
      <ThemeProvider theme={theme}>
        <main>
          <Header name="Victor K. Okafor" role="Admin" />
          <div>
            <SideNav />
            <section className="w-full pl-[20vw]">{children}</section>
          </div>
        </main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
        {/* <Header name="Victor K. Okafor" role="Admin" /> */}
        <div>
          <section className="w-full">{children}</section>
        </div>
      </main>
    </ThemeProvider>
  );
}
