import { use } from "react";

import { api } from "@/server/trpc/server";

export default function Home() {
  const { greeting } = use(api.sayHello.query({ name: "client" }));

  return (
    <main className="text-red-500">
      <div>
        <p>{greeting}</p>
      </div>
    </main>
  );
}
