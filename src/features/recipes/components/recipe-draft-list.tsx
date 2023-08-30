"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { TbTrash } from "react-icons/tb";

import { removeRecipe } from "@/features/recipes/lib/action";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/db";

type RecipeDraftList = {
  recipe: Recipe;
  index: number;
};

export function RecipeDraftList({ recipe, index }: RecipeDraftList) {
  const router = useRouter();

  const remove = async (e: any, id: string) => {
    e.preventDefault();
    console.log("remove called");
    console.log("id", id);
    await removeRecipe(id);
    router.refresh();
  };

  return (
    <Link href={`/recipe-edit/${recipe.id}`} key={recipe.id}>
      <div className={cn("flex h-12 justify-between border-b bg-whitea-13 px-4 py-2", index === 0 && "border-t")}>
        <div className="flex flex-col">
          <span className="text-sm leading-[17px] text-mauve-12">
            {recipe.name && recipe.name.length > 0 ? recipe.name : "レシピ名未入力"}
          </span>
          <span className="mt-1 text-[10px] leading-3 text-mauve-10">{recipe.updatedAt.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <button type="button" className="hover:opacity-60" onClick={(e) => remove(e, recipe.id)}>
            <TbTrash className="h-6 w-6 stroke-mauve-11 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </Link>
  );
}
