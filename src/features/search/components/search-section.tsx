"use client";

import { ElementRef, forwardRef, PropsWithChildren, useRef, useTransition } from "react";
import { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { TbArrowLeft } from "react-icons/tb";
import { mergeRefs } from "react-merge-refs";

import { SearchInput } from "./search-input";

export const SearchSection = forwardRef<
  ElementRef<"input">,
  PropsWithChildren<{ q: string; route: Route; href?: Route }>
>(({ q, route, href, children }, ref) => {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const inputRef = useRef<ElementRef<"input">>(null);
  const { current } = inputRef;

  return (
    <section>
      <div className="flex items-center gap-x-3 px-4 py-2">
        {href && (
          <Link href={href}>
            <TbArrowLeft className="text-mauve-dim h-5 w-5" />
          </Link>
        )}
        <div className="grow">
          <SearchInput
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
            isPending={isPending}
            isEmpty={!q || !current || !current.value}
            onClick={() => {
              if (!current) return;
              current.value = "";
              replace(route);
            }}
            ref={mergeRefs([ref, inputRef])}
          />
        </div>
      </div>
      {children}
    </section>
  );
});

SearchSection.displayName = "SearchSection";
