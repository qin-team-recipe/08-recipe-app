"use client";

import { useRouter } from "next/navigation";

import { Updateable } from "kysely";
import { TbAlertCircle } from "react-icons/tb";

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
import { User } from "@/types/db";

type UserId = Exclude<Updateable<User>["id"], undefined>;

export default function DeleteUserButton({ userId }: { userId: UserId }) {
  const router = useRouter();

  const deleteUser = (userId: UserId) => {
    console.log("deleteUser called", "userId", userId);
    //TODO:1.退会処理
    //TODO:2.退会完了画面へ遷移
    router.push("/"); //仮でトップへ遷移
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex justify-between px-4 py-3">
          <span>退会する</span>
          <TbAlertCircle className="h-6 w-6" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に退会してよろしいですか?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col">
          <AlertDialogAction onClick={() => deleteUser(userId)}>退会する</AlertDialogAction>
          <AlertDialogCancel>戻る</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
