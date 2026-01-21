import prisma from "../config/prisma.js";

export async function matchBundles(profile) {
  const { usageType, budget, durationDays } = profile;

  let bundles = await prisma.bundle.findMany({
    where: {
      price: { lte: Number(budget) || 1000000 },
      durationDays: { gte: Number(durationDays) || 0 },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  bundles = bundles.filter((bundle) => {
    if (!bundle.tags || bundle.tags.length === 0) return true;
    return bundle.tags.some(
      (mapping) => mapping.tag.name.toLowerCase() === usageType.toLowerCase(),
    );
  });

  return bundles;
}
