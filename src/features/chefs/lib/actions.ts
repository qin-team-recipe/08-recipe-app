"use server";

import { Selectable } from "kysely";

import { db } from "@/lib/kysely";
import { User } from "@/types/db";

export async function getFavoriteChefs(userId: string): Promise<Selectable<User>[]> {
  const followedChefs = await db.selectFrom("UserFollow").selectAll().where("followerUserId", "=", userId).execute();
  const followedChefsArray = followedChefs.map((chef) => chef.followedUserId);
  return await db.selectFrom("User").selectAll().where("id", "in", followedChefsArray).execute();
}
