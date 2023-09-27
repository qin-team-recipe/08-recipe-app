import { ChefListItemWithRecipeCountType } from "../../../types/chefs";
import { VerticalChefListItem } from "./vertical-chef-list-item";

export const VerticalChefList = ({ chefList }: { chefList: ChefListItemWithRecipeCountType[] }) => {
  return (
    <div className="grid grid-cols-1 gap-y-5">
      {chefList.map((chef) => {
        return (
          <div className="w-full" key={chef.id}>
            <VerticalChefListItem chef={chef} />
          </div>
        );
      })}
    </div>
  );
};
