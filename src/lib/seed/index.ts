import { recipeImageSeed } from "@/lib/seed/recipe-image-seed";

import { recipeCookingProcedureSeed } from "./recipe-cooking-procedure-seed";
import { recipeFavoriteSeed } from "./recipe-favorite-seed";
import { recipeIngredientSeed } from "./recipe-ingredient-seed";
import { recipeLinkSeed } from "./recipe-link-seed";
import { recipeSeed } from "./recipe-seed";
import { userFollowSeed } from "./user-follow-seed";
import { userLinkSeed } from "./user-link-seed";
import { userSeed, userSeedData } from "./user-seed";

(async () => {
  console.log("seed start");
  await userSeed(userSeedData);
  await userLinkSeed();
  await recipeSeed();
  await recipeIngredientSeed();
  await recipeCookingProcedureSeed();
  await recipeImageSeed();
  await recipeLinkSeed();
  await userFollowSeed();
  await recipeFavoriteSeed();
  console.log("seed end");
})();
