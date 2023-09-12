"use client";

import { ElementRef, ReactNode, useRef, useTransition } from "react";
import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { TbArrowLeft } from "react-icons/tb";

import { SearchInput } from "./search-input";

export const SearchSection = ({
  q,
  replaceRoute,
  href,
  children,
}: {
  q: string;
  replaceRoute: Route;
  href?: Route;
  children?: ReactNode;
}) => {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();
  const pathname = usePathname();
  const route =
    (["/", "/search/recipe", "/search/chef"] as const satisfies ReadonlyArray<Route>).find(
      (route) => route === pathname,
    ) ?? ("/search/recipe" satisfies Route);

  const inputRef = useRef<ElementRef<"input">>(null);
  const { current } = inputRef;

  if (!isPending && current && route === "/") {
    current.value = "";
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
                  replace(replaceRoute);
                  return;
                }
                const params = new URLSearchParams({ q });
                replace(`${replaceRoute}?${params}`);
              });
            }}
            isPending={isPending}
            isEmpty={!q || !current || !current.value}
            onClick={() => {
              if (!current) return;
              current.value = "";
              replace(replaceRoute);
            }}
            ref={inputRef}
          />
        </div>
      </div>
      {children}
    </section>
  );
};

SearchSection.displayName = "SearchSection";
