import { userLinkSeed } from "./user-link-seed";
import { userSeed, userSeedData } from "./user-seed";

(async () => {
  console.log("seed start");
  await userSeed(userSeedData);
  await userLinkSeed();
  console.log("seed end");
})();
