// themes/theme.js
"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF", // Change primary color
    },
    secondary: {
      main: "#61088E", // Change secondary color
    },
    border: {
      main: "#636363",
    },
  },
});

export default theme;
