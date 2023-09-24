import { randomUUID } from "crypto";

import InfiniteScrollContent from "@/components/infinite-scroll-content";
import {
  getRecipeMaxCount,
  getRecipeMaxCountFavoriteRecently,
  getRecipesFavoritedRecently,
  getRecipesWithFavoriteCount,
  RecipeListItemType,
  VerticalRecipeList,
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

  const loadRecipeContent = async (contents: any) => {
    "use server";

    return <VerticalRecipeList recipeList={contents} />;
  };

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
              fetchAction={getRecipesWithFavoriteCount}
              loadContentComponent={loadRecipeContent}
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
              fetchAction={getRecipesFavoritedRecently}
              loadContentComponent={loadRecipeContent}
            />
          </section>
        </>
      )}
    </>
  );
}
