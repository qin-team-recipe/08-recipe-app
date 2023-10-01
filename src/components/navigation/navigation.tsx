"use client";

import { ReactNode } from "react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

export const Navigation = () => {
  const pathname = usePathname() ?? "";

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-mauve-1 sm:sticky sm:flex sm:w-auto sm:flex-col sm:gap-y-8 sm:self-start sm:pr-5 sm:pt-5">
      <div className="hidden sm:block">
        <Image src="/images/logo.png" width={200} height={37} alt="一流レシピ" />
      </div>
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
          label="お買い物リスト"
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
  const highlitedStyle = isHilighted ? "text-tomato-9" : "text-mauve-11 sm:text-mauve-12";
  return (
    <Link
      href={href}
      className="flex w-full flex-col items-center gap-2 py-1 transition-colors duration-200 sm:w-fit sm:flex-row sm:rounded-full sm:px-3 sm:py-2 sm:hover:bg-mauve-4"
    >
      <div className={`text-2xl ${highlitedStyle}`}>{icon}</div>
      <p className={`text-xs  md:text-2xl ${highlitedStyle}`}>{label}</p>
    </Link>
  );
};
