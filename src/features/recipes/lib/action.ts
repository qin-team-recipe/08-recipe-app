"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

import { Insertable, Updateable } from "kysely";

import { db } from "@/lib/kysely";
import { Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink } from "@/types/db";

type RecipeForm = {
  description: string;
  name: string;
  recipeIngredients: RecipeIngredient[];
  recipeCookingProcedures: RecipeCookingProcedure[];
  recipeLinks: RecipeLink[];
  profileImage: File;
};

export async function updateRecipe(id: string, data: RecipeForm, formImage: FormData) {
  console.log("updateRecipe called");
  console.log("data", data);
  console.log("formImage", formImage);
  const file = formImage.get("recipeImage") as File;
  console.log("=========");
  console.log("file", file);
  console.log("=========");
  let fileName: string = "";
  if (file) {
    fileName = `${Math.random().toString(36).slice(-18)}_${Date.now()}.jpeg`;
    console.log("fileName", fileName);
    await file.arrayBuffer().then((data) => {
      console.log("data arrayBuffer", data);
      const buffer = Buffer.from(data);
      const uploadDir = path.join(process.cwd(), "public/images/recipes", `/${fileName}`);
      fs.writeFile(uploadDir, buffer);
    });
  }
  const recipeData: Updateable<Recipe> = {
    name: data.name,
    description: data.description,
  };
  const recipeIngredientData: Insertable<RecipeIngredient>[] = data.recipeIngredients.map((ingredient, index) => ({
    recipeId: id,
    name: ingredient.value,
    sort: index,
  }));
  // console.log("recipeIngredientData", recipeIngredientData);

  const recipeLinkData: Insertable<RecipeLink>[] = data.recipeLinks.map((link, index) => ({
    recipeId: id,
    url: link.value,
    sort: index,
  }));
  // console.log("recipeLinkData", recipeLinkData);

  const recipeCookingProcedureData: Insertable<RecipeCookingProcedure>[] = data.recipeCookingProcedures.map(
    (cookingProcedure, index) => ({
      recipeId: id,
      name: cookingProcedure.value,
      sort: index,
    }),
  );

  let recipeImageData: Insertable<RecipeImage>[] = [];

  if (file) {
    console.log("file is exist1");
    recipeImageData = [
      {
        recipeId: id,
        imgSrc: `/images/recipes/${fileName}`,
        sort: 0,
      },
    ];
    console.log("recipeImageData", recipeImageData);
  }

  await db.transaction().execute(async (trx) => {
    await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
    await db.deleteFrom("RecipeIngredient").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeIngredient").values(recipeIngredientData).execute();
    await db.deleteFrom("RecipeCookingProcedure").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeCookingProcedure").values(recipeCookingProcedureData).execute();
    await db.deleteFrom("RecipeLink").where("recipeId", "=", id).executeTakeFirstOrThrow();
    await db.insertInto("RecipeLink").values(recipeLinkData).execute();
    if (file) {
      console.log("file is exist2");
      await db.deleteFrom("RecipeImage").where("recipeId", "=", id).executeTakeFirstOrThrow();
      await db.insertInto("RecipeImage").values(recipeImageData).execute();
    }
  });
}
