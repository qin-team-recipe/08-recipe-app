"use client";

import { useEffect } from "react";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

//import { z } from "zod";

import { Button } from "@/components/button/button";
import { ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";
import { RecipeFormIngredient } from "@/features/recipes/components/recipe-form-ingredient";
import { RecipeFormProcedure } from "@/features/recipes/components/recipe-form-procedure";
import { RecipeIngredient } from "@/types/db";

type Recipe = {
  id: String;
  name: String;
  description: String;
  recipeIngredients: RecipeIngredient[];
};

type RecipeForm = {
  description: String;
  name: String;
  recipeIngredients: RecipeIngredient[];
};

// const RecipeSchema = z.object({
//   name: z.string(),
//   ingredients: z.array(z.string()),
// }) satisfies z.ZodType<RecipeForm>;

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const methods = useForm<RecipeForm>();
  const onSubmit: SubmitHandler<RecipeForm> = (data) => console.log(data);

  useEffect(() => {
    if (recipe) {
      const recipeInitData = {
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.recipeIngredients.map((ingredient) => ingredient.name),
      };
      console.log("recipeInitData", recipeInitData);
      methods.reset(recipeInitData);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form className="mt-5 space-y-8" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name="name" label="レシピ名" placeholder="例：肉じゃが" />
        <RecipeFormIngredient fieldName="ingredients" label="材料/2人前" placeholder="例：じゃがいも 5個" maxRows={5} />

        <RecipeFormProcedure
          fieldName="procedures"
          label="作り方"
          placeholder="例：じゃがいもを皮を剥いてレンジで600W3分加熱します"
        />

        <ImageInputField name="profileImage" label="プロフィール画像（任意）" />

        <TextareaField
          fieldName="description"
          label="レシピの紹介文（任意）"
          placeholder="自己紹介を入力"
          minRows={3}
        />

        <MultiInputsField label="リンク（任意）" fieldName="links" placeholder="リンクを入力" maxRows={5} />

        <div className="flex justify-center space-x-4 px-4">
          <Button>保存する</Button>
          <Button type="button" variant={"tomatoOutline"} className="bg-whitea-13">
            削除する
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
