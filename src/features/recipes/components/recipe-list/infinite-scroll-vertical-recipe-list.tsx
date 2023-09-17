"use client";

import { ReactElement } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";

import { RecipeListItem } from "../../types";
import { VerticalRecipeList } from "./vertical-recipe-list";

type FetchAction = ({ search, page }: { search?: string; page: number }) => Promise<RecipeListItemType[]>;

export const InfiniteScrollVerticalRecipeList = ({
  search,
  initialRecipes,
  recipeMaxCount,
  fetchAction,
}: {
  search?: string;
  initialRecipes: RecipeListItem[];
  recipeMaxCount: number;
  fetchAction: FetchAction;
}) => {
  const recipeListComponent = (contents: RecipeListItem[]): ReactElement => {
    return <VerticalRecipeList recipeList={contents} />;
  };

  return (
    <InfiniteScrollContent
      search={search}
      initialContents={initialRecipes}
      contentMaxCount={recipeMaxCount}
      fetchAction={fetchAction}
      contentComponent={recipeListComponent}
    />
  );
};
