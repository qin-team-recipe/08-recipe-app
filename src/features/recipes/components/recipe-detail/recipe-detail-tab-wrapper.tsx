"use client";

import { RecipeCookingProcedure } from "@prisma/client";
import { Selectable } from "kysely";

import { TabsWithoutLink } from "@/components/tabs/tabs-without-link";
import { RecipeDetail, RecipeStep } from "@/features/recipes";

export function RecipeDetailTabWrapper({ recipe }: { recipe: RecipeDetail }) {
  const getStepComponent = (contents: Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">[]) => (
    <RecipeStep data={contents} />
  );

  const tabList = [
    {
      name: "作り方",
      contents: recipe.RecipeCookingProcedure,
      getContentComponent: getStepComponent,
    },
    {
      name: "材料",
      contents: recipe.RecipeIngredient,
      getContentComponent: getStepComponent,
    },
  ];

  return <TabsWithoutLink tabList={tabList} initialSelectedTabName={tabList[0].name} />;
}
