import { randomUUID } from "crypto";

import { VerticalRecipeList } from "@/features/recipes";
import { RecipeStatus } from "@/types/enums";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const recipeList = Array.from({ length: 10 }).map(
    () =>
      ({
        id: randomUUID(),
        userId: id,
        imgSrc: "/images/recipe_02.png",
        name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
        description: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
        servings: 4,
        favoriteCount: 1234,
        status: RecipeStatus.public,
        createdAt: new Date(),
        updatedAt: new Date(),
      }) as const,
  );
  return (
    <div className="px-4">
      <VerticalRecipeList recipeList={recipeList} />
    </div>
  );
}
