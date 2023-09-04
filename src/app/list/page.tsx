import { getServerSession } from "next-auth";

import { Login } from "@/components/login";
import { List } from "@/features/list";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/kysely";
import { seed } from "@/lib/seed/list";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return <Login />;

  const allList = await (async () => {
    const allList = await db.selectFrom("List").select(["id", "name", "index", "recipeId"]).orderBy("index").execute();
    if (!allList.length) {
      await seed();
      return await db.selectFrom("List").select(["id", "name", "index", "recipeId"]).orderBy("index").execute();
    }
    return allList;
  })();

  return (
    <main className="bg-mauve-app flex flex-col gap-12 pt-5">
      {await Promise.all(
        allList.map(async ({ id, name, index }) => {
          const ingredients = await db
            .selectFrom("Ingredient")
            .selectAll()
            .where("listId", "=", id)
            .orderBy("index")
            .execute();
          return <List key={id} id={id} name={name} ingredients={ingredients} index={index} />;
        }),
      )}
    </main>
  );
}
