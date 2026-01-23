import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

socket.on("connect", () => {
  console.log("Connected as", socket.id);

  socket.emit("user_message", "video");
  socket.emit("user_message", "500");
  socket.emit("user_message", "7");
  socket.emit("user_message", "high");
});

socket.on("assistant_response", (data) => {
  console.log("Assistant:", data.message);
});

socket.on("bundle_recommendations", (bundles) => {
  console.log("Bundles:", bundles);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
