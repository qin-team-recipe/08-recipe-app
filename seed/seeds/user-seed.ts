import { Insertable } from "kysely";

import { User } from "@/types/db";

import { db } from "../lib/kysely-node";

const userNames = [
  "山田シェフ",
  "鳥羽周作",
  "しまぶーさんの奥さん",
  "双松桃子|モテ料理研究家",
  "リュウジのバズレシピ",
  "森 洋太",
  "あいのおうちごはん＊ズボラ主婦の毎日レシピと献立",
  "和食の巨匠・野永喜三夫",
  "シェフ三國",
  "George ジョージ",
  "富岡清美/簡単イタリアン",
  "Bobのおふくろ",
  "桜井よしこ",
] as const;
export type UserName = (typeof userNames)[number];

export const userSeedData = [
  {
    name: "山田シェフ" satisfies UserName,
    userType: "chef",
    profileText: `初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！`,
    image: "/chefs/268215431924014868267858525012700090910279903691.jpg",
  },
  {
    name: "鳥羽周作" satisfies UserName,
    userType: "chef",
    profileText: `一つ星レストラン「sio」のオーナーシェフ鳥羽周作がおうちでできる簡単レシピを投稿していきます。幸せの分母を増やします`,
    image: "/chefs/4j4vh2DXrNxPBgSC.jpeg",
  },
  {
    name: "しまぶーさんの奥さん" satisfies UserName,
    userType: "general",
    profileText: `簡単時短で手頃なレシピの提供を心がけます`,
    image: "/chefs/km4UW0tAV5kTDw32.jpg",
  },
  {
    name: "双松桃子|モテ料理研究家" satisfies UserName,
    userType: "chef",
    profileText: `好きな人の胃袋をきゅんとさせたい方必見 【 #きゅんレシピ 】「モテる」レシピ、商品プロデュースしてます♡ラジオ番組 双松桃子の『今日なにたべる？』(FM FUJI) `,
    image: "/chefs/309215556_763965131569391_5157810189911856464_n.jpg",
  },
  {
    name: "リュウジのバズレシピ" satisfies UserName,
    userType: "chef",
    profileText: `料理研究家/株式会社バズレシピ代表取締役 Twitter登録250万人 YouTube登録400万人 総フォロワー約850万人 世界一受けたい授業出演 第7回レシピ本大賞受賞 著書累計145万部突破 お仕事の依頼等はこちら→bazurecipe@gmail.com`,
    image: "/chefs/1234565556_7639651318230940_123041091411856464_n.jpeg",
  },
  {
    name: "森 洋太" satisfies UserName,
    userType: "chef",
    profileText: `愛知県在住。名古屋の有名洋食店やイタリアン、ビストロで経験を積んだのち和食店の新規開業を担う。4店舗の統括料理長に就任し、数々の人気メニューを生む。YouTubeチャンネルを開設し、「おうちで作るプロの味」をコンセプトに本当においしく作れるレシピを紹介し話題に。SNS総フォロワー数100万人を突破。2022年に独立し「森シェフ商店」を立ち上げてオリジナル調味料の開発をスタート`,
    image: "/chefs/92103828727075187252673460359514.jpg",
  },
  {
    name: "あいのおうちごはん＊ズボラ主婦の毎日レシピと献立" satisfies UserName,
    userType: "general",
    profileText: `福島県生まれ*
      埼玉県在住＊夫・娘３人暮らし＊
      いつまでたっても料理がすきになれない主婦料理したくない人類を救うをモットーにレシピをご紹介していますが、全て自分のためです。`,
    image: "/chefs/964179054204585423430385588683827570844291927343.jpg",
  },
  {
    name: "和食の巨匠・野永喜三夫" satisfies UserName,
    userType: "chef",
    profileText: `日本橋ゆかり三代目若主人
    卒業後京都「#菊乃井 」に入社
    ２００２年１月ＴＶ番組「#料理の鉄人Japan-Cup ’02」総合優勝
    2017年 小池知事より優秀技能者`,
    image: "/chefs/964179054204585423430385588683827570844291927343.jpg",
  },
  {
    name: "シェフ三國" satisfies UserName,
    userType: "chef",
    profileText: `札幌グランドホテル、帝国ホテルにて修業後、1974年駐スイス日本大使館料理長に就任。ジラルデ、トロワグロ、アラン・シャペルなど三ツ星レストランで修業を重ね、1982年帰国。1985年、東京・四ッ谷にオテル・ドゥ・ミクニ開店。2007年、厚生労働省より卓越した技能者「現代の名工」として表彰される。2010年、フランス共和国農事功労章オフィシエを受勲。食育活動やスローフード活動にも力を注ぐ。主な著書に『体の中からきれいになるミクニごはん』（朝日出版社）、『料理の哲学』（青春出版社）、『僕はこんなものを食べてきた』（ポプラ社）などがある。`,
    image: "/chefs/377653371052464076756365890715515990067718683519.jpg",
  },
  {
    name: "George ジョージ" satisfies UserName,
    userType: "chef",
    profileText: `その昔2つ星フレンチの料理長をして今は白金台のカウンターフレンチでシェフしてます。良かったら細々とYouTubeで料理チャンネルやってるので気軽にフォローお願い致します。`,
    image: "/chefs/948257687743961120709233617024324849842623607910.webp",
  },
  {
    name: "George ジョージ" satisfies UserName,
    userType: "chef",
    profileText: `その昔2つ星フレンチの料理長をして今は白金台のカウンターフレンチでシェフしてます。良かったら細々とYouTubeで料理チャンネルやってるので気軽にフォローお願い致します。`,
    image: "/chefs/948257687743961120709233617024324849842623607910.webp",
  },
  {
    name: "George ジョージ" satisfies UserName,
    userType: "general",
    profileText: `その昔2つ星フレンチの料理長をして今は白金台のカウンターフレンチでシェフしてます。良かったら細々とYouTubeで料理チャンネルやってるので気軽にフォローお願い致します。`,
    image: "/chefs/948257687743961120709233617024324849842623607910.webp",
  },
  {
    name: "富岡清美/簡単イタリアン" satisfies UserName,
    userType: "chef",
    profileText: `イタリア料理&テーブルコーディネート教室「しあわせイタリアン」主宰@世田谷区等々力、レシピ開発/コラム執筆、　食べて美しくなるアンチエイジングなイタリアンを提案♪`,
    image: "/chefs/358263361996894043716371669593232737142979847294.jpeg",
  },
  {
    name: "Bobのおふくろ" satisfies UserName,
    userType: "general",
    profileText: `プロフィールご覧いただきありがとうございます。息子が気に入っているレシピを掲載しています。`,
  },
  {
    name: "桜井よしこ" satisfies UserName,
    userType: "general",
    profileText: `趣味の料理のレシピを友人らに共有しています。手軽で美味しい料理を心がけています。`,
    image: "/chefs/141358202607093436780525359509622769999913757285.png",
  },
] satisfies Insertable<User>[];

export const userSeed = async (userSeedData: Insertable<User>[]) => {
  console.log("userSeed start");

  await db.insertInto("User").values(userSeedData).execute();
  console.log("userSeed end");
};
