import { Prisma, PrismaClient } from "@prisma/client";
import { userSeed } from "./seed/index";

const prisma = new PrismaClient();
const recipeData: Prisma.RecipeCreateInput[] = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
//const userData: Prisma.UserCreateInput[] = userSeed;

(async () => {
  await Promise.all([
    recipeData.map(async (data) => {
      await prisma.recipe.create({ data });
    }),
    userSeed.map(async (data: Prisma.UserCreateInput) => {
      await prisma.user.create({ data });
    })
  ]);
  const recipes = await prisma.recipe.findMany();
  console.log(recipes);
  const users = await prisma.user.findMany();
  console.log('users', users);
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
