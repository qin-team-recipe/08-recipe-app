import { ReactNode } from "react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 z-50 w-full bg-mauve-1 sm:sticky sm:flex sm:w-auto sm:flex-col sm:gap-y-8 sm:self-start sm:pr-5 sm:pt-5">
      <div className="hidden sm:block">
        <Image src="/images/logo.png" width={200} height={37} alt="一流レシピ" />
      </div>
      <div className="flex cursor-pointer gap-1 border-t border-mauve-6 sm:flex-col sm:border-none">
        <NavigationItem label="さがす" icon={<AiOutlineSearch />} href={"/"} />
        <NavigationItem label="お気に入り" icon={<AiOutlineHeart />} href={"/fav"} />
        <NavigationItem label="お買い物" icon={<AiOutlineShoppingCart />} href={"/list"} />
      </div>
    </nav>
  );
};

type NavigationItemProps<T extends string> = {
  label: string;
  icon: ReactNode;
  href: Route<T>;
};
const NavigationItem = <T extends string>({ label, icon, href }: NavigationItemProps<T>) => {
  return (
    <Link
      href={href}
      className="flex w-full flex-col items-center gap-2 py-1 transition-colors duration-200 sm:w-fit sm:flex-row sm:rounded-full sm:px-3 sm:py-2 sm:hover:bg-mauve-4"
    >
      <div className="text-2xl text-mauve-11 sm:text-mauve-12">{icon}</div>
      <p className="text-xs text-mauve-11 sm:text-base sm:text-mauve-12">{label}</p>
    </Link>
  );
};
