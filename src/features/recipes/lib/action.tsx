"use server";

import { ReactNode } from "react";

import { getRecipesFavoritedRecently, getRecipesWithFavoriteCount } from "@/features/recipes";

import { VerticalRecipeList } from "../components/recipe-list/vertical-recipe-list";
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

//TODO: Promise<typeof VerticalRecipeList>よりもっと良い書き方ありそう
export async function loadRecipeElement(contents: RecipeListItemType[]): Promise<JSX.Element> {
  return <VerticalRecipeList recipeList={contents} />;
}

export async function loadRecipeComponentWithFetchRecipeData({
  contents,
  search,
  page = 1,
}: {
  contents: RecipeListItemType[];
  search?: string;
  page?: number;
}): Promise<{ contentsUpdated: RecipeListItemType[]; contentElementUpdated: ReactNode }> {
  const recipesLoadedByScroll: RecipeListItemType[] = await getRecipesWithFavoriteCount({ query: search, page });
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
  contents: RecipeListItemType[];
  search?: string;
  page?: number;
}): Promise<{ contentsUpdated: RecipeListItemType[]; contentElementUpdated: ReactNode }> {
  console.log("loadRecipeComponentWithFetchRecipeDataFavoritedRecently");
  const recipesLoadedByScroll: RecipeListItemType[] = await getRecipesFavoritedRecently({ query: search, page });
  const recipes = [...(contents?.length ? contents : []), ...recipesLoadedByScroll];
  const contentElement = await loadRecipeElement(recipes);
  return {
    contentsUpdated: recipes,
    contentElementUpdated: contentElement,
  };
}
