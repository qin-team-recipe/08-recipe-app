"use client";

import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

export function Logout() {
  const router = useRouter();

  return (
    <button
      className="flex justify-between px-4 py-3"
      onClick={() => {
        signOut();
        // TODO: 上手く動かないので解消する
        router.push("/");
      }}
    >
      <span>ログアウト</span>
      <TbLogout className="h-6 w-6" />
    </button>
  );
}
