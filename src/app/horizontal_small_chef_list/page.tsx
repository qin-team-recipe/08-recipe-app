import { HorizonalSmallChefList } from "@/components/horizontal_small_chef_list/horizontal_small_chef_list";

export default function page() {
  function generateDummyChefsData(count: number) {
    const dummyChefs = [];
    for (let i = 1; i <= count; i++) {
      dummyChefs.push({
        name: `Chef ${i}`,
        imgPath: `/images/chef_04.jpeg`,
        url: `/chef/${i}`,
      } as const);
    }
    return dummyChefs;
  }

  const chefs = generateDummyChefsData(10);

  return <HorizonalSmallChefList chefs={chefs} />;
}