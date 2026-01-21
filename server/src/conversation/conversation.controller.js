import { getNextStep } from "./conversation.rules.js";
import { getRecommendations } from "./recommendation.service.js";
import redis from "../config/redis.js";
import { getIO } from "../config/socket.js";

export async function handleMessage(req, res) {
  const { session, sessionId } = req;
  const message = req.body.message;

  const nextStep = getNextStep(session);
  if (nextStep.nextField && message) {
    session[nextStep.nextField] = message;
  }

  const updatedStep = getNextStep(session);
  if (updatedStep.profileComplete) {
    const recommendations = await getRecommendations(session);

    const io = getIO();
    io.to(sessionId).emit("chatUpdate", {
      recommendations,
      profileComplete: true,
    });

    await redis.set(sessionId, JSON.stringify(session));

    return res.json({ status: "ok", message: "Profile complete" });
  }

  await redis.set(sessionId, JSON.stringify(session));

  res.json({
    status: "ok",
    question: updatedStep.question,
    profileComplete: false,
  });
}
