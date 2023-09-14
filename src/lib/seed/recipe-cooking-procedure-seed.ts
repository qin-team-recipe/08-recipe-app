import { Insertable } from "kysely";

import { db } from "@/lib/kysely-node";
import { RecipeCookingProcedure } from "@/types/db";

import { recipeNames } from "./recipe-seed";

export const recipeCookingProcedureSeed = async () => {
  console.log("recipeCookingProcedureSeed start");

  const recipes = await db.selectFrom("Recipe").selectAll().execute();

  const recipesNameRecipeIdMap = new Map(
    recipes.flatMap((recipe) => {
      const recipeName = recipeNames.find((name) => name === recipe.name);
      if (!recipeName) return [];
      return [[recipeName, recipe.id]];
    }),
  );

  const recipeCookingProcedures = (
    [
      {
        name: "玉ねぎをみじん切りにし、レンジで4~5分加熱するか、フライパンで炒める。",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 0,
      },
      {
        name: "ひき肉に塩を加え粘りがでるまでよく混ぜ、ハンバーグの材料すべてを入れて手早く混ぜる。",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 1,
      },
      {
        name: "２〜３個にわけて叩きながら空気を抜き、楕円形にまとめる。真ん中をくぼませる。",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 2,
      },
      {
        name: "フライパンで両面軽く焦げ目がつくまで焼き、水50mlを加えフタをして蒸し焼きにする。",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 3,
      },
      {
        name: "竹串などを刺して肉汁が透明になっていれば、フタを外して水分を飛ばす。ハンバーグを取り出す。",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 4,
      },
      {
        name: "空いたフライパンにそのままソースの材料を入れて煮る。ソースがあたたまったらハンバーグにかけ、完成。",
        recipeId: recipesNameRecipeIdMap.get("簡単おいしい♪基本のハンバーグ"),
        sort: 5,
      },
      {
        name: "明太子は薄皮から取り出し、身をほぐしておきます。イタリアンパセリは刻んでおきます。",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 0,
      },
      {
        name: "ニンニクはみじん切りにします。",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 1,
      },
      {
        name: "鍋に1、オリーブオイルを入れ中火で熱し、ニンニクの香りがしてきたら弱火で4分程、途中で混ぜながら加熱します。ニンニクに焼き色が付いたらキッチンペーパーを敷いたザルで漉し、ニンニクオイルとニンニクチップに分けます。ニンニクオイルは粗熱を取ります。",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 2,
      },
      {
        name: "お湯を沸騰させた鍋に塩を入れて、スパゲティをパッケージの表記より1分短くゆで、ゆで汁を60ml取り分け、お湯を切ります。",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 3,
      },
      {
        name: "ボウルに明太子ソースの材料と、3のニンニクオイルを15g、4のスパゲティを入れ混ぜ合わせます。ゆで汁を2回に分けて入れ、都度手早く混ぜます。",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 4,
      },
      {
        name: "器に盛り付け、3のニンニクチップ、イタリアンパセリ、粗挽き黒こしょうをかけ完成です。",
        recipeId: recipesNameRecipeIdMap.get("最高の明太子パスタ"),
        sort: 5,
      },
      {
        name: "大葉は軸を切り落としておきます。しめじ、まいたけは石づきを切り落としておきます。",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 0,
      },
      {
        name: "大葉は千切りにします。",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 1,
      },
      {
        name: "しめじ、まいたけはほぐします。",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 2,
      },
      {
        name: "ボウルに(A)を入れ混ぜ合わせます。",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 3,
      },
      {
        name: "鍋にお湯を沸かし、塩、スパゲティを入れ、パッケージの表記時間より1分短くゆで、お湯を切ります。",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 4,
      },
      {
        name: "中火で熱したフライパンに無塩バターを溶かし、3、塩、白こしょうを入れしめじがしんなりとするまで炒め、火から下ろします。",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 5,
      },
      {
        name: "4に5、6加えて和えます。器に盛りつけ1をのせたら完成です",
        recipeId: recipesNameRecipeIdMap.get("無限パスタ 塩こぶバターときのこ"),
        sort: 6,
      },
      {
        name: "じゃがいもと人参は大きめの乱切りに、玉ねぎはくし切り、白滝は洗って適当に切ります。",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        sort: 0,
      },
      {
        name: "鍋に油を大２入れ強火にし、肉を入れ色が変わるまで炒めたら１も入れ軽く炒めます♪",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        sort: 1,
      },
      {
        name: "煮汁の材料を入れ沸騰したら灰汁を取り白滝を入れ混ぜ中強火のまま落し蓋をし煮汁が無くなるまで約20分程煮詰めます。",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        sort: 2,
      },
      {
        name: "10分煮詰めた所で一度混ぜ、再度落し蓋をして煮汁がなくなるまで様子を見ながら更に10分位煮詰めていきます。",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        sort: 3,
      },
      {
        name: "煮汁が無くなったら火を止め落し蓋をしたまま10分間、蒸らします♪味が更に染み込みます。これで完成！",
        recipeId: recipesNameRecipeIdMap.get("家の黄金比率で♥煮物の定番！肉じゃが♥"),
        sort: 4,
      },
      {
        name: `ボウルを３つ用意します。
        大きめのボウルは湯煎用と氷水用
        に。一回り小さめのボウルにチョコを入れて湯煎で溶かします。
        `,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 0,
      },
      {
        name: `チョコが溶けたら生クリームを入れ良く混ぜます。
        混ざったら湯煎から氷水のボウルに変え良く混ぜて冷やします。
        `,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 1,
      },
      {
        name: `冷えて来たら練乳も入れ泡立て器で角が立つまで泡立てます。
        出来たクリームは絞り袋に入れて冷蔵庫で少し冷やします。
        `,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 2,
      },
      {
        name: `トレーにラップを敷き
        こんな感じで絞り出したらラップをかけ、冷凍庫に入れ固まるまで1時間程待ちます。
        `,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 3,
      },
      {
        name: `クリームが凍ったら
        ラップにあんこを小さじ1.5広げ
        凍ったクリームを乗せ手早くラップを丸めて口を捻り再度冷凍庫へ入れる
        `,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 4,
      },
      {
        name: `大体、冷凍庫に1時間以上入れて凍らせます。
        ここでしっかり凍らせてね！
        ※求肥に包む際に柔らか過ぎて包めなくなるので！！
        `,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 5,
      },
      {
        name: `ここまで前日に仕込んで置いても
        作業が楽にやりやすくなりますよ！`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 6,
      },
      {
        name: `凍らせてる間に求肥作り。
        耐熱ボウルにだんご粉と砂糖を入れゴムヘラで混ぜたら水も入れ更に良くまぜます。`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 7,
      },
      {
        name: `混ざったら軽くラップして800wで2分チン。良く混ぜたら
        またラップをして2分チン。
        3回位やると透明感が出てきます。`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 8,
      },
      {
        name: `3回チンしたら、水あめを入れて更に良く混ぜます。
        そして最後にもう一度2分チン。
        良く混ぜます。`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 9,
      },
      {
        name: `バットに抹茶を敷き広げ
        求肥を平らに広げて
        上からも抹茶を振りかけて
        スケッパーで30等分に切り分け冷まします。`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 10,
      },
      {
        name: `6のクリームあんこが凍ったら
        10の求肥を平らに広げて乗せます。`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 11,
      },
      {
        name: `手早く包み口をつまんで閉じます。求肥が手についてベタつく時は抹茶を転がしながら付けてやるとやり易いです。`,
        recipeId: recipesNameRecipeIdMap.get("♡抹茶クリーム大福♡バレンタインにも♡"),
        sort: 12,
      },
      {
        name: `ブロック肉は半分に切ります。
        鍋に肉を入れ肉が被る程度に水をたっぷり入れます。`,
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        sort: 0,
      },
      {
        name: "生姜はスライス、長ネギの青い部分と玉ねぎを半分に切り鍋に入れ沸騰したらアクを取り出し弱火で1時間は煮込みます。",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        sort: 1,
      },
      {
        name: `チャーシューのタレは大きな鍋に醤油、みりん、清酒、ネギの青い部分、にんにくを潰したもの、生姜薄切りを入れ沸騰させておく`,
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        sort: 2,
      },
      {
        name: `2の肉が柔らかく茹で上がったら
        肉だけ3のタレの鍋に入れ落とし蓋をし1時間煮込み、その後は火を止め放置する`,
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        sort: 3,
      },
      {
        name: "薬味でみじん切りの玉ねぎを用意しチャーシューを切り分けお皿に盛り付け薬味と粗挽き黒胡椒をふり、タレをかければ完成！",
        recipeId: recipesNameRecipeIdMap.get("柔ら〜か♪煮豚☆チャーシュー"),
        sort: 4,
      },
      {
        name: "鶏むね肉を1cm幅にカットする",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 0,
      },
      {
        name: "ビニールに入れて調味料をまぜ、しっかりともみ込む",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 1,
      },
      {
        name: "じゃがいもをみじん切りにして、水でアクを抜く",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 2,
      },
      {
        name: "水をしっかりとり、片栗粉、パン粉と混ぜる",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 3,
      },
      {
        name: "鶏肉に衣をつける",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 4,
      },
      {
        name: "170度の油で揚げる",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 5,
      },
      {
        name: "きつね色になったら、お皿に取り上げてパセリを振りかけて完成！",
        recipeId: recipesNameRecipeIdMap.get("お酒飲み専用の無限クランキーチキン"),
        sort: 6,
      },
      {
        name: `材料と調味料を入れて待っだけ
        通常の炊飯モードで大丈夫です！`,
        recipeId: recipesNameRecipeIdMap.get("炊飯器で一発OK焼肉屋のビビンパ"),
        sort: 0,
      },
      {
        name: "調味料一式を全てお鍋に入れ沸騰させる",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        sort: 0,
      },
      {
        name: "鳥もも肉1枚を片目10分強火で煮込む",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        sort: 1,
      },
      {
        name: "反対側も10分強火で煮込む",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        sort: 2,
      },
      {
        name: "冷まして味を馴染ませ完成です",
        recipeId: recipesNameRecipeIdMap.get("辛鶏チャーシュー"),
        sort: 3,
      },
      {
        name: `長ねぎ80g、塩小さじ1/2、味の素8振り、
        オイスターソース小さじ1、レモン汁小さじ1、
        ごま油大さじ1半、砂糖小さじ1/2、
        黒胡椒を混ぜておく`,
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        sort: 0,
      },
      {
        name: `鶏むね肉350gは塩コショウ、酒大さじ1、
        片栗粉小さじ4をもみこむ`,
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        sort: 1,
      },
      {
        name: `さっとゆで
        ざるで水気を切る`,
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        sort: 2,
      },
      {
        name: "3に1のネギたれをからめて完成",
        recipeId: recipesNameRecipeIdMap.get("超絶柔らかネギ塩レモン"),
        sort: 3,
      },
    ] satisfies (Omit<Insertable<RecipeCookingProcedure>, "recipeId"> &
      Partial<Pick<Insertable<RecipeCookingProcedure>, "recipeId">>)[]
  ).flatMap((recipeFavorite) => {
    const { recipeId } = recipeFavorite;
    if (!recipeId) return [];
    return [{ ...recipeFavorite, recipeId }];
  });

  await db.insertInto("RecipeCookingProcedure").values(recipeCookingProcedures).execute();
  console.log("recipeCookingProcedureSeed end");
};
