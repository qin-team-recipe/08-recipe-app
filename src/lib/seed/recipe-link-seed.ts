import { Insertable } from "kysely";

import { db } from "@/lib/kysely-node";
import { RecipeLink } from "@/types/db";

import { recipeNames } from "./recipe-seed";

export const recipeLinkSeed = async () => {
  console.log("recipeLinkSeed start");

  const recipes = await db.selectFrom("Recipe").selectAll().execute();

  const recipesNameRecipeIdMap = new Map(
    recipes.flatMap((recipe) => {
      const recipeName = recipeNames.find((name) => name === recipe.name);
      if (!recipeName) return [];
      return [[recipeName, recipe.id]];
    }),
  );

  const recipeLinks = (
    [
      {
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        url: "https://cookpad.com/recipe/4748850",
        category: "other",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        url: "https://www.kurashiru.com/recipes/9f751232-2656-43dd-8f31-80fc365ff2b6",
        category: "other",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        url: "https://www.kurashiru.com/recipes/b9c05771-ef26-4c88-8c6f-7692ce1b631e",
        category: "other",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        url: "https://cookpad.com/recipe/1519259",
        category: "other",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        url: "https://cookpad.com/recipe/6652425",
        category: "other",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        url: "https://cookpad.com/recipe/1068543",
        category: "other",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        url: "https://www.instagram.com/p/CwpMsJxLzCH/?hl=ja",
        category: "instagram",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        url: "https://www.instagram.com/p/CwhhTIWuP7B/?hl=ja",
        category: "instagram",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        url: "https://www.instagram.com/p/Cp4SFnYLpc8/?img_index=1",
        category: "instagram",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        url: "https://www.youtube.com/watch?v=b_QxpTyqv2E&ab_channel=%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94",
        category: "youtube",
        sort: 0,
      },
      {
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        url: "https://bazurecipe.com/2023/08/17/%e8%b6%85%e7%b5%b6%e6%9f%94%e3%82%89%e3%81%8b%e3%83%8d%e3%82%ae%e5%a1%a9%e3%83%ac%e3%83%a2%e3%83%b3/",
        category: "other",
        sort: 1,
      },
    ] satisfies (Omit<Insertable<RecipeLink>, "recipeId"> & Partial<Pick<Insertable<RecipeLink>, "recipeId">>)[]
  ).flatMap((recipeLink) => {
    const { recipeId } = recipeLink;
    if (!recipeId) return [];
    return [{ ...recipeLink, recipeId }];
  });

  await db.insertInto("RecipeLink").values(recipeLinks).execute();
  console.log("recipeLinkSeed end");
};
