import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recipeLinkSeed = async () => {
  const recipes = await prisma.recipe.findMany();

  const recipeLinks: Prisma.RecipeLinkUncheckedCreateInput[] = [
    {
      recipeId: recipes[0].id,
      url: "https://cookpad.com/recipe/4748850",
      category: "other",
      sort: 0,
    },
    {
      recipeId: recipes[1].id,
      url: "https://www.kurashiru.com/recipes/9f751232-2656-43dd-8f31-80fc365ff2b6",
      category: "other",
      sort: 0,
    },
    {
      recipeId: recipes[1].id,
      url: "https://www.youtube.com/watch?v=da0ZhjcrynU",
      category: "youtube",
      sort: 1,
    },
    {
      recipeId: recipes[2].id,
      url: "https://www.kurashiru.com/recipes/b9c05771-ef26-4c88-8c6f-7692ce1b631e",
      category: "other",
      sort: 1,
    },
    {
      recipeId: recipes[3].id,
      url: "https://www.kurashiru.com/recipes/3a83bedb-7082-45ab-9ed9-e47b350c120c",
      category: "other",
      sort: 0,
    },
  ];

  for (const recipeLink of recipeLinks) {
    await prisma.recipeLink.create({
      data: {
        ...recipeLink,
      },
    });
  }
};
