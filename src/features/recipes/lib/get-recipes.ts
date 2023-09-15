import { db } from "@/lib/kysely";

export async function getRecipes({ query, page = 1, limit = 6 }: { query?: string; page?: number; limit?: number }) {
  const offset = (page - 1) * limit;

  let baseQuery = db.selectFrom("Recipe").selectAll();
  if (query) {
    baseQuery = baseQuery.where((eb) =>
      eb.or([eb("name", "like", `%${query}%`), eb("description", "like", `%${query}%`)]),
    );
  }
  baseQuery.offset(offset).limit(limit);

  return await baseQuery.execute();
}
