import { getIO } from "../config/socket.js";
import { getSession, saveSession } from "../middleware/sessionMiddleware.js";
import { getNextStep } from "../conversation/conversation.rules.js";
import { getRecommendations } from "./recommendation.service.js";

export async function handleUserMessage(userId, message) {
  let session = (await getSession(userId)) || { profile: {} };
  const profile = session.profile;

  if (session.lastField) {
    profile[session.lastField] = message.trim();
    session.lastField = null;
    await saveSession(userId, session);
  }

  const step = getNextStep(profile);

  if (!step.profileComplete) {
    session.lastField = step.nextField;
    await saveSession(userId, session);

    return getIO().to(userId).emit("assistant_response", {
      message: step.question,
    });
  }

  const recommendedBundles = await getRecommendations(profile);

  getIO().to(userId).emit("bundle_recommendations", recommendedBundles);

  getIO().to(userId).emit("assistant_response", {
    message:
      "Here are the best bundles for you. You can select one by replying with its name or ask for alternatives.",
  });

  session.lastRecommendation = recommendedBundles.map((b) => b.id);
  await saveSession(userId, session);
}
