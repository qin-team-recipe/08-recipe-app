"use client";

import { useEffect, useRef, useState } from "react";
//import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { TbX } from "react-icons/tb";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog/alert-dialog";
import { Button } from "@/components/button/button";
import { InputField, TextareaField } from "@/components/form";
import { RecipeFormMultiField } from "@/features/recipes/components/recipe-form-multi-field";
import { RecipeFormProcedure } from "@/features/recipes/components/recipe-form-procedure";
import { RecipeImageInputField } from "@/features/recipes/components/recipe-image-input-field";
import { createRecipe, removeRecipe, updateRecipe } from "@/features/recipes/lib/action";
import { RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink } from "@/types/db";

type Recipe = {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
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
  isPublic: boolean;
  recipeImage: File;
};

// const RecipeFormSchema = z.object({
//   name: z.string(),
//   ingredients: z.array(z.string()),
//   recipeLink: z.array(z.string()),
// });
// } satisfies z.ZodType<RecipeForm>;

export function RecipeForm({ recipe }: { recipe?: Recipe }) {
  const router = useRouter();
  const methods = useForm<RecipeForm>();
  const [previewRecipeImage, setRecipePreviewImage] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<RecipeForm> = async (data) => {
    console.log("onSubmit called");
    console.log("data", data);
    const formImage = new FormData();
    if (data.recipeImage) {
      formImage.append("recipeImage", data.recipeImage);
    }
    if (recipe?.id) {
      const result = await updateRecipe(recipe.id, data, formImage);
      if (result?.error) {
        toast.error(result.error);
      }
      if (result?.success) {
        console.log("result.success", result.success);
        if (data.isPublic === true) {
          toast.success("保存して公開しました");
          //下記リダイレクトは本番用
          // router.push(`/recipe/${recipe?.id}`);
        }
        if (data.isPublic === false) {
          toast.success("保存して公開しました");
          router.push(`/recipe-draft`);
        }
      }
    }
    if (!recipe?.id) {
      const resultRecipeIdInserted = await createRecipe(data, formImage);
      if (data.isPublic === true) {
        toast.success("保存して公開しました");
        router.push(`/recipe-edit/${resultRecipeIdInserted}`);
        //下記リダイレクトは本番用
        // router.push(`/recipe/${resultRecipeIdInserted}`);
      }
      if (data.isPublic === false) {
        toast.success("下書きで保存しました");
        router.push(`/recipe-draft`);
      }
    }
  };

  const saveAsPublic = () => {
    console.log("called saveAsPublic");
    //isPublicをopenに変更
    methods.setValue("isPublic", true);
    formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const saveAsDraft = () => {
    console.log("called SaveDraft");
    //TODO:レシピ下書き一覧へ遷移
    methods.setValue("isPublic", false);
    formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const remove = () => {
    console.log("called remove");
    if (recipe?.id) {
      removeRecipe(recipe.id);
      router.push("/recipe-draft");
    } else {
      //後で修正マイページに戻るように
      router.push("/recipe-draft");
      // router.push("/mypage");
    }
  };

  useEffect(() => {
    if (recipe) {
      const recipeInitData = {
        name: recipe.name,
        description: recipe.description,
        isPublic: recipe.isPublic,
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
      methods.reset(recipeInitData);
      if (recipe.recipeImages.length > 0) {
        setRecipePreviewImage(recipe.recipeImages[0].imgSrc);
      }
    }
  }, []);

  return (
    <div>
      <div className="flex h-12 justify-between border-b border-mauve-6 px-4 py-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button>
              <TbX size="1.5rem" className="text-mauve-12" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>このレシピを削除しますか?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col">
              <AlertDialogAction onClick={(e) => remove()}>削除</AlertDialogAction>
              <AlertDialogCancel onClick={(e) => saveAsDraft()}>下書き保存</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Link href="/recipe-draft">
          <div>
            <span className="text-base text-mauve-11">下書き一覧</span>
          </div>
        </Link>
      </div>
      <FormProvider {...methods}>
        <form className="mt-5 space-y-8" ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          <input
            type="hidden"
            className="w-full appearance-none rounded-none border-y px-4 py-3"
            {...methods.register("isPublic")}
          />
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>保存する</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>このレシピを保存して公開しますか？</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col">
                  <AlertDialogAction onClick={(e) => saveAsPublic()}>保存して公開</AlertDialogAction>
                  <AlertDialogCancel onClick={(e) => saveAsDraft()}>下書き保存</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant={"tomatoOutline"} className="bg-whitea-13">
                  削除する
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>このレシピを削除しますか?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col">
                  <AlertDialogAction onClick={(e) => remove()}>削除する</AlertDialogAction>
                  <AlertDialogCancel>戻る</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
