import { RecipeListItem as RecipeListItemType } from "../../types";
import { RecipeListItem } from "./recipe-list-item";

export const VerticalRecipeList = ({ recipeList }: { recipeList: RecipeListItemType[] }) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
      {recipeList.map((recipeListItem) => {
        return (
          <div className="w-full" key={recipeListItem.id}>
            <RecipeListItem recipeListItem={recipeListItem} />
          </div>
        );
      })}
    </div>
  );
};
