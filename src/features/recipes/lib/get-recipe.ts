import { db } from "@/lib/kysely";

export async function getRecipeById(id: string) {
  const baseQuery = createBaseQuerySelect();

  return await baseQuery.where("Recipe.id", "=", id).executeTakeFirst();
}

function createBaseQuerySelect() {
  return db
    .selectFrom("Recipe")
    .innerJoin("RecipeImage", "RecipeImage.recipeId", "Recipe.id")
    .select([
      "Recipe.id as id",
      "Recipe.userId as userId",
      "Recipe.name as name",
      "Recipe.description as description",
      "Recipe.servings as servings",
      "Recipe.isPublic as isPublic",
      "Recipe.createdAt as createdAt",
      "Recipe.updatedAt as updatedAt",
      "RecipeImage.imgSrc as imgSrc",
    ])
    .where("Recipe.isPublic", "=", 1)
    .where("Recipe.deletedAt", "is", null)
    .where("RecipeImage.deletedAt", "is", null);
}
