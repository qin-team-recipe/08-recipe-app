import { Prisma, PrismaClient } from "@prisma/client";

import {
  recipeCookingProcedureSeed,
  recipeImageSeed,
  recipeIngredientSeed,
  recipeLinkSeed,
  recipeSeed,
  userChefLinkSeed,
  userChefSeed,
  userSeed,
} from "./seed/index";

const prisma = new PrismaClient();

(async () => {
  await userSeed();
  await userChefSeed();
  await userChefLinkSeed();
  await recipeSeed();
  await recipeIngredientSeed();
  await recipeCookingProcedureSeed();
  await recipeImageSeed();
  await recipeLinkSeed();
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
