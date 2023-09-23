"use client";

import { ComponentProps, ReactElement } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";

import { RecipeListItem } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

export const InfiniteScrollVerticalRecipeList = (
  props: Omit<ComponentProps<typeof InfiniteScrollContent>, "contentComponent">,
) => {
  const recipeListComponent = (contents: RecipeListItem[]): ReactElement => {
    return <VerticalRecipeList recipeList={contents} />;
  };

  return <InfiniteScrollContent {...props} contentComponent={recipeListComponent} />;
};
