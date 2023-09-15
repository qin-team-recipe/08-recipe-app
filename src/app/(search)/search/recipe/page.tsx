import { randomUUID } from "crypto";

import {
  fetchRecipesFavoritedRecently,
  fetchRecipesWithFavoriteCount,
  getRecipeMaxCount,
  getRecipeMaxCountFavoriteRecently,
  getRecipesFavoritedRecently,
  getRecipesWithFavoriteCount,
  RecipeListInfiniteScroll,
  RecipeListItemType,
} from "@/features/recipes/";
import { Title } from "@/features/search";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  let recipes: RecipeListItemType[];
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
            <RecipeListInfiniteScroll
              search={q}
              initialContents={recipes}
              contentMaxCount={recipeMaxCount}
              fetchAction={fetchRecipesWithFavoriteCount}
            />
          </section>
        </>
      ) : (
        <>
          <section key={randomUUID()}>
            <Title>話題のレシピ</Title>
            <RecipeListInfiniteScroll
              initialContents={recipes}
              contentMaxCount={recipeMaxCount}
              fetchAction={fetchRecipesFavoritedRecently}
            />
          </section>
        </>
      )}
    </>
  );
}
