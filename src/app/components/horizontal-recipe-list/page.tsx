import { randomUUID, UUID } from "crypto";

import { HorizontalRecipeList } from "@/features/recipes";

export default function page() {
  function generateDummyrecipeData(count: number) {
    const dummyRecipeList = [];
    for (let i = 1; i <= count; i++) {
      dummyRecipeList.push({
        id: randomUUID() as UUID,
        userId: randomUUID() as UUID,
        imgSrc: "/recipe_01.png",
        name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
        description: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
        favoriteCount: 1234,
        servings: 4,
        status: "public",
        createdAt: new Date(),
        updatedAt: new Date(),
      } as const);
    }
    return dummyRecipeList;
  }

  const recipeList = generateDummyrecipeData(10);

  return <HorizontalRecipeList recipeList={recipeList} />;
}
