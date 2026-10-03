import { demoOpportunities } from "./demoOpportunities.js";

async function searchDemoSource(searchProfile) {
  const { product, targetCustomer, location } = searchProfile;

  console.log("Running demo discovery with:", {
    product,
    targetCustomer,
    location,
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  return demoOpportunities;
}

export { searchDemoSource };