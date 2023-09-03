"use client";

import Link from "next/link";

import {type SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/button/button";
import { Form, ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";

export default function Page() {
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const schema = z.object({
    inputField: z.string().min(1, { message: "この項目は必須です" }),
    imageField: z.custom<File>().optional(),
    textAreaField: z.string().max(200, { message: "200文字以内で入力してください" }).optional(),
    multiInputsField: z.array(z.object({ value: z.string()})),
  });

  type FormValues = z.infer<typeof schema>;

  return (
    <main className="grid gap-4 pt-4">
      <Link href={"/components"} className={"pl-4 hover:text-blue-11 hover:underline"}>
        戻る
      </Link>

      <Form<FormValues, typeof schema> className="mt-5 space-y-8" onSubmit={onSubmit} schema={schema}>
        <InputField fieldName="inputField" label="インプットフィールド" placeholder="テキストを入力" />

        <ImageInputField fieldName="imageField" label="イメージインプットフィールド" />

        <TextareaField
          fieldName="textAreaField"
          placeholder="テキストエリアフィールド"
          label="テキストを入力"
          minRows={3}
        />

        <MultiInputsField
          fieldName="multiInputsField"
          label="マルチインプットフィールド"
          placeholder="テキストを入力"
          maxRows={5}
        />

        <Button>submit</Button>
      </Form>
    </main>
  );
}
