"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { fileTypeFromBlob } from "file-type";
import { Insertable, Selectable, Updateable } from "kysely";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { LINK_CATEGORY_URL } from "@/config/constants";
import { ERROR_MESSAGE_UNAUTHORIZED, ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { recipeFormFields } from "@/features/recipes/lang/ja";
import { RecipeFormSchema } from "@/features/recipes/types/type";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink } from "@/types/db";
import { LinkCategory } from "@/types/enums";

type RecipeForm = {
  name: string;
  description: string;
  servings: number;
  isPublic: boolean;
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
    return {
      error: ERROR_MESSAGE_UNAUTHORIZED,
    };
  }

  // const validationResult = RecipeFormSchema.safeParse(data);
  // if (!validationResult.success) {
  //   let errorMessage = "";
  //   validationResult.error.issues.forEach((issue) => {
  //     errorMessage = errorMessage + recipeFormFields[issue.path[0]] + "：" + issue.message;
  //   });
  //   return {
  //     error: errorMessage,
  //   };
  // }

  const file: File | null = formImage.get("recipeImage") as unknown as File;
  console.log("file", file);
  console.log("data", data.recipeImage);
  let fileName: string = "";
  if (file && file instanceof Blob) {
    const fileTypeResult = await fileTypeFromBlob(file);
    if (fileTypeResult) {
      fileName = generateRandomString(16) + `_${Date.now()}.${fileTypeResult.ext}`;
      await uploadFile(file, fileName);
    }
  }

  const result = await createRecipeTables(user.id, data, fileName);
  if (result.error) {
    return {
      error: result.error,
    };
  } else {
    revalidatePath("recipe-draft");
    return {
      success: "success",
      recipeIdInserted: result,
    };
  }
}

export async function updateRecipe(id: string, data: RecipeForm, formImage: FormData) {
  console.log("updateRecipe called");
  const session: Session | null = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return {
      error: ERROR_MESSAGE_UNAUTHORIZED,
    };
  }

  // const validationResult = RecipeFormSchema.safeParse(data);
  // if (!validationResult.success) {
  //   let errorMessage = "";
  //   validationResult.error.issues.forEach((issue) => {
  //     errorMessage = errorMessage + recipeFormFields[issue.path[0]] + "：" + issue.message;
  //   });
  //   return {
  //     error: errorMessage,
  //   };
  // }

  // console.log("data", data);
  // console.log("formImage", formImage);
  const file = formImage.get("recipeImage") as File;
  console.log("formImage.get(recipeImage)");
  console.log(formImage.get("recipeImage"));
  console.log("formImage.get(recipeImage) instanceof blob");
  console.log(formImage.get("recipeImage") instanceof Blob);
  console.log("=========");
  console.log("file", file);
  console.log("=========");
  let fileName: string = "";
  if (file && file instanceof Blob) {
    console.log("file is true");
    const fileTypeResult = await fileTypeFromBlob(file);
    if (fileTypeResult) {
      fileName = generateRandomString(16) + `_${Date.now()}.${fileTypeResult.ext}`;
      await uploadFile(file, fileName);
    }
  }
  return await updateRecipeTables(id, data, fileName);
}

