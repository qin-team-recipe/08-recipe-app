"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";

import { TbSearch, TbX } from "react-icons/tb";

import { Button, Input } from "@/features/list";

export function SearchInput() {
  const [isPending, startTransition] = useTransition();
  const [timer, setTimer] = useState(setTimeout(() => undefined));
  const ref = useRef<ElementRef<"input">>(null);
  const { current } = ref;
  const searchParams = useSearchParams();
  const q = (searchParams && searchParams.get("q")) ?? "";
  const { push } = useRouter();
  const path = "/search/recipe" as const satisfies Route;

  return (
    <div className="relative">
      <TbSearch className="text-mauve-dim pointer-events-none absolute left-3 top-2 h-5 w-5" />
      <Input
        variant="search"
        placeholder="レシピやシェフを検索"
        autoComplete="off"
        ref={ref}
        onChange={(event) => {
          startTransition(() => {
            clearTimeout(timer);
            setTimer(
              setTimeout(() => {
                const q = event.target.value.trim();
                if (q === "") {
                  push(path);
                  return;
                }
                const params = new URLSearchParams({ q });
                push(`${path}?${params}`);
              }, 1000),
            );
          });
        }}
      />
      {isPending || (current && current.value !== q) ? (
        <div className="border-mauve-normal absolute right-3.5 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
      ) : (
        current &&
        current.value && (
          <Button
            className="absolute right-3 top-2 p-0"
            variant="ghost"
            size="icon"
            onClick={() => {
              current.value = "";
              push("/search/recipe");
            }}
          >
            <TbX className="text-mauve-dim h-5 w-5" />
          </Button>
        )
      )}
    </div>
  );
}
