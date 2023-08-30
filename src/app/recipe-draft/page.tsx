import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { TbArrowLeft, TbTrash } from "react-icons/tb";

import { Login } from "@/components/login";
import { RecipeDraftList } from "@/features/recipes/components/recipe-draft-list";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { cn } from "@/lib/utils";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) return <Login />;

  const recipes = await db
    .selectFrom("Recipe")
    .select(["id", "name", "description", "updatedAt"])
    .where("userId", "=", session.user.id)
    .where("isPublic", "=", 0)
    .where("deletedAt", "is", null)
    .orderBy("updatedAt", "desc")
    .execute();
  console.log("recipes", recipes);
  return (
    <main>
      <div className="flex h-12 gap-4 px-4 py-3">
        <Link href="/recipe">
          <div className="flex items-center">
            <TbArrowLeft className="h-6 w-6" />
          </div>
        </Link>
        <div>
          <span className="text-base text-mauve-11">下書き</span>
        </div>
      </div>
      <div>
        {recipes.length === 0 && <div>下書きはありません</div>}
        {recipes.length > 0 && recipes.map((recipe, index) => <RecipeDraftList recipe={recipe} index={index} />)}
      </div>
    </main>
  );
}
