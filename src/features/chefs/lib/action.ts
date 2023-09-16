"use server";

import { ChefListItemWithRecipeCountType } from "../types";
import { getChefsFollowedRecently, getChefsWithRecipeCount } from "./get-chefs";

export async function fetchChefsWithRecipeCount({ search, page = 1 }: { search?: string | undefined; page?: number }) {
  const chefs: ChefListItemWithRecipeCountType[] = await getChefsWithRecipeCount({ query: search, page });
  return chefs;
}

export async function fetchChefsFollowedRecently({ search, page = 1 }: { search?: string | undefined; page?: number }) {
  const chefs: ChefListItemWithRecipeCountType[] = await getChefsFollowedRecently({ query: search, page });
  return chefs;
}
