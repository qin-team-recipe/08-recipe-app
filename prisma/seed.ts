import { Prisma, PrismaClient } from "@prisma/client";

import {
  recipeCookingProcedureSeed,
  recipeImageSeed,
  recipeIngredientSeed,
  recipeLinkSeed,
  recipeSeed,
  userSeed,
} from "./seed/index";

const prisma = new PrismaClient();
// const recipeData: Prisma.RecipeCreateInput[] = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
const userData: Prisma.UserCreateInput[] = userSeed;
// const userChefData: Prisma.UserChefCreateInput[] = userChefSeed;

(async () => {
  // await Promise.all([
  //   userData.map(async (data: Prisma.UserCreateInput) => {
  //     await prisma.user.create({ data });
  //   }),
  //   // userChefData.map(async (data: Prisma.UserChefCreateInput) => {
  //   //   prisma.userChef.create({ data });
  //   // }),
  // ]);
  userData.map(async (data: Prisma.UserCreateInput) => {
    console.log("userData create", data);
    await prisma.user.create({ data });
  });
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
