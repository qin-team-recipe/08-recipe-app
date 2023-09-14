import { Insertable } from "kysely";

import { db } from "@/lib/kysely-node";
import { UserFollow } from "@/types/db";

import { userNames } from "./user-seed";

export const userFollowSeed = async () => {
  console.log("userFllowSeed start");

  const users = await db.selectFrom("User").selectAll().execute();

  const usersNameUserIdMap = new Map(
    users.flatMap((user) => {
      const name = userNames.find((name) => name === user.name);
      if (!name) return [];
      return [[name, user.id]];
    }),
  );

  const followUsers = (
    [
      //ユーザー「しまぶーさんの奥さん」がフォローしているユーザー
      {
        followedUserId: usersNameUserIdMap.get("山田シェフ"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        followedUserId: usersNameUserIdMap.get("George ジョージ"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        followedUserId: usersNameUserIdMap.get("シェフ三國"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        followedUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        followedUserId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        followedUserId: usersNameUserIdMap.get("富岡清美/簡単イタリアン"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      {
        followedUserId: usersNameUserIdMap.get("桜井よしこ"),
        followerUserId: usersNameUserIdMap.get("しまぶーさんの奥さん"),
      },
      //ユーザー「Bobのおふくろ」がフォローしているユーザー
      {
        followedUserId: usersNameUserIdMap.get("山田シェフ"),
        followerUserId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("George ジョージ"),
        followerUserId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
        followerUserId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫"),
        followerUserId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("桜井よしこ"),
        followerUserId: usersNameUserIdMap.get("Bobのおふくろ"),
      },
      //ユーザー「あいのおうちごはん＊ズボラ主婦の毎日レシピと献立」がフォローしているユーザー
      {
        followedUserId: usersNameUserIdMap.get("George ジョージ"),
        followerUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        followedUserId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫"),
        followerUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        followedUserId: usersNameUserIdMap.get("富岡清美/簡単イタリアン"),
        followerUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      {
        followedUserId: usersNameUserIdMap.get("桜井よしこ"),
        followerUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
      },
      //ユーザー「しまぶーさんの奥さん」がフォローしているユーザー
      {
        followedUserId: usersNameUserIdMap.get("山田シェフ"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("George ジョージ"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("シェフ三國"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("あいのおうちごはん＊ズボラ主婦の毎日レシピと献立"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("和食の巨匠・野永喜三夫"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("富岡清美/簡単イタリアン"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
      {
        followedUserId: usersNameUserIdMap.get("Bobのおふくろ"),
        followerUserId: usersNameUserIdMap.get("桜井よしこ"),
      },
    ] satisfies (Omit<Insertable<UserFollow>, "followedUserId" | "followerUserId"> &
      Partial<Pick<Insertable<UserFollow>, "followedUserId" | "followerUserId">>)[]
  ).flatMap((followUser) => {
    const { followedUserId, followerUserId } = followUser;
    if (!followedUserId || !followerUserId) return [];
    return [{ ...followUser, followedUserId, followerUserId }];
  });

  console.log("UserFollow insertingdata count:", followUsers.length);

  await db.insertInto("UserFollow").values(followUsers).execute();
  console.log("userFollowSeed end");
};
