import redis from "../config/redis.js";
import { v4 as uuidv4 } from "uuid";

export default async function sessionMiddleware(req, res, next) {
  let sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    sessionId = uuidv4();
    res.setHeader("x-session-id", sessionId);
  }

  const sessionData = await redis.get(sessionId);
  if (sessionData) {
    req.session = JSON.parse(sessionData);
  } else {
    req.session = {
      usageType: null,
      budget: null,
      duration: null,
      frequency: null,
      lastStep: "ask_usage",
    };
    await redis.set(sessionId, JSON.stringify(req.session));
  }

  req.sessionId = sessionId;
  next();
}
