"use server";

import { revalidatePath } from "next/cache";

import { Selectable, sql, Updateable } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";

import { DATE_SPAN_RECENT, RECIPE_COUNT_FAVORITED_RECENTLY } from "@/config";
import { ERROR_MESSAGE_UNKOWN_ERROR } from "@/config/error-message";
import { db } from "@/lib/kysely";
import { ServerActionsResponse } from "@/types/actions";
import { Recipe, RecipeFavorite } from "@/types/db";
import { RecipeStatus } from "@/types/enums";

export async function getRecipesWithFavoriteCount({
  query,
  page = 1,
  limit = 6,
  where,
}: {
  query?: string;
  page?: number;
  limit?: number;
  where?: {
    userIds: string[];
  };
}) {
  const offset = (page - 1) * limit;
  const baseQuery = (() => {
    const baseQuery = createBaseQuerySelect(query);
    if (where) {
      return baseQuery.where("userId", "in", where.userIds);
    }
    return baseQuery;
  })();

  const recipes = await baseQuery.offset(offset).limit(limit).execute();

  if (recipes.length === 0) {
    return [];
  }

  const recipeIds = recipes.map((recipe) => recipe["id"]);

  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  return recipes.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
}

export async function getRecipeMaxCount({ query, where }: { query?: string; where?: { userIds: string[] } }) {
  try {
    const baseQuery = (() => {
      const baseQuery = createBaseQueryCount(query);
      if (where) {
        return baseQuery.where("userId", "in", where.userIds);
      }
      return baseQuery;
    })();

    const recipes = await baseQuery.execute();
    return recipes.length;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else if (typeof error === "string") {
      console.log("unexpected error");
    }
    return 0;
  }
}

export async function getRecipesFavoritedRecently({
  query = undefined,
  page = 1,
  limit = 6,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const recipeFavoritedRecently = await getRecipesFavoriteCount();

  //話題のレシピが0件の場合はレシピをレシピを全件表示
  if (recipeFavoritedRecently.length === 0) {
    return await getRecipesWithFavoriteCount({ query: undefined, page, limit });
  }

  const recipeFavoritedRecentlyRecipeIds = recipeFavoritedRecently.flatMap(
    (recipeFavrorite) => recipeFavrorite.recipeId,
  );

  const baseQuery = createBaseQuerySelect(query).where("Recipe.id", "in", recipeFavoritedRecentlyRecipeIds);

  const recipes = await baseQuery
    .offset(offset)
    .limit(limit)
    .orderBy(sql`field(Recipe.id, ${recipeFavoritedRecentlyRecipeIds})`)
    .execute();

  if (recipes.length === 0) {
    return [];
  }
  const recipeIds = recipes.map((recipe) => recipe["id"]);

  const recipeFavorites: Pick<Selectable<RecipeFavorite>, "recipeId">[] = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  return recipes.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
}

export async function getRecipeMaxCountFavoriteRecently({ query }: { query?: string }) {
  try {
    const baseQuery = createBaseQueryCount(query);
    const recipeFavoritedRecently = await getRecipesFavoriteCount();
    const queryFavoritedRecently = baseQuery.where(
      "id",
      "in",
      recipeFavoritedRecently.flatMap((recipeFavrorite) => recipeFavrorite.recipeId),
    );

    const { length } =
      recipeFavoritedRecently.length > 0 ? await queryFavoritedRecently.execute() : await baseQuery.execute();
    return length;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else if (typeof error === "string") {
      console.log("unexpected error");
    }
    return 0;
  }
}

function createBaseQuerySelect(query: string | undefined) {
  const baseQuery = db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.status as status",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.status", "=", RecipeStatus.public)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null);
  if (query) {
    return baseQuery.where((eb) => eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]));
  }
  return baseQuery;
}

function createBaseQueryCount(query: string | undefined) {
  const baseQuery = db
    .selectFrom("Recipe")
    .select("id")
    .where("deletedAt", "is", null)
    .where("status", "=", RecipeStatus.public);

  if (query) {
    return baseQuery.where((eb) => eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]));
  }
  return baseQuery;
}

