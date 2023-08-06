import { VerticalRecipeList } from "@/components/vertical-recipe-list/vertical-recipe-list";

export default function Page({ params }: { params: { id: string } }) {
  const recipeList = Array.from({ length: 10 }).map(
    (_, i) =>
      ({
        id: i,
        href: `/recipe`,
        image: "/images/recipe_02.png",
        name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
        chefName: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
        favoriteCount: 1234,
        isPublic: true,
      }) as const,
  );
  return (
    <div className="px-4">
      <VerticalRecipeList recipeList={recipeList} />
    </div>
  );
}
