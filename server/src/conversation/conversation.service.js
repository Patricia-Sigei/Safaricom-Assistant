import bundleService from "../features/bundles/bundles.service.js";

export async function getRecommendations(profile) {
  const bundles = await bundleService.findBundles(profile);

  return bundles.map((bundle) => {
    const tagNames = bundle.tags.map((mapping) => mapping.tag.name);
    return {
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
      explanation:
        tagNames.length > 0
          ? `Bundle ${bundle.name} is recommended for ${profile.usageType} users.`
          : `Bundle ${bundle.name} fits any usage type.`,
      tags: tagNames,
    };
  });
}
