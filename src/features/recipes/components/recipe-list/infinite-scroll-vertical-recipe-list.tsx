"use client";

import { ComponentProps } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";

import { RecipeListItem } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

export const InfiniteScrollVerticalRecipeList = (
  props: Omit<ComponentProps<typeof InfiniteScrollContent>, "contentComponent">,
) => {
  const recipeListComponent = (contents: RecipeListItem[]) => {
    return <VerticalRecipeList recipeList={contents} />;
  };

  return <InfiniteScrollContent {...props} contentComponent={recipeListComponent} />;
};
