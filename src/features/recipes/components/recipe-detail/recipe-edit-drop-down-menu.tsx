"use client";

import { startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { TbEdit, TbEye, TbEyeOff, TbSettingsFilled, TbTrash } from "react-icons/tb";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu/dropdown-menu";
import { updateRecipe } from "@/features/recipes";

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
        const response = await updateRecipe(recipeId, { deletedAt: new Date() });
        if (response.success) {
          toast.success(`レシピ「${response.data.recipe.name}」を削除しました`);
          router.push(`/chef/${userId}`);
        } else {
          toast.error("削除できませんでした。もう一度やりなおしてください");
        }
      })();
    });
  };

  const handleClickPublic = (recipeId: string) => {
    startTransition(() => {
      (async () => {
        const response = await updateRecipe(recipeId, { isPublic: 1 });
        if (response.success) {
          router.push(`/chef/${userId}`);
          toast.success(`レシピ「${response.data.recipe.name}」を公開しました`);
        } else {
          toast.error("公開できませんでした。もう一度やりなおしてください");
        }
      })();
    });
  };

  const handleClickPrivate = (recipeId: string) => {
    startTransition(() => {
      (async () => {
        const response = await updateRecipe(recipeId, { isPublic: 0 });
        if (response.success) {
          router.push(`/chef/${userId}`);
          toast.success(`レシピ「${response.data.recipe.name}」を非公開にしました`);
        } else {
          toast.error("非公開にできませんでした。もう一度やりなおしてください");
        }
      })();
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            "-mr-0.5 mt-4 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-mauve-12 px-3 py-1 text-sm leading-none text-whitea-13 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:disabled:-mb-4 disabled:opacity-50"
          }
        >
          <TbSettingsFilled color="white" />
          レシピを編集/公開設定/削除する
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"p-0"}>
          <DropdownMenuGroup className="flex flex-col gap-3 px-3 py-[10px]">
            {isPublic === 0 && (
              <DropdownMenuItem
                className="text-mauve-dim cursor-pointer gap-x-2 p-0"
                onClick={() => handleClickPublic(recipeId)}
              >
                <TbEye size={18} className="text-mauve-dim" />
                レシピを公開する
              </DropdownMenuItem>
            )}
            {isPublic === 1 && (
              <DropdownMenuItem
                className="text-mauve-dim cursor-pointer gap-x-2 p-0"
                onClick={() => handleClickPrivate(recipeId)}
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-mauve-dim cursor-pointer gap-x-2 p-0"
                  onSelect={(e) => e.preventDefault()}
                >
                  <TbTrash size={18} className="text-mauve-dim" />
                  レシピを削除する
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除してよろしいですか?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col">
                  <AlertDialogAction onClick={() => handleClickDelete(recipeId)}>削除する</AlertDialogAction>
                  <AlertDialogCancel>戻る</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
