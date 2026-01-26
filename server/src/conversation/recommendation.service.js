import * as match from "../recommendationEngine/match.js";
import * as scorer from "../recommendationEngine/scorer.js";
import * as explanation from "../recommendationEngine/explanation.js";

export async function getRecommendations(profile) {
  const recommendedBundles = await match.matchBundles(profile);
  const scored = scorer.scoreBundles(recommendedBundles, profile);
  const recommended = explanation.explainBundles(scored, profile);

  const TOP_K = 5;
  const topResults = recommended.slice(0, TOP_K);

  return topResults.map((bundle) => ({
    id: bundle.id,
    name: bundle.name,
    price: bundle.price,
    durationDays: bundle.durationDays,
    dataAmountMb: bundle.dataAmountMb,
    bonusDataMb: bundle.bonusDataMb,
    bonusSms: bundle.bonusSms,
    bonusCallsMin: bundle.bonusCallsMin,
    expiryType: bundle.expiryType,
    autoRenew: bundle.autoRenew,
    tags: bundle.tags.map((t) => t.tag.name),
    explanation: bundle.explanation,
  }));
}
