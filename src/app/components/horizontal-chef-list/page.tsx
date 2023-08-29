import { Chef } from "@/components/chef/chef";
import { HorizontalChefList } from "@/components/horizontal-chef-list/horizontal-chef-list";

export default function page() {
  return (
    <main className="grid gap-4 p-4">
      <HorizontalChefList
        chefs={[
          {
            name: "田中シェフ",
            imageSrc: "/images/chef_04.jpeg",
          },
          {
            name: "田中シェフ2行目ですよ",
            imageSrc: "/images/chef_04.jpeg",
          },
          {
            name: "田中シェフ3行目あああああああああああああ",
            imageSrc: "/images/chef_04.jpeg",
          },
          {
            name: "田中シェフ4",
            imageSrc: "/images/chef_04.jpeg",
          },
          {
            name: "田中シェフ5",
            imageSrc: "/images/chef_04.jpeg",
          },
        ]}
      />
    </main>
  );
}
