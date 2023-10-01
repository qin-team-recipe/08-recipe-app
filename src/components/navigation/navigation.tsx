"use client";

import { ReactNode } from "react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

export const Navigation = () => {
  const pathname = usePathname() ?? "";

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-mauve-1 sm:sticky sm:w-auto sm:self-start">
      <div className="hidden sm:block  sm:px-3 sm:py-2">ロゴ</div>
      <div className="flex cursor-pointer gap-1 border-t sm:flex-col sm:border-none">
        <NavigationItem
          label="さがす"
          icon={<AiOutlineSearch />}
          href={"/"}
          isHilighted={["/", "/search/chef", "/search/recipe"].indexOf(pathname) !== -1}
        />
        <NavigationItem
          label="お気に入り"
          icon={<AiOutlineHeart />}
          href={"/fav"}
          isHilighted={["/fav", "/favorite-chef-new-recipe"].indexOf(pathname) !== -1}
        />
        <NavigationItem
          label="お買い物"
          icon={<AiOutlineShoppingCart />}
          href={"/list"}
          isHilighted={["/list"].indexOf(pathname) !== -1}
        />
      </div>
    </nav>
  );
};

type NavigationItemProps<T extends string> = {
  label: string;
  icon: ReactNode;
  href: Route<T>;
  isHilighted: boolean;
};
const NavigationItem = <T extends string>({ label, icon, href, isHilighted }: NavigationItemProps<T>) => {
  const highlitedStyle = isHilighted ? "text-tomato-9" : "";
  return (
    <Link
      href={href}
      className="flex w-full flex-col items-center gap-2 py-1 transition-colors duration-200 hover:bg-mauve-4 sm:w-fit sm:flex-row sm:rounded-full sm:px-3 sm:py-2"
    >
      <div className={`text-2xl ${highlitedStyle}`}>{icon}</div>
      <p className={`text-xs  sm:text-base ${highlitedStyle}`}>{label}</p>
    </Link>
  );
};
