import bundleService from "./bundles.service.js";

// list bundles
export async function listBundles(req, res) {
  const { usageType, budget, durationDays } = req.query;

  try {
    const bundles = await bundleService.findBundles({
      usageType,
      budget: Number(budget),
      durationDays: Number(durationDays),
    });

    res.json({ status: "ok", bundles });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch bundles" });
  }
}

// getbundle by id
export async function getBundle(req, res) {
  const { id } = req.params;

  try {
    const bundle = await bundleService.getBundleById(id);
    if (!bundle)
      return res
        .status(404)
        .json({ status: "error", message: "Bundle not found" });

    const tags = bundle.tags.map((mapping) => mapping.tag.name);

    res.json({ status: "ok", bundle: { ...bundle, tags } });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch bundle" });
  }
}
