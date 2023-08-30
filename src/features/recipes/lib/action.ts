"use server";

import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";

import { fileTypeFromBlob } from "file-type";
import { Insertable, Updateable } from "kysely";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { LINK_CATEGORY_URL } from "@/config/constants";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink } from "@/types/db";
import { LinkCategory } from "@/types/enums";

type RecipeForm = {
  description: string;
  name: string;
  recipeIngredients: RecipeIngredient[];
  recipeCookingProcedures: RecipeCookingProcedure[];
  recipeLinks: RecipeLink[];
  recipeImage: File;
};

export async function createRecipe(data: RecipeForm, formImage: FormData) {
  console.log("createRecipe called");
  const session: Session | null = await getServerSession(authOptions);
  console.log("session", session);

  const user = session?.user; // ログインしていなければnullになる。
  console.log("user", user);

  if (!user) {
    //リダイレクト
  }

  const file: File | null = formImage.get("recipeImage") as unknown as File;
  console.log("file", file);
  console.log("data", data.recipeImage);
  let fileName: string = "";
  if (file) {
    const fileTypeResult = await fileTypeFromBlob(file);
    if (fileTypeResult) {
      fileName = generateRandomString(16) + `_${Date.now()}.${fileTypeResult.ext}`;
      await uploadFile(file, fileName);
    }
  }

  await createRecipeTables(user.id, data, fileName);
}

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
    const fileTypeResult = await fileTypeFromBlob(file);
    if (fileTypeResult) {
      fileName = generateRandomString(16) + `_${Date.now()}.${fileTypeResult.ext}`;
      await uploadFile(file, fileName);
    }
  }
  await updateRecipeTables(id, data, fileName);
}

export async function removeRecipe(id: string) {
  console.log("removeRecipe called");

  const session: Session | null = await getServerSession(authOptions);
  const user = session?.user; // ログインしていなければnullになる。
  if (!user) {
    //リダイレクト
  }

  const recipeData: Updateable<Recipe> = {
    deletedAt: new Date(),
  };
  await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
  //ISSUE:下記をかかずにデータを再更新する方法はないのか？
  //redirectエラーが発生する模様
  //https://github.com/vercel/next.js/issues/53392
  // redirect("/recipe-draft");
}

function generateRandomString(length: number): string {
  const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(Array(length))
    .map(() => string[Math.floor(Math.random() * string.length)])
    .join("");
}

async function uploadFile(file: File, fileName: string) {
  await file.arrayBuffer().then((data) => {
    console.log("data arrayBuffer", data);
    const buffer = Buffer.from(data);
    const uploadDir = path.join(process.cwd(), "public/images/recipes", `/${fileName}`);
    fs.writeFile(uploadDir, buffer);
  });
}

function getLinkCategoryFromURL(url: string): LinkCategory {
  console.log("func getLinkCategoryFromURL called");
  const linkCategoryURLMap = Object.entries(LINK_CATEGORY_URL).map(function ([category, url]) {
    console.log("category", category);
    console.log("url", url);
    return { category: category.toLowerCase(), url: url };
  });
  let category: LinkCategory = "other";
  linkCategoryURLMap.forEach(function (categoryUrl) {
    if (url.includes(categoryUrl.url)) {
      category = categoryUrl.category as LinkCategory;
    }
  });
  return category;
}

async function createRecipeTables(userId: string, data: RecipeForm, fileName: string) {
  await db.transaction().execute(async (trx) => {
    const recipeData: Insertable<Recipe> = {
      userId: userId,
      name: data.name,
      description: data.description,
    };
    //ISSUE: どうやったらresult.insertIdがとれるのか？
    //uuidはincrementじゃないからとれない、planet scaleやpostgresはとれないという記事も見た。
    await db.insertInto("Recipe").values(recipeData).executeTakeFirst();
    const resultRecipeInserted = await db
      .selectFrom("Recipe")
      .selectAll()
      .where("userId", "=", userId)
      .where("name", "=", recipeData.name)
      .where("description", "=", data.description)
      .executeTakeFirstOrThrow();
    console.log("resultRecipeInserted", resultRecipeInserted);

    if (data.recipeIngredients.length > 0) {
      const recipeIngredientData: Insertable<RecipeIngredient>[] = data.recipeIngredients.map((ingredient, index) => ({
        recipeId: resultRecipeInserted.id,
        name: ingredient.value,
        sort: index,
      }));
      await db.insertInto("RecipeIngredient").values(recipeIngredientData).execute();
    }

    if (data.recipeLinks.length > 0) {
      const recipeLinkData: Insertable<RecipeLink>[] = data.recipeLinks.map((link, index) => ({
        recipeId: resultRecipeInserted.id,
        url: link.value,
        category: getLinkCategoryFromURL(link.value),
        sort: index,
      }));
      await db.insertInto("RecipeLink").values(recipeLinkData).execute();
    }

    if (data.recipeCookingProcedures.length > 0) {
      const recipeCookingProcedureData: Insertable<RecipeCookingProcedure>[] = data.recipeCookingProcedures.map(
        (cookingProcedure, index) => ({
          recipeId: resultRecipeInserted.id,
          name: cookingProcedure.value,
          sort: index,
        }),
      );
      await db.insertInto("RecipeCookingProcedure").values(recipeCookingProcedureData).execute();
    }

    let recipeImageData: Insertable<RecipeImage>[] = [];

    if (fileName.length > 0) {
      console.log("file is exist1");
      recipeImageData = [
        {
          recipeId: resultRecipeInserted.id,
          imgSrc: `/images/recipes/${fileName}`,
          sort: 0,
        },
      ];
      console.log("recipeImageData", recipeImageData);
      await db.insertInto("RecipeImage").values(recipeImageData).execute();
    }
  });
}

async function updateRecipeTables(id: string, data: RecipeForm, fileName: string) {
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

  const recipeLinkData: Insertable<RecipeLink>[] = data.recipeLinks.map((link, index) => {
    return {
      recipeId: id,
      url: link.value,
      category: getLinkCategoryFromURL(link.value),
      sort: index,
    };
  });
  // console.log("recipeLinkData", recipeLinkData);

  const recipeCookingProcedureData: Insertable<RecipeCookingProcedure>[] = data.recipeCookingProcedures.map(
    (cookingProcedure, index) => ({
      recipeId: id,
      name: cookingProcedure.value,
      sort: index,
    }),
  );

  let recipeImageData: Insertable<RecipeImage>[] = [];

  if (fileName.length > 0) {
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
    if (fileName.length > 0) {
      await db.deleteFrom("RecipeImage").where("recipeId", "=", id).executeTakeFirstOrThrow();
      await db.insertInto("RecipeImage").values(recipeImageData).execute();
    }
  });
}
