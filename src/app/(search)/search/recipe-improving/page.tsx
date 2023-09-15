import { cloneElement } from "react";
import Link from "next/link";

import { Selectable } from "kysely";

import { Button } from "@/components/button/button";
import InfiniteScrollContent from "@/components/infinite-scroll-content";
import { RecipeListItem } from "@/components/recipe-list-item/recipe-list-item";
import { fetchRecipes, getRecipesWithFavoriteCount } from "@/features/recipes/";
import { Title } from "@/features/search";
import { Recipe } from "@/types/db";

export default async function Page({
  searchParams: { q, offset },
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log("q", q);
  // const range = 2;
  // const limit = (offset ? Number(offset) : 0) * range + range;

  const recipes: Selectable<Recipe>[] = await getRecipesWithFavoriteCount({ query: q });

  // console.log("recipes in page component", recipes);
  // const recipeCount = recipes?.length;
  // console.log("recipeCount", recipeCount);
  // const recipesSliced = recipes.splice(0, limit + 1);
  // const recipeCountSliced = recipesSliced.length;
  // console.log("recipeCountSliced", recipeCountSliced);

  //TODO:when "use server " show below error
  //Error: Server Functions cannot be called during initial render. This would create a fetch waterfall.
  // Try to use a Server Component to pass data to Client Components instead.
  //TODO:when without use "use server" show error
  //Error: Server Functions cannot be called during initial render. This would create a fetch waterfall.
  // Try to use a Server Component to pass data to Client Components instead.
  async function childrenWithData(parentData: any) {
    // "use server "
    return <RecipeListItem recipeListItem={parentData} />;
  }

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
            childrenWithData={childrenWithData}
            // childrenWithData={(parentData) => <RecipeListItem recipeListItem={parentData} />}
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
