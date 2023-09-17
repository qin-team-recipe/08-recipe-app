"use client";

import { ReactElement } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";

import { fetchRecipesWithFavoriteCount } from "../../lib/action";
import { RecipeListItem } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

export const InfiniteScrollVerticalRecipeList = ({
  q,
  initialRecipes,
  recipeMaxCount,
}: {
  q?: string;
  initialRecipes: RecipeListItem[];
  recipeMaxCount: number;
}) => {
  const recipeListComponent = (contents: RecipeListItem[]): ReactElement => {
    return <VerticalRecipeList recipeList={contents} />;
  };

  return (
    <InfiniteScrollContent
      search={q}
      initialContents={initialRecipes}
      contentMaxCount={recipeMaxCount}
      fetchAction={fetchRecipesWithFavoriteCount}
      contentComponent={recipeListComponent}
    />
  );
};
