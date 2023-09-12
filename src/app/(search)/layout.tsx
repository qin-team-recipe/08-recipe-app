"use client";

import { PropsWithChildren } from "react";
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

  const isRoot = route === "/";

  return (
    <main>
      {isRoot ? (
        <SearchSection q={q} replaceRoute="/search/recipe" />
      ) : (
        <SearchSection q={q} replaceRoute={route} href="/">
          <Tabs tabList={tabList} />
        </SearchSection>
      )}
      <section className="px-4 py-5">{children}</section>
    </main>
  );
}
