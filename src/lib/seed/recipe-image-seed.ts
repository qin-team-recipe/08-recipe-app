import { Insertable } from "kysely";

import { db } from "@/lib/kysely-node";
import { RecipeImage } from "@/types/db";

import { recipeNames } from "./recipe-seed";

export const recipeImageSeed = async () => {
  console.log("recipeImageSeed start");

  const recipes = await db.selectFrom("Recipe").selectAll().execute();

  const recipesNameRecipeIdMap = new Map(
    recipes.flatMap((recipe) => {
      const recipeName = recipeNames.find((name) => name === recipe.name);
      if (!recipeName) return [];
      return [[recipeName, recipe.id]];
    }),
  );

  const recipeImages = (
    [
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("至高のペペロンチーノ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("至高の豚汁"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("至高の唐揚げ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("至高の炒飯"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("ワンパンパエリア"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("夏野菜の揚げびたし"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("贅沢なサンドイッチ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("厚揚げのお好み焼き風"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("カリカリベーコンとアスパラのさっぱり酢醤油"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("具だくさんの豚汁"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("油いらずで柔らかジューシーな生姜焼き"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("究極の肉じゃが"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("失敗しない「筑前煮」"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("とろとろ親子丼"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("鶏むね肉のにんにくレモンクリーム"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("じゃがいものガレット"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("『かぼちゃポタージュ』材料は2つだけ！"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("ズッキーニのステーキ"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("太らない【やみつき鶏チャーシュー】"),
        sort: 0,
      },
      {
        imgSrc: "",
        recipeId: recipesNameRecipeIdMap.get("プロはここが違う＜魚のポワレ＞"),
        sort: 0,
      },
    ] satisfies (Omit<Insertable<RecipeImage>, "recipeId"> & Partial<Pick<Insertable<RecipeImage>, "recipeId">>)[]
  ).flatMap((recipeFavorite) => {
    const { recipeId } = recipeFavorite;
    if (!recipeId) return [];
    return [{ ...recipeFavorite, recipeId }];
  });

  console.log("RecipeImage inserting data count:", recipeImages.length);

  await db.insertInto("RecipeImage").values(recipeImages).execute();
  console.log("recipeImageSeed end");
};
