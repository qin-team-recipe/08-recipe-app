import prisma from "@/lib/prisma";

export default async function Page() {
  const recipes = await prisma.recipe.findMany();

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
