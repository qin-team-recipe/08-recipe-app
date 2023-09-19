import { randomUUID, UUID } from "crypto";

import { RecipeListItem } from "@/features/recipes/";

export default function Page() {
  const public_recipe_list = {
    id: randomUUID() as UUID,
    userId: randomUUID() as UUID,
    imgSrc: "/recipe_01.png",
    name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
    description: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
    favoriteCount: 1234,
    servings: 2,
    isPublic: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  const private_recipe_list = {
    id: randomUUID() as UUID,
    userId: randomUUID() as UUID,
    imgSrc: "/recipe_01.png",
    name: "料理名考え中です。",
    description: "田中です",
    favoriteCount: 1234,
    servings: 3,
    isPublic: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  const vertical_recipe_list = {
    id: randomUUID() as UUID,
    userId: randomUUID() as UUID,
    imgSrc: "/recipe_02.png",
    name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し",
    description: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
    favoriteCount: 1234,
    servings: 2,
    isPublic: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  return (
    <div>
      <div className="w-40">
        <RecipeListItem recipeListItem={public_recipe_list} />
      </div>
      <div className="w-40">
        <RecipeListItem recipeListItem={private_recipe_list} />
      </div>
      <div className="w-48">
        <RecipeListItem recipeListItem={vertical_recipe_list} />
      </div>
    </div>
  );
}
