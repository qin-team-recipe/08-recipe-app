import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recipeImageSeed = async () => {
  const recipes = await prisma.recipe.findMany();

  const recipeImages: Prisma.RecipeImageUncheckedCreateInput[] = [
    {
      recipeId: recipes[0].id,
      imgSrc: "basic_hamberg.webp",
      sort: 0,
    },
    {
      recipeId: recipes[0].id,
      imgSrc: "basic_hamberg.webp",
      sort: 1,
    },
    {
      recipeId: recipes[1].id,
      imgSrc: "/recipes/toba_mentai_pasta.jpeg",
      sort: 0,
    },
    {
      recipeId: recipes[1].id,
      imgSrc: "/recipes/toba_mentai_pasta.jpeg",
      sort: 1,
    },
    {
      recipeId: recipes[2].id,
      imgSrc: "/recipes/toba_mugen_pasta.jpeg",
      sort: 0,
    },
    {
      recipeId: recipes[2].id,
      imgSrc: "/recipes/toba_mugen_pasta.jpeg",
      sort: 1,
    },
    {
      recipeId: recipes[3].id,
      imgSrc: "/recipes/toba_parapara_chahan.jpeg",
      sort: 0,
    },
    {
      recipeId: recipes[3].id,
      imgSrc: "/recipes/toba_parapara_chahan.jpeg",
      sort: 1,
    },
  ];

  for (const recipeImage of recipeImages) {
    await prisma.recipeImage.create({
      data: {
        ...recipeImage,
      },
    });
  }
};
