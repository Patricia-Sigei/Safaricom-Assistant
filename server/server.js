import "dotenv/config";
import http from "http";
import app from "./app.js";
import { initSocket } from "./src/config/socket.js";

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and Socket.IO ready`);
});
