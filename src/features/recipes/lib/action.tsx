"use server";

import { ReactNode } from "react";

import { getRecipesFavoritedRecently, getRecipesWithFavoriteCount } from "@/features/recipes";

import { VerticalRecipeList } from "../components/recipe-list/vertical-recipe-list";
import { RecipeListItem } from "../types";

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

//TODO: Promise<typeof VerticalRecipeList>よりもっと良い書き方ありそう
export async function loadRecipeElement(contents: RecipeListItem[]): Promise<JSX.Element> {
  return <VerticalRecipeList recipeList={contents} />;
}

export async function loadRecipeComponentWithFetchRecipeData({
  contents,
  search,
  page = 1,
}: {
  contents: RecipeListItem[];
  search?: string;
  page?: number;
}): Promise<{ contentsUpdated: RecipeListItem[]; contentElementUpdated: ReactNode }> {
  const recipesLoadedByScroll: RecipeListItem[] = await getRecipesWithFavoriteCount({ query: search, page });
  const recipesUpdated = [...(contents?.length ? contents : []), ...recipesLoadedByScroll];
  const contentElement = await loadRecipeElement(recipesUpdated);
  return {
    contentsUpdated: recipesUpdated,
    contentElementUpdated: contentElement,
  };
}

export async function loadRecipeComponentWithFetchRecipeDataFavoritedRecently({
  contents,
  search,
  page = 1,
}: {
  contents: RecipeListItem[];
  search?: string;
  page?: number;
}): Promise<{ contentsUpdated: RecipeListItem[]; contentElementUpdated: ReactNode }> {
  console.log("loadRecipeComponentWithFetchRecipeDataFavoritedRecently");
  const recipesLoadedByScroll: RecipeListItem[] = await getRecipesFavoritedRecently({ query: search, page });
  const recipes = [...(contents?.length ? contents : []), ...recipesLoadedByScroll];
  const contentElement = await loadRecipeElement(recipes);
  return {
    contentsUpdated: recipes,
    contentElementUpdated: contentElement,
  };
}
