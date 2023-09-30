import Image from "next/image";
import Link from "next/link";

import { TbHeart } from "react-icons/tb";

import { RecipeListItemType } from "./../../types";

// 仮の画像サイズ
const imageSize = 192;

export const RecipeListItem = ({ recipeListItem }: { recipeListItem: RecipeListItemType }) => {
  return (
    <Link href={`/recipe/${recipeListItem.id}`} className="relative flex flex-col items-start justify-center">
      <Image
        className="mb-2 aspect-square w-full rounded-2xl bg-tomato-3"
        width={imageSize}
        height={imageSize}
        src={`/images${recipeListItem.imgSrc}`}
        alt={recipeListItem.name}
        priority
      />
      {recipeListItem.isPublic ? (
        <div className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-2xl bg-mauvea-10 p-1.5">
          <TbHeart className="text-whitea-13" size={14} />
          <p className="text-sm text-whitea-13">{recipeListItem.favoriteCount.toLocaleString()}</p>
        </div>
      ) : (
        <div className="absolute right-2 top-2 flex items-center justify-center gap-2 rounded-2xl bg-mauvea-10 p-2">
          <p className="text-xs text-whitea-13">非公開</p>
        </div>
      )}
      <p className="mb-1 line-clamp-2 self-stretch text-xs font-bold text-mauve-12">{recipeListItem.name}</p>
      <p className="line-clamp-1 self-stretch text-xxs font-bold text-mauve-11">{recipeListItem.description}</p>
    </Link>
  );
};
