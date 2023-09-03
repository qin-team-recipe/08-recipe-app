"use client";

import { ElementRef, useEffect, useRef } from "react";
import { Route } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { TbArrowLeft } from "react-icons/tb";

import { Tabs } from "@/components/tabs/tabs";

import { SearchInput } from "../components/search-input";

export function SearchSection() {
  const ref = useRef<ElementRef<"input">>(null);
  const { current } = ref;
  const pathname = usePathname();
  const isRoot = pathname && pathname === ("/" satisfies Route);

  const searchParams = useSearchParams();
  const q = (searchParams && searchParams.get("q")) ?? "";
  const tabList = (
    [
      {
        name: "レシピ",
        path: `/search/recipe`,
      },
      {
        name: "シェフ",
        path: `/search/chef`,
      },
    ] as const satisfies ReadonlyArray<{ name: string; path: Route }>
  ).map(({ name, path }) => {
    const href = q ? (`${path}?q=${q}` satisfies Route) : path;
    return { name, href };
  });

  useEffect(() => {
    if (!current) return;
    if (isRoot) {
      current.value = "";
    }
  });

  return (
    <div>
      <div className="flex items-center gap-x-3 px-4 py-2">
        {!isRoot && (
          <Link href="/">
            <TbArrowLeft className="text-mauve-dim h-5 w-5" />
          </Link>
        )}
        <div className="grow">
          <SearchInput ref={ref} />
        </div>
      </div>
      {!isRoot && <Tabs tabList={tabList} />}
    </div>
  );
}
