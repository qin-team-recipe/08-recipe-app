"use client";

import { ElementRef, PropsWithChildren, useEffect, useRef } from "react";
import { Route } from "next";
import { usePathname, useSearchParams } from "next/navigation";

import { Tabs } from "@/components/tabs/tabs";
import { SearchSection } from "@/features/search";

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const route =
    (["/", "/search/recipe", "/search/chef"] as const satisfies ReadonlyArray<Route>).find(
      (route) => route === pathname,
    ) ?? ("/search/recipe" satisfies Route);

  const searchParams = useSearchParams();
  const q = (searchParams && searchParams.get("q")) ?? "";
  const tabList = (
    [
      {
        name: "レシピ",
        route: "/search/recipe",
      },
      {
        name: "シェフ",
        route: "/search/chef",
      },
    ] as const satisfies ReadonlyArray<{ name: string; route: Route }>
  ).map(({ name, route }) => {
    const href = q ? (`${route}?${new URLSearchParams({ q })}` satisfies Route) : route;
    return { name, href };
  });

  const ref = useRef<ElementRef<"input">>(null);
  const { current } = ref;
  const isRoot = route === "/";

  if (current && isRoot) {
    current.value = "";
  }

  return (
    <main>
      {isRoot ? (
        <SearchSection q={q} route="/search/recipe" ref={ref} />
      ) : (
        <SearchSection q={q} route={route} href="/" ref={ref}>
          <Tabs tabList={tabList} />
        </SearchSection>
      )}
      <section className="px-4 py-5">{children}</section>
    </main>
  );
}
