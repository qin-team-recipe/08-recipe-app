import { ScrollArea } from "@/components/horizontal-scroll/horizontal-scroll";

import { RecipeListItemType } from "./../../types/";
import { RecipeListItem } from "./recipe-list-item";

type RecipeProps = {
  recipeList: RecipeListItemType[];
};

const HorizontalRecipeList = ({ recipeList }: RecipeProps) => (
  <ScrollArea>
    <ul className="flex space-x-4">
      {recipeList.map((recipeListItem, index) => (
        <li key={index} className="w-40 cursor-pointer transition-opacity ease-in-out hover:opacity-60">
          <RecipeListItem recipeListItem={recipeListItem} />
        </li>
      ))}
    </ul>
  </ScrollArea>
);

export { HorizontalRecipeList };
