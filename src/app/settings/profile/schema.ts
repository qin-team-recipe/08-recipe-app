import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "この項目は必須です" }).max(150, { message: "150文字以内で入力してください" }),
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

export type FormValues = z.infer<typeof schema>;
