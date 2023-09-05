import { useState } from "react";

import { RecipeForm, RecipeFormHeader } from "@/features/recipes";
import { db } from "@/lib/kysely";


export default async function Page() {
  return (
    <div className="bg-mauve-3 ">
      <RecipeForm />
    </div>
  );
}
