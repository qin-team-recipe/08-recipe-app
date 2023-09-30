"use client";

import { useEffect, useRef, useState } from "react";
//import { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { RecipeStatus } from "@/types/enums";

import { recipeFormFields } from "../../lib/form-field-name";
import { createRecipe, removeRecipe, updateRecipe } from "../../lib/recipe-actions";
import { RecipeDetail, RecipeFormSchema, RecipeFormType } from "../../types";
import { RecipeFormIngredient } from "./recipe-form/recipe-form-ingredient";
import { RecipeFormMultiField } from "./recipe-form/recipe-form-multi-field";
import { RecipeFormProcedure } from "./recipe-form/recipe-form-procedure";
import { RecipeImageInputField } from "./recipe-form/recipe-image-input-field";

export function RecipeForm({ recipe }: { recipe?: RecipeDetail }) {
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname", pathname);
  const methods = useForm<RecipeFormType>({
    resolver: zodResolver(RecipeFormSchema),
    mode: "onBlur",
  });
  const [previewRecipeImage, setRecipePreviewImage] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<RecipeFormType> = async (data) => {
    console.log("onSubmit called");
    console.log("data", data);
    const formImage = new FormData();
    if (data.recipeImage) {
      formImage.append("recipeImage", data.recipeImage);
    }
    if (recipe?.id) {
      const response = await updateRecipe(recipe.id, data, formImage);
      console.log("response", response);
      if (response?.error) {
        toast.error(response.error);
      }
      if (response?.success) {
        console.log("result.success", response.success);
        if (data.status === RecipeStatus.public) {
          toast.success("保存して公開しました");
          //下記リダイレクトは本番用
          router.push(`/recipe/${recipe.id}`);
        }
        if (data.status === RecipeStatus.private) {
          toast.success("下書きで保存しました");
          router.push(`/recipe/draft`);
        }
      }
    }
    if (!recipe?.id) {
      const response = await createRecipe(data, formImage);
      console.log("response", response);
      if (response?.error) {
        toast.error(response.error);
      }
      if (response?.success) {
        if (data.status === RecipeStatus.public) {
          toast.success("保存して公開しました");
          router.push(`/recipe/${response.recipeIdInserted}`);
        }
        if (data.status === RecipeStatus.private) {
          toast.success("下書きで保存しました");
          router.push(`/recipe/draft`);
        }
      }
    }
  };

  const saveAsPublic = () => {
    console.log("called saveAsPublic");
    //isPublicをopenに変更
    methods.setValue("status", RecipeStatus.public);
    formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const saveAsDraft = () => {
    console.log("called SaveDraft");
    //TODO:レシピ下書き一覧へ遷移
    methods.setValue("status", RecipeStatus.draft);
    formRef.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  const remove = async () => {
    console.log("called remove");
    if (recipe?.id) {
      const response = await removeRecipe(recipe.id);
      if (response?.error) {
        toast.success(response.error);
      }
      router.push("/recipe/draft");
    } else {
      //後で修正マイページに戻るように
      router.push("/recipe/draft");
      // router.push("/mypage");
    }
  };

  const clickHandleCloseButton = (event) => {
    if (pathname === "/recipe/create") {
      const values = methods.getValues();
      if (
        values.name.length === 0 &&
        values.recipeIngredients.length === 1 &&
        values.recipeIngredients[0].value.length === 0 &&
        values.recipeCookingProcedures.length === 1 &&
        values.recipeCookingProcedures[0].value.length === 0
      ) {
        event.preventDefault();
        router.push("/recipe/draft");
      }
    }
  };

  useEffect(() => {
    if (recipe) {
      const recipeInitData = {
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        status: recipe.status,
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
    } else {
      methods.reset({ servings: 2 });
    }
  }, []);

  return (
    <div>
      <div className="flex h-12 justify-between border-b border-mauve-7 px-4 py-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button onClick={clickHandleCloseButton}>
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
        <Link href="/recipe/draft">
          <div>
            <span className="text-base text-mauve-11">下書き一覧</span>
          </div>
        </Link>
      </div>
      <FormProvider {...methods}>
        <form className="mt-5" ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          <input
            type="hidden"
            className="w-full appearance-none rounded-none border-y px-4 py-3"
            {...methods.register("status")}
          />
          <InputField name="name" label={recipeFormFields["name"]} placeholder="例：肉じゃが" />
          {console.log("methods.formState.errors", methods.formState.errors)}

          {pathname !== "/recipe/create" && (
            <div className="mt-8 flex items-center gap-x-4">
              <label className="mb-1 px-4 font-bold">公開ステータス</label>
              {recipe && recipe.status === RecipeStatus.public ? (
                <div className="flex items-center justify-center rounded-sm bg-tomato-9 px-3 py-1">
                  <span className="text-sm text-whitea-13">公開中</span>
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-sm border-[0.5px] border-mauve-12 bg-whitea-13 px-3 py-1">
                  <span className="text-sm text-mauve-12">下書き</span>
                </div>
              )}
            </div>
          )}

          <RecipeFormIngredient
            fieldName="recipeIngredients"
            counterFieldName="servings"
            label={recipeFormFields["recipeIngredients"]}
            labelAddInputButton={recipeFormFields["recipeIngredients"]}
            placeholder="例：じゃがいも 5個"
            maxRows={5}
          />

          <RecipeFormProcedure
            fieldName="recipeCookingProcedures"
            label={recipeFormFields["recipeCookingProcedures"]}
            labelAddInputButton={recipeFormFields["recipeCookingProcedures"]}
            placeholder="例：じゃがいもを皮を剥いてレンジで600W3分加熱します"
          />

          <RecipeImageInputField
            name="recipeImage"
            label={recipeFormFields["recipeImage"]}
            previewImageSrc={previewRecipeImage}
          />
          <div className="mt-8">
            <TextareaField
              fieldName="description"
              label={recipeFormFields["description"]}
              placeholder="レシピの紹介文を入力"
              minRows={3}
            />
          </div>
          <RecipeFormMultiField
            fieldName="recipeLinks"
            label={recipeFormFields["recipeLinks"]}
            labelAddInputButton="リンク"
            placeholder="https://www.kurashiru.com/articles/7ade9f5b-96b9-43d0-8733-7a4fbb624980"
            maxRows={5}
          />

          <div className="mt-8 flex justify-center space-x-4 px-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" size={pathname === "/recipe/create" ? "lg" : "md"}>
                  保存する
                </Button>
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
            {pathname !== "/recipe/create" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant={"tomatoOutline"} size="md" className="bg-whitea-13">
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
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
