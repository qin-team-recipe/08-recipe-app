import { redirect } from "next/navigation";

import CopyText from "@/components/utils/copy-text";
import { getRecipeById, getRecipeCookingProceduresByRecipeId, RecipeStep } from "@/features/recipes";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const recipe = await getRecipeById(id);
  if (!recipe) {
    redirect("/");
  }
  const recipeCookingProcedures = await getRecipeCookingProceduresByRecipeId(id);
  let recipeCookingProceduresText = `レシピ名：${recipe.name}\n${recipe.servings}人前\n作り方：\n`;
  recipeCookingProceduresText += recipeCookingProcedures
    .flatMap((recipeCookingProcedures, index) => {
      return `(${index + 1})${recipeCookingProcedures.name.replace(/\s+/g, "")}`;
    })
    .join("\n");
  return (
    <div>
      <RecipeStep data={recipeCookingProcedures} />
      <CopyText copyText={recipeCookingProceduresText} />
    </div>
  );
}
