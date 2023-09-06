"use client";

import { ElementRef, forwardRef, useRef, useTransition } from "react";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TbSearch, TbX } from "react-icons/tb";
import { mergeRefs } from "react-merge-refs";

import { Button, Input } from "@/features/list";

export const SearchInput = forwardRef<ElementRef<"input">>(({}, ref) => {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();
  const route =
    (["/search/recipe", "/search/chef"] as const satisfies ReadonlyArray<Route>).find((route) => route === pathname) ??
    ("/search/recipe" satisfies Route);

  const inputRef = useRef<ElementRef<"input">>(null);
  const { current } = inputRef;
  const searchParams = useSearchParams();
  const q = (searchParams && searchParams.get("q")) ?? "";

  return (
    <div className="relative">
      <TbSearch className="text-mauve-dim pointer-events-none absolute left-3 top-2 h-5 w-5" />
      <Input
        variant="search"
        placeholder="レシピやシェフを検索"
        autoComplete="off"
        defaultValue={q}
        onChange={(event) => {
          startTransition(async () => {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            const q = event.target.value.trim();
            if (q === "") {
              replace(route);
              return;
            }
            const params = new URLSearchParams({ q });
            replace(`${route}?${params}`);
          });
        }}
        ref={mergeRefs([inputRef, ref])}
      />
      {isPending ? (
        <div className="absolute right-3.5 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-mauve-11 border-t-transparent dark:border-mauvedark-11" />
      ) : (
        q &&
        current &&
        current.value && (
          <Button
            className="absolute right-3 top-2 p-0"
            variant="ghost"
            size="icon"
            onClick={() => {
              if (!current) return;
              current.value = "";
              replace(route);
            }}
          >
            <TbX className="text-mauve-dim h-5 w-5" />
          </Button>
        )
      )}
    </div>
  );
});

SearchInput.displayName = "SearchInput";
