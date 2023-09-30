import { getRecipeById, RecipeForm } from "@/features/recipes";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const recipe = await getRecipeById(id);
  return (
    <main className="bg-mauve-3 ">
      <RecipeForm recipe={recipe} />
    </main>
  );
}
