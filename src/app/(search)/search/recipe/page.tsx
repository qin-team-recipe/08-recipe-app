import { cloneElement } from "react";
import Link from "next/link";

import { Selectable } from "kysely";

import { Button } from "@/components/button/button";
import InfiniteScrollContent from "@/components/infinite-scroll-content";
import { RecipeListItem } from "@/components/recipe-list-item/recipe-list-item";
import { fetchRecipes, getRecipes } from "@/features/recipes/";
import { Title } from "@/features/search";
import { db } from "@/lib/kysely";
import { Recipe } from "@/types/db";

export default async function Page({
  searchParams: { q, offset },
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log("q", q);
  // const range = 2;
  // const limit = (offset ? Number(offset) : 0) * range + range;

  const recipes: Selectable<Recipe>[] = await getRecipes({ query: q });

  // const recipeCount = recipes?.length;
  // console.log("recipeCount", recipeCount);
  // const recipesSliced = recipes.splice(0, limit + 1);
  // const recipeCountSliced = recipesSliced.length;
  // console.log("recipeCountSliced", recipeCountSliced);

  return (
    <>
      {typeof q === "string" ? (
        <>
          <Title>「{q}」で検索</Title>
          {/* なんでSCからCCへ関数が渡せないのか？ */}
          <InfiniteScrollContent
            search={q}
            initialContents={recipes}
            fetchAction={fetchRecipes}
            childrenWithData={(parentData) => <RecipeListItem recipeListItem={parentData} />}
          />
        </>
      ) : (
        <>
          <Title>話題のレシピ</Title>
          {/* <Recipes recipes={recipes} /> */}
        </>
      )}
    </>
  );
}
