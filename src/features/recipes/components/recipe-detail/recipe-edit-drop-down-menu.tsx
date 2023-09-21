"use client";

import { startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { TbEdit, TbEye, TbEyeOff, TbSettingsFilled, TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";

import { deleteRecipe } from "@/actions/recipe/recipe";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu/dropdown-menu";

export function RecipeEditDropDownMenu({
  recipeId,
  isPublic,
  userId,
}: {
  recipeId: string;
  isPublic: number;
  userId: string;
}) {
  const router = useRouter();
  const handleClickDelete = (recipeId: string) => {
    startTransition(() => {
      (async () => {
        const response = await deleteRecipe(recipeId);
        console.log("response", response);
        if (response.success) {
          router.push(`/chef/${userId}`);
          toast.success(`レシピ「${response.data.recipe.name}」を削除しました`);
        } else {
          toast.error("削除できませんでした。もう一度やりなおしてください");
        }
      })();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          "disabled:opacity-50-mb-0.5 -mr-0.5 inline-flex w-full items-center justify-center rounded rounded-md border border-transparent bg-mauve-12 px-3 py-1 text-sm leading-none text-whitea-13 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none"
        }
      >
        <TbSettingsFilled color="white" />
        レシピを編集/公開設定/削除する
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"p-0"}>
        <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
          {!isPublic && (
            <DropdownMenuItem
              className="text-mauve-dim cursor-pointer gap-x-2 p-0"
              onClick={() => console.log("レシピを公開する")}
            >
              <TbEye size={18} className="text-mauve-dim" />
              レシピを公開する
            </DropdownMenuItem>
          )}
          {isPublic && (
            <DropdownMenuItem
              className="text-mauve-dim cursor-pointer gap-x-2 p-0"
              onClick={() => console.log("レシピを非公開にする")}
            >
              <TbEyeOff size={18} className="text-mauve-dim" />
              レシピを非公開にする
            </DropdownMenuItem>
          )}
          <Link href={`/recipe/edit/${recipeId}`}>
            <DropdownMenuItem
              className="text-mauve-dim cursor-pointer gap-x-2 p-0"
              onClick={() => console.log("レシピを編集する")}
            >
              <TbEdit size={18} className="text-mauve-dim" />
              レシピを編集する
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="m-0 p-0" />
        <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
          <DropdownMenuItem
            className="text-mauve-dim cursor-pointer gap-x-2 p-0"
            onClick={() => handleClickDelete(recipeId)}
          >
            <TbTrash size={18} className="text-mauve-dim" />
            レシピを削除する
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
