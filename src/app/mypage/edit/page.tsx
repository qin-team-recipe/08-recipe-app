"use client";

import { type SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/button/button";
import { Form, ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";

export default function Page() {
  // TODO: 保存するを押したときの処理を記載
  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  const schema = z.object({
    name: z.string().min(1, { message: "この項目は必須です" }),
    profileImg: z.custom<File>().optional(),
    profileText: z.string().max(200, { message: "200文字以内で入力してください" }).optional(),
    urls: z.array(z.object({ value: z.string().optional() })).refine((urls) => {
      if (urls.length === 1 && urls[0]?.value === "") {
        return true;
      }

      return urls.every(
        (url) =>
          z
            .string()
            .url()
            .safeParse(url?.value).success,
      );
    }, "有効なURLを入力してください"),
  });

  type FormValues = z.infer<typeof schema>;

  return (
    <div>
      <h1 className="border-b border-mauve-6 px-4 py-3 text-center text-xl font-bold">編集</h1>
      <Form<FormValues, typeof schema> className="mt-5 space-y-8" onSubmit={onSubmit} schema={schema}>
        <InputField fieldName="name" label="ニックネーム" placeholder="ニックネームを入力" />

        <ImageInputField fieldName="profileImg" label="プロフィール画像（任意）" />

        <TextareaField fieldName="profileText" placeholder="自己紹介を入力" label="自己紹介（任意）" minRows={3} />

        <MultiInputsField fieldName="urls" label="リンク（任意）" placeholder="リンクを入力" maxRows={5} />

        <div className="flex justify-center space-x-4 px-4">
          <Button type="submit">保存する</Button>
          <Button type="button" variant={"tomatoOutline"}>
            キャンセル
          </Button>
        </div>
      </Form>
    </div>
  );
}
