"use client";

import { Box, Typography } from "@mui/material";
import ChatWindow from "@/components/chat/ChatWindow";

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
        Let's Help You Find the Best Data Bundle!
      </Typography>
      <ChatWindow />
    </Box>
  );
}
