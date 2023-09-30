import Link from "next/link";

import { getServerSession } from "next-auth";
import { TbArrowLeft, TbMenu } from "react-icons/tb";

import { Login } from "@/components/login";
import { getRecipeWithFavoriteCountByUserId, VerticalRecipeList } from "@/features/recipes";
import { getFavoriteChefs } from "@/features/users";
import { authOptions } from "@/lib/auth";

const PageHeader = () => {
  return (
    <div className="flex h-12 items-center justify-between gap-x-4 border-b border-mauve-6 px-4 py-3">
      <Link href="/settings" className="transition-opacity ease-in-out hover:opacity-60">
        <TbMenu className="h-6 w-6" />
      </Link>
      <h1 className="text-xl font-bold leading-6">新着レシピ</h1>
      <div></div>
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

  return (
    <main>
      <div className="flex h-12 items-center gap-x-4 border-b border-mauve-6  px-4 py-3">
        <Link href="/fav">
          <TbArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold leading-6">新着レシピ</h1>
      </div>
      <div className="mx-4 mt-5">
        <VerticalRecipeList recipeList={recentRecipeList} />
      </div>
    </main>
  );
}
