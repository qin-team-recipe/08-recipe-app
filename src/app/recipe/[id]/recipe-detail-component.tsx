import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/avatar/avatar";
import { Button } from "@/components/button/button";
import { LinksMenu } from "@/features/link";
import {
  getFavoriteCountByRecipeId,
  RecipeDetail,
  RecipeEditDropDownMenu,
  RecipeFavoriteButton,
} from "@/features/recipes";

export async function RecipeDetailComponent({
  recipe,
  isFavoriteByMe,
  sessionUserId,
  isMyRecipe,
}: {
  recipe: RecipeDetail;
  isFavoriteByMe: boolean;
  sessionUserId?: string;
  isMyRecipe: boolean;
}) {
  const recipeImageSrc = recipe.recipeImages[0].imgSrc;
  const recipeFavoriteCount = await getFavoriteCountByRecipeId(recipe.id);

  return (
    <>
      <div
        className={
          "relative aspect-square max-h-[390px] max-w-[390px] bg-cover bg-no-repeat shadow-['0px_-60px_16px_-40px_#FFF_inset'] md:max-h-[480px] md:max-w-[480px]"
        }
      >
        <Image className="object-contain" src={`/images${recipeImageSrc}`} alt={recipe.name} fill />
      </div>
      <div className={"px-4 pb-5 pt-4"}>
        <div className={"flex items-start justify-between"}>
          <h1 className={"max-w-[250px] text-xl font-bold"}>{recipe.name}</h1>
          <LinksMenu links={recipe.recipeLinks} />
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
            <Link className={"group flex items-center gap-x-1 text-sm"} href={`/chef/${recipe.user?.id}`}>
              <div className={"relative h-5 w-5 rounded-full bg-tomato-5"}>
                <Avatar className="h-5 w-5">
                  <AvatarImage src={`/images${recipe.user?.image}`} />
                </Avatar>
              </div>
              <div className={"text-mauve-dim sm:group-hover:underline"}>
                {recipe.user?.name ?? "名前登録中のシェフ"}
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
