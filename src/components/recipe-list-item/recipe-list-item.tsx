import { Route } from "next";
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

export const RecipeListItem = <T extends string>(props: { recipe_listitem: RecipeListItem<T> }) => {
  return (
    <Link
      href={props.recipe_listitem.href}
      key={props.recipe_listitem.id}
      className="relative flex flex-col items-start justify-center gap-2"
    >
      <img className="aspect-square w-full rounded-2xl bg-tomato-3" src={props.recipe_listitem.image} alt="" />
      <div className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-2xl bg-mauvea-10 p-1.5">
        {props.recipe_listitem.isPublic ? (
          <>
            <TbHeart className="text-whitea-13" size={14} />
            <p className="text-sm text-whitea-13">{props.recipe_listitem.favoriteCount.toLocaleString()}</p>
          </>
        ) : (
          <>
            <p className="text-xs text-whitea-13">非公開</p>
          </>
        )}
      </div>
      <p className="line-clamp-2 self-stretch text-xs font-bold text-mauve-12">{props.recipe_listitem.name}</p>
      <p className="line-clamp-1 self-stretch text-xxs font-bold text-mauve-11">{props.recipe_listitem.chefName}</p>
    </Link>
  );
};
