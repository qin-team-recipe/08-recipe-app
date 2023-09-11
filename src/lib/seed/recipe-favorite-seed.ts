import { Insertable } from "kysely";

import { db } from "@/lib/kysely-node";
import { RecipeFavorite } from "@/types/db";

import { recipeNames } from "./recipe-seed";
import { userNames } from "./user-seed";

export const recipeFavoriteSeed = async () => {
  console.log("recipeFavoriteSeed start");

  const users = await db.selectFrom("User").selectAll().execute();
  const recipes = await db.selectFrom("Recipe").selectAll().execute();

  const usersNameUserIdMap = new Map(
    users.flatMap((user) => {
      const userName = userNames.find((name) => name === user.name);
      if (!userName) return [];
      return [[userName, user.id]];
    }),
  );

  const recipesNameRecipeIdMap = new Map(
    recipes.flatMap((recipe) => {
      const recipeName = recipeNames.find((name) => name === recipe.name);
      if (!recipeName) return [];
      return [[recipeName, recipe.id]];
    }),
  );

  const recipeFavorites = (
    [
      //ユーザー「しまぶーさんの奥さん」がお気に入りしているレシピ
      {
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("ズッキーニのステーキ"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("太らない【やみつき鶏チャーシュー】"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("『かぼちゃポタージュ』材料は2つだけ！"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("じゃがいものガレット"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("厚揚げのお好み焼き風"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("カリカリベーコンとアスパラのさっぱり酢醤油"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        userId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      //ユーザー「Bobのおふくろ」がお気に入りしているレシピ
      {
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("厚揚げのお好み焼き風"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("カリカリベーコンとアスパラのさっぱり酢醤油"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("具だくさんの豚汁"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("油いらずで柔らかジューシーな生姜焼き"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("究極の肉じゃが"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("『かぼちゃポタージュ』材料は2つだけ！"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("太らない【やみつき鶏チャーシュー】"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("プロはここが違う＜魚のポワレ＞"),
        userId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      //ユーザー「あいのおうちごはん＊ズボラ主婦の毎日レシピと献立」がお気に入りしているレシピ
      {
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("至高のペペロンチーノ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("至高の豚汁"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("至高の唐揚げ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("至高の炒飯"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("ワンパンパエリア"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("夏野菜の揚げびたし"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("贅沢なサンドイッチ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("厚揚げのお好み焼き風"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("カリカリベーコンとアスパラのさっぱり酢醤油"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("具だくさんの豚汁"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("油いらずで柔らかジューシーな生姜焼き"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("究極の肉じゃが"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("失敗しない「筑前煮」"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("とろとろ親子丼"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("鶏むね肉のにんにくレモンクリーム"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("じゃがいものガレット"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("『かぼちゃポタージュ』材料は2つだけ！"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("ズッキーニのステーキ"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("太らない【やみつき鶏チャーシュー】"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("プロはここが違う＜魚のポワレ＞"),
        userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      //ユーザー「桜井よしこ」がお気に入りしているレシピ
      {
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("至高のペペロンチーノ"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("至高の唐揚げ"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("ワンパンパエリア"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("夏野菜の揚げびたし"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("贅沢なサンドイッチ"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("厚揚げのお好み焼き風"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("カリカリベーコンとアスパラのさっぱり酢醤油"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("具だくさんの豚汁"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("油いらずで柔らかジューシーな生姜焼き"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("究極の肉じゃが"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("失敗しない「筑前煮」"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("とろとろ親子丼"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("じゃがいものガレット"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("『かぼちゃポタージュ』材料は2つだけ！"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("太らない【やみつき鶏チャーシュー】"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        recipeId: recipesNameRecipeIdMap.get("プロはここが違う＜魚のポワレ＞"),
        userId: usersNameUserIdMap.get("桜井よしこ"),
      },
    ] satisfies (Omit<Insertable<RecipeFavorite>, "recipeId" | "userId"> &
      Partial<Pick<Insertable<RecipeFavorite>, "recipeId" | "userId">>)[]
  ).flatMap((recipeFavorite) => {
    const { recipeId, userId } = recipeFavorite;
    if (!recipeId || !userId) return [];
    return [{ ...recipeFavorite, recipeId, userId }];
  });

  console.log("count of recipeFavorite:", recipeFavorites.length);

  await db.insertInto("RecipeFavorite").values(recipeFavorites).execute();
  console.log("recipeFavoriteSeed end");
};
