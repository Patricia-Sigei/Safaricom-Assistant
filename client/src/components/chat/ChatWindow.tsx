"use client";

import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { getSocket } from "@/shared/socket";
import { Message, Bundle } from "@/shared/types";
import MessageBubble from "./MessageBubble";
import BundleCard from "./BundleCard";
import InputBar from "./InputBar";

export default function ChatWindow() {
  const socket = getSocket();

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hi! I’ll help you find the best data bundle. What do you mainly use data for?",
    },
  ]);

  const [bundles, setBundles] = useState<Bundle[]>([]);

  useEffect(() => {
    socket.on("assistant_response", (data) => {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: data.message },
      ]);
    });

    socket.on("bundle_recommendations", (data: Bundle[]) => {
      setBundles(data);
    });

    return () => {
      socket.off("assistant_response");
      socket.off("bundle_recommendations");
    };
  }, [socket]);

  function sendMessage(text: string) {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    socket.emit("user_message", text);
  }

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 1000,
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box flex={1} p={2} overflow="auto">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        {bundles.length > 0 && (
          <Box
            mt={2}
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(230px,1fr))"
            gap={2}
          >
            {bundles.map((b) => (
              <BundleCard key={b.id} bundle={b} />
            ))}
          </Box>
        )}
      </Box>

      <InputBar onSend={sendMessage} />
    </Paper>
  );
}
