"use client";

import { Box, Typography } from "@mui/material";
export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Safaricom Assistant
      </Typography>
    </Box>
  );
}
