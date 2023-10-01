"use client";

import Link from "next/link";

import { Selectable } from "kysely";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog/alert-dialog";
import { removeRecipe } from "@/features/recipes";
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/db";

type RecipeDraftList = {
  recipe: Pick<Selectable<Recipe>, "id" | "name" | "description" | "updatedAt">;
  index: number;
};

export function RecipeDraftList({ recipe, index }: RecipeDraftList) {
  const remove = async (id: string) => {
    const response = await removeRecipe(id);
    if (response.success) {
      toast.success(`「${recipe.name}」を削除しました`);
    } else {
      toast.error(`「${recipe.name}」を削除できませんでした。もう一度やり直してください。`);
    }
  };

  return (
    <div
      className={cn(
        "border-mauve-normal flex h-12 justify-between border-b bg-whitea-13 px-4 py-2 hover:bg-tomato-3",
        index === 0 && "border-t",
      )}
    >
      <Link href={`/recipe/edit/${recipe.id}`} className="flex-1">
        <div className="flex flex-col gap-y-1">
          <span className="line-clamp-1 text-sm leading-[17px] text-mauve-12">
            {recipe.name && recipe.name.length > 0 ? recipe.name : "レシピ名未入力"}
          </span>
          <span className="text-[10px] leading-3 text-mauve-10">{recipe.updatedAt.toLocaleString()}</span>
        </div>
      </Link>
      <div className="flex items-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button type="button" className="h-6 w-6 hover:opacity-60">
              <TbTrash className="h-6 w-6 stroke-mauve-11 stroke-[1.5]" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>レシピ「{recipe.name}」を削除しますか?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col">
              <AlertDialogAction onClick={() => remove(recipe.id)}>削除する</AlertDialogAction>
              <AlertDialogCancel>戻る</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
