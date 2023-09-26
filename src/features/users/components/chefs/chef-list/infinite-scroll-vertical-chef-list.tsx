"use client";

import { ComponentProps, ReactElement } from "react";

import InfiniteScrollContent from "@/components/infinite-scroll-content";
import { ChefListItemWithRecipeCountType, VerticalChefList } from "@/features/users";

export function InfiniteScrollVerticalChefList(
  props: Omit<ComponentProps<typeof InfiniteScrollContent<ChefListItemWithRecipeCountType>>, "contentComponent">,
) {
  const chefListComponent = (contents: ChefListItemWithRecipeCountType[]): ReactElement => {
    return <VerticalChefList chefList={contents} />;
  };

  return <InfiniteScrollContent<ChefListItemWithRecipeCountType> {...props} contentComponent={chefListComponent} />;
}
