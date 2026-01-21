import express from "express";
import { handleMessage } from "./conversation.controller.js";
import sessionMiddleware from "../middleware/sessionMiddleware.js";

const router = express.Router();

router.post("/chat/message", sessionMiddleware, handleMessage);

export default router;
