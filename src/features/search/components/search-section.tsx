"use client";

import { ElementRef, PropsWithChildren, useRef, useTransition } from "react";
import { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { TbArrowLeft } from "react-icons/tb";

import { SearchInput } from "./search-input";

export const SearchSection = ({
  q,
  route,
  href,
  children,
}: PropsWithChildren<{ q: string; route: Route; href?: Route }>) => {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const ref = useRef<ElementRef<"input">>(null);
  const { current } = ref;

  if (!isPending && current) {
    current.value = q;
  }

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
            isEmpty={!q}
            onClick={() => {
              replace(route);
            }}
            ref={ref}
          />
        </div>
      </div>
      {children}
    </section>
  );
};
