import { Insertable, Selectable } from "kysely";

import { db } from "@/lib/kysely-node";
import { Recipe, User } from "@/types/db";

import { UserName } from "./user-seed";

export const recipeNames = [
  "簡単おいしい♪基本のハンバーグ",
  "最高の明太子パスタ",
  "無限パスタ 塩こぶバターときのこ",
  "家の黄金比率で♥煮物の定番！肉じゃが♥",
  "♡抹茶クリーム大福♡バレンタインにも♡",
  "柔ら〜か♪煮豚☆チャーシュー",
  "お酒飲み専用の無限クランキーチキン",
  "炊飯器で一発OK焼肉屋のビビンパ",
  "辛鶏チャーシュー",
  "超絶柔らかネギ塩レモン",
  "至高のペペロンチーノ",
  "至高の豚汁",
  "至高の唐揚げ",
  "至高の炒飯",
  "ワンパンパエリア",
  "夏野菜の揚げびたし",
  "贅沢なサンドイッチ",
  "厚揚げのお好み焼き風",
  "カリカリベーコンとアスパラのさっぱり酢醤油",
  "【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」",
  "具だくさんの豚汁",
  "油いらずで柔らかジューシーな生姜焼き",
  "究極の肉じゃが",
  "失敗しない「筑前煮」",
  "とろとろ親子丼",
  "鶏むね肉のにんにくレモンクリーム",
  "じゃがいものガレット",
  "『かぼちゃポタージュ』材料は2つだけ！",
  "ズッキーニのステーキ",
  "太らない【やみつき鶏チャーシュー】",
  "プロはここが違う＜魚のポワレ＞",
] as const;
export type RecipeName = (typeof recipeNames)[number];

