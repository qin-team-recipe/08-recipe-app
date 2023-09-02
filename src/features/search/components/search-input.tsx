"use client";

import { useRef, useState, useTransition } from "react";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";

import { TbSearch, TbX } from "react-icons/tb";

import { Button, Input } from "@/features/list";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [timer, setTimer] = useState(setTimeout(() => undefined));
  const { current } = ref;

  const searchParams = useSearchParams();
  const q = (searchParams && searchParams.get("q")) ?? "";
  const { push } = useRouter();

  return (
    <div className="relative">
      <TbSearch className="pointer-events-none absolute left-3 top-2 h-5 w-5" />
      <Input
        variant="search"
        placeholder="レシピやシェフを検索"
        autoComplete="off"
        ref={ref}
        onChange={(event) => {
          startTransition(() => {
            if (!searchParams) return;
            clearTimeout(timer);
            setTimer(
              setTimeout(() => {
                const {
                  target: { value },
                } = event;
                const param = value.trim();
                console.log("param", param);
                if (param === "") {
                  push("/search/recipe");
                  return;
                }
                const params = new URLSearchParams(searchParams.toString());
                params.set("q", param);
                push(("/search/recipe" + "?" + params.toString()) as Route);
              }, 1000),
            );
          });
        }}
      />
      {isPending || (current && current.value !== q) ? (
        <div>Loading...</div>
      ) : (
        current &&
        current.value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              current.value = "";
              push("/search/recipe");
            }}
          >
            <TbX className="absolute right-3 top-2 h-5 w-5" />
          </Button>
        )
      )}
    </div>
  );
}
