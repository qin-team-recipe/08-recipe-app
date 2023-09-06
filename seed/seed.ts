import { userLinkSeed, userSeed, userSeedData } from "./seeds/";

(async () => {
  console.log("seed start");
  await userSeed(userSeedData);
  await userLinkSeed();
  console.log("seed end");
})();
