import { jsonArrayFrom } from "kysely/helpers/mysql";

import { db } from "@/lib/kysely";

export async function getRecipeById(id: string) {
  const baseQuery = createBaseQuerySelect();

  return await baseQuery.where("Recipe.id", "=", id).executeTakeFirst();
}

function createBaseQuerySelect() {
  return db
    .selectFrom("Recipe")
    .selectAll("Recipe")
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("User")
          .select(["User.id", "User.name"])
          .whereRef("User.id", "=", "Recipe.userId")
          .where("User.deletedAt", "is", null),
      ).as("User"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeImage")
          .select(["RecipeImage.id", "RecipeImage.imgSrc", "RecipeImage.sort"])
          .whereRef("RecipeImage.recipeId", "=", "Recipe.id")
          .where("RecipeImage.deletedAt", "is", null)
          .orderBy("RecipeImage.sort", "asc"),
      ).as("RecipeImage"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeIngredient")
          .select(["RecipeIngredient.id", "RecipeIngredient.name", "RecipeIngredient.sort"])
          .whereRef("RecipeIngredient.recipeId", "=", "Recipe.id")
          .where("RecipeIngredient.deletedAt", "is", null)
          .orderBy("RecipeIngredient.sort", "asc"),
      ).as("RecipeIngredient"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeCookingProcedure")
          .select(["RecipeCookingProcedure.id", "RecipeCookingProcedure.name", "RecipeCookingProcedure.sort"])
          .whereRef("RecipeCookingProcedure.recipeId", "=", "Recipe.id")
          .where("RecipeCookingProcedure.deletedAt", "is", null)
          .orderBy("RecipeCookingProcedure.sort", "asc"),
      ).as("RecipeCookingProcedure"),
      jsonArrayFrom(
        eb
          .selectFrom("RecipeLink")
          .select(["RecipeLink.id", "RecipeLink.url", "RecipeLink.category", "RecipeLink.sort"])
          .whereRef("RecipeLink.recipeId", "=", "Recipe.id")
          .where("RecipeLink.deletedAt", "is", null)
          .orderBy("RecipeLink.sort", "asc"),
      ).as("RecipeLink"),
    ])
    .where("Recipe.isPublic", "=", 1)
    .where("Recipe.deletedAt", "is", null);
}
