import { db } from "@/lib/kysely";

export async function getRecipeCookingProceduresByRecipeId(recipeId: string) {
  return await db
    .selectFrom("RecipeCookingProcedure")
    .selectAll()
    .where("recipeId", "=", recipeId)
    .where("deletedAt", "is", null)
    .orderBy("sort", "asc")
    .execute();
}
