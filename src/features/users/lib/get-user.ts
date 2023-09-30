import { db } from "@/lib/kysely";

export async function getUserByRecipeId(recipeId: string) {
  const recipe = await db
    .selectFrom("Recipe")
    .select("userId")
    .where("id", "=", recipeId)
    .where("deletedAt", "is", null)
    .executeTakeFirst();
  if (recipe) {
    const user = await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", recipe.userId)
      .where("deletedAt", "is", null)
      .executeTakeFirst();
    return user;
  }
  return null;
}
