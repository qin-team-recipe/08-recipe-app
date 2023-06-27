import { Prisma, PrismaClient } from "@prisma/client";

import { userSeed } from "./seed/index";

const prisma = new PrismaClient();
// const recipeData: Prisma.RecipeCreateInput[] = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
const userData: Prisma.UserCreateInput[] = userSeed;
// const userChefData: Prisma.UserChefCreateInput[] = userChefSeed;

(async () => {
  await Promise.all([
    userData.map(async (data: Prisma.UserCreateInput) => {
      await prisma.user.create({ data });
    }),
    // userChefData.map(async (data: Prisma.UserChefCreateInput) => {
    //   prisma.userChef.create({ data });
    // }),
  ]);
  // const recipes = await prisma.recipe.findMany();
  // console.log(recipes);
  //   const users = await prisma.user.findMany();
  // console.log("users", users);
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
