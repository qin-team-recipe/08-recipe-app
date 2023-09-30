"use client";

import { ComponentProps } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";

import { RecipeListItemType } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

export function InfiniteScrollVerticalRecipeList(
  props: Omit<ComponentProps<typeof InfiniteScrollContent<RecipeListItemType>>, "contentComponent">,
) {
  const recipeListComponent = (contents: RecipeListItemType[]) => {
    return <VerticalRecipeList recipeList={contents} />;
  };

  return <InfiniteScrollContent<RecipeListItemType> {...props} contentComponent={recipeListComponent} />;
}
