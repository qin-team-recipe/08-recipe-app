"use client";

import { TbShoppingCartX } from "react-icons/tb";

import { DropdownMenuItem } from "./dropdown-menu";

export function ListMenuItemDelete({ action }: { action: () => Promise<void> }) {
  return (
    <DropdownMenuItem
      className="text-tomato-dim gap-1  focus:text-tomato-dim"
      onClick={async () => {
        await action();
      }}
    >
      <TbShoppingCartX className="text-tomato-dim" size={18} />
      リストから削除する
    </DropdownMenuItem>
  );
}
