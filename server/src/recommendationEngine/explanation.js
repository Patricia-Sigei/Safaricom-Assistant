export function explainBundles(bundles, profile) {
  return bundles.map((bundle) => {
    const tagNames = bundle.tags.map((t) => t.tag.name).join(", ") || "any";

    return {
      ...bundle,
      explanation: `Bundle "${bundle.name}" is recommended for ${tagNames} users, within your budget of KES ${profile.budget}, lasting ${bundle.durationDays} days.`,
    };
  });
}
