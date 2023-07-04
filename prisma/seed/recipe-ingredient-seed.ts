import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recipeIngredientSeed = async () => {
  const recipes = await prisma.recipe.findMany();

  const recipeIngredients: Prisma.RecipeIngredientUncheckedCreateInput[] = [
    {
      recipeId: recipes[0].id,
      name: "スパゲティ 100g",
      sort: 0,
    },
    {
      recipeId: recipes[0].id,
      name: "お湯 (ゆで用) 1000ml",
      sort: 1,
    },
    {
      recipeId: recipes[0].id,
      name: "塩 (ゆで用)　小さじ2",
      sort: 2,
    },
    {
      recipeId: recipes[0].id,
      name: "明太子（明太子ソース用） 40g",
      sort: 3,
    },
    {
      recipeId: recipes[0].id,
      name: "無塩バター（明太子ソース用） 15g",
      sort: 4,
    },
    {
      recipeId: recipes[0].id,
      name: "オリーブオイル（明太子ソース用） 小さじ1",
      sort: 5,
    },
    {
      recipeId: recipes[0].id,
      name: "ニンニク（ニンニクオイル） 10g",
      sort: 6,
    },
    {
      recipeId: recipes[0].id,
      name: "オリーブオイル（ニンニクオイル） 50g",
      sort: 7,
    },
    {
      recipeId: recipes[0].id,
      name: "イタリアンパセリ (生)（トッピング） 適量",
      sort: 8,
    },
    {
      recipeId: recipes[0].id,
      name: "粗挽き黒こしょう（トッピング） 適量",
      sort: 9,
    },
    {
      recipeId: recipes[1].id,
      name: "スパゲティ 100g",
      sort: 0,
    },
    {
      recipeId: recipes[1].id,
      name: "お湯 (ゆで用) 1000ml",
      sort: 1,
    },
    {
      recipeId: recipes[1].id,
      name: "塩 (ゆで用)　小さじ2",
      sort: 2,
    },
    {
      recipeId: recipes[1].id,
      name: "しめじ　30g",
      sort: 3,
    },
    {
      recipeId: recipes[1].id,
      name: "まいたけ 30g",
      sort: 4,
    },
    {
      recipeId: recipes[1].id,
      name: "塩　少々",
      sort: 5,
    },
    {
      recipeId: recipes[1].id,
      name: "白こしょう　少々",
      sort: 6,
    },
    {
      recipeId: recipes[1].id,
      name: "（A）めんつゆ（5倍濃縮） 小さじ1",
      sort: 7,
    },
    {
      recipeId: recipes[1].id,
      name: "（A）無塩バター 10g",
      sort: 8,
    },
    {
      recipeId: recipes[1].id,
      name: "（A）塩昆布 5g",
      sort: 9,
    },
    {
      recipeId: recipes[1].id,
      name: "無塩バター　10g",
      sort: 10,
    },
    {
      recipeId: recipes[1].id,
      name: "大葉　2枚",
      sort: 11,
    },
  ];

  for (const recipeIngredient of recipeIngredients) {
    await prisma.recipeIngredient.create({
      data: {
        ...recipeIngredient,
      },
    });
  }
};
