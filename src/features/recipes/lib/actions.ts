"use server";

import { revalidatePath } from "next/cache";

import { Selectable, sql, Updateable } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";

import { DATE_SPAN_RECENT, RECIPE_COUNT_FAVORITED_RECENTLY } from "@/config";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";
import { Recipe, RecipeFavorite } from "@/types/db";

// get-recipes.ts
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

  //TODO:なぜ下記のorderByだとお気に入り順に表示されないのか検証中
  const recipeFavoritedRecentlyRecipeIds = recipeFavoritedRecently
    .map((recipeFavrorite) => recipeFavrorite.recipeId)
    .join(",");

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
    .where("Recipe.isPublic", "=", 1)
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
  let baseQuery = db.selectFrom("Recipe").select("id").where("deletedAt", "is", null).where("isPublic", "=", 1);

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

// recipe-favorite.ts
export async function updateRecipeFavorite(
  recipeId: string,
  userId: string,
  isFavorite: boolean,
): Promise<ServerActionsResponse<{ recipeFavorite: { isFavorite: boolean } }>> {
  try {
    await db
      .updateTable("RecipeFavorite")
      .set({
        deletedAt: new Date(),
      })
      .where("recipeId", "=", recipeId)
      .where("userId", "=", userId)
      .execute();
    if (isFavorite) {
      console.log("isFavorite true");
      const recipeFavorite = await db
        .selectFrom("RecipeFavorite")
        .select(["id"])
        .where("recipeId", "=", recipeId)
        .where("userId", "=", userId)
        .orderBy("updatedAt", "desc")
        .executeTakeFirst();

      if (recipeFavorite) {
        await db
          .updateTable("RecipeFavorite")
          .set({
            updatedAt: new Date(),
            deletedAt: null,
          })
          .where("id", "=", recipeFavorite.id)
          .execute();
      } else {
        db.insertInto("RecipeFavorite")
          .values({
            recipeId: recipeId,
            userId: userId,
          })
          .executeTakeFirst();
      }
    }

    return {
      success: true,
      data: { recipeFavorite: { isFavorite } },
    };
  } catch (e) {
    return {
      success: false,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
    revalidatePath(`/recipe/${recipeId}`);
  }
}

// get-recipe.ts
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

// get-recipe-favorite.ts
export async function getFavoriteCountByRecipeId(recipeId: string) {
  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "=", recipeId)
    .where("deletedAt", "is", null)
    .execute();

  return recipeFavorites.length;
}

export async function getIsFavoriteByUserId(recipeId: string, userId: string) {
  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId", "userId"])
    .where("recipeId", "=", recipeId)
    .where("userId", "=", userId)
    .where("deletedAt", "is", null)
    .execute();

  return recipeFavorites.length > 0;
}

// recipe.ts
export async function update(
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
    revalidatePath(`/recipe/${recipeId}`);
  }
}
