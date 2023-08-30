"use server";

import { revalidatePath } from "next/cache";

import { Insertable, Updateable } from "kysely";

import { db } from "@/lib/kysely";
import { Recipe, RecipeIngredient } from "@/types/db";

type RecipeForm = {
  description: string;
  name: string;
  ingredients: RecipeIngredient[];
};

export async function updateRecipe(id: string, data: RecipeForm) {
  console.log("updateRecipe called");
  console.log("data", data);
  const recipeData: Updateable<Recipe> = {
    name: data.name,
    description: data.description,
  };
  const recipeIngredientData: Insertable<RecipeIngredient>[] = data.ingredients.map((ingredient, index) => ({
    recipeId: id,
    name: ingredient.value,
    sort: index,
  }));
  console.log("recipeIngredientData", recipeIngredientData);

  await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
  //TODO:たけゆさん確認 for loopでなくPromiseallを使うのはなぜか？
  await db.transaction().execute(async (trx) => {
    await db.deleteFrom("RecipeIngredient").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeIngredient").values(recipeIngredientData).execute();
  });
}
