export function getNextStep(session) {
  if (!session.usageType)
    return {
      nextField: "usageType",
      question:
        "What do you mainly use your data for? (video, social, browsing)",
    };
  if (!session.budget)
    return {
      nextField: "budget",
      question: "What is your budget for the data bundle?",
    };
  if (!session.duration)
    return {
      nextField: "duration",
      question: "How many days do you want the bundle to last?",
    };
  if (!session.frequency)
    return {
      nextField: "frequency",
      question: "How often do you use data? (low, medium, high)",
    };
  return { nextField: null, question: null, profileComplete: true };
}
