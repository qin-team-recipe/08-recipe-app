"use client";

import { useEffect, useState } from "react";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

//import { z } from "zod";

import { Button } from "@/components/button/button";
import { InputField, TextareaField } from "@/components/form";
import { RecipeFormMultiField } from "@/features/recipes/components/recipe-form-multi-field";
import { RecipeFormProcedure } from "@/features/recipes/components/recipe-form-procedure";
import { RecipeImageInputField } from "@/features/recipes/components/recipe-image-input-field";
import { updateRecipe } from "@/features/recipes/lib/action";
import { RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink } from "@/types/db";

type Recipe = {
  id: string;
  name: string;
  description: string;
  recipeIngredients: RecipeIngredient[];
  recipeCookingProcedures: RecipeCookingProcedure[];
  recipeLinks: RecipeLink[];
  recipeImages: RecipeImage[];
};

type RecipeForm = {
  description: string;
  name: string;
  recipeIngredients: { value: string }[];
  recipeLinks: { value: string }[];
  recipeImage: File;
};

// const RecipeSchema = z.object({
//   name: z.string(),
//   ingredients: z.array(z.string()),
// }) satisfies z.ZodType<RecipeForm>;

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const methods = useForm<RecipeForm>();
  const [previewRecipeImage, setRecipePreviewImage] = useState<string | undefined>(undefined);
  const onSubmit: SubmitHandler<RecipeForm> = async (data) => {
    console.log("data", data);
    if (recipe?.id) {
      const formImage = new FormData();
      formImage.append("recipeImage", data.recipeImage);
      await updateRecipe(recipe.id, data, formImage);
    }
  };

  useEffect(() => {
    if (recipe) {
      const recipeInitData = {
        name: recipe.name,
        description: recipe.description,
        recipeIngredients: recipe.recipeIngredients.map((ingredient) => ({
          value: ingredient.name,
        })),
        recipeCookingProcedures: recipe.recipeCookingProcedures.map((procedure) => ({
          value: procedure.name,
        })),
        recipeLinks: recipe.recipeLinks.map((link) => ({
          value: link.url,
        })),
      };
      console.log("recipeInitData", recipeInitData);
      console.log("recipe.recipeImages", recipe.recipeImages);
      console.log("recipe.recipeImages[0].imgSrc", recipe.recipeImages[0].imgSrc);
      methods.reset(recipeInitData);
      setRecipePreviewImage(recipe.recipeImages[0].imgSrc);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form className="mt-5 space-y-8" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name="name" label="レシピ名" placeholder="例：肉じゃが" />
        <RecipeFormMultiField
          fieldName="recipeIngredients"
          label="材料/2人前"
          labelAddInputButton="材料"
          placeholder="例：じゃがいも 5個"
          maxRows={5}
        />

        <RecipeFormProcedure
          fieldName="recipeCookingProcedures"
          label="作り方"
          labelAddInputButton="作り方"
          placeholder="例：じゃがいもを皮を剥いてレンジで600W3分加熱します"
        />

        <RecipeImageInputField name="recipeImage" label="画像（任意）" previewImageSrc={previewRecipeImage} />

        <TextareaField
          fieldName="description"
          label="レシピの紹介文（任意）"
          placeholder="レシピの紹介文を入力"
          minRows={3}
        />

        <RecipeFormMultiField
          fieldName="recipeLinks"
          label="リンク（任意）"
          labelAddInputButton="リンク"
          placeholder="https://www.kurashiru.com/articles/7ade9f5b-96b9-43d0-8733-7a4fbb624980"
          maxRows={5}
        />

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
