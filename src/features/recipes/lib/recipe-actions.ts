"use server";

import { revalidatePath } from "next/cache";

import { Selectable, sql, Updateable } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";

import { DATE_SPAN_RECENT, RECIPE_COUNT_FAVORITED_RECENTLY } from "@/config";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";
import { Recipe, RecipeFavorite } from "@/types/db";
import { RecipeStatus } from "@/types/enums";

export async function getRecipesWithFavoriteCount({
  query,
  page = 1,
  limit = 6,
  where,
  orderByRecipeCount = false,
}: {
  query?: string;
  page?: number;
  limit?: number;
  where?: {
    userIds: string[];
  };
  orderByRecipeCount?: boolean;
}) {
  const offset = (page - 1) * limit;
  const baseQuery = (() => {
    const baseQuery = createBaseQuerySelect(query);
    if (where) {
      return baseQuery.where("userId", "in", where.userIds);
    }
    return baseQuery;
  })();

  const recipes = await baseQuery.offset(offset).limit(limit).execute();

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

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  // TODO: 時間との兼ね合いで暫定対応です
  if (orderByRecipeCount) {
    return recipes
      .flatMap((recipe) => {
        return {
          ...recipe,
          favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
        };
      })
      .sort((a, b) => {
        return b.favoriteCount - a.favoriteCount;
      });
  }

  return recipes.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
}

export async function getRecipeMaxCount({ query, where }: { query?: string; where?: { userIds: string[] } }) {
  try {
    const baseQuery = (() => {
      const baseQuery = createBaseQueryCount(query);
      if (where) {
        return baseQuery.where("userId", "in", where.userIds);
      }
      return baseQuery;
    })();

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
  query = undefined,
  page = 1,
  limit = 6,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const recipeFavoritedRecently = await getRecipesFavoriteCount();

  //話題のレシピが0件の場合はレシピをレシピを全件表示
  if (recipeFavoritedRecently.length === 0) {
    return await getRecipesWithFavoriteCount({ query: undefined, page, limit });
  }

  const recipeFavoritedRecentlyRecipeIds = recipeFavoritedRecently.flatMap(
    (recipeFavrorite) => recipeFavrorite.recipeId,
  );

  const baseQuery = createBaseQuerySelect(query).where("Recipe.id", "in", recipeFavoritedRecentlyRecipeIds);

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

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
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
    const baseQuery = createBaseQueryCount(query);
    const recipeFavoritedRecently = await getRecipesFavoriteCount();
    const queryFavoritedRecently = baseQuery.where(
      "id",
      "in",
      recipeFavoritedRecently.flatMap((recipeFavrorite) => recipeFavrorite.recipeId),
    );

    const { length } =
      recipeFavoritedRecently.length > 0 ? await queryFavoritedRecently.execute() : await baseQuery.execute();
    return length;
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
  const baseQuery = db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.status as status",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.status", "=", RecipeStatus.public)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null);
  if (query) {
    return baseQuery.where((eb) => eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]));
  }
  return baseQuery;
}

function createBaseQueryCount(query: string | undefined) {
  const baseQuery = db
    .selectFrom("Recipe")
    .select("id")
    .where("deletedAt", "is", null)
    .where("status", "=", RecipeStatus.public);

  if (query) {
    return baseQuery.where((eb) => eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]));
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

  if (rows.length === 0) {
    return rows;
  }
  return rows
    .sort(function (a, b) {
      return a.recipeFavoriteCount > b.recipeFavoriteCount ? -1 : 1;
    })
    .slice(0, RECIPE_COUNT_FAVORITED_RECENTLY);
}

