import { Insertable, Selectable } from "kysely";

import { User, UserLink } from "@/types/db";
import { LinkCategory } from "@/types/enums";

import { db } from "../lib/kysely-node";
import { UserName } from "./user-seed";

export const userLinkSeed = async () => {
  console.log("userLinkSeed start");

  const users: Selectable<User>[] = await db.selectFrom("User").selectAll().execute();

  const usersNameUserId = users
    .filter((user) => user.name !== null)
    .map((user) => {
      const userName = user.name as string;
      return { [userName]: user.id };
    });

  const usersNameUserIdMap: { [key in UserName]: string } = Object.assign({}, ...usersNameUserId);

  const userLinks: Insertable<UserLink>[] = [
    {
      userId: usersNameUserIdMap["山田シェフ"],
      category: "youtube" satisfies LinkCategory,
      url: "https://www.youtube.com/channel/UC3p5OTQsMEnmZktWUkw_Y0A",
    },
    {
      userId: usersNameUserIdMap["山田シェフ"],
      category: "twitter" satisfies LinkCategory,
      url: "https://twitter.com/kohkentetsu14?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
    },
    {
      userId: usersNameUserIdMap["山田シェフ"],
      category: "instagram" satisfies LinkCategory,
      url: "https://www.instagram.com/kohkentetsu/?hl=ja",
    },
    {
      userId: usersNameUserIdMap["鳥羽周作"],
      category: "youtube" satisfies LinkCategory,
      url: "https://www.youtube.com/channel/UC1_eNNjFjV8Cp6QlxbOAnjA",
    },
    {
      userId: usersNameUserIdMap["鳥羽周作"],
      category: "instagram" satisfies LinkCategory,
      url: "https://www.instagram.com/ouchi_de_sio/?hl=ja",
    },
    {
      userId: usersNameUserIdMap["鳥羽周作"],
      category: "other" satisfies LinkCategory,
      url: "https://note.com/pirlo",
    },
    {
      userId: usersNameUserIdMap["しまぶーさんの奥さん"],
      category: "tiktok" satisfies LinkCategory,
      url: "https://www.tiktok.com/@kakureya.24",
    },
    {
      userId: usersNameUserIdMap["しまぶーさんの奥さん"],
      category: "tiktok" satisfies LinkCategory,
      url: "https://www.tiktok.com/@mikupon333",
    },
    {
      userId: usersNameUserIdMap["双松桃子|モテ料理研究家"],
      category: "twitter" satisfies LinkCategory,
      url: "https://twitter.com/momosan0627",
    },
    {
      userId: usersNameUserIdMap["双松桃子|モテ料理研究家"],
      category: "instagram" satisfies LinkCategory,
      url: "https://www.instagram.com/momosan0627/?hl=ja",
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      category: "instagram" satisfies LinkCategory,
      url: "https://www.instagram.com/ryuji_foodlabo/",
    },
    {
      userId: usersNameUserIdMap["リュウジのバズレシピ"],
      category: "youtube" satisfies LinkCategory,
      url: "https://www.youtube.com/channel/UCW01sMEVYQdhcvkrhbxdBpw",
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      category: "instagram" satisfies LinkCategory,
      url: "https://www.instagram.com/pasta.mori/",
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      category: "youtube" satisfies LinkCategory,
      url: "https://www.youtube.com/channel/UCiwcfl1ssHkOjx87Egp2FWQ",
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      category: "other" satisfies LinkCategory,
      url: "https://www.amazon.co.jp/dp/4046821159?ref_=cm_sw_r_apin_dp_X82FG919JZ27VCZ3627Z",
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      category: "other" satisfies LinkCategory,
      url: "https://www.kurashiru.com/profiles/pasta.mori",
    },
    {
      userId: usersNameUserIdMap["森 洋太"],
      category: "other" satisfies LinkCategory,
      url: "https://morichef.official.ec/",
    },
    {
      userId: usersNameUserIdMap["あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"],
      category: "instagram" satisfies LinkCategory,
      url: "https://www.instagram.com/ai.ouchigohan/",
    },
    {
      userId: usersNameUserIdMap["あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"],
      category: "youtube" satisfies LinkCategory,
      url: "https://www.youtube.com/@ai.ouchigohan",
    },
    {
      userId: usersNameUserIdMap["あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"],
      category: "other" satisfies LinkCategory,
      url: "https://ainoouchigohan.blog.jp/",
    },
    {
      userId: usersNameUserIdMap["あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"],
      category: "other" satisfies LinkCategory,
      url: "https://www.amazon.co.jp/dp/4594615252/",
    },
  ] satisfies Insertable<UserLink>[];

  await db.insertInto("UserLink").values(userLinks).execute();
  console.log("userLinkSeed end");
};
