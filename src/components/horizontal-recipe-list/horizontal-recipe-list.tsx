"use client";

import * as React from "react";
import { Route } from "next";

import { ScrollArea } from "@/components/horizontal-scroll/horizontal-scroll";
import { RecipeListItem } from "@/components/recipe-list-item/recipe-list-item";

type RecipeList<T extends string> = {
  id: number;
  href: Route<T>;
  image: string;
  name: string;
  chefName: string;
  favoriteCount: number;
  isPublic: Boolean;
};

type RecipeProps<T extends string> = {
  recipeList: RecipeList<T>[];
};

const HorizonalRecipeList = <T extends string>({ recipeList }: RecipeProps<T>) => (
  <ScrollArea>
    <ul className="flex space-x-4">
      {recipeList.map((recipeListItem, index) => (
        <li key={index} className="w-40 cursor-pointer transition-opacity ease-in-out hover:opacity-60">
          <RecipeListItem recipeListItem={recipeListItem} />
        </li>
      ))}
    </ul>
  </ScrollArea>
);

export { HorizonalRecipeList };
