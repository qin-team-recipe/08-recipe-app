"use client";

import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

export function Logout() {
  return (
    <button
      className="flex justify-between px-4 py-3"
      onClick={() => {
        signOut();
      }}
    >
      <span>ログアウト</span>
      <TbLogout className="h-6 w-6" />
    </button>
  );
}
