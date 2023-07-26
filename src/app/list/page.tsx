import { List, ModeToggle, ThemeProvider } from "@/features/list";
import { db } from "@/lib/kysely";
import { seed } from "@/lib/seed/list";

export default async function Page() {
  const allList = await (async () => {
    const allList = await db.selectFrom("List").select(["id", "name", "index", "recipeId"]).orderBy("index").execute();
    if (!allList.length) {
      await seed();
      return await db.selectFrom("List").select(["id", "name", "index", "recipeId"]).orderBy("index").execute();
    }
    return allList;
  })();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <header className="bg-mauve-app border-mauve-dim flex items-center justify-between border-b px-4 py-3">
        <div className="h-6 w-6" />
        <h1 className="text-mauve-normal font-bold leading-6">買い物リスト</h1>
        <ModeToggle />
      </header>
      <main className="bg-mauve-app flex flex-col gap-12 pt-5">
        {allList.map(async ({ id, name, index }) => {
          const ingredients = await db
            .selectFrom("Ingredient")
            .selectAll()
            .where("listId", "=", id)
            .orderBy("index")
            .execute();
          return <List key={id} id={id} name={name} ingredients={ingredients} index={index} />;
        })}
      </main>
    </ThemeProvider>
  );
}
