import Link from "next/link";

import { getServerSession } from "next-auth";
import { TbMenu, TbUserCircle } from "react-icons/tb";

import { HorizonalSmallChefList } from "@/components/horizontal-small-chef-list/horizontal-small-chef-list";
import { Login } from "@/components/login";
import { getRecipesWithFavoriteCount, HorizonalRecipeList, VerticalRecipeList } from "@/features/recipes";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // TODO:後でコピペする
  const chefs = await db.selectFrom("User").selectAll().execute();
  const recipeList = await getRecipesWithFavoriteCount({ query: "", limit: 10 });

  return (
    <main className="min-h-screen w-full text-mauve-12">
      <div className="flex h-12 items-center justify-between gap-x-4 border-b border-mauve-6 px-4 py-3">
        <Link href="/settings" className="transition-opacity ease-in-out hover:opacity-60">
          <TbMenu className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold leading-6">お気に入り</h1>
        <Link href="/mypage" className="transition-opacity ease-in-out hover:opacity-60">
          <TbUserCircle className="h-6 w-6" />
        </Link>
      </div>
      {session ? (
        <div className="mt-5">
          <div className="ml-4">
            <h2 className="mb-3 text-xl font-bold text-mauve-12">シェフ</h2>
            <HorizonalSmallChefList chefs={chefs} />
          </div>
          <div className="ml-4 mt-12">
            <div className="mb-3 mr-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-mauve-12">新着レシピ</h2>
              <Link href="/new-recipe" className="cursor-pointer text-base font-bold text-mauve-9 hover:underline">
                もっと見る
              </Link>
            </div>
            <HorizonalRecipeList recipeList={recipeList} />
          </div>
          <div className="mb-3 ml-4 mt-12">
            <h2 className="text-xl font-bold text-mauve-12">お気に入りレシピ</h2>
          </div>
          <div className="mx-4">{<VerticalRecipeList recipeList={recipeList} />}</div>
        </div>
      ) : (
        <Login imgSrc="/images/fav-login.png" />
      )}
    </main>
  );
}
