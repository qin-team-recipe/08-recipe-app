import Link from "next/link";

import { HorizontalChefList } from "@/components/horizontal-chef-list/horizontal-chef-list";
import { getRecipesFavoritedRecently, HorizontalRecipeList } from "@/features/recipes";
import { ChefListItemWithRecipeCountType, VerticalChefList } from "@/features/users";

export default async function Page() {
  // TODO: DBから取得する
  const popularChefs: {
    id: string;
    name: string;
    imageSrc: string;
  }[] = [...Array(10)].map((_, i) => ({
    id: `${i}`,
    name: "シェフ名",
    imageSrc: "/images/chefs/4j4vh2DXrNxPBgSC.jpeg",
  }));

  const popularRecipeList = await getRecipesFavoritedRecently({ query: "", limit: 10 });

  // TODO: DBから取得する
  const chefs: ChefListItemWithRecipeCountType[] = [...Array(10)].map((_, i) => ({
    id: `${i}`,
    name: "シェフ名",
    image: "/chefs/4j4vh2DXrNxPBgSC.jpeg",
    createdAt: new Date("2021-09-01T00:00:00.000Z"),
    updatedAt: new Date("2021-09-01T00:00:00.000Z"),
    recipeCount: i,
    profileText: "シェフのプロフィールです。シェフのプロフィールです。シェフのプロフィールです。",
  }));

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
