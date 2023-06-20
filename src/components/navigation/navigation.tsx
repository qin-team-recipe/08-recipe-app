import { ComponentProps, ReactNode } from "react";
import Link from "next/link";

import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 z-50 w-full sm:sticky sm:w-auto sm:self-start">
      <div className="hidden sm:block  sm:px-3 sm:py-2">ロゴ</div>
      <div className="flex cursor-pointer gap-1 border-t sm:flex-col sm:border-none">
        <NavigationItem label="さがす" icon={<AiOutlineSearch />} href="/" />
        <NavigationItem label="お気に入り" icon={<AiOutlineHeart />} href="/" />
        <NavigationItem label="お買い物" icon={<AiOutlineShoppingCart />} href="/" />
      </div>
    </nav>
  );
};

type NavigationItemProps = {
  label: string;
  icon: ReactNode;
  href: ComponentProps<typeof Link>["href"];
};
const NavigationItem = ({ label, icon, href }: NavigationItemProps) => {
  return (
    <Link
      href={href}
      className="flex w-full flex-col items-center gap-2 py-1 transition-colors duration-200 hover:bg-mauve-4 sm:w-fit sm:flex-row sm:rounded-full sm:px-3 sm:py-2"
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-xs sm:text-base">{label}</p>
    </Link>
  );
};
