import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { HiArrowLeft } from "react-icons/hi2";

import { Avatar, AvatarImage } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { LinksMenu } from "@/features/link";
import {
  getFavoriteCountByRecipeId,
  RecipeDetail,
  RecipeEditDropDownMenu,
  RecipeFavoriteButton,
} from "@/features/recipes";

export default async function RecipeDetailComponent<T extends string>({
  recipe,
  isFavoriteByMe,
  sessionUserId,
  previousUrl = "/",
  isMyRecipe,
}: {
  recipe: RecipeDetail;
  isFavoriteByMe: boolean;
  sessionUserId?: string;
  previousUrl?: Route<T>;
  isMyRecipe: boolean;
}) {
  const recipeImageSrc = recipe?.RecipeImage[0].imgSrc;
  const recipeFavoriteCount = await getFavoriteCountByRecipeId(recipe.id);

  return (
    <>
      <div
        className={
          "relative aspect-square max-h-[390px] max-w-[390px] bg-cover bg-no-repeat shadow-['0px_-60px_16px_-40px_#FFF_inset'] md:max-h-[480px] md:max-w-[480px]"
        }
      >
        <Image className="object-contain" src={`/images${recipeImageSrc}`} alt={recipe.name} fill />
        <Link href={previousUrl}>
          <button
            type={"button"}
            className={"text-mauve-normal absolute left-5 top-5 rounded-full bg-blacka-7 p-1 hover:bg-blacka-8"}
          >
            <HiArrowLeft className={"text-[32px] text-mauve-1"} />
          </button>
        </Link>
      </div>
      <div className={"px-4 pb-5 pt-4"}>
        <div className={"flex items-start justify-between"}>
          <h1 className={"max-w-[250px] text-xl font-bold"}>{recipe.name}</h1>
          <LinksMenu recipeLinks={recipe.RecipeLink} />
        </div>
        <p className="mt-3 text-sm">{recipe.description}</p>
        <div className={"mt-2 flex items-center gap-x-4"}>
          {isMyRecipe && recipe.isPublic === 1 && (
            <Button variant="tomatoOutline" size="sm">
              公開中
            </Button>
          )}
          {isMyRecipe && recipe.isPublic === 0 && (
            <Button variant="blackOutline" size="sm">
              非公開
            </Button>
          )}
          {!isMyRecipe && (
            <Link className={"group flex items-center gap-x-1 text-sm"} href={`/chef/${recipe.User?.[0].id}`}>
              <div className={"relative h-5 w-5 rounded-full bg-tomato-5"}>
                <Avatar className="h-5 w-5">
                  <AvatarImage src={`/images${recipe.User?.[0].image}`} />
                </Avatar>
              </div>
              <div className={"text-mauve-dim sm:group-hover:underline"}>
                {recipe.User?.[0].name ?? "名前登録中のシェフ"}
              </div>
            </Link>
          )}
          <div className={"text-mauve-dim text-sm"}>
            <span className={"mr-0.5 font-bold"}>{recipeFavoriteCount}</span>
            <span>お気に入り</span>
          </div>
        </div>
        {!isMyRecipe && (
          <RecipeFavoriteButton initialIsFavorite={isFavoriteByMe} recipeId={recipe.id} userId={sessionUserId} />
        )}
        {isMyRecipe && sessionUserId && (
          <RecipeEditDropDownMenu isPublic={recipe.isPublic} recipeId={recipe.id} userId={sessionUserId} />
        )}
      </div>
    </>
  );
}
