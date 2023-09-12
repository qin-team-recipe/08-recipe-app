"use client";

import { ComponentProps, ElementRef, forwardRef, InputHTMLAttributes } from "react";

import { TbSearch, TbX } from "react-icons/tb";

import { Button, Input } from "@/features/list";

export const SearchInput = forwardRef<
  ElementRef<"input">,
  InputHTMLAttributes<ElementRef<"input">> & {
    isPending?: boolean;
    isEmpty?: boolean;
    onClick: ComponentProps<typeof Button>["onClick"];
  }
>(({ isPending, isEmpty, onClick, ...props }, ref) => {
  return (
    <div className="relative">
      <TbSearch className="text-mauve-dim pointer-events-none absolute left-3 top-2 h-5 w-5" />
      <Input variant="search" placeholder="レシピやシェフを検索" autoComplete="off" ref={ref} {...props} />
      {isPending ? (
        <div className="absolute right-3.5 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-mauve-11 border-t-transparent dark:border-mauvedark-11" />
      ) : (
        !isEmpty && (
          <Button className="absolute right-3 top-2 p-0" variant="ghost" size="icon" onClick={onClick}>
            <TbX className="text-mauve-dim h-5 w-5" />
          </Button>
        )
      )}
    </div>
  );
});

SearchInput.displayName = "SearchInput";
