import { randomUUID } from "crypto";

import { InfiniteScrollVerticalRecipeList } from "@/features/recipes";
import {
  getRecipeMaxCount,
  getRecipeMaxCountFavoriteRecently,
  getRecipesFavoritedRecently,
  getRecipesWithFavoriteCount,
  RecipeListItem,
} from "@/features/recipes/";
import { Title } from "@/features/search";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  let recipes: RecipeListItem[];
  let recipeMaxCount: number;
  if (typeof q === "string" && q.length > 0) {
    recipes = await getRecipesWithFavoriteCount({ query: q });
    recipeMaxCount = await getRecipeMaxCount({ query: q });
  } else {
    recipes = await getRecipesFavoritedRecently({ query: q });
    recipeMaxCount = await getRecipeMaxCountFavoriteRecently({ query: q });
  }

  return (
    <>
      {typeof q === "string" ? (
        <>
          <section key={randomUUID()}>
            <Title>「{q}」で検索</Title>
            {/* なんでSCからCCへ関数が渡せないのか？ */}

            <InfiniteScrollVerticalRecipeList q={q} initialRecipes={recipes} recipeMaxCount={recipeMaxCount} />
          </section>
        </>
      ) : (
        <>
          <section key={randomUUID()}>
            <Title>話題のレシピ</Title>
            <InfiniteScrollVerticalRecipeList q={q} initialRecipes={recipes} recipeMaxCount={recipeMaxCount} />
          </section>
        </>
      )}
    </>
  );
}
