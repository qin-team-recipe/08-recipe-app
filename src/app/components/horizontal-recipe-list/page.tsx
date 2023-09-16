import { HorizonalRecipeList } from "@/components/horizontal-recipe-list/horizontal-recipe-list";

export default function page() {
  function generateDummyrecipeData(count: number) {
    const dummyRecipeList = [];
    for (let i = 1; i <= count; i++) {
      dummyRecipeList.push({
        id: i,
        href: `/recipe/${i}`,
        image: "/images/recipe_01.png",
        name: "自家燻製したノルウェーサーモンと帆立貝柱のムースのキャベツ包み蒸し 生雲丹とパセリのヴルーテ",
        chefName: "中々田中ジェフシェフの超々最長ミシシッピレシピ収集",
        favoriteCount: 1234,
        isPublic: true,
      } as const);
    }
    return dummyRecipeList;
  }

  const recipeList = generateDummyrecipeData(10);

  return <HorizonalRecipeList recipeList={recipeList} />;
}
