import Image from "next/image";
import Link from "next/link";

import { TbToolsKitchen2 } from "react-icons/tb";

import { ChefListItemWithRecipeCountType } from "./../../types/";

// 仮の画像サイズ
const imageSizeWidth = 88;
const imageSizeHeight = 116;

export const VerticalChefListItem = ({ chef }: { chef: ChefListItemWithRecipeCountType }) => {
  return (
    <Link
      href={`/chef/${chef.id}`}
      className="relative flex flex-col items-start justify-center gap-2 hover:opacity-60"
    >
      <div className="flex h-[116px] gap-x-4">
        <Image
          className="rounded-2xl bg-tomato-3 object-cover"
          width={imageSizeWidth}
          height={imageSizeHeight}
          src={`/images${chef.image}`}
          alt={chef.name ?? "シェフ"}
        />
        <div>
          <p className="line-clamp-1 h-[22px] self-stretch text-lg font-bold text-mauve-12">{chef.name}</p>
          <p className="mt-[5px] line-clamp-3 h-[59px] self-stretch text-sm font-bold text-mauve-11">
            {chef.profileText}
          </p>
          <div className="mt-[5px] flex h-[25px] items-center gap-x-[6px] self-stretch text-sm font-bold text-mauve-12">
            <TbToolsKitchen2 className="text-mauve-12" size={16} />
            <div>{chef.recipeCount}&nbsp;レシピ</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
