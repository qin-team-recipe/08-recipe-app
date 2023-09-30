import { randomUUID } from "crypto";

import { HorizonalSmallChefList } from "@/components/horizontal-small-chef-list/horizontal-small-chef-list";

export default function page() {
  function generateDummyChefsData(count: number) {
    const dummyChefs = [];
    for (let i = 1; i <= count; i++) {
      dummyChefs.push({
        id: randomUUID(),
        name: `Chef ${i}`,
        image: `/images/chef_04.jpeg`,
        url: `/chef/${i}`,
      } as const);
    }
    return dummyChefs;
  }

  const chefs = generateDummyChefsData(10);

  return <HorizonalSmallChefList chefs={chefs} />;
}
