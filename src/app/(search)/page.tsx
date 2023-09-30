import Link from "next/link";

import { HorizontalChefList } from "@/components/horizontal-chef-list/horizontal-chef-list";
import { getRecipesFavoritedRecently, HorizontalRecipeList } from "@/features/recipes";
import {
  ChefListItemWithRecipeCountType,
  getChefsFollowedRecently,
  getChefsWithRecipeCount,
  VerticalChefList,
} from "@/features/users";

export default async function Page() {
  const popularChefs: ChefListItemWithRecipeCountType[] = await getChefsFollowedRecently({ query: "", limit: 10 });

  const popularRecipeList = await getRecipesFavoritedRecently({ query: "", limit: 10 });

  const chefs: ChefListItemWithRecipeCountType[] = await getChefsWithRecipeCount({ query: "", limit: 10 });

  return (
    <section className="flex flex-col gap-y-12">
      <section className="flex flex-col gap-y-4">
        <h2 className="text-xl text-mauve-12">注目のシェフ</h2>
        <HorizontalChefList chefs={popularChefs} />
      </section>
      <section className="flex flex-col gap-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-mauve-12">話題のレシピ</h2>
          <Link href="/search/recipe" className="text-mauve-9">
            もっと見る
          </Link>
        </div>
        <HorizontalRecipeList recipeList={popularRecipeList} />
      </section>
      <section className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-mauve-12">シェフ</h2>
          <Link href="/search/chef" className="text-mauve-9">
            もっと見る
          </Link>
        </div>
        <VerticalChefList chefList={chefs} />
      </section>
    </section>
  );
}
