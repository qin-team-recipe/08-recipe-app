import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const recipeIngredientSeed = async () => {
  const recipes = await prisma.recipe.findMany();

  const recipeIngredients: Prisma.RecipeIngredientUncheckedCreateInput[] = [
    {
      recipeId: recipes[0].id,
      name: "合挽き肉250g",
      sort: 0,
    },
    {
      recipeId: recipes[0].id,
      name: "玉ねぎ1/2個",
      sort: 1,
    },
    {
      recipeId: recipes[0].id,
      name: "パン粉大さじ5",
      sort: 2,
    },
    {
      recipeId: recipes[0].id,
      name: "牛乳40ml",
      sort: 3,
    },
    {
      recipeId: recipes[0].id,
      name: "卵1個",
      sort: 4,
    },
    {
      recipeId: recipes[0].id,
      name: "塩小さじ1/3",
      sort: 5,
    },
    {
      recipeId: recipes[0].id,
      name: "胡椒少々",
      sort: 6,
    },
    {
      recipeId: recipes[0].id,
      name: "水（ソース）50ml",
      sort: 7,
    },
    {
      recipeId: recipes[0].id,
      name: "ケチャップ（ソース）大さじ3",
      sort: 8,
    },
    {
      recipeId: recipes[0].id,
      name: "ウスターソース（ソース）大さじ1",
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
      name: "明太子（明太子ソース用） 40g",
      sort: 3,
    },
    {
      recipeId: recipes[1].id,
      name: "無塩バター（明太子ソース用） 15g",
      sort: 4,
    },
    {
      recipeId: recipes[1].id,
      name: "オリーブオイル（明太子ソース用） 小さじ1",
      sort: 5,
    },
    {
      recipeId: recipes[1].id,
      name: "ニンニク（ニンニクオイル） 10g",
      sort: 6,
    },
    {
      recipeId: recipes[1].id,
      name: "オリーブオイル（ニンニクオイル） 50g",
      sort: 7,
    },
    {
      recipeId: recipes[1].id,
      name: "イタリアンパセリ (生)（トッピング） 適量",
      sort: 8,
    },
    {
      recipeId: recipes[1].id,
      name: "粗挽き黒こしょう（トッピング） 適量",
      sort: 9,
    },
    {
      recipeId: recipes[2].id,
      name: "スパゲティ 100g",
      sort: 0,
    },
    {
      recipeId: recipes[2].id,
      name: "お湯 (ゆで用) 1000ml",
      sort: 1,
    },
    {
      recipeId: recipes[2].id,
      name: "塩 (ゆで用)　小さじ2",
      sort: 2,
    },
    {
      recipeId: recipes[2].id,
      name: "しめじ　30g",
      sort: 3,
    },
    {
      recipeId: recipes[2].id,
      name: "まいたけ 30g",
      sort: 4,
    },
    {
      recipeId: recipes[2].id,
      name: "塩　少々",
      sort: 5,
    },
    {
      recipeId: recipes[2].id,
      name: "白こしょう　少々",
      sort: 6,
    },
    {
      recipeId: recipes[2].id,
      name: "（A）めんつゆ（5倍濃縮） 小さじ1",
      sort: 7,
    },
    {
      recipeId: recipes[2].id,
      name: "（A）無塩バター 10g",
      sort: 8,
    },
    {
      recipeId: recipes[2].id,
      name: "（A）塩昆布 5g",
      sort: 9,
    },
    {
      recipeId: recipes[2].id,
      name: "無塩バター　10g",
      sort: 10,
    },
    {
      recipeId: recipes[2].id,
      name: "大葉　2枚",
      sort: 11,
    },
    {
      recipeId: recipes[3].id,
      name: "米 250g（万能お米）",
      sort: 0,
    },
    {
      recipeId: recipes[3].id,
      name: "水 300ml（万能お米）",
      sort: 1,
    },
    {
      recipeId: recipes[3].id,
      name: "鶏ガラスープの素 小さじ2（万能お米）",
      sort: 2,
    },
    {
      recipeId: recipes[3].id,
      name: "しょうゆ 5g（万能お米）",
      sort: 3,
    },
    {
      recipeId: recipes[3].id,
      name: "サラダ油 5g（万能お米）",
      sort: 4,
    },
    {
      recipeId: recipes[3].id,
      name: "卵（M） 2個",
      sort: 5,
    },
    {
      recipeId: recipes[3].id,
      name: "長ねぎ 1/3本",
      sort: 6,
    },
    {
      recipeId: recipes[3].id,
      name: "かまぼこ 75g",
      sort: 7,
    },
    {
      recipeId: recipes[3].id,
      name: "塩 ふたつまみ",
      sort: 8,
    },
    {
      recipeId: recipes[3].id,
      name: "うま味調味料 ふたつまみ",
      sort: 9,
    },
    {
      recipeId: recipes[3].id,
      name: "しょうゆ 小さじ1",
      sort: 10,
    },
    {
      recipeId: recipes[3].id,
      name: "サラダ油 大さじ4",
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
