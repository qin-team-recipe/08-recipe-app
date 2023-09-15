import { Selectable } from "kysely";

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
  console.log("recipeFavorites", recipeFavorites);

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
  let baseQuery = db.selectFrom("Recipe").select("id").where("deletedAt", "is", null);

  if (query) {
    baseQuery = baseQuery.where((eb) =>
      eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]),
    );
  }

  try {
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
