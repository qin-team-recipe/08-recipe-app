import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const recipeData: Prisma.RecipeCreateInput[] = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
(async () => {
  await Promise.all(
    recipeData.map(async (data) => {
      await prisma.recipe.create({ data });
    })
  );
  const recipes = await prisma.recipe.findMany();
  console.log(recipes);
})()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
