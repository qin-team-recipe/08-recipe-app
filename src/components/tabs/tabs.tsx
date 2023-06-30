"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabsProps = {
  tabList: {
    name: string;
    href: { pathname: string };
  }[];
};

export const Tabs = (props: TabsProps) => {
  const pathname = usePathname();
  return (
    <div className="text-center text-sm font-medium">
      <div className="flex flex-wrap">
        {props.tabList.map((link) => {
          const isActive = pathname?.startsWith(link.href.pathname);
          return (
            <Link
              className={
                isActive
                  ? "text-mauve-normal inline-block flex-1 rounded-t-lg border-b-2 border-mauve-12 p-2 font-bold"
                  : "text-mauve-normal inline-block flex-1 rounded-t-lg border-b-2 border-mauve-6 p-2"
              }
              href={link.href}
              key={link.name}
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
