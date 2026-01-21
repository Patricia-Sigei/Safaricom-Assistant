import redis from "../config/redis.js";

export async function getSession(sessionId) {
  const data = await redis.get(sessionId);
  return data ? JSON.parse(data) : null;
}

export async function saveSession(sessionId, sessionData) {
  await redis.set(sessionId, JSON.stringify(sessionData));
}
