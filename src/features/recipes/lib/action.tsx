"use server";

import { RecipeListItem } from "../types";
import { getRecipesFavoritedRecently, getRecipesWithFavoriteCount } from "./get-recipes";

export async function fetchRecipesWithFavoriteCount({
  search,
  page = 1,
}: {
  search?: string | undefined;
  page?: number;
}) {
  const recipes: RecipeListItem[] = await getRecipesWithFavoriteCount({ query: search, page });
  return recipes;
}

export async function fetchRecipesFavoritedRecently({
  search,
  page = 1,
}: {
  search?: string | undefined;
  page?: number;
}) {
  const recipes: RecipeListItem[] = await getRecipesFavoritedRecently({ query: search, page });
  return recipes;
}
