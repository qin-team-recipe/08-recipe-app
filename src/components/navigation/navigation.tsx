import { ReactNode } from "react";

import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 z-50 w-full sm:sticky sm:w-auto sm:self-start">
      <div className="hidden sm:block  sm:px-3 sm:py-2">ロゴ</div>
      <ul className="flex cursor-pointer gap-1 border-t sm:flex-col sm:border-none">
        <NavigationItem label="さがす" icon={<AiOutlineSearch />} />
        <NavigationItem label="お気に入り" icon={<AiOutlineHeart />} />
        <NavigationItem label="お買い物" icon={<AiOutlineShoppingCart />} />
      </ul>
    </nav>
  );
};

type NavigationItemProps = {
  label: string;
  icon: ReactNode;
};
const NavigationItem = ({ label, icon }: NavigationItemProps) => {
  return (
    <li className="flex w-full flex-col items-center gap-2 py-1 transition-colors duration-200 hover:bg-gray-200 sm:w-fit sm:flex-row sm:rounded-full sm:px-3 sm:py-2">
      <div className="text-2xl">{icon}</div>
      <p className="text-xs sm:text-base">{label}</p>
    </li>
  );
};
