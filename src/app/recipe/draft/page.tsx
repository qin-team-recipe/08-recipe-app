import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { TbArrowLeft } from "react-icons/tb";

import { Login } from "@/components/login";
import { getRecipeByUserIdAndStatus, RecipeDraftList } from "@/features/recipes";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { RecipeStatus } from "@/types/enums";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return <Login imgSrc="/images/fav-login.png" callbackUrl="/recipe/draft" />;

  const draftRecipes = await getRecipeByUserIdAndStatus(session.user.id, RecipeStatus.draft);

  return (
    <main>
      <section className={cn("flex h-12 gap-4  px-4 py-3", draftRecipes.length === 0 && "border-b border-mauve-8")}>
        <Link href="/recipe/create">
          <div className="flex items-center">
            <TbArrowLeft className="h-6 w-6" />
          </div>
        </Link>
        <div>
          <span className="text-base text-mauve-11">下書き</span>
        </div>
      </section>
      <section>
        {draftRecipes.length > 0 ? (
          draftRecipes.map((recipe, index) => <RecipeDraftList recipe={recipe} index={index} key={index} />)
        ) : (
          <section className="flex flex-col items-center gap-y-5 pt-5">
            <Image src="/images/fav-login.png" width={200} height={200} alt="下書きのレシピはありません" />
            <p className="text-center font-bold">下書きのレシピはありません</p>
          </section>
        )}
      </section>
    </main>
  );
}
