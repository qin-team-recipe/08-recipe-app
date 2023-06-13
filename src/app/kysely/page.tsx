import { db } from "@/lib/kysely";

export default async function Page() {
  const recipes = await db.selectFrom("Recipe").selectAll().execute();

  return (
    <main className="text-red-500">
      <ul>
        {recipes.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </main>
  );
}
