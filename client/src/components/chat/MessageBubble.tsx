import { Message } from "@/shared/types";
import { Box, Paper, Typography } from "@mui/material";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";

  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      mb={1}
    >
      <Paper
        sx={{
          px: 2,
          py: 1,
          maxWidth: 320,
          bgcolor: isUser ? "primary.main" : "grey.200",
          color: isUser ? "white" : "black",
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
      </Paper>
    </Box>
  );
}
