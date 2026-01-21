import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import bundleRoutes from "./src/features/bundles/bundles.routes.js";
import conversationRoutes from "./src/conversation/conversation.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Safaricom Assistant!");
});

app.use("/api/bundles", bundleRoutes);
app.use("/api/conversation", conversationRoutes);

export default app;
