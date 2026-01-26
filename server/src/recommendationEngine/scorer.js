export function scoreBundles(bundles, profile) {
  return bundles
    .map((bundle) => {
      let score = 0;

      // Tag relevance
      if (bundle.tags.length > 0) score += 30;

      // Price closeness
      const priceDiff = Math.abs(bundle.price - profile.budget);
      score += Math.max(0, 30 - priceDiff);

      // Duration match
      const durationDiff = Math.abs(bundle.durationDays - profile.duration);
      score += Math.max(0, 20 - durationDiff);

      // Frequency logic
      if (profile.frequency === "high" && bundle.durationDays <= 7) score += 20;
      if (profile.frequency === "medium" && bundle.durationDays <= 14)
        score += 20;
      if (profile.frequency === "low" && bundle.durationDays >= 30) score += 20;

      return { ...bundle, score };
    })
    .sort((a, b) => b.score - a.score);
}
