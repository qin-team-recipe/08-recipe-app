import { randomUUID } from "crypto";

import {
  getRecipeMaxCount,
  getRecipeMaxCountFavoriteRecently,
  getRecipesFavoritedRecently,
  getRecipesWithFavoriteCount,
  InfiniteScrollVerticalRecipeList,
} from "@/features/recipes/";
import { Title } from "@/features/search";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  const [recipes, recipeMaxCount] =
    typeof q === "string" && q.length > 0
      ? [await getRecipesWithFavoriteCount({ query: q }), await getRecipeMaxCount({ query: q })]
      : [await getRecipesFavoritedRecently({ query: q }), await getRecipeMaxCountFavoriteRecently({ query: q })];

  return (
    <>
      {typeof q === "string" ? (
        <section key={randomUUID()}>
          <Title>「{q}」で検索</Title>
          <InfiniteScrollVerticalRecipeList
            search={q}
            initialContents={recipes}
            contentMaxCount={recipeMaxCount}
            fetchAction={getRecipesWithFavoriteCount}
          />
        </section>
      ) : (
        <section key={randomUUID()}>
          <Title>話題のレシピ</Title>
          <InfiniteScrollVerticalRecipeList
            search={q}
            initialContents={recipes}
            contentMaxCount={recipeMaxCount}
            fetchAction={getRecipesFavoritedRecently}
          />
        </section>
      )}
    </>
  );
}
