"use client";

import { ElementRef, useEffect, useRef } from "react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { TbArrowLeft } from "react-icons/tb";

import { SearchInput } from "../components/search-input";

export function SearchSection() {
  const pathname = usePathname();
  const ref = useRef<ElementRef<"input">>(null);
  const { current } = ref;
  const isRoot = pathname && pathname === ("/" satisfies Route);

  useEffect(() => {
    if (!current) return;
    if (isRoot) {
      current.value = "";
    }
  });

  return (
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
  );
}
