"use server";

import { getRecipesFavoritedRecently, getRecipesWithFavoriteCount } from "@/features/recipes";

import { RecipeListItemType } from "../types";

export async function fetchRecipesWithFavoriteCount({
  search,
  page = 1,
}: {
  search?: string | undefined;
  page?: number;
}) {
  const recipes: RecipeListItemType = await getRecipesWithFavoriteCount({ query: search, page });
  return recipes;
}

export async function fetchRecipesFavoritedRecently({
  search,
  page = 1,
}: {
  search?: string | undefined;
  page?: number;
}) {
  const recipes: RecipeListItemType = await getRecipesFavoritedRecently({ query: search, page });
  return recipes;
}
