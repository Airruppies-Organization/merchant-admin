// app/ClientLayout.js
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import SideNav from "./app_component/sideNav";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ThemeProvider theme={theme}>
      {isAdmin && <SideNav />}
      <main>{children}</main>
    </ThemeProvider>
  );
}
