import { recipeSeed, userLinkSeed, userSeed, userSeedData } from "./seeds/";

(async () => {
  console.log("seed start");
  await userSeed(userSeedData);
  await userLinkSeed();
  await recipeSeed();
  console.log("seed end");
})();
