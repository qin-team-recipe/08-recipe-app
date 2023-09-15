import { randomUUID } from "crypto";

import {
  fetchRecipesWithFavoriteCount,
  getRecipeMaxCount,
  getRecipesWithFavoriteCount,
  RecipeListInfiniteScroll,
  RecipeListItemType,
} from "@/features/recipes/";
import { Title } from "@/features/search";

export default async function Page({ searchParams: { q } }: { searchParams: { [key: string]: string | undefined } }) {
  const recipes: RecipeListItemType[] = await getRecipesWithFavoriteCount({ query: q });
  const recipeMaxCount = await getRecipeMaxCount({ query: q });

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
            {/* <Recipes recipes={recipes} /> */}
          </section>
        </>
      )}
    </>
  );
}
