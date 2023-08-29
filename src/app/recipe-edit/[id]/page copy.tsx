import { useState } from "react";

import { RecipeForm } from "@/features/recipes";
import { db } from "@/lib/kysely";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await db.selectFrom("Recipe").select(["id", "name"]).where("id", "=", params.id).execute();
  if (recipe.length === 0) {
    //redirect to somewhere
  }
  const recipeIngredients = await db
    .selectFrom("RecipeIngredient")
    .select(["id", "recipeId", "name", "sort"])
    .where("recipeId", "=", recipe[0].id)
    .orderBy("sort")
    .execute();

  const recipeData = {
    ...recipe[0],
    recipeIngredients,
  };

  console.log("recipeData", recipeData);

  return (
    <div className="bg-mauve-3 ">
      <div className="flex justify-between border-b border-mauve-6">
        <div>✗</div>
        <div>下書き一覧</div>
      </div>
      <RecipeForm recipe={recipeData} />
    </div>
  );
}
