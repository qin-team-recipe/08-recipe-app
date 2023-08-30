import { useState } from "react";

import { RecipeForm } from "@/features/recipes";
import { db } from "@/lib/kysely";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await db
    .selectFrom("Recipe")
    .select(["id", "name", "description"])
    .where("id", "=", params.id)
    .execute();
  if (recipe.length === 0) {
    //redirect to somewhere
  }
  const recipeIngredients = await db
    .selectFrom("RecipeIngredient")
    .select(["id", "recipeId", "name", "sort"])
    .where("recipeId", "=", recipe[0].id)
    .orderBy("sort")
    .execute();

  const recipeCookingProcedures = await db
    .selectFrom("RecipeCookingProcedure")
    .select(["id", "recipeId", "name", "sort"])
    .where("recipeId", "=", recipe[0].id)
    .orderBy("sort")
    .execute();

  const recipeLinks = await db
    .selectFrom("RecipeLink")
    .select(["id", "recipeId", "url", "sort"])
    .where("recipeId", "=", recipe[0].id)
    .orderBy("sort")
    .execute();

  const recipeImages = await db
    .selectFrom("RecipeImage")
    .select(["id", "recipeId", "imgSrc", "sort"])
    .where("recipeId", "=", recipe[0].id)
    .orderBy("sort")
    .execute();
  1;

  const recipeData = {
    ...recipe[0],
    recipeIngredients,
    recipeCookingProcedures,
    recipeLinks,
    recipeImages,
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
