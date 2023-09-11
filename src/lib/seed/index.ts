import { recipeFavoriteSeed } from "./recipe-favorite-seed";
import { recipeSeed } from "./recipe-seed";
import { userFollowSeed } from "./user-follow-seed";
import { userLinkSeed } from "./user-link-seed";
import { userSeed, userSeedData } from "./user-seed";

(async () => {
  console.log("seed start");
  await userSeed(userSeedData);
  await userLinkSeed();
  await recipeSeed();
  await userFollowSeed();
  await recipeFavoriteSeed();
  console.log("seed end");
})();
