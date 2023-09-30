"use client";

import { ComponentProps } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";
import { ChefListItemWithRecipeCountType, VerticalChefList } from "@/features/users";

export function InfiniteScrollVerticalChefList(
  props: Omit<ComponentProps<typeof InfiniteScrollContent<ChefListItemWithRecipeCountType>>, "contentComponent">,
) {
  const chefListComponent = (contents: ChefListItemWithRecipeCountType[]) => {
    return <VerticalChefList chefList={contents} />;
  };

  return <InfiniteScrollContent<ChefListItemWithRecipeCountType> {...props} contentComponent={chefListComponent} />;
}
