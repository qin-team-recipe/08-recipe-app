"use server";

import { revalidatePath } from "next/cache";

import { Selectable, sql } from "kysely";

import { DATE_SPAN_RECENT, RECIPE_COUNT_FAVORITED_RECENTLY } from "@/config";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";
import { Recipe, UserFollow } from "@/types/db";
import { RecipeStatus } from "@/types/enums";

export async function getChefsWithRecipeCount({
  query,
  page = 1,
  limit = 6,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const baseQuery = createBaseQuerySelect(query);
  const chefs = await baseQuery.orderBy("name", "asc").offset(offset).limit(limit).execute();

  if (chefs.length === 0) {
    return [];
  }

  const chefIds = chefs.map((chef) => chef["id"]);

  const recipes: Pick<Selectable<Recipe>, "id" | "userId">[] = await db
    .selectFrom("Recipe")
    .select(["id", "userId"])
    .where("userId", "in", chefIds)
    .where("status", "=", RecipeStatus.public)
    .where("deletedAt", "is", null)
    .execute();

  const recipeCounts = recipes.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["userId"]] = (prev[current["userId"]] || 0) + 1;
    return prev;
  }, {});

  return chefs.flatMap((chef) => {
    return {
      ...chef,
      recipeCount: recipeCounts[chef.id] ? recipeCounts[chef.id] : 0,
    };
  });
}

export async function getChefMaxCount({ query }: { query?: string }) {
  try {
    const baseQuery = createBaseQueryCount(query);
    const chefs = await baseQuery.execute();
    return chefs.length;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else if (typeof error === "string") {
      console.log("unexpected error");
    }
    return 0;
  }
}

export async function getChefsFollowedRecently({
  query,
  page = 1,
  limit = 6,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const chefFollowedRecently = await getChefFollowUserCount();

  //話題のシェフが0件の場合は検索条件のないシェフ一覧を全件表示
  if (chefFollowedRecently.length === 0) {
    return await getChefsWithRecipeCount({ query: undefined, page, limit });
  }

  const baseQuery = createBaseQuerySelect(query).where(
    "User.id",
    "in",
    chefFollowedRecently.flatMap((chefFollowed) => chefFollowed.followedUserId),
  );

  const chefFollowedRecentlyUserIds = chefFollowedRecently.map((chefFollowed) => chefFollowed.followedUserId).join(",");

  const chefs = await baseQuery
    .offset(offset)
    .limit(limit)
    .orderBy(sql`field(User.id, ${chefFollowedRecentlyUserIds})`)
    .execute();

  if (chefs.length === 0) {
    return [];
  }

  const chefIds = chefs.map((chef) => chef["id"]);
  const recipes: Pick<Selectable<Recipe>, "id" | "userId">[] = await db
    .selectFrom("Recipe")
    .select(["id", "userId"])
    .where("userId", "in", chefIds)
    .where("status", "=", RecipeStatus.public)
    .where("deletedAt", "is", null)
    .execute();

  const recipeCounts = recipes.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["userId"]] = (prev[current["userId"]] || 0) + 1;
    return prev;
  }, {});

  return chefs.flatMap((chef) => {
    return {
      ...chef,
      recipeCount: recipeCounts[chef.id] ? recipeCounts[chef.id] : 0,
    };
  });
}

function createBaseQuerySelect(query: string | undefined) {
  const baseQuery = db.selectFrom("User").selectAll().where("userType", "=", "chef").where("deletedAt", "is", null);
  if (query) {
    return baseQuery.where((eb) => eb.or([eb("name", "like", `%${query}%`), eb("profileText", "like", `%${query}%`)]));
  }
  return baseQuery;
}

function createBaseQueryCount(query: string | undefined) {
  const baseQuery = db.selectFrom("User").select("id").where("deletedAt", "is", null).where("userType", "=", "chef");

  if (query) {
    return baseQuery.where((eb) => eb.or([eb("name", "like", `%${query}%`), eb("profileText", "like", `%${query}%`)]));
  }
  return baseQuery;
}

async function getChefFollowUserCount() {
  const date = new Date();
  date.setDate(date.getDate() - DATE_SPAN_RECENT);
  const dateString = date.toJSON().slice(0, 19).replace("T", " ");
  const { rows } = await sql<{
    followedUserId: string;
    followerUserCount: string;
  }>`SELECT followedUserId, count(*) AS followUserCount FROM UserFollow WHERE updatedAt >= ${dateString} AND deletedAt is null GROUP BY followedUserId, createdAt ORDER BY followUserCount DESC, createdAt DESC`.execute(
    db,
  );

  if (!rows) {
    return [];
  }

  return rows
    .sort(function (a, b) {
      return a.followerUserCount > b.followerUserCount ? -1 : 1;
    })
    .slice(0, RECIPE_COUNT_FAVORITED_RECENTLY);
}

export async function getFavoriteChefs(userId: string) {
  const followedChefs = await db
    .selectFrom("UserFollow")
    .selectAll()
    .where("followerUserId", "=", userId)
    .where("deletedAt", "is", null)
    .execute();
  if (followedChefs.length === 0) {
    return [];
  }
  const followedChefIds = followedChefs.map((chef) => chef.followedUserId);
  return await db
    .selectFrom("User")
    .selectAll()
    .where("id", "in", followedChefIds)
    .where("deletedAt", "is", null)
    .execute();
}

export async function getIsFollowedByFollowerUserId(followedUserId: string, followerUserId: string) {
  const userFollows: Pick<Selectable<UserFollow>, "followedUserId" | "followerUserId">[] = await db
    .selectFrom("UserFollow")
    .select(["followedUserId", "followerUserId"])
    .where("followedUserId", "=", followedUserId)
    .where("followerUserId", "=", followerUserId)
    .where("deletedAt", "is", null)
    .execute();

  return userFollows.length > 0;
}
export async function updateUserFollow(
  chefId: string,
  loginUserId: string,
  becomeFollowed: boolean,
): Promise<ServerActionsResponse<{ userFollow: { becomeFollowed: boolean } }>> {
  try {
    await db
      .updateTable("UserFollow")
      .set({
        deletedAt: new Date(),
      })
      .where("followedUserId", "=", chefId)
      .where("followerUserId", "=", loginUserId)
      .execute();

    if (!becomeFollowed) {
      return {
        success: true,
        data: { userFollow: { becomeFollowed } },
      };
    }

    const userFollow = await db
      .selectFrom("UserFollow")
      .select(["id"])
      .where("followedUserId", "=", chefId)
      .where("followerUserId", "=", loginUserId)
      .orderBy("updatedAt", "desc")
      .executeTakeFirst();

    if (userFollow) {
      await db
        .updateTable("UserFollow")
        .set({
          updatedAt: new Date(),
          deletedAt: null,
        })
        .where("id", "=", userFollow.id)
        .execute();
    } else {
      await db
        .insertInto("UserFollow")
        .values({
          followedUserId: chefId,
          followerUserId: loginUserId,
        })
        .executeTakeFirst();
    }

    return {
      success: true,
      data: { userFollow: { becomeFollowed } },
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
    revalidatePath(`/chef/${chefId}`);
  }
}
