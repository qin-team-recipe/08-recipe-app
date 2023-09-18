import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import RecipeDetailComponent from "@/app/recipe/[id]/recipe-detail-component";
import CopyText from "@/components/utils/copy-text";
import { getIsFavoriteByUserId, getRecipeById, RecipeStep } from "@/features/recipes";
import { authOptions } from "@/lib/auth";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const referer = headersList.get("referer");
  let previousUrl: string = "/";
  if (referer) {
    const previousUrlParser = new URL(referer);
    if ([`/recipe/${id}`, `/recipe/${id}/ingredient`].indexOf(previousUrlParser.pathname) === -1) {
      previousUrl = previousUrlParser.pathname + previousUrlParser.search;
    }
  }

  const recipe = await getRecipeById(id);
  if (!recipe || !recipe.User) {
    notFound();
  }

  let isFavoriteByMe = false;
  if (session) {
    isFavoriteByMe = await getIsFavoriteByUserId(session.user.id);
  }

  let recipeCookingProceduresText = `レシピ名：${recipe.name}\n${recipe.servings}人前\n作り方：\n`;
  recipeCookingProceduresText += recipe.RecipeCookingProcedure.flatMap((recipeCookingProcedures, index) => {
    return `(${index + 1})${recipeCookingProcedures.name.replace(/\s+/g, "")}`;
  }).join("\n");

  return (
    <main>
      <RecipeDetailComponent
        recipe={recipe}
        isFavoriteByMe={isFavoriteByMe}
        sessionUserId={session?.user.id}
        previousUrl={previousUrl}
      />
      <div>
        <RecipeStep data={recipe.RecipeCookingProcedure} />
        <CopyText copyText={recipeCookingProceduresText} />
      </div>
    </main>
  );
}
