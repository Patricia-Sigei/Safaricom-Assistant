export function scoreBundles(bundles, profile) {
  return bundles
    .map((bundle) => {
      let score = 0;

      const priceDiff = profile.budget - bundle.price;
      score += Math.max(0, 50 - Math.abs(priceDiff));

      if (
        bundle.tags.some(
          (t) => t.tag.name.toLowerCase() === profile.usageType.toLowerCase(),
        )
      ) {
        score += 30;
      }

      if (bundle.durationDays === profile.durationDays) score += 20;

      return { ...bundle, score };
    })
    .sort((a, b) => b.score - a.score);
}
