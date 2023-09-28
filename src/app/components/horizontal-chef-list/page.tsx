import { HorizontalChefList } from "@/components/horizontal-chef-list/horizontal-chef-list";

export default function page() {
  return (
    <main className="grid gap-4 p-4">
      <HorizontalChefList
        chefs={[
          {
            id: "1",
            name: "田中シェフ",
            image: "/images/chef_04.jpeg",
          },
          {
            id: "2",
            name: "田中シェフ2行目ですよ",
            image: "/images/chef_04.jpeg",
          },
          {
            id: "3",
            name: "田中シェフ3行目あああああああああああああ",
            image: "/images/chef_04.jpeg",
          },
          {
            id: "4",
            name: "田中シェフ4",
            image: "/images/chef_04.jpeg",
          },
          {
            id: "5",
            name: "田中シェフ5",
            image: "/images/chef_04.jpeg",
          },
        ]}
      />
    </main>
  );
}
