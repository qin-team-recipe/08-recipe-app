"use client";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/button/button";
import { ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";

type FormValues = {
  nickname: string;
  profileImage?: string;
  introduction?: string;
  links?: {
    value: string;
  }[];
};

export default function Page() {
  const methods = useForm<FormValues>();
  // TODO: 保存するを押したときの処理を記載
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
