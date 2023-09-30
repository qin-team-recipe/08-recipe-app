import { randomUUID } from "crypto";

import { Chef } from "@/components/chef/chef";

export default function page() {
  return (
    <main className="grid gap-4 p-4">
      <Chef id={randomUUID()} imageSrc={"/images/chef_04.jpeg"} name={"田中シェフ"} />
      <Chef id={randomUUID()} imageSrc={"/images/chef_04.jpeg"} name={"田中シェフ2行目ですよ"} />
      <Chef id={randomUUID()} imageSrc={"/images/chef_04.jpeg"} name={"田中シェフ3行目ああああああああああああああ"} />
    </main>
  );
}
