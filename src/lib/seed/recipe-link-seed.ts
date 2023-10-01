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

  const recipeLinksArray = [
    [
      recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
      [
        ["other", "https://cookpad.com/recipe/4748850"],
        ["instagram", "https://www.instagram.com/"], //dummy data
        ["facebook", "https://www.facebook.com/"], //dummy data
        ["tiktok", "https://www.tiktok.com/ja-JP/"], //dummy data
        ["twitter", "https://twitter.com/home"], //dummy data
        ["youtube", "https://www.youtube.com/?themeRefresh=1"], //dummy data
      ],
    ],
    [
      recipesNameRecipeIdMap.get("最高の明太子パスタ"),
      [["other", "https://www.kurashiru.com/recipes/9f751232-2656-43dd-8f31-80fc365ff2b6"]],
    ],
    [
      recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
      [["other", "https://www.kurashiru.com/recipes/b9c05771-ef26-4c88-8c6f-7692ce1b631e"]],
    ],
    [
      recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
      [["other", "https://cookpad.com/recipe/1519259"]],
    ],
    [
      recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
      [["other", "https://cookpad.com/recipe/6652425"]],
    ],
    [recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"), [["other", "https://cookpad.com/recipe/1068543"]]],
    [
      recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
      [["instagram", "https://www.instagram.com/p/CwpMsJxLzCH/?hl=ja"]],
    ],
    [
      recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
      [["instagram", "https://www.instagram.com/p/CwhhTIWuP7B/?hl=ja"]],
    ],
    [
      recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
      [["instagram", "https://www.instagram.com/p/Cp4SFnYLpc8/?img_index=1"]],
    ],
    [
      recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
      [
        [
          "youtube",
          "https://www.youtube.com/watch?v=b_QxpTyqv2E&ab_channel=%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94",
        ],
        [
          "other",
          "https://bazurecipe.com/2023/08/17/%e8%b6%85%e7%b5%b6%e6%9f%94%e3%82%89%e3%81%8b%e3%83%8d%e3%82%ae%e5%a1%a9%e3%83%ac%e3%83%a2%e3%83%b3/",
        ],
      ],
    ],
    [
      recipesNameRecipeIdMap.get("至高のペペロンチーノ"),
      [
        [
          "youtube",
          "https://www.youtube.com/watch?v=Jx-tqntWPCM&ab_channel=%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94",
        ],
        [
          "other",
          "https://bazurecipe.com/2020/05/19/%e8%87%b3%e9%ab%98%e3%81%ae%e3%83%9a%e3%83%9a%e3%83%ad%e3%83%b3%e3%83%81%e3%83%bc%e3%83%8e/",
        ],
      ],
    ],
    [
      recipesNameRecipeIdMap.get("至高の豚汁"),
      [
        ["youtube", "https://youtu.be/OL8o03u8l2Y"],
        ["other", "https://bazurecipe.com/2020/06/29/5428/"],
      ],
    ],
    [
      recipesNameRecipeIdMap.get("至高の炒飯"),
      [
        ["youtube", "https://www.youtube.com/watch?v=EmCPHumbMvo&feature=youtu.be"],
        ["other", "https://bazurecipe.com/2020/05/17/%e8%87%b3%e9%ab%98%e3%81%ae%e7%82%92%e9%a3%af/"],
      ],
    ],
    [
      recipesNameRecipeIdMap.get("ワンパンパエリア"),
      [
        ["instagram", "https://www.instagram.com/reel/CXUy_oJFQno/"],
        ["other", "https://www.kurashiru.com/shorts/57d5d04b-3039-4aca-bfe0-870ab688fc9e"],
      ],
    ],
  ] as const satisfies ReadonlyArray<
    Readonly<
      [
        Insertable<RecipeLink>["recipeId"] | undefined,
        ReadonlyArray<Readonly<[Insertable<RecipeLink>["category"], Insertable<RecipeLink>["url"]]>>,
      ]
    >
  >;

  const recipeLinks = recipeLinksArray
    .flatMap(([recipeId, recipeLinks]) => {
      if (!recipeId) return [];
      return recipeLinks.map(
        (recipeLink, index) => ({
          recipeId,
          category: recipeLink[0],
          url: recipeLink[1],
          index,
        }),
        recipeId,
      );
    })
    .flatMap((recipeLink) => {
      const { recipeId } = recipeLink;
      if (!recipeId) return [];
      return [{ ...recipeLink, recipeId }];
    });

  await db.insertInto("RecipeLink").values(recipeLinks).execute();
  console.log("recipeLinkSeed end");
};