async function getRecipesFavoriteCount() {
  const date = new Date();
  date.setDate(date.getDate() - DATE_SPAN_RECENT);
  const dateString = date.toJSON().slice(0, 19).replace("T", " ");
  const { rows } = await sql<{
    recipeId: string;
    recipeFavoriteCount: string;
  }>`SELECT recipeId, createdAt, count(*) AS recipeFavoriteCount FROM RecipeFavorite WHERE updatedAt >= ${dateString} AND deletedAt is null GROUP BY recipeId, createdAt ORDER BY recipeFavoriteCount DESC, createdAt DESC`.execute(
    db,
  );

  if (rows.length === 0) {
    return rows;
  }
  return rows
    .sort(function (a, b) {
      return a.recipeFavoriteCount > b.recipeFavoriteCount ? -1 : 1;
    })
    .slice(0, RECIPE_COUNT_FAVORITED_RECENTLY);
}

export async function getRecipeById(id: string) {
  const baseQuery = db
    .selectFrom("Recipe")
    .selectAll("Recipe")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("User")
          .select(["User.id", "User.name", "User.image"])
          .whereRef("User.id", "=", "Recipe.userId")
          .where("User.deletedAt", "is", null),
      ).as("user"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeImage")
          .select(["RecipeImage.id", "RecipeImage.imgSrc", "RecipeImage.index"])
          .whereRef("RecipeImage.recipeId", "=", "Recipe.id")
          .where("RecipeImage.deletedAt", "is", null)
          .orderBy("RecipeImage.index", "asc"),
      ).as("recipeImages"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeIngredient")
          .select(["RecipeIngredient.id", "RecipeIngredient.name", "RecipeIngredient.index"])
          .whereRef("RecipeIngredient.recipeId", "=", "Recipe.id")
          .where("RecipeIngredient.deletedAt", "is", null)
          .orderBy("RecipeIngredient.index", "asc"),
      ).as("recipeIngredients"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeCookingProcedure")
          .select(["RecipeCookingProcedure.id", "RecipeCookingProcedure.name", "RecipeCookingProcedure.index"])
          .whereRef("RecipeCookingProcedure.recipeId", "=", "Recipe.id")
          .where("RecipeCookingProcedure.deletedAt", "is", null)
          .orderBy("RecipeCookingProcedure.index", "asc"),
      ).as("recipeCookingProcedures"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeLink")
          .select(["RecipeLink.id", "RecipeLink.url", "RecipeLink.category", "RecipeLink.index"])
          .whereRef("RecipeLink.recipeId", "=", "Recipe.id")
          .where("RecipeLink.deletedAt", "is", null)
          .orderBy("RecipeLink.index", "asc"),
      ).as("recipeLinks"),
    ])
    .where("Recipe.deletedAt", "is", null);

  return await baseQuery.where("Recipe.id", "=", id).executeTakeFirst();
}

export async function getRecipeWithFavoriteCountByUserId(followedUserIds: string[]) {
  const recipeList = await db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.status as status",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.status", "=", RecipeStatus.public)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null)
    .where("userId", "in", followedUserIds)
    .orderBy("Recipe.createdAt", "desc")
    .execute();
  if (recipeList.length === 0) {
    return [];
  }
  const recipeIds = recipeList.map((recipe) => recipe.id);
  const recipeFavoriteCounts = await getFavoriteCountByRecipeId(recipeIds);
  const recentRecipeList = recipeList.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: recipeFavoriteCounts[recipe.id] ? recipeFavoriteCounts[recipe.id] : 0,
    };
  });
  return recentRecipeList;
}