export const recipeSeed = async () => {
  console.log("recipeSeed start");

  const users: Selectable<User>[] = await db.selectFrom("User").selectAll().execute();

  const usersNameUserId = users
    .filter((user) => user.name !== null)
    .map((user) => {
      const userName = user.name as string;
      return { [userName]: user.id };
    });

  const usersNameUserIdMap: { [key in UserName]: string } = Object.assign({}, ...usersNameUserId);

  const recipes: Insertable<Recipe>[] = [
    {
      userId: usersNameUserIdMap["山田シェフ"],
      //https://cookpad.com/recipe/4748850
      name: "簡単おいしい♪基本のハンバーグ" satisfies RecipeName,
      description: "我が家で大大大人気の王道ハンバーグ。ふわっと＆ジューシー、ソースも簡単でおいしいです♪",
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["鳥羽周作"],
      //url:https://www.kurashiru.com/recipes/9f751232-2656-43dd-8f31-80fc365ff2b6
      name: "最高の明太子パスタ" satisfies RecipeName,
      description:
        "最高の明太子パスタのご紹介です。なめらかな明太子のソースと手作りニンニクオイルの香りがとまらない美味しさのパスタです。",
      servings: 1,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["鳥羽周作"],
      //https://www.kurashiru.com/recipes/b9c05771-ef26-4c88-8c6f-7692ce1b631e
      name: "無限パスタ 塩こぶバターときのこ" satisfies RecipeName,
      description:
        "東京・代々木上原にある、一つ星店「sio」の鳥羽周作シェフに教えていただいたレシピを、クラシルで再現！今回は、とにかく簡単、お子様から大人の方まで楽しめる無限パスタのご紹介です。少ない材料でさっと作れますが、塩昆布やバターがパスタに絡み、やみつきになる一品です。お好みのきのこや鶏ささみなどを加えてもおいしいですよ。",
      servings: 1,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["しまぶーさんの奥さん"],
      //https://cookpad.com/recipe/1519259
      name: "家の黄金比率で♥煮物の定番！肉じゃが♥" satisfies RecipeName,
      description:
        "つくれぽ殿堂入り♪家の黄金比シリーズ！煮物の定番・肉じゃがも超美味しく作れます♡簡単・覚え易く・ホクホク・味しみしみ♪",
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["しまぶーさんの奥さん"],
      //https://cookpad.com/recipe/6652425
      name: "♡抹茶クリーム大福♡バレンタインにも♡" satisfies RecipeName,
      description: `ホワイトチョコと練乳入りの
        ミルキーなクリーム大福♡
        一口食べたら、ほっぺが落ちる〜！！
        バレンタインに毎年作ってます♡`,
      servings: 5,
      isPublic: 0,
    },
    {
      userId: usersNameUserIdMap["しまぶーさんの奥さん"],
      //https://cookpad.com/recipe/1068543
      name: "柔ら〜か♪煮豚☆チャーシュー" satisfies RecipeName,
      description: `柔らか簡単チャーシューです♡タレも色々使えます。。(｡￫ˇ艸￩)いつもたくさん作って冷凍保存して、おにぎりやらーめんに♪`,
      servings: 5,
      isPublic: 0,
    },
    {
      userId: usersNameUserIdMap["双松桃子|モテ料理研究家"],
      //https://www.instagram.com/p/CwpMsJxLzCH/?hl=ja
      name: "お酒飲み専用の無限クランキーチキン" satisfies RecipeName,
      description: `今日のレシピは、ビールが止まらん。
      『クランキーチキン』      
      ✔️冷めても美味しすぎる…`,
      servings: 3,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["双松桃子|モテ料理研究家"],
      //https://www.instagram.com/p/CwhhTIWuP7B/?hl=ja
      name: "炊飯器で一発OK焼肉屋のビビンパ" satisfies RecipeName,
      description: `Xでの高評価No.1な大人気レシピ🍽

      今日のレシピは炊飯器で1発！
      【絶品ビビンバ】
      
      これほんとに感動…美味すぎる…
      
      焼肉屋さんのあの味、再現しました。`,
      servings: 3,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["双松桃子|モテ料理研究家"],
      //https://www.instagram.com/p/Cp4SFnYLpc8/?img_index=1
      name: "辛鶏チャーシュー" satisfies RecipeName,
      description: `＼ほったらかし調理のおすすめ簡単レシピ／
      彼氏が喜ぶ悪魔の甘辛いチャーシュー
      
      ピリ辛とこのタレがが本当に中毒になります。お酒飲みさんは1度作ってみて！
      
      こちらがビールを無限に飲めてしまう悪魔のチャーシューレシピです`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      //https://bazurecipe.com/2023/08/17/%e8%b6%85%e7%b5%b6%e6%9f%94%e3%82%89%e3%81%8b%e3%83%8d%e3%82%ae%e5%a1%a9%e3%83%ac%e3%83%a2%e3%83%b3/
      //https://www.youtube.com/watch?v=b_QxpTyqv2E&ab_channel=%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94
      name: "超絶柔らかネギ塩レモン" satisfies RecipeName,
      description: `鶏むね肉2キロ買っても絶対に余らなくなる【超絶柔らか鶏むね漬け】が犯罪的な旨さだ`,
      servings: 3,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      //https://bazurecipe.com/2020/05/19/%e8%87%b3%e9%ab%98%e3%81%ae%e3%83%9a%e3%83%9a%e3%83%ad%e3%83%b3%e3%83%81%e3%83%bc%e3%83%8e/
      //https://www.youtube.com/watch?v=Jx-tqntWPCM&ab_channel=%E6%96%99%E7%90%86%E7%A0%94%E7%A9%B6%E5%AE%B6%E3%83%AA%E3%83%A5%E3%82%A6%E3%82%B8%E3%81%AE%E3%83%90%E3%82%BA%E3%83%AC%E3%82%B7%E3%83%94
      name: "至高のペペロンチーノ" satisfies RecipeName,
      description: `料理研究家が辿り着いた最高の一皿
      めっちゃ簡単なので是非作ってみてください！`,
      servings: 1,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      //https://bazurecipe.com/2020/06/29/5428/
      //https://youtu.be/OL8o03u8l2Y
      name: "至高の豚汁" satisfies RecipeName,
      description: `これだけは食ってほしい

      ただの「肉入りお味噌汁」じゃない
      
      『至高の豚汁』
      
      ボリューム満点、
      
      正直、これとご飯で
      
      大満足出来る仕上がりです
      
      野菜をしっかり炒める事と
      
      薬味を入れるタイミングがポイントです
      
      最高の豚汁、是非ご賞味下さい`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      //https://bazurecipe.com/2020/06/29/5428/
      //https://youtu.be/OL8o03u8l2Y
      name: "至高の唐揚げ" satisfies RecipeName,
      description: `これだけは食ってほしい

      ただの「肉入りお味噌汁」じゃない
      
      『至高の豚汁』
      
      ボリューム満点、
      
      正直、これとご飯で
      
      大満足出来る仕上がりです
      
      野菜をしっかり炒める事と
      
      薬味を入れるタイミングがポイントです
      
      最高の豚汁、是非ご賞味下さい`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      //https://bazurecipe.com/2020/05/17/%e8%87%b3%e9%ab%98%e3%81%ae%e7%82%92%e9%a3%af/
      //https://www.youtube.com/watch?v=EmCPHumbMvo&feature=youtu.be
      name: "至高の炒飯" satisfies RecipeName,
      description: `あまりに拘りすぎて3回も撮り直した結果、

      自分史上最高に旨いチャーハン完成しました
      
      【至高の炒飯】
      
      色んなお店で炒飯食べましたが、
      
      これがイチオシです
      
      少量の生姜と油の量がポイントです
      
      一度食ってみてください、本気です`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      name: "至高の炒飯" satisfies RecipeName,
      description: `あまりに拘りすぎて3回も撮り直した結果、

      自分史上最高に旨いチャーハン完成しました
      
      【至高の炒飯】
      
      色んなお店で炒飯食べましたが、
      
      これがイチオシです
      
      少量の生姜と油の量がポイントです
      
      一度食ってみてください、本気です`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      //https://www.instagram.com/reel/CXUy_oJFQno/
      //https://www.kurashiru.com/shorts/57d5d04b-3039-4aca-bfe0-870ab688fc9e
      name: "ワンパンパエリア" satisfies RecipeName,
      description: `フライパンひとつで簡単に作れる『ワンパンパエリア』`,
      servings: 2,
      isPublic: 1,
    },

    {
      userId: usersNameUserIdMap["森 洋太"],
      //https://www.instagram.com/p/CwRVLgYqg6x/
      name: "夏野菜の揚げびたし" satisfies RecipeName,
      description: `ナスが驚くほど美味しくなる「夏野菜の揚げびたし」`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      //https://www.kurashiru.com/shorts/421429f6-409a-4eee-921b-d8e1df7ce69d?type=user&param=pasta.mori
      name: "贅沢なサンドイッチ" satisfies RecipeName,
      description: `自家製ツナで作る贅沢なサンドイッチレシピ`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"],
      //https://www.instagram.com/p/CvZHhRGL14W/
      name: "厚揚げのお好み焼き風" satisfies RecipeName,
      description: `厚揚げの余分な油を拭き取って焼いて
      お好みソース
      マヨ
      鰹節
      青のりをかけるだけ`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"],
      //https://www.instagram.com/p/CrfzSw4NWqC/
      name: "カリカリベーコンとアスパラのさっぱり酢醤油" satisfies RecipeName,
      description: `小さい頃から食べ慣れた味ですごい好きなおかず♡

      母がよく作ってくれてたけど
      こんなに簡単だったのかと
      初めて教えてもらったときの驚きを忘れられない`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      //https://www.youtube.com/watch?v=-F5mpkb5wrc&list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh&index=1&t=1s&ab_channel=Kurashiru%5B%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB%5D
      //https://www.kurashiru.com/recipes/5795571b-b090-496d-bccf-b54239359125
      name: "【フライパン一つで】和の匠が教える‼︎旨味が凝縮「豚の角煮」" satisfies RecipeName,
      description: `料理の鉄人JAPAN CUP“で総合優勝も経験した「日本橋ゆかり」三代目・野永喜三夫料理長に教えていただいたレシピ、角煮のご紹介です。少ない調味料で煮こんでいくので、圧力鍋がなくてもお作りいただけますよ。ぜひ作ってみてくださいね。`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      //https://www.kurashiru.com/recipes/72d59079-bc97-439c-8a3b-dd07de09172f
      //https://www.youtube.com/watch?v=DmS_ITVD00E&list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh&index=6&ab_channel=Kurashiru%5B%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB%5D
      name: "具だくさんの豚汁" satisfies RecipeName,
      description: `驚くほどおいしいのに、無駄なことはとことん省いてシンプルな手順で簡単に作れてしまう野永流、至極の豚汁です。`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      //https://www.youtube.com/watch?v=elwH9LjgRHk&list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh&index=2&ab_channel=Kurashiru%5B%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB%5D
      //https://www.kurashiru.com/recipes/e481eeef-4f8a-48ca-b200-c93e63f2e70c
      name: "油いらずで柔らかジューシーな生姜焼き" satisfies RecipeName,
      description: `めんつゆを使って、ご家庭でも簡単に生姜焼きがお作りいただけます。`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      //https://www.youtube.com/watch?v=IogvNoVKq-E&list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh&index=3&ab_channel=Kurashiru%5B%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB%5D
      name: "究極の肉じゃが" satisfies RecipeName,
      description: `簡単なのに本当に美味しい、しかも煮崩れしない肉じゃが`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      //https://www.kurashiru.com/recipes/7434ae88-9706-4e5b-b86b-29e71578f078
      //https://www.youtube.com/watch?v=mo8tf8n-gss&list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh&index=4&ab_channel=Kurashiru%5B%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB%5D
      name: "失敗しない「筑前煮」" satisfies RecipeName,
      description: `絶対失敗しない筑前煮の作り方
      材料を切ってフライパンで煮こむだけでご家庭で簡単に筑前煮がお作りいただけます`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      //https://www.kurashiru.com/recipes/c327b4a5-fe20-4c3a-96a3-9143f98c5adc
      //https://www.youtube.com/watch?v=yd5L_6RyJag&list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh&index=5&ab_channel=Kurashiru%5B%E3%82%AF%E3%83%A9%E3%82%B7%E3%83%AB%5D
      name: "とろとろ親子丼" satisfies RecipeName,
      description: `絶対失敗しない筑前煮の作り方
      材料を切ってフライパンで煮こむだけでご家庭で簡単に筑前煮がお作りいただけます`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["和食の巨匠・野永喜三夫"],
      name: "とろとろ親子丼" satisfies RecipeName,
      description: `絶対失敗しない筑前煮の作り方
      材料を切ってフライパンで煮こむだけでご家庭で簡単に筑前煮がお作りいただけます`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["シェフ三國"],
      //https://www.youtube.com/watch?v=1T3DZRrrIXI&ab_channel=%E3%82%AA%E3%83%86%E3%83%AB%E3%83%BB%E3%83%89%E3%82%A5%E3%83%BB%E3%83%9F%E3%82%AF%E3%83%8B
      name: "鶏むね肉のにんにくレモンクリーム" satisfies RecipeName,
      description: `東京・四ツ谷にあるフランス料理レストラン「オテル・ドゥ・ミクニ」オーナーシェフの三國清三によるレシピをご紹介
      鶏むね肉のにんにくレモンクリーム
      Poulet crémeux à l’ail et citron`,
      servings: 2,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["シェフ三國"],
      //https://www.youtube.com/watch?v=I9VzdmdB-qM&ab_channel=%E3%82%AA%E3%83%86%E3%83%AB%E3%83%BB%E3%83%89%E3%82%A5%E3%83%BB%E3%83%9F%E3%82%AF%E3%83%8B
      name: "じゃがいものガレット" satisfies RecipeName,
      description: `東京・四ツ谷にあるフランス料理レストラン「オテル・ドゥ・ミクニ」オーナーシェフの三國清三によるレシピをご紹介
      「じゃがいものガレット」
      Galette de pomme de terre
      4~6人前`,
      servings: 4,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["シェフ三國"],
      //https://www.youtube.com/watch?v=3ZJO2EJgiCo&ab_channel=%E3%82%AA%E3%83%86%E3%83%AB%E3%83%BB%E3%83%89%E3%82%A5%E3%83%BB%E3%83%9F%E3%82%AF%E3%83%8B
      name: "『かぼちゃポタージュ』材料は2つだけ！" satisfies RecipeName,
      description: `東京・四ツ谷にあるフランス料理レストラン「オテル・ドゥ・ミクニ」オーナーシェフの三國清三によるレシピをご紹介
      「かぼちゃのポタージュ」
Potage de potiron
      3~4人前`,
      servings: 3,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["George ジョージ"],
      //https://www.youtube.com/watch?v=zaZ58b_67YM&ab_channel=George%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%B8
      name: "ズッキーニのステーキ" satisfies RecipeName,
      description: `アメリカの超有名シェフ、トーマスケラーさんのローストズッキーニのレシピを George風にアレンジ。ズッキーニ史上最高の美味しさに仕上がりました。ぜひ1度作ってみて下さい！`,
      servings: 1,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["George ジョージ"],
      //https://www.youtube.com/watch?v=2jyeFnSr2Kg&ab_channel=George%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%B8
      name: "太らない【やみつき鶏チャーシュー】" satisfies RecipeName,
      description: `正月太り解消にはヘルシーな鶏胸肉を食べましょう。ヘルシーで安い鶏むね肉で、美味しいチャーシューが食べられたら、最高じゃないでしょうか。
      レシピは超簡単。余熱を使ってゆっくり火入れし、つゆにはシナモンを入れると爽やかな香りがアクセントに。つゆは煮詰めて仕上げのソースにも使えます。
      ネギ塩タレには辛味を効かせて添えれば、白米不可避の病みつきチャーシュー完成。
      とにかく旨いので絶対試して欲しいレシピです！`,
      servings: 3,
      isPublic: 1,
    },
    {
      userId: usersNameUserIdMap["George ジョージ"],
      //https://www.youtube.com/watch?v=ewb7EpYMew0&ab_channel=George%E3%82%B8%E3%83%A7%E3%83%BC%E3%82%B8
      name: "プロはここが違う＜魚のポワレ＞" satisfies RecipeName,
      description: `ポワレとは、フライパンで焼くという意味。
      フランス料理の基本の焼き方を、徹底解説しました。
      
      今日はスーパーで買った鯛をポワレして、グッと美味しく調理します。
      シンプルな調理法ですが、プロがやっている焼き方のコツを知れば、スーパーで買ういつものお魚が、レストランの一皿に。
      
      皮目はパリッと、身はふんわり。
      魚の臭みをなくす方法とは！？
      
      ぜひお試しください！`,
      servings: 2,
      isPublic: 1,
    },
  ] satisfies Insertable<Recipe>[];

  console.log("Recipe inserting data count:", recipes.length);

  await db.insertInto("Recipe").values(recipes).execute();
  console.log("recipeSeed end");
};
