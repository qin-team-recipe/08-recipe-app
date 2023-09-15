import { Selectable, sql } from "kysely";

import { DATE_SPAN_RECENT, RECIPE_COUNT_FAVORITED_RECENTLY } from "@/config";
import { db } from "@/lib/kysely";
import { RecipeFavorite } from "@/types/db";

export async function getRecipesWithFavoriteCount({
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
  const recipes = await baseQuery.offset(offset).limit(limit).execute();

  if (recipes.length === 0) {
    return [];
  }
  // console.log("recipes", recipes);
  // console.log("recipes", recipes);

  // let { rows } = await sql<{
  //   recipeId: string;
  //   recipeFavoriteCount: string;
  // }>`SELECT recipeId, count(*) AS recipeFavoriteCount FROM RecipeFavorite GROUP BY recipeId`.execute(db);
  // console.log("rowAll", rows);

  const recipeIds = recipes.map((recipe) => recipe["id"]);
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

  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  return recipes.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
}

export async function getRecipeMaxCount({ query }: { query?: string }) {
  try {
    const baseQuery = createBaseQueryCount(query);
    const recipes = await baseQuery.execute();
    return recipes.length;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else if (typeof error === "string") {
      console.log("unexpected error");
    }
    return 0;
  }
}

export async function getRecipesFavoritedRecently({
  query,
  page = 1,
  limit = 6,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const recipeFavoritedRecently = await getRecipesFavoriteCount();

  let baseQuery = createBaseQuerySelect(query);
  baseQuery = baseQuery.where(
    "Recipe.id",
    "in",
    recipeFavoritedRecently.flatMap((recipeFavrorite) => recipeFavrorite.recipeId),
  );

  const recipeFavoritedRecentlyRecipeIds = recipeFavoritedRecently
    .map((recipeFavrorite) => recipeFavrorite.recipeId)
    .join(",");

  //TODO:order by fieldが効かない。planet scale効かない？
  const recipes = await baseQuery
    .offset(offset)
    .limit(limit)
    .orderBy(sql`field(Recipe.id, ${recipeFavoritedRecentlyRecipeIds})`)
    .execute();

  if (recipes.length === 0) {
    return [];
  }

  const recipeIds = recipes.map((recipe) => recipe["id"]);

  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  return recipes.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
}

export async function getRecipeMaxCountFavoriteRecently({ query }: { query?: string }) {
  try {
    let baseQuery = createBaseQueryCount(query);

    const recipeFavoritedRecently = await getRecipesFavoriteCount();

    baseQuery = baseQuery.where(
      "id",
      "in",
      recipeFavoritedRecently.flatMap((recipeFavrorite) => recipeFavrorite.recipeId),
    );

    const recipes = await baseQuery.execute();
    return recipes.length;
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
  let baseQuery = db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.isPublic as isPublic",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null);
  if (query) {
    baseQuery = baseQuery.where((eb) =>
      eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]),
    );
  }
  return baseQuery;
}

function createBaseQueryCount(query: string | undefined) {
  let baseQuery = db.selectFrom("Recipe").select("id").where("deletedAt", "is", null);

  if (query) {
    baseQuery = baseQuery.where((eb) =>
      eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]),
    );
  }
  return baseQuery;
}

async function getRecipesFavoriteCount() {
  const date = new Date();
  date.setDate(date.getDate() - DATE_SPAN_RECENT);
  const dateString = date.toJSON().slice(0, 19).replace("T", " ");
  const { rows } = await sql<{
    recipeId: string;
    recipeFavoriteCount: string;
  }>`SELECT recipeId, createdAt, count(*) AS recipeFavoriteCount FROM RecipeFavorite WHERE updatedAt >= ${dateString} AND deletedAt is null GROUP BY recipeId, createdAt ORDER BY recipeFavoriteCount DESC, createdAt DESC`.execute(
    db,
  );

  return rows
    .sort(function (a, b) {
      return a.recipeFavoriteCount > b.recipeFavoriteCount ? -1 : 1;
    })
    .slice(0, RECIPE_COUNT_FAVORITED_RECENTLY);
}
