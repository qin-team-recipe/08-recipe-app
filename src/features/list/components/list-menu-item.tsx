"use client";

import { DropdownMenuItem } from "./dropdown-menu";

export function ListMenuItem({
  icon,
  text,
  action,
}: {
  icon: JSX.Element;
  text: string;
  action?: () => Promise<void>;
}) {
  return (
    <DropdownMenuItem
      className="gap-x-1"
      onClick={async () => {
        if (!action) return;
        await action();
      }}
    >
      {icon}
      {text}
    </DropdownMenuItem>
  );
}
