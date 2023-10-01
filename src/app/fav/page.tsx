import Link from "next/link";

import { getServerSession } from "next-auth";
import { TbMenu, TbUserCircle } from "react-icons/tb";

import { Button } from "@/components/button/button";
import { HorizonalSmallChefList } from "@/components/horizontal-small-chef-list/horizontal-small-chef-list";
import { Login } from "@/components/login";
import {
  getFavoriteRecipeWithFavoriteCountByUserId,
  getRecipeWithFavoriteCountByUserId,
  HorizontalRecipeList,
  VerticalRecipeList,
} from "@/features/recipes";
import { getFavoriteChefs } from "@/features/users";
import { authOptions } from "@/lib/auth";

const PageHeader = ({ userId }: { userId?: string }) => {
  return (
    <div className="grid h-12 grid-cols-3 items-center border-b border-mauve-6 px-4 py-3">
      <Link href="/settings" className="justify-self-start transition-opacity ease-in-out hover:opacity-60">
        <TbMenu className="h-6 w-6" />
      </Link>
      <h1 className="justify-self-center text-xl font-bold leading-6">お気に入り</h1>
      {userId && (
        <Link href={`/chef/${userId}`} className="justify-self-end transition-opacity ease-in-out hover:opacity-60">
          <TbUserCircle className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!session || !userId) {
    return (
      <main className="min-h-screen w-full text-mauve-12">
        <PageHeader />
        <Login imgSrc="/images/fav-login.png" />
      </main>
    );
  }

  const chefs = await getFavoriteChefs(userId);

  const chefsId = chefs.map((chef) => chef.id);
  const recentRecipeList = chefsId.length > 0 ? await getRecipeWithFavoriteCountByUserId(chefsId) : [];

  const favoriteRecipeList = await getFavoriteRecipeWithFavoriteCountByUserId(userId);

  return (
    <main className="min-h-screen w-full text-mauve-12">
      <PageHeader userId={userId} />
      <div className="mt-5">
        <div className="ml-4">
          <h2 className="mb-[10px] text-xl font-bold text-mauve-12">シェフ</h2>
          {chefs.length > 0 ? (
            <HorizonalSmallChefList chefs={chefs} />
          ) : (
            <div className="mr-4">
              <p>お気に入りシェフは0件ですので、「シェフ一覧」からシェフをお気に入りしてください</p>
              <div className="mt-2 flex items-center justify-center">
                <Link href="/search/chef">
                  <Button size="md" className="shadow-md">
                    シェフ一覧へ
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        {chefs.length > 0 && recentRecipeList.length > 0 && (
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
        )}
        <>
          <div className="mb-[10px] ml-4 mt-12">
            <h2 className="text-xl font-bold text-mauve-12">お気に入りレシピ</h2>
          </div>
          <div className="mx-4">
            {favoriteRecipeList.length > 0 ? (
              <VerticalRecipeList recipeList={favoriteRecipeList} />
            ) : (
              <div>
                <p>お気に入りレシピは0件ですので、「話題のレシピ」からシェフをお気に入りしてください</p>
                <div className="mt-2 flex items-center justify-center">
                  <Link href="/search/recipe">
                    <Button size="md" className="shadow-md">
                      話題のレシピへ
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </main>
  );
}
