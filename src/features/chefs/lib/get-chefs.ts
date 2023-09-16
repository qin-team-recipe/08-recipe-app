import { Selectable, sql } from "kysely";

import { DATE_SPAN_RECENT, RECIPE_COUNT_FAVORITED_RECENTLY } from "@/config";
import { db } from "@/lib/kysely";
import { Recipe, RecipeFavorite, UserFollow } from "@/types/db";

import { ChefListItemWithRecipeCountType } from "../types";

export async function getChefsWithRecipeCount({
  query,
  page = 1,
  limit = 6,
}: {
  query?: string;
  page?: number;
  limit?: number;
  // }): Promise<ChefListItemWithRecipeCountType[]> {
}) {
  const offset = (page - 1) * limit;

  const baseQuery = createBaseQuerySelect(query);
  const chefs = await baseQuery.offset(offset).limit(limit).execute();

  if (chefs.length === 0) {
    return [];
  }
  // console.log("recipes", recipes);
  // console.log("recipes", recipes);

  // let { rows } = await sql<{
  //   recipeId: string;
  //   recipeFavoriteCount: string;
  // }>`SELECT recipeId, count(*) AS recipeFavoriteCount FROM RecipeFavorite GROUP BY recipeId`.execute(db);
  // console.log("rowAll", rows);

  const chefIds = chefs.map((chef) => chef["id"]);
  // const recipeIds = recipes.map((recipe) => `'${recipe["id"]}'`);
  //TODO: placeholderの調子が悪くエラーに成る
  // const recipeIds = recipes.map((recipe) => `'${recipe["id"]}'`);
  // let { rows } = await sql<{
  //   recipeId: string;
  //   recipeFavoriteCount: string;
  // }>`SELECT recipeId, count(*) AS recipeFavoriteCount FROM RecipeFavorite WHERE recipeId IN (${recipeIds.join(
  //   ",",
  // )}) GROUP BY recipeId`.execute(db);
  // console.log("rows", rows);

  const recipes: Pick<Selectable<Recipe>, "id" | "userId">[] = await db
    .selectFrom("Recipe")
    .select(["id", "userId"])
    .where("userId", "in", chefIds)
    .where("isPublic", "=", 1)
    .where("deletedAt", "is", null)
    .execute();

  const recipeCounts = recipes.reduce(function (prev, current) {
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

  let baseQuery = createBaseQuerySelect(query);
  baseQuery = baseQuery.where(
    "Recipe.id",
    "in",
    chefFollowedRecently.flatMap((chefFollowed) => chefFollowed.followedUserId),
  );

  //TODO:なぜ下記のorderByだとお気に入り順に表示されないのか検証中
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
  // const recipeIds = recipes.map((recipe) => `'${recipe["id"]}'`);
  //TODO: placeholderの調子が悪くエラーに成る
  // const recipeIds = recipes.map((recipe) => `'${recipe["id"]}'`);
  // let { rows } = await sql<{
  //   recipeId: string;
  //   recipeFavoriteCount: string;
  // }>`SELECT recipeId, count(*) AS recipeFavoriteCount FROM RecipeFavorite WHERE recipeId IN (${recipeIds.join(
  //   ",",
  // )}) GROUP BY recipeId`.execute(db);
  // console.log("rows", rows);

  const recipes: Pick<Selectable<Recipe>, "id" | "userId">[] = await db
    .selectFrom("Recipe")
    .select(["id", "userId"])
    .where("userId", "in", chefIds)
    .where("isPublic", "=", 1)
    .where("deletedAt", "is", null)
    .execute();

  const recipeCounts = recipes.reduce(function (prev, current) {
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

export async function getChefMaxCountFollowedRecently({ query }: { query?: string }) {
  try {
    let baseQuery = createBaseQueryCount(query);

    const chefFollowedRecently = await getChefFollowUserCount();

    baseQuery = baseQuery.where(
      "id",
      "in",
      chefFollowedRecently.flatMap((chefFollowed) => chefFollowed.followedUserId),
    );

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

function createBaseQuerySelect(query: string | undefined) {
  let baseQuery = db.selectFrom("User").selectAll().where("userType", "=", "chef").where("deletedAt", "is", null);
  if (query) {
    baseQuery = baseQuery.where((eb) =>
      eb.or([eb("name", "like", `%${query}%`), eb("profileText", "like", `%${query}%`)]),
    );
  }
  return baseQuery;
}

function createBaseQueryCount(query: string | undefined) {
  let baseQuery = db.selectFrom("User").select("id").where("deletedAt", "is", null).where("userType", "=", "chef");

  if (query) {
    baseQuery = baseQuery.where((eb) =>
      eb.or([eb("name", "like", `%${query}%`), eb("profileText", "like", `%${query}%`)]),
    );
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
  }>`SELECT followedUserId, count(*) AS followUserCount FROM UserFollow WHERE updatedAt >= ${dateString} AND isPublic = true AND deletedAt is null GROUP BY followedUserId, createdAt ORDER BY followUserCount DESC, createdAt DESC`.execute(
    db,
  );

  return rows
    .sort(function (a, b) {
      return a.followerUserCount > b.followerUserCount ? -1 : 1;
    })
    .slice(0, RECIPE_COUNT_FAVORITED_RECENTLY);
}
