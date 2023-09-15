"use server";

import { Selectable } from "kysely";

import { getRecipes } from "@/features/recipes";
import { Recipe } from "@/types/db";

export async function fetchRecipes({ search, page = 1 }: { search?: string | undefined; page?: number }) {
  const recipes: Selectable<Recipe>[] = await getRecipes({ query: search, page });
  return recipes;
}
