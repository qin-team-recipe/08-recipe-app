import { RecipeListItem } from "@/components/recipe-list-item/recipe-list-item";

export default function Page() {
  const public_recipe_list = {
    id: 1,
    href: `/recipe`,
    image: "/images/recipe_01.png",
    name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
    chefName: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
    favoriteCount: 1234,
    isPublic: true,
  } as const;

  const private_recipe_list = {
    id: 2,
    href: `/recipe`,
    image: "/images/recipe_01.png",
    name: "料理名考え中です。",
    chefName: "田中です",
    favoriteCount: 1234,
    isPublic: false,
  } as const;

  const vertical_recipe_list = {
    id: 3,
    href: `/recipe`,
    image: "/images/recipe_02.png",
    name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し",
    chefName: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
    favoriteCount: 1234,
    isPublic: true,
  } as const;

  return (
    <div>
      <div className="w-40">
        <RecipeListItem recipe_listitem={public_recipe_list} />
      </div>
      <div className="w-40">
        <RecipeListItem recipe_listitem={private_recipe_list} />
      </div>
      <div className="w-48">
        <RecipeListItem recipe_listitem={vertical_recipe_list} />
      </div>
    </div>
  );
}
