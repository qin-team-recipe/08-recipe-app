import { cache } from "react";
import { Metadata } from "next/types";

import { getRecipeMaxCount, getRecipesWithFavoriteCount, InfiniteScrollVerticalRecipeList } from "@/features/recipes";
import { db } from "@/lib/kysely";

const getChefById = cache(async (id: string) => {
  return await db.selectFrom("User").selectAll().where("id", "=", id).executeTakeFirst();
});

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
  const chef = await getChefById(id);

  return { title: chef && chef.name ? `${chef.name}/一流レシピ` : "シェフ詳細/一流レシピ" };
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const recipes = await getRecipesWithFavoriteCount({
    query: "",
    page: undefined,
    limit: undefined,
    where: { userIds: [id] },
  });

  const recipeMaxCount = await getRecipeMaxCount({
    query: "",
    where: { userIds: [id] },
  });

  return (
    <InfiniteScrollVerticalRecipeList
      search=""
      initialContents={recipes}
      contentMaxCount={recipeMaxCount}
      fetchAction={getRecipesWithFavoriteCount}
      where={{ userIds: [id] }}
    />
  );
}