export async function getFavoriteRecipeWithFavoriteCountByUserId(userId: string) {
  const favoriteRecipeList = await db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .innerJoin("RecipeFavorite", "RecipeFavorite.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.status as status",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.status", "=", RecipeStatus.public)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null)
    .where("RecipeFavorite.deletedAt", "is", null)
    .where("RecipeFavorite.userId", "=", userId)
    .execute();
  if (favoriteRecipeList.length === 0) {
    return [];
  }
  const favoriteRecipeIds = favoriteRecipeList.map((recipe) => recipe.id);
  const favoriteRecipeCounts = await getFavoriteCountByRecipeId(favoriteRecipeIds);
  const resultRecipeList = favoriteRecipeList.flatMap((recipe) => {
    return {
      ...recipe,
      favoriteCount: favoriteRecipeCounts[recipe.id] ? favoriteRecipeCounts[recipe.id] : 0,
    };
  });
  return resultRecipeList;
}

async function getFavoriteCountByRecipeId(recipeIds: string[]) {
  const recipeFavorites = await db
    .selectFrom("RecipeFavorite")
    .select(["recipeId"])
    .where("recipeId", "in", recipeIds)
    .where("deletedAt", "is", null)
    .execute();

  const recipeFavoriteCounts = recipeFavorites.reduce(function (prev: { [key: string]: number }, current) {
    prev[current["recipeId"]] = (prev[current["recipeId"]] || 0) + 1;
    return prev;
  }, {});

  return recipeFavoriteCounts;
}

export async function updateRecipe(
  recipeId: string,
  updateValues: Updateable<Recipe>,
): Promise<ServerActionsResponse<{ recipe: Selectable<Recipe> }>> {
  try {
    const result = await db.updateTable("Recipe").set(updateValues).where("id", "=", recipeId).executeTakeFirst();
    if (result.numUpdatedRows !== BigInt("1")) {
      throw new Error(ERROR_MESSAGE_UNKOWN_ERROR);
    }
    const updatedRecipe = await db.selectFrom("Recipe").selectAll().where("id", "=", recipeId).executeTakeFirst();

    if (!updatedRecipe) {
      throw new Error(ERROR_MESSAGE_UNKOWN_ERROR);
    }
    return {
      success: true,
      data: { recipe: updatedRecipe },
    };
  } catch (e) {
    return {
      success: false,
      message: ERROR_MESSAGE_UNKOWN_ERROR,
    };
  } finally {
    if (!updateValues.deletedAt) {
      revalidatePath(`/recipe/${recipeId}`);
    }
  }
}

import fs from "fs/promises";
import path from "path";

import { fileTypeFromBlob } from "file-type";
import { Insertable } from "kysely";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { ERROR_MESSAGE_UNAUTHORIZED } from "@/config/error-message";
import { authOptions } from "@/lib/auth";
import { RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink } from "@/types/db";
import { LinkCategory } from "@/types/enums";

import { recipeFormFields } from "../lib/form-field-name";
import { RecipeFormSchema } from "../types";

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
  console.log("formImage", formImage);
  console.log(formImage.get("recipeImage"));

  if (!user) {
    return {
      error: ERROR_MESSAGE_UNAUTHORIZED,
    };
  }

  console.log("data", data);

  const file: File | null = formImage.get("recipeImage") as unknown as File;
  if (file && file instanceof Blob) {
    data["recipeImage"] = file;
  }
  const validationResult = RecipeFormSchema.safeParse(data);
  if (!validationResult.success) {
    let errorMessage = "";
    validationResult.error.issues.forEach((issue) => {
      errorMessage = errorMessage + recipeFormFields[issue.path[0]] + "：" + issue.message;
    });
    return {
      error: errorMessage,
    };
  }

  console.log("file", file);
  console.log("file.size", file.size);
  console.log("file.type", file.type);
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
    revalidatePath("recipe/draft");
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

  const file: File | null = formImage.get("recipeImage") as unknown as File;
  if (file && file instanceof Blob) {
    data["recipeImage"] = file;
  }
  const validationResult = RecipeFormSchema.safeParse(data);
  if (!validationResult.success) {
    let errorMessage = "";
    validationResult.error.issues.forEach((issue) => {
      errorMessage = errorMessage + recipeFormFields[issue.path[0]] + "：" + issue.message;
    });
    return {
      error: errorMessage,
    };
  }

  let fileName: string = "";
  if (file && file instanceof Blob) {
    console.log("file is true");
    const fileTypeResult = await fileTypeFromBlob(file);
    if (fileTypeResult) {
      fileName = generateRandomString(16) + `_${Date.now()}.${fileTypeResult.ext}`;
      await uploadFile(file, fileName);
    }
  }
  const result = await updateRecipeTables(id, data, fileName);
  if (result.success) {
    revalidatePath(`/recipe/edit/${id}`);
  }
  return result;
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
  revalidatePath("recipe/draft");
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
