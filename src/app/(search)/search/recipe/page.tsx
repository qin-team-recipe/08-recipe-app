import { randomUUID } from "crypto";

import InfiniteScrollContent from "@/components/infinite-scroll-content";
import {
  getRecipeMaxCount,
  getRecipeMaxCountFavoriteRecently,
  getRecipesFavoritedRecently,
  getRecipesWithFavoriteCount,
  loadRecipeComponentWithFetchRecipeData,
  loadRecipeComponentWithFetchRecipeDataFavoritedRecently,
  loadRecipeElement,
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
            <InfiniteScrollContent
              search={q}
              initialContents={recipes}
              contentMaxCount={recipeMaxCount}
              //TODO変数名気になる
              loadContentComponentWithFetch={loadRecipeComponentWithFetchRecipeData}
              loadContentComponent={loadRecipeElement}
            />
          </section>
        </>
      ) : (
        <>
          <section key={randomUUID()}>
            <Title>話題のレシピ</Title>
            <InfiniteScrollContent
              initialContents={recipes}
              contentMaxCount={recipeMaxCount}
              loadContentComponentWithFetch={loadRecipeComponentWithFetchRecipeDataFavoritedRecently}
              loadContentComponent={loadRecipeElement}
            />
          </section>
        </>
      )}
    </>
  );
}