export async function removeRecipe(id: string) {
  console.log("removeRecipe called");

  const session: Session | null = await getServerSession(authOptions);
  const user = session?.user; // ログインしていなければnullになる。
  if (!user) {
    return {
      error: MESSAGE_UNAUTHORIZED,
    };
  }

  const recipeData: Updateable<Recipe> = {
    deletedAt: new Date(),
  };
  await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
  revalidatePath("recipe-draft");
  return {
    success: "success",
  };
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
  let resultRecipeInserted: Selectable<Recipe>;
  try {
    await db.transaction().execute(async (trx) => {
      const recipeData: Insertable<Recipe> = {
        userId: userId,
        name: data.name,
        description: data.description,
        servings: data.servings,
        isPublic: data.isPublic === true ? 1 : 0,
      };
      //ISSUE: どうやったらresult.insertIdがとれるのか？
      //uuidはincrementじゃないからとれない、planet scaleやpostgresはとれないという記事も見た。
      const result = await db.insertInto("Recipe").values(recipeData).executeTakeFirst();
      //しまぶーさんと画面共有してreturning()をつけてもだめだった
      //const result = await db.insertInto("Recipe").values(recipeData).returning(["id", "name"]).executeTakeFirst();
      console.log("result", result);
      resultRecipeInserted = await db
        .selectFrom("Recipe")
        .selectAll()
        .where("userId", "=", userId)
        .where("name", "=", recipeData.name)
        .where("description", "=", data.description)
        .orderBy("createdAt", "desc")
        .executeTakeFirstOrThrow();

      console.log("resultRecipeInserted", resultRecipeInserted);

      if (data.recipeIngredients.length > 0) {
        const recipeIngredientData: Insertable<RecipeIngredient>[] = data.recipeIngredients.map(
          (ingredient, index) => ({
            recipeId: resultRecipeInserted.id,
            name: ingredient.value,
            sort: index,
          }),
        );
        await db.insertInto("RecipeIngredient").values(recipeIngredientData).execute();
      }

      console.log("data.recipeLinks", data.recipeLinks);
      console.log("data.recipeLinks.length", data.recipeLinks.length);
      if (data.recipeLinks.length > 0) {
        const recipeLinkData: Insertable<RecipeLink>[] = data.recipeLinks
          .filter((link) => link.value.length > 0)
          .map((link, index) => {
            if (link.value) {
              return {
                recipeId: resultRecipeInserted.id,
                url: link.value,
                category: getLinkCategoryFromURL(link.value),
                sort: index,
              };
            }
          });
        console.log("recipeLinkData on update", recipeLinkData);
        console.log("recipeLinkData.length on update", recipeLinkData.length);
        if (recipeLinkData.length > 0) {
          await db.insertInto("RecipeLink").values(recipeLinkData).execute();
        }
      }

      if (data.recipeCookingProcedures.length > 0) {
        const recipeCookingProcedureData: Insertable<RecipeCookingProcedure>[] = data.recipeCookingProcedures.map(
          (cookingProcedure, index) => ({
            recipeId: resultRecipeInserted.id,
            name: cookingProcedure.value,
            sort: index,
          }),
        );
        if (recipeCookingProcedureData.length > 0) {
          await db.insertInto("RecipeCookingProcedure").values(recipeCookingProcedureData).execute();
        }
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
  } catch (error) {
    console.log("error", error);
    return {
      error: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  }
  return resultRecipeInserted.id;
}

async function updateRecipeTables(id: string, data: RecipeForm, fileName: string) {
  const recipeData: Updateable<Recipe> = {
    name: data.name,
    description: data.description,
    servings: data.servings,
    isPublic: data.isPublic === true ? 1 : 0,
  };

  const recipeIngredientData: Insertable<RecipeIngredient>[] = data.recipeIngredients.map((ingredient, index) => ({
    recipeId: id,
    name: ingredient.value,
    sort: index,
  }));
  // console.log("recipeIngredientData", recipeIngredientData);

  const recipeLinkData: Insertable<RecipeLink>[] = data.recipeLinks
    .filter((link) => link.value.length > 0)
    .map((link, index) => {
      if (link.value) {
        return {
          recipeId: id,
          url: link.value,
          category: getLinkCategoryFromURL(link.value),
          sort: index,
        };
      }
    });
  console.log("recipeLinkData on update", recipeLinkData);

  const recipeCookingProcedureData: Insertable<RecipeCookingProcedure>[] = data.recipeCookingProcedures
    .filter((cookingProcedure) => cookingProcedure.value.length > 0)
    .map((cookingProcedure, index) => ({
      recipeId: id,
      name: cookingProcedure.value,
      sort: index,
    }));

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

  try {
    await db.transaction().execute(async (trx) => {
      await db.updateTable("Recipe").set(recipeData).where("id", "=", id).execute();
      await db.deleteFrom("RecipeIngredient").where("recipeId", "=", id).executeTakeFirstOrThrow();
      await db.insertInto("RecipeIngredient").values(recipeIngredientData).execute();
      await db.deleteFrom("RecipeCookingProcedure").where("recipeId", "=", id).executeTakeFirstOrThrow();
      if (recipeCookingProcedureData.length > 0) {
        await db.insertInto("RecipeCookingProcedure").values(recipeCookingProcedureData).execute();
      }
      await db.deleteFrom("RecipeLink").where("recipeId", "=", id).executeTakeFirstOrThrow();
      if (recipeLinkData.length > 0) {
        await db.insertInto("RecipeLink").values(recipeLinkData).execute();
      }
      if (fileName.length > 0) {
        await db.deleteFrom("RecipeImage").where("recipeId", "=", id).executeTakeFirstOrThrow();
        await db.insertInto("RecipeImage").values(recipeImageData).execute();
      }
    });
    return {
      success: "sucess",
    };
  } catch (error) {
    console.log("error", error);
    return {
      error: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  }
}
