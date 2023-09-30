import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { RecipeDetailComponent } from "@/app/recipe/[id]/recipe-detail-component";
import { CopyText } from "@/components/utils/copy-text";
import { getIsFavoriteByUserId, getRecipeById, RecipeDetailTabWrapper } from "@/features/recipes";
import { authOptions } from "@/lib/auth";
import { RecipeStatus } from "@/types/enums";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const recipe = await getRecipeById(id);

  const isMyRecipe = !!recipe && session?.user?.id === recipe.userId;
  if (!recipe || !recipe.user || (recipe.status !== RecipeStatus.public && !isMyRecipe)) {
    notFound();
  }

  const isFavoriteByMe = await (async () => {
    if (session && session.user) {
      return await getIsFavoriteByUserId(recipe.id, session.user.id);
    }
    return false;
  })();

  const recipeCopyText =
    `レシピ名：${recipe.name}\n${recipe.servings}人前` +
    `\n材料：\n` +
    recipe.recipeIngredients
      .flatMap((recipeIngredient, index) => {
        return `(${index + 1})${recipeIngredient.name.replace(/\s+/g, "")}`;
      })
      .join("\n") +
    `\n作り方：\n` +
    recipe.recipeCookingProcedures
      .flatMap((recipeCookingProcedure, index) => {
        return `(${index + 1})${recipeCookingProcedure.name.replace(/\s+/g, "")}`;
      })
      .join("\n");

  return (
    <main>
      <RecipeDetailComponent
        recipe={recipe}
        isFavoriteByMe={isFavoriteByMe}
        sessionUserId={session?.user?.id}
        isMyRecipe={isMyRecipe}
      />
      <RecipeDetailTabWrapper recipe={recipe} />
      <CopyText copyText={recipeCopyText} />
    </main>
  );
}
