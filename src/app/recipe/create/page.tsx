import { notFound } from "next/navigation";

import Editor from "@/components/editor/editor";
import { db } from "@/lib/kysely";

export default async function Page() {
  const recipeCookingProcedure = await db.selectFrom("RecipeCookingProcedure").select("id").executeTakeFirst();
  console.log("recipeCookingProcedure", recipeCookingProcedure);
  if (!recipeCookingProcedure) {
    notFound();
  }
  return <Editor recipeCookingProcedureId={recipeCookingProcedure.id} />;
}
