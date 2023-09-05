import { ReactNode } from "react";

import { Control, useWatch } from "react-hook-form";

import { RecipeForm } from "../types/type";

type CounterProps = {
  name: keyof RecipeForm;
  control: Control<RecipeForm>;
  children: (count: number) => ReactNode;
};
export function RecipeFormIngredientCounter({ name, control, children }: CounterProps) {
  console.log("RecipeFormIngredientCounter called");
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
}
