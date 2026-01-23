"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import safaricomTheme from "./theme";

export default function Style({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={safaricomTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
