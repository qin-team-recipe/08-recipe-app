import { useState } from "react";

import { RecipeForm } from "@/features/recipes";
import { db } from "@/lib/kysely";

export default async function Page() {
  return (
    <div className="bg-mauve-3 ">
      <div className="flex justify-between border-b border-mauve-6">
        <div>✗</div>
        <div>下書き一覧</div>
      </div>
      <RecipeForm />
    </div>
  );
}
