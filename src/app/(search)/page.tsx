import Link from "next/link";

import { HorizontalChefList } from "@/components/horizontal-chef-list/horizontal-chef-list";
import { ChefListItemWithRecipeCountType, VerticalChefList } from "@/features/chefs";
import { HorizontalRecipeList, RecipeListItemType } from "@/features/recipes";

export default function Page() {
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

  // TODO: DBから取得する
  const popularRecipeList: RecipeListItemType[] = [...Array(10)].map((_, i) => ({
    id: `${i}`,
    userId: `${i}`,
    name: "レシピ名",
    description: "レシピの説明",
    servings: i,
    isPublic: 1,
    createdAt: new Date("2021-09-01T00:00:00.000Z"),
    updatedAt: new Date("2021-09-01T00:00:00.000Z"),
    imgSrc: "/recipes/173061998269759082077833269941292010536731074152.jpg",
    favoriteCount: i,
  }));

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
    <>
      <div className="flex flex-col gap-y-4">
        <p className="text-xl text-mauve-12">注目のシェフ</p>
        <HorizontalChefList chefs={popularChefs} />
      </div>
      <div className="mt-12 flex flex-col gap-y-[10px]">
        <div className="flex items-center justify-between">
          <p className="text-xl text-mauve-12">話題のレシピ</p>
          <Link href="/search/recipe" className="text-mauve-9">
            もっと見る
          </Link>
        </div>
        <HorizontalRecipeList recipeList={popularRecipeList} />
      </div>
      <div className="mt-12 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xl text-mauve-12">シェフ</p>
          <Link href="/search/chef" className="text-mauve-9">
            もっと見る
          </Link>
        </div>
        <VerticalChefList chefList={chefs} />
      </div>
    </>
  );
}
