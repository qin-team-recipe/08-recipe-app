import { randomUUID } from "crypto";

import { RecipeListItemType, VerticalRecipeList } from "@/features/recipes";
import { RecipeStatus } from "@/types/enums";

export default function Page() {
  const recipeList = Array.from({ length: 10 }).map(
    () =>
      ({
        id: randomUUID(),
        userId: randomUUID(),
        imgSrc: "/images/recipe_02.png",
        name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
        description: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
        servings: 3,
        favoriteCount: 1234,
        status: RecipeStatus.public,
        createdAt: new Date(),
        updatedAt: new Date(),
      }) satisfies RecipeListItemType,
  );
  return (
    <div className="px-4">
      <VerticalRecipeList recipeList={recipeList} />
    </div>
  );
}
