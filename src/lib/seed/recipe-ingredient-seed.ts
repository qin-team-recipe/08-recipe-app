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

  const recipeIngredientsArray = [
    [
      recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
      [
        "合挽き肉250gくらい",
        "玉ねぎ 1/2個",
        "パン粉 大さじ5（約カップ1/3)",
        "牛乳 40ml",
        "卵 1個",
        "塩 小さじ1/3",
        "胡椒 少々",
        "ソース：水　50ml",
        "ソース：ケチャップ　大さじ３",
        "ソース：ウスターソース　大さじ１",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("最高の明太子パスタ"),
      [
        "スパゲティ (1.7mm)",
        "お湯 (ゆで用)　1000ml",
        "塩 (ゆで用)　小さじ2",
        "明太子ソース用　明太子　40g",
        "明太子ソース用　無塩バター　15g",
        "明太子ソース用　オリーブオイル　小さじ1",
        "ニンニクオイル用　ニンニク10g",
        "ニンニクオイル用　オリーブオイル　50g",
        "トッピング用　イタリアンパセリ (生)　適量",
        "トッピング用　粗挽き黒こしょう　適量",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
      [
        "スパゲティ (1.7mm)　100g",
        "お湯 (ゆで用)　1000ml",
        "塩 (ゆで用)　小さじ2",
        "しめじ　30g",
        "まいたけ　30g",
        "塩　少々",
        "白こしょう　少々",
        "(A)めんつゆ（5倍濃縮）　小さじ1",
        "(A)無塩バター　10g",
        "(A)塩昆布　5g",
        "無塩バター　10g",
        "大葉　2枚",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
      [
        "牛肉・豚肉の小間切れなど　400g",
        "じゃがいも　大きめ６コ",
        "人参　大1本",
        "玉ねぎ　大１コ",
        "白滝　1袋",
        "煮汁　水　400cc",
        "煮汁　醤油・酒・砂糖・みりん　各大4ずつ",
        "煮汁　ほんだし　大1",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
      [
        "だんご粉　1袋250g",
        "水　450cc",
        "砂糖　100g",
        "水あめ　20g",
        "クリーム材料♡　板チョコホワイト　2枚80g",
        "クリーム材料♡　生クリーム　200cc",
        "クリーム材料♡　練乳　20g",
        "こしあん　1袋",
        "抹茶　40〜50g",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
      [
        "豚バラ塊り肉 1.5kg",
        "にんにく･しょうが 2かけ",
        "ネギの青い部分・玉ねぎ 2〜3本、1個",
        "醤油 500㏄",
        "みりん 300㏄",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
      [
        "鶏むね肉　：1枚",
        "じゃがいも：1個（120g）",
        "片栗粉　　：大さじ3",
        "パン粉　　：大さじ3",
        "調味料　マヨネーズ：大さじ1",
        "調味料　コンソメ　：小さじ1",
        "調味料　酒　　　　：大さじ1",
        "調味料　粉チーズ　：大さじ2",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
      [
        "牛肉　　　　　：150g",
        "もやし　　　　：50g",
        "冷凍ほうれん草：100g",
        "にんじん　　　：30g",
        "キムチ 　　　：50g",
        "お米　　　　　：2合分",
        "調味料　焼肉のタレ:大さじ4",
        "調味料　醤油：小さじ2",
        "調味料　鶏がらスープの素：大さじ1",
        "調味料　コチュジャン：大さじ1",
        "調味料　水：320cc",
        "調味料　砂糖：小さじ1",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
      [
        "鶏もも肉　1枚",
        "ゆで卵　お好み",
        "調味料　水　300cc",
        "調味料　酒　大さじ2",
        "調味料　砂糖　大さじ1.5",
        "調味料　味噌　大さじ1",
        "調味料　豆板醤　大さじ1",
        "調味料　オイスターソース　大さじ1",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
      [
        "鶏むね肉…350g",
        "長ねぎ…80g",
        "塩…小さじ1／２",
        "味の素…8振り",
        "オイスターソース…小さじ1",
        "レモン汁…小さじ1",
        "ごま油…大さじ1と1／2",
        "砂糖…小さじ1／２",
        "黒コショウ…適量",
        "塩コショウ…適量",
        "酒…大さじ1",
        "片栗粉…小さじ4",
        "★味変で追いレモン",
      ],
    ],
    [
      recipesNameRecipeIdMap.get("テストレシピ1"),
      ["テストレシピ1材料1 100g", "テストレシピ1材料2 200g", "テストレシピ1材料3 300g"],
    ],
    [
      recipesNameRecipeIdMap.get("テストレシピ2"),
      ["テストレシピ2材料1 100g", "テストレシピ2材料2 200g", "テストレシピ2材料3 300g"],
    ],
  ] as const satisfies ReadonlyArray<
    Readonly<
      [
        Insertable<RecipeIngredient>["recipeId"] | undefined, //配列index0のRecipeIngredient.recipeIdの型
        ReadonlyArray<Insertable<RecipeIngredient>["name"]>, //配列index1のRecipeIngridient.nameの配列の型
      ]
    >
  >;

  const recipeIngredients = recipeIngredientsArray.flatMap(([recipeId, IngredientNames]) => {
    if (!recipeId) return [];
    return IngredientNames.map(
      (name, index) => ({
        recipeId,
        name,
        index,
      }),
      recipeId,
    );
  }) satisfies Insertable<RecipeIngredient>[];

  await db.insertInto("RecipeIngredient").values(recipeIngredients).execute();
  console.log("recipeIngredientSeed end");
};
