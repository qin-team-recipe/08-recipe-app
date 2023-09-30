"use client";

import { Updateable } from "kysely";
import { signOut } from "next-auth/react";
import { TbAlertCircle } from "react-icons/tb";
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
import { deleteUser } from "@/features/users";
import { User } from "@/types/db";

type UserId = Exclude<Updateable<User>["id"], undefined>;

export default function DeleteUserButton({ userId }: { userId: UserId }) {
  const handleDelete = async (userId: UserId) => {
    const res = await deleteUser(userId);
    if (res.success) {
      toast.success("退会しました");
      signOut({ callbackUrl: "/" });
    } else {
      toast.error("失敗しました。もう一度やりなおしてください");
    }
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
          <AlertDialogAction onClick={() => handleDelete(userId)}>退会する</AlertDialogAction>
          <AlertDialogCancel>戻る</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
