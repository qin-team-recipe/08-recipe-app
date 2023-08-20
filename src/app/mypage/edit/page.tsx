"use client";

import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/button/button";
import { ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";

export default function Page() {
  const methods = useForm({
    defaultValues: {
      // TODO: すでに入力済みの項目はここに入れる
      links: [{ value: "" }],
    },
  });
  // TODO: 保存するを押したときの処理
  // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <h1 className="border-b border-mauve-6 px-4 py-3 text-center text-xl font-bold">編集</h1>
      <form className="mt-5 space-y-8" onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name="nickname" label="ニックネーム" placeholder="ニックネームを入力" />

        <ImageInputField name="profileImage" label="プロフィール画像（任意）" />

        <TextareaField fieldName="introduction" placeholder="自己紹介を入力" label="自己紹介（任意）" minRows={3} />

        <MultiInputsField label="リンク（任意）" fieldName="links" placeholder="リンクを入力" maxRows={5} />

        <div className="flex justify-center space-x-4 px-4">
          <Button>保存する</Button>
          <Button type="button" variant={"tomatoOutline"}>
            キャンセル
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