export async function getRecipeById(id: string) {
  const baseQuery = db
    .selectFrom("Recipe")
    .selectAll("Recipe")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("User")
          .select(["User.id", "User.name", "User.image"])
          .whereRef("User.id", "=", "Recipe.userId")
          .where("User.deletedAt", "is", null),
      ).as("user"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeImage")
          .select(["RecipeImage.id", "RecipeImage.imgSrc", "RecipeImage.index"])
          .whereRef("RecipeImage.recipeId", "=", "Recipe.id")
          .where("RecipeImage.deletedAt", "is", null)
          .orderBy("RecipeImage.index", "asc"),
      ).as("recipeImages"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeIngredient")
          .select(["RecipeIngredient.id", "RecipeIngredient.name", "RecipeIngredient.index"])
          .whereRef("RecipeIngredient.recipeId", "=", "Recipe.id")
          .where("RecipeIngredient.deletedAt", "is", null)
          .orderBy("RecipeIngredient.index", "asc"),
      ).as("recipeIngredients"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeCookingProcedure")
          .select(["RecipeCookingProcedure.id", "RecipeCookingProcedure.name", "RecipeCookingProcedure.index"])
          .whereRef("RecipeCookingProcedure.recipeId", "=", "Recipe.id")
          .where("RecipeCookingProcedure.deletedAt", "is", null)
          .orderBy("RecipeCookingProcedure.index", "asc"),
      ).as("recipeCookingProcedures"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeLink")
          .select(["RecipeLink.id", "RecipeLink.url", "RecipeLink.category", "RecipeLink.index"])
          .whereRef("RecipeLink.recipeId", "=", "Recipe.id")
          .where("RecipeLink.deletedAt", "is", null)
          .orderBy("RecipeLink.index", "asc"),
      ).as("recipeLinks"),
    ])
    .where("Recipe.deletedAt", "is", null);

  return await baseQuery.where("Recipe.id", "=", id).executeTakeFirst();
}

export async function getRecipeWithFavoriteCountByUserId(followedUserIds: string[]) {
  const recipeList = await db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.status as status",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.status", "=", RecipeStatus.public)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null)
    .where("userId", "in", followedUserIds)
    .orderBy("Recipe.createdAt", "desc")
    .execute();
  if (recipeList.length === 0) {
    return [];
  }
  const recipeIds = recipeList.map((recipe) => recipe.id);
  const recipeFavoriteCounts = await getFavoriteCountByRecipeId(recipeIds);
  const recentRecipeList = recipeList.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
  return recentRecipeList;
}

export async function getFavoriteRecipeWithFavoriteCountByUserId(userId: string) {
  const favoriteRecipeList = await db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .innerJoin("RecipeFavorite", "RecipeFavorite.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.status as status",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.status", "=", RecipeStatus.public)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null)
    .where("RecipeFavorite.deletedAt", "is", null)
    .where("RecipeFavorite.userId", "=", userId)
    .execute();
  if (favoriteRecipeList.length === 0) {
    return [];
  }
  const favoriteRecipeIds = favoriteRecipeList.map((recipe) => recipe.id);
  const favoriteRecipeCounts = await getFavoriteCountByRecipeId(favoriteRecipeIds);
  const resultRecipeList = favoriteRecipeList.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: favoriteRecipeCounts[recipe.id] ? favoriteRecipeCounts[recipe.id] : 0,
    };
  });
  return resultRecipeList;
}

async function getFavoriteCountByRecipeId(recipeIds: string[]) {
  const recipeFavorites = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  return recipeFavoriteCounts;
}

export async function getRecipeByUserIdAndStatus(userId: string, status: RecipeStatus) {
  return await db
    .selectFrom("Recipe")
    .select(["id", "name", "description", "updatedAt"])
    .where("userId", "=", userId)
    .where("status", "=", status)
    .where("deletedAt", "is", null)
    .orderBy("updatedAt", "desc")
    .execute();
}

export async function updateRecipe(
  recipeId: string,
  updateValues: Updateable<Recipe>,
): Promise<ServerActionsResponse<{ recipe: Selectable<Recipe> }>> {
  try {
    const result = await db.updateTable("Recipe").set(updateValues).where("id", "=", recipeId).executeTakeFirst();
    if (result.numUpdatedRows !== BigInt("1")) {
      throw new Error(ERROR_MESSAGE_UNKOWN_ERROR);
    }
    const updatedRecipe = await db.selectFrom("Recipe").selectAll().where("id", "=", recipeId).executeTakeFirst();

    if (!updatedRecipe) {
      throw new Error(ERROR_MESSAGE_UNKOWN_ERROR);
    }
    return {
      success: true,
      data: { recipe: updatedRecipe },
    };
  } catch (e) {
    return {
      success: false,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
    if (!updateValues.deletedAt) {
      revalidatePath(`/recipe/${recipeId}`);
    }
  }
}

export async function removeRecipe(id: string): Promise<ServerActionsResponse<{ id: string }>> {
  const recipeData: Updateable<Recipe> = {
    deletedAt: new Date(),
  };
  await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
  revalidatePath("recipe/draft");
  return {
    success: true,
    data: { id },
  };
}
