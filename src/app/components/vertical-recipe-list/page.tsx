import { randomUUID } from "crypto";

import { RecipeListItemType, VerticalRecipeList } from "@/features/recipes/";
import { RecipeStatus } from "@/types/enums";

export default function Page() {
  const recipeList: RecipeListItemType[] = Array.from({ length: 10 }).map(() => {
    return {
      id: randomUUID(),
      userId: randomUUID(),
      imgSrc: "/recipe_01.png",
      name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
      description: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
      favoriteCount: 1234,
      servings: 4,
      status: RecipeStatus.public,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  return (
    <div className="px-4">
      <VerticalRecipeList recipeList={recipeList} />
    </div>
  );
}
