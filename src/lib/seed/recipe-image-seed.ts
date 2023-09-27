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
        imgSrc: "/recipes/3a2d206c1f16e238d3c41e947080c456.webp",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/912376177524164196669946443445876761979259154331.jpg",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/747095895550944617979903881182540119444196413515.jpg",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/622247762476359476320014184589114569858150199790.webp",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        index: 0,
      },
      {
        imgSrc: "/recipes/735905399342581832484264795357618369609560750167.webp",
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        index: 0,
      },
      {
        imgSrc: "/recipes/109363992053180899644529351243149509942258845042.webp",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        index: 0,
      },
      {
        imgSrc: "/recipes/566471214340906376413686038805650976789128055676.jpg",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        index: 0,
      },
      {
        imgSrc: "/recipes/101632295579244471458048321692296431087856699586.jpg",
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/305748963407297019667400432292638454798067329875.jpg",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        index: 0,
      },
      {
        imgSrc: "/recipes/859983142302912254247143241951833422588424007531.jpg",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        index: 0,
      },
      {
        imgSrc: "/recipes/752615356369955613724845806355794137454885873637.jpg",
        recipeId: recipesNameRecipeIdMap.get("至高のペペロンチーノ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/464925836617676228173651737685228195008741531812.png",
        recipeId: recipesNameRecipeIdMap.get("至高の豚汁"),
        index: 0,
      },
      {
        imgSrc: "/recipes/978587569715443788177414971425592874322168837873.jpg",
        recipeId: recipesNameRecipeIdMap.get("至高の唐揚げ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/094460328294261598373751857329687316892185856362.png",
        recipeId: recipesNameRecipeIdMap.get("至高の炒飯"),
        index: 0,
      },
      {
        imgSrc: "/recipes/437930905613236508392719174501425671427562305375.jpeg",
        recipeId: recipesNameRecipeIdMap.get("ワンパンパエリア"),
        index: 0,
      },
      {
        imgSrc: "/recipes/939334500342136579101357790880906176967026316472.jpg",
        recipeId: recipesNameRecipeIdMap.get("夏野菜の揚げびたし"),
        index: 0,
      },
      {
        imgSrc: "/recipes/939273314287918872087706774856605278992274573435.jpg",
        recipeId: recipesNameRecipeIdMap.get("贅沢なサンドイッチ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/899213753295315469244918927501829922920494703856.jpg",
        recipeId: recipesNameRecipeIdMap.get("厚揚げのお好み焼き風"),
        index: 0,
      },
      {
        imgSrc: "/recipes/173061998269759082077833269941292010536731074152.jpg",
        recipeId: recipesNameRecipeIdMap.get("カリカリベーコンとアスパラのさっぱり酢醤油"),
        index: 0,
      },
      {
        imgSrc: "/recipes/434285502984743480291432102535647774050428110472.jpg",
        recipeId: recipesNameRecipeIdMap.get("【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」"),
        index: 0,
      },
      {
        imgSrc: "/recipes/834103798772257915688919374737294470516847586369.jpg",
        recipeId: recipesNameRecipeIdMap.get("具だくさんの豚汁"),
        index: 0,
      },
      {
        imgSrc: "/recipes/497089116826185212434762087358982260917346906044.jpg",
        recipeId: recipesNameRecipeIdMap.get("油いらずで柔らかジューシーな生姜焼き"),
        index: 0,
      },
      {
        imgSrc: "/recipes/461130205554771710501818517946506714670596800125.jpg",
        recipeId: recipesNameRecipeIdMap.get("究極の肉じゃが"),
        index: 0,
      },
      {
        imgSrc: "/recipes/623806061119612190955700677707775535779802228356.jpg",
        recipeId: recipesNameRecipeIdMap.get("失敗しない「筑前煮」"),
        index: 0,
      },
      {
        imgSrc: "/recipes/034350950751489251459250955140146198724933163797.jpg",
        recipeId: recipesNameRecipeIdMap.get("とろとろ親子丼"),
        index: 0,
      },
      {
        imgSrc: "/recipes/787409583974389563595397367374101740723282751349.png",
        recipeId: recipesNameRecipeIdMap.get("鶏むね肉のにんにくレモンクリーム"),
        index: 0,
      },
      {
        imgSrc: "/recipes/632020532445504954508118397088669401433310361757.png",
        recipeId: recipesNameRecipeIdMap.get("じゃがいものガレット"),
        index: 0,
      },
      {
        imgSrc: "/recipes/768912626162094894249609669281252349982563852127.png",
        recipeId: recipesNameRecipeIdMap.get("『かぼちゃポタージュ』材料は2つだけ！"),
        index: 0,
      },
      {
        imgSrc: "/recipes/448481906784261009812101629358798799962248876392.png",
        recipeId: recipesNameRecipeIdMap.get("ズッキーニのステーキ"),
        index: 0,
      },
      {
        imgSrc: "/recipes/370621516196801316089856823997785347006396847899.avif",
        recipeId: recipesNameRecipeIdMap.get("太らない【やみつき鶏チャーシュー】"),
        index: 0,
      },
      {
        imgSrc: "/recipes/545454105118442790740647310772165200832170370663.jpg",
        recipeId: recipesNameRecipeIdMap.get("プロはここが違う＜魚のポワレ＞"),
        index: 0,
      },
      {
        imgSrc: "/recipes/618756793037295450572568353788133252318384778790.jpg",
        recipeId: recipesNameRecipeIdMap.get("テストレシピ1"),
        index: 0,
      },
      {
        imgSrc: "/recipes/190473907258856904951280433613618897672467838802.jpg",
        recipeId: recipesNameRecipeIdMap.get("テストレシピ2"),
        index: 0,
      },
    ] satisfies (Omit<Insertable<RecipeImage>, "recipeId"> & Partial<Pick<Insertable<RecipeImage>, "recipeId">>)[]
  ).flatMap((recipeImage) => {
    const { recipeId } = recipeImage;
    if (!recipeId) return [];
    return [{ ...recipeImage, recipeId }];
  });

  console.log("RecipeImage inserting data count:", recipeImages.length);

  await db.insertInto("RecipeImage").values(recipeImages).execute();
  console.log("recipeImageSeed end");
};
