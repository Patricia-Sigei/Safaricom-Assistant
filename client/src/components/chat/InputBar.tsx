"use client";

import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function InputBar({
  onSend,
}: {
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  return (
    <Box display="flex" gap={1} p={2} borderTop="1px solid #eee">
      <TextField
        fullWidth
        size="small"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button variant="contained" onClick={send}>
        Send
      </Button>
    </Box>
  );
}
