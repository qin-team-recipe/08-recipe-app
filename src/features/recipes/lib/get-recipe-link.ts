import { db } from "@/lib/kysely";

export async function getRecipeLinksById(recipeId: string) {
  return await db
    .selectFrom("RecipeLink")
    .selectAll()
    .where("recipeId", "=", recipeId)
    .where("deletedAt", "is", null)
    .orderBy("sort", "asc")
    .execute();
}
