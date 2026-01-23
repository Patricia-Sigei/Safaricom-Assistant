"use client";

import React from "react";
import { Box } from "@mui/material";
import { MainAppBar } from "@/components/common/MainAppBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <MainAppBar />
      {children}
    </Box>
  );
};

export default MainLayout;
