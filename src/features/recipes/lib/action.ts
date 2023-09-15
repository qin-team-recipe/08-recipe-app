"use server";

import { getRecipesWithFavoriteCount } from "@/features/recipes";

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
