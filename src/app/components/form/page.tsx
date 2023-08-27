"use client";

import Link from "next/link";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/button/button";
import { ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";

type FormValues = {
  inputField: string;
  imageField: string;
  textAreaField: string;
  multiInputsField: {
    value: string;
  }[];
};

export default function Page() {
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <main className="grid gap-4 pt-4">
      <Link href={"/components"} className={"hover:text-blue-11 hover:underline pl-4"}>
        戻る
      </Link>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-4">
          <InputField name="inputField" label="インプットフィールド" placeholder="テキストを入力" />

          <ImageInputField name="imageField" label="イメージインプットフィールド" />

          <TextareaField fieldName="textAreaField" placeholder="テキストエリアフィールド" label="テキストを入力" minRows={3} />

          <MultiInputsField label="マルチインプットフィールド" fieldName="multiInputsField" placeholder="テキストを入力" maxRows={5} />

          <Button>submit</Button>
        </form>
      </FormProvider>
    </main>
  );
}
