import { searchDemoSource } from "./demoDiscovery.source.js";

async function findOpportunities(searchProfile) {
  if (!searchProfile?.whatTheySell && !searchProfile?.product) {
    throw new Error("whatTheySell or product is required");
  }

  if (!searchProfile?.targetCustomer) {
    throw new Error("targetCustomer is required");
  }

  try {
    const rawOpportunities = await searchDemoSource({
      ...searchProfile,
      product: searchProfile.product ?? searchProfile.whatTheySell,
    });

    return rawOpportunities.map((post) => ({
      ...post,
      source: post.source ?? post.platform,
      url: post.url ?? post.link,
      location: post.location ?? searchProfile.location ?? "",
      postedAt: post.postedAt ?? post.created_at,
    }));
  } catch (error) {
    console.error("Discovery failed:", error);

    throw new Error("Unable to discover opportunities");
  }
}

export {
  findOpportunities,
};