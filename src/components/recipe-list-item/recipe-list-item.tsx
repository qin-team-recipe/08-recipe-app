import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { TbHeart } from "react-icons/tb";

type RecipeListItem<T extends string> = {
  id: number;
  href: Route<T>;
  image: string;
  name: string;
  chefName: string;
  favoriteCount: number;
  isPublic: Boolean;
};

// 仮の画像サイズ
const imageSize = 192;

export const RecipeListItem = <T extends string>({ recipeListItem }: { recipeListItem: RecipeListItem<T> }) => {
  return (
    <Link
      href={recipeListItem.href}
      key={recipeListItem.id}
      className="relative flex flex-col items-start justify-center gap-2"
    >
      <Image
        className="aspect-square w-full rounded-2xl bg-tomato-3"
        width={imageSize}
        height={imageSize}
        src={recipeListItem.image}
        alt={recipeListItem.name}
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
      <p className="line-clamp-2 self-stretch text-xs font-bold text-mauve-12">{recipeListItem.name}</p>
      <p className="line-clamp-1 self-stretch text-xxs font-bold text-mauve-11">{recipeListItem.chefName}</p>
    </Link>
  );
};
