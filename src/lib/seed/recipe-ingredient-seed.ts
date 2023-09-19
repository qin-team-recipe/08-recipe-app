import { Insertable } from "kysely";

import { db } from "@/lib/kysely-node";
import { RecipeIngredient } from "@/types/db";

import { recipeNames } from "./recipe-seed";

export const recipeIngredientSeed = async () => {
  console.log("recipeIngredientSeed start");

  const recipes = await db.selectFrom("Recipe").selectAll().execute();

  const recipesNameRecipeIdMap = new Map(
    recipes.flatMap((recipe) => {
      const recipeName = recipeNames.find((name) => name === recipe.name);
      if (!recipeName) return [];
      return [[recipeName, recipe.id]];
    }),
  );

  const recipeIngredients = (
    [
      {
        name: "合挽き肉250gくらい",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 0,
      },
      {
        name: "玉ねぎ 1/2個",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 1,
      },
      {
        name: "パン粉 大さじ5（約カップ1/3)",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 2,
      },
      {
        name: "牛乳 40ml",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 3,
      },
      {
        name: "卵 1個",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 4,
      },
      {
        name: "塩 小さじ1/3",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 6,
      },
      {
        name: "胡椒 少々",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 7,
      },
      {
        name: "ソース：水　50ml",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 8,
      },
      {
        name: "ソース：ケチャップ　大さじ３",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 9,
      },
      {
        name: "ソース：ウスターソース　大さじ１",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 10,
      },
      {
        name: "スパゲティ (1.7mm)",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 0,
      },
      {
        name: "お湯 (ゆで用)　1000ml",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 1,
      },
      {
        name: "塩 (ゆで用)　小さじ2",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 2,
      },
      {
        name: "明太子ソース用　明太子　40g",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 3,
      },

      {
        name: "明太子ソース用　無塩バター　15g",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 4,
      },
      {
        name: "明太子ソース用　オリーブオイル　小さじ1",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 5,
      },
      {
        name: "ニンニクオイル用　ニンニク10g",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 6,
      },
      {
        name: "ニンニクオイル用　オリーブオイル　50g",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 7,
      },
      {
        name: "トッピング用　イタリアンパセリ (生)　適量",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 8,
      },
      {
        name: "トッピング用　粗挽き黒こしょう　適量",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 9,
      },
      {
        name: "スパゲティ (1.7mm)　100g",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 0,
      },
      {
        name: "お湯 (ゆで用)　1000ml",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 1,
      },
      {
        name: "塩 (ゆで用)　小さじ2",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 2,
      },
      {
        name: "しめじ　30g",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 3,
      },
      {
        name: "まいたけ　30g",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 4,
      },
      {
        name: "塩　少々",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 5,
      },
      {
        name: "白こしょう　少々",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 6,
      },
      {
        name: "(A)めんつゆ（5倍濃縮）　小さじ1",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 7,
      },
      {
        name: "(A)無塩バター　10g",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 8,
      },
      {
        name: "(A)塩昆布　5g",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 9,
      },
      {
        name: "無塩バター　10g",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 10,
      },
      {
        name: "大葉　2枚",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 11,
      },
      {
        name: "牛肉・豚肉の小間切れなど　400g",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 0,
      },
      {
        name: "じゃがいも　大きめ６コ",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 1,
      },
      {
        name: "人参　大1本",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 2,
      },
      {
        name: "玉ねぎ　大１コ",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 3,
      },
      {
        name: "白滝　1袋",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 3,
      },
      {
        name: "煮汁　水　400cc",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 4,
      },
      {
        name: "煮汁　醤油・酒・砂糖・みりん　各大4ずつ",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 5,
      },
      {
        name: "煮汁　ほんだし　大1",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 6,
      },
      {
        name: "だんご粉　1袋250g",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 0,
      },
      {
        name: "水　450cc",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 1,
      },
      {
        name: "砂糖　100g",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 2,
      },
      {
        name: "水あめ　20g",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 3,
      },
      {
        name: "クリーム材料♡　板チョコホワイト　2枚80g",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 4,
      },
      {
        name: "クリーム材料♡　生クリーム　200cc",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 5,
      },
      {
        name: "クリーム材料♡　練乳　20g",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 6,
      },
      {
        name: "こしあん　1袋",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 7,
      },
      {
        name: "抹茶　40〜50g",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 8,
      },
      {
        name: "豚バラ塊り肉 1.5kg",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        index: 0,
      },
      {
        name: "にんにく･しょうが 2かけ",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        index: 1,
      },
      {
        name: "ネギの青い部分・玉ねぎ 2〜3本、1個",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        index: 2,
      },
      {
        name: "醤油 500㏄",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        index: 3,
      },
      {
        name: "みりん 300㏄",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        index: 4,
      },
      {
        name: "鶏むね肉　：1枚",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 0,
      },
      {
        name: "じゃがいも：1個（120g）",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 1,
      },
      {
        name: "片栗粉　　：大さじ3",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 2,
      },
      {
        name: "パン粉　　：大さじ3",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 3,
      },
      {
        name: "調味料　マヨネーズ：大さじ1",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 4,
      },
      {
        name: "調味料　コンソメ　：小さじ1",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 5,
      },
      {
        name: "調味料　酒　　　　：大さじ1",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 6,
      },
      {
        name: "調味料　粉チーズ　：大さじ2",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 7,
      },
      {
        name: "牛肉　　　　　：150g",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 0,
      },
      {
        name: "もやし　　　　：50g",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 1,
      },
      {
        name: "冷凍ほうれん草：100g",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 2,
      },
      {
        name: "にんじん　　　：30g",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 3,
      },
      {
        name: "キムチ 　　　：50g",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 4,
      },
      {
        name: "お米　　　　　：2合分",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 5,
      },
      {
        name: "調味料　焼肉のタレ:大さじ4",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 6,
      },
      {
        name: "調味料　醤油：小さじ2",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 7,
      },
      {
        name: "調味料　鶏がらスープの素：大さじ1",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 8,
      },
      {
        name: "調味料　コチュジャン：大さじ1",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 9,
      },
      {
        name: "調味料　水：320cc",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 10,
      },
      {
        name: "調味料　砂糖：小さじ1",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 11,
      },
      {
        name: "鶏もも肉　1枚",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 0,
      },
      {
        name: "ゆで卵　お好み",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 1,
      },
      {
        name: "調味料　水　300cc",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 2,
      },
      {
        name: "調味料　酒　大さじ2",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 3,
      },
      {
        name: "調味料　砂糖　大さじ1.5",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 4,
      },
      {
        name: "調味料　味噌　大さじ1",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 5,
      },
      {
        name: "調味料　豆板醤　大さじ1",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 6,
      },
      {
        name: "調味料　オイスターソース　大さじ1",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 7,
      },
      {
        name: "鶏むね肉…350g",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 0,
      },
      {
        name: "長ねぎ…80g",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 1,
      },
      {
        name: "塩…小さじ1／２",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 2,
      },
      {
        name: "味の素…8振り",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 3,
      },
      {
        name: "オイスターソース…小さじ1",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 4,
      },
      {
        name: "レモン汁…小さじ1",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 5,
      },
      {
        name: "ごま油…大さじ1と1／2",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 6,
      },
      {
        name: "砂糖…小さじ1／２",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 7,
      },
      {
        name: "黒コショウ…適量",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 8,
      },
      {
        name: "塩コショウ…適量",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 9,
      },
      {
        name: "酒…大さじ1",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 10,
      },
      {
        name: "片栗粉…小さじ4",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 11,
      },
      {
        name: "★味変で追いレモン",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 12,
      },
    ] satisfies (Omit<Insertable<RecipeIngredient>, "recipeId"> &
      Partial<Pick<Insertable<RecipeIngredient>, "recipeId">>)[]
  ).flatMap((recipeIngredient) => {
    const { recipeId } = recipeIngredient;
    if (!recipeId) return [];
    return [{ ...recipeIngredient, recipeId }];
  });

  await db.insertInto("RecipeIngredient").values(recipeIngredients).execute();
  console.log("recipeIngredientSeed end");
};
