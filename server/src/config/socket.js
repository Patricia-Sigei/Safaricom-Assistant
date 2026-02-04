import { Server } from "socket.io";
import prisma from "../config/prisma.js";

let io;

export function initSocket(server) {
  io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("user_message", async (msg) => {
      console.log("Received from client:", msg);

      socket.emit("assistant_response", {
        message: `Got it. I can help you find the best bundle for your needs.

To narrow this down quickly:

• How long should the bundle last (daily, weekly, monthly)?`,
      });

      try {
        const bundles = await prisma.bundle.findMany({
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            durationDays: true,
            dataAmountMb: true,
            bonusDataMb: true,
            bonusSms: true,
            bonusCallsMin: true,
            expiryType: true,
            autoRenew: true,
            planRestriction: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        socket.emit("bundle_recommendations", bundles);
      } catch (err) {
        console.error("Error fetching bundles:", err);
        socket.emit("bundle_recommendations", []);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}
