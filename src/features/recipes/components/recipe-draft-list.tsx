"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

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
import { cn } from "@/lib/utils";
import { Recipe } from "@/types/db";

import { removeRecipe } from "../lib/action";

type RecipeDraftList = {
  recipe: Recipe;
  index: number;
};

export function RecipeDraftList({ recipe, index }: RecipeDraftList) {
  console.log("RecipeDraftList component called");
  const router = useRouter();

  const remove = async (e: any, id: string) => {
    console.log("remove called");
    console.log("id", id);
    await removeRecipe(id);
    toast.success("削除しました");
  };

  return (
    <div
      className={cn(
        "flex h-12 justify-between border-b bg-whitea-13 px-4 py-2 hover:bg-tomato-3",
        index === 0 && "border-t",
      )}
    >
      <Link href={`/recipe/edit/${recipe.id}`} key={recipe.id} className="flex-1">
        <div className="flex flex-col">
          <span className="text-sm leading-[17px] text-mauve-12">
            {recipe.name && recipe.name.length > 0 ? recipe.name : "レシピ名未入力"}
          </span>
          <span className="mt-1 text-[10px] leading-3 text-mauve-10">{recipe.updatedAt.toLocaleString()}</span>
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
              <AlertDialogTitle>このレシピを削除しますか?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col">
              <AlertDialogAction onClick={(e) => remove(e, recipe.id)}>削除する</AlertDialogAction>
              <AlertDialogCancel>戻る</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
