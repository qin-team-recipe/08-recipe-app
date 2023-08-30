"use server";

import { revalidatePath } from "next/cache";

import { Insertable, Updateable } from "kysely";

import { db } from "@/lib/kysely";
import { Recipe, RecipeCookingProcedure, RecipeIngredient, RecipeLink } from "@/types/db";

type RecipeForm = {
  description: string;
  name: string;
  recipeIngredients: RecipeIngredient[];
  recipeCookingProcedures: RecipeCookingProcedure[];
  recipeLinks: RecipeLink[];
};

export async function updateRecipe(id: string, data: RecipeForm) {
  console.log("updateRecipe called");
  console.log("data", data);
  const recipeData: Updateable<Recipe> = {
    name: data.name,
    description: data.description,
  };
  const recipeIngredientData: Insertable<RecipeIngredient>[] = data.recipeIngredients.map((ingredient, index) => ({
    recipeId: id,
    name: ingredient.value,
    sort: index,
  }));
  console.log("recipeIngredientData", recipeIngredientData);

  const recipeLinkData: Insertable<RecipeLink>[] = data.recipeLinks.map((link, index) => ({
    recipeId: id,
    url: link.value,
    sort: index,
  }));
  console.log("recipeLinkData", recipeLinkData);

  const recipeCookingProcedureData: Insertable<RecipeCookingProcedure>[] = data.recipeCookingProcedures.map(
    (cookingProcedure, index) => ({
      recipeId: id,
      name: cookingProcedure.value,
      sort: index,
    }),
  );
  console.log("recipeLinkData", recipeLinkData);

  await db.transaction().execute(async (trx) => {
    await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
    await db.deleteFrom("RecipeIngredient").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeIngredient").values(recipeIngredientData).execute();
    await db.deleteFrom("RecipeCookingProcedure").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeCookingProcedure").values(recipeCookingProcedureData).execute();
    await db.deleteFrom("RecipeLink").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeLink").values(recipeLinkData).execute();
  });
}
