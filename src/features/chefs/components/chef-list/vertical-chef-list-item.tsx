import Image from "next/image";
import Link from "next/link";

import { TbToolsKitchen2 } from "react-icons/tb";

import { ChefListItemWithRecipeCountType } from "../../types";

// 仮の画像サイズ
const imageSizeWidth = 88;
const imageSizeHeight = 116;

export const VerticalChefListItem = ({
  chef: { id, name, image, profileText, recipeCount },
}: {
  chef: ChefListItemWithRecipeCountType;
}) => {
  return (
    <Link href={`/chef/${id}`} className="flex flex-col items-start justify-center gap-2 hover:opacity-60">
      <div className="flex gap-x-4">
        <Image
          className="rounded-2xl bg-tomato-3 object-cover"
          width={imageSizeWidth}
          height={imageSizeHeight}
          src={`/images${image}`}
          alt={name ?? "シェフ"}
        />
        <div className="flex flex-col gap-y-[5px]">
          <p className="line-clamp-1 self-stretch text-lg font-bold leading-[22px] text-mauve-12">{name}</p>
          <p className="line-clamp-3 h-[59px] self-stretch text-sm text-mauve-10">{profileText}</p>
          <div className="flex items-center gap-x-[6px] self-stretch pb-[5px] text-sm text-mauve-12">
            <TbToolsKitchen2 className="text-mauve-12" size={16} />
            <div className="flex gap-x-0.5">
              <span>{recipeCount}</span>
              <span>レシピ</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
