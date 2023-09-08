import { Insertable, Selectable } from "kysely";

import { db } from "@/lib/kysely-node";
import { User, UserLink } from "@/types/db";

import { UserName, userNames } from "./user-seed";

export const userLinkSeed = async () => {
  console.log("userLinkSeed start");

  const users = await db.selectFrom("User").selectAll().execute();

  const usersNameUserIdMap = new Map(
    users
      .filter((user): user is Selectable<User> & { name: UserName } => userNames.some((name) => name === user.name))
      .map(({ id, name }) => [name, id]),
  );

  const userLinks: Insertable<UserLink>[] = [
    {
      userId: usersNameUserIdMap.get("山田シェフ") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/channel/UC3p5OTQsMEnmZktWUkw_Y0A",
    },
    {
      userId: usersNameUserIdMap.get("山田シェフ") ?? "",
      category: "twitter",
      url: "https://twitter.com/kohkentetsu14?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
    },
    {
      userId: usersNameUserIdMap.get("山田シェフ") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/kohkentetsu/?hl=ja",
    },
    {
      userId: usersNameUserIdMap.get("鳥羽周作") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/channel/UC1_eNNjFjV8Cp6QlxbOAnjA",
    },
    {
      userId: usersNameUserIdMap.get("鳥羽周作") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/ouchi_de_sio/?hl=ja",
    },
    {
      userId: usersNameUserIdMap.get("鳥羽周作") ?? "",
      category: "other",
      url: "https://note.com/pirlo",
    },
    {
      userId: usersNameUserIdMap.get("しまぶーさんの奥さん") ?? "",
      category: "tiktok",
      url: "https://www.tiktok.com/@kakureya.24",
    },
    {
      userId: usersNameUserIdMap.get("しまぶーさんの奥さん") ?? "",
      category: "tiktok",
      url: "https://www.tiktok.com/@mikupon333",
    },
    {
      userId: usersNameUserIdMap.get("双松桃子|モテ料理研究家") ?? "",
      category: "twitter",
      url: "https://twitter.com/momosan0627",
    },
    {
      userId: usersNameUserIdMap.get("双松桃子|モテ料理研究家") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/momosan0627/?hl=ja",
    },
    {
      userId: usersNameUserIdMap.get("リュウジのバズレシピ") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/ryuji_foodlabo/",
    },
    {
      userId: usersNameUserIdMap.get("リュウジのバズレシピ") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/channel/UCW01sMEVYQdhcvkrhbxdBpw",
    },
    {
      userId: usersNameUserIdMap.get("森 洋太") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/pasta.mori/",
    },
    {
      userId: usersNameUserIdMap.get("森 洋太") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/channel/UCiwcfl1ssHkOjx87Egp2FWQ",
    },
    {
      userId: usersNameUserIdMap.get("森 洋太") ?? "",
      category: "other",
      url: "https://www.amazon.co.jp/dp/4046821159?ref_=cm_sw_r_apin_dp_X82FG919JZ27VCZ3627Z",
    },
    {
      userId: usersNameUserIdMap.get("森 洋太") ?? "",
      category: "other",
      url: "https://www.kurashiru.com/profiles/pasta.mori",
    },
    {
      userId: usersNameUserIdMap.get("森 洋太") ?? "",
      category: "other",
      url: "https://morichef.official.ec/",
    },
    {
      userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/ai.ouchigohan/",
    },
    {
      userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/@ai.ouchigohan",
    },
    {
      userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立") ?? "",
      category: "other",
      url: "https://ainoouchigohan.blog.jp/",
    },
    {
      userId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立") ?? "",
      category: "other",
      url: "https://www.amazon.co.jp/dp/4594615252/",
    },
    {
      userId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫") ?? "",
      category: "other",
      url: "https://www.kurashiru.com/lists/ce67578e-362e-4863-9035-586120502b20",
    },
    {
      userId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫") ?? "",
      category: "twitter",
      url: "https://twitter.com/nonagakimio",
    },
    {
      userId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/playlist?list=PLCSlJ_ORMzdjv7JZdqtmPUaB_uf71D-Nh",
    },
    {
      userId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫") ?? "",
      category: "other",
      url: "http://www.nihonbashi-yukari.com/",
    },
    {
      userId: usersNameUserIdMap.get("シェフ三國") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/@chef-MIKUNI",
    },
    {
      userId: usersNameUserIdMap.get("シェフ三國") ?? "",
      category: "youtube",
      url: "https://www.instagram.com/hoteldemikuni/",
    },
    {
      userId: usersNameUserIdMap.get("シェフ三國") ?? "",
      category: "other",
      url: "https://oui-mikuni.co.jp/",
    },
    {
      userId: usersNameUserIdMap.get("George ジョージ") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/george_cuisine/",
    },
    {
      userId: usersNameUserIdMap.get("George ジョージ") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/cirpas.tokyo/",
    },
    {
      userId: usersNameUserIdMap.get("George ジョージ") ?? "",
      category: "youtube",
      url: "https://www.youtube.com/channel/UCP2gnyy_-ToZeIDw6qeI6HA",
    },
    {
      userId: usersNameUserIdMap.get("George ジョージ") ?? "",
      category: "tiktok",
      url: "https://www.tiktok.com/@johjiro",
    },
    {
      userId: usersNameUserIdMap.get("George ジョージ") ?? "",
      category: "twitter",
      url: "https://twitter.com/chef_johjiro?s=11",
    },
    {
      userId: usersNameUserIdMap.get("富岡清美/簡単イタリアン") ?? "",
      category: "instagram",
      url: "https://www.instagram.com/kiyomitomioka/",
    },
    {
      userId: usersNameUserIdMap.get("富岡清美/簡単イタリアン") ?? "",
      category: "other",
      url: "https://lit.link/kiyomitomioka#",
    },
    {
      userId: usersNameUserIdMap.get("富岡清美/簡単イタリアン") ?? "",
      category: "other",
      url: "https://ameblo.jp/happykiyomy/",
    },
  ] satisfies Insertable<UserLink>[];

  await db.insertInto("UserLink").values(userLinks).execute();
  console.log("userLinkSeed end");
};
