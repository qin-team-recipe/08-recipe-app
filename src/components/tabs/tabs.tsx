"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab<T extends string> = {
  name: string;
  href: Route<T>;
};

type TabsProps<T extends string> = {
  tabList: Tab<T>[];
  scroll?: boolean;
};
export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const pathname = usePathname();
  return (
    <div className="w-full text-center text-sm font-medium">
      <div className="flex flex-wrap">
        {props.tabList.map((link) => {
          const isActive = pathname == link.href;
          return (
            <Link
              className={
                isActive
                  ? "inline-block flex-1 rounded-t-lg border-b-2 border-mauve-12 p-2 font-bold text-mauve-12"
                  : "inline-block flex-1 rounded-t-lg border-b-2 border-mauve-6 p-2 text-mauve-12"
              }
              href={link.href}
              key={link.name}
              scroll={props.scroll}
              replace
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
