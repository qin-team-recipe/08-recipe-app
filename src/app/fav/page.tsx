import Link from "next/link";

import { Selectable } from "kysely";
import { getServerSession } from "next-auth";
import { TbMenu, TbUserCircle } from "react-icons/tb";

import { HorizonalSmallChefList } from "@/components/horizontal-small-chef-list/horizontal-small-chef-list";
import { Login } from "@/components/login";
import { HorizontalRecipeList, VerticalRecipeList } from "@/features/recipes";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { RecipeFavorite } from "@/types/db";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id as string;
  // お気に入りシェフ
  const followedChefs = await db.selectFrom("UserFollow").selectAll().where("followerUserId", "=", userId).execute();
  const followedChefsArray = followedChefs.map((chef) => chef.followedUserId);
  const chefs = await db.selectFrom("User").selectAll().where("id", "in", followedChefsArray).execute();

  // 新着レシピ
  const recipeList = await db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.isPublic as isPublic",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.isPublic", "=", 1)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null)
    .where("userId", "in", followedChefsArray)
    .orderBy("Recipe.createdAt", "desc")
    .execute();

  const recipeIds = recipeList.map((recipe) => recipe["id"]);

  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  const recentRecipeList = recipeList.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });

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
            <h2 className="mb-[10px] text-xl font-bold text-mauve-12">シェフ</h2>
            <HorizonalSmallChefList chefs={chefs} />
          </div>
          <div className="ml-4 mt-12">
            <div className="mb-[10px] mr-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-mauve-12">シェフの新着レシピ</h2>
              <Link
                href="/favorite-chef-new-recipe"
                className="cursor-pointer text-base font-bold text-mauve-9 hover:underline"
              >
                もっと見る
              </Link>
            </div>
            <HorizontalRecipeList recipeList={recentRecipeList} />
          </div>
          <div className="mb-[10px] ml-4 mt-12">
            <h2 className="text-xl font-bold text-mauve-12">お気に入りレシピ</h2>
          </div>
          <div className="mx-4">{<VerticalRecipeList recipeList={recentRecipeList} />}</div>
        </div>
      ) : (
        <Login imgSrc="/images/fav-login.png" />
      )}
    </main>
  );
}
