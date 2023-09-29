import { notFound } from "next/navigation";

import { GenrateHTML } from "@/components/tiptap/generate-html";
import { db } from "@/lib/kysely";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const recipeCookingProcedure = await db
    .selectFrom("RecipeCookingProcedure")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
  if (!recipeCookingProcedure || !recipeCookingProcedure.nameJson) {
    notFound();
  }
  return (
    <div className="w-64">
      <GenrateHTML contents={recipeCookingProcedure.nameJson} />
    </div>
  );
}
