import { randomUUID } from "crypto";

import { VerticalChefList } from "@/features/users";

export default function page() {
  function generateChefData(count: number) {
    const dummyChefList = [];
    for (let i = 1; i <= count; i++) {
      dummyChefList.push({
        id: randomUUID(),
        name: "山田シェフ",
        profileText: `初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！`,
        image: "/chefs/268215431924014868267858525012700090910279903691.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        recipeCount: 21,
      } as const);
    }
    return dummyChefList;
  }

  const chefList = generateChefData(10);

  return <VerticalChefList chefList={chefList} />;
}
