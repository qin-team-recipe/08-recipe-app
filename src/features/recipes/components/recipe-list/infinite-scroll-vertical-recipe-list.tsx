"use client";

import { cloneElement, ReactElement } from "react";

import { fetchRecipesWithFavoriteCount } from "../../lib/action";
import { RecipeListItem } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

export const InfiniteScrollVerticalRecipeList = ({ children }: { children: ReactElement }) => {
  const recipeListComponent = (contents: RecipeListItem[]): ReactElement => {
    return <VerticalRecipeList recipeList={contents} />;
  };

  const newChildren = cloneElement(children, {
    contentComponent: recipeListComponent,
    fetchAction: fetchRecipesWithFavoriteCount,
  });
  return <>{newChildren}</>;
};
