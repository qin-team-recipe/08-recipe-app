"use client";

import { useRouter } from "next/navigation";

import { SubmitHandler } from "react-hook-form";

import { Button } from "@/components/button/button";
import { Form, ImageInputField, InputField, MultiInputsField, TextareaField } from "@/components/form";

import { updateProfile } from "../../lib/users/actions";
import { UserProfileFormValues, userProfileSchema } from "../../types/users";

type Props = {
  userId: string;
  defaultName: string;
  defaultImage?: string;
  defaultProfileText?: string;
  defaultUrls?: string[];
};

export function ProfileForm(props: Props) {
  const { defaultName, defaultImage, defaultProfileText, defaultUrls, userId } = props;
  const router = useRouter();

  const onSubmit: SubmitHandler<UserProfileFormValues> = async (data) => {
    const formImage = new FormData();
    if (data.profileImg) {
      formImage.append("image", data.profileImg);
    }
    await updateProfile({ name: data.name, profileText: data.profileText, urls: data.urls }, formImage);
    router.push(`/chef/${userId}`);
  };

  return (
    <Form<UserProfileFormValues, typeof userProfileSchema>
      className="mt-5 space-y-8"
      onSubmit={onSubmit}
      schema={userProfileSchema}
      defaultValue={{
        name: defaultName,
        profileText: defaultProfileText,
        urls: (defaultUrls ?? []).map((url) => ({ value: url === undefined ? undefined : url })),
      }}
    >
      <InputField fieldName="name" label="ニックネーム" placeholder="ニックネームを入力" />

      <ImageInputField fieldName="profileImg" label="プロフィール画像（任意）" defaultImageUrl={defaultImage} />

      <TextareaField fieldName="profileText" placeholder="自己紹介を入力" label="自己紹介（任意）" minRows={3} />

      <MultiInputsField fieldName="urls" label="リンク（任意）" placeholder="リンクを入力" maxRows={5} />

      <div className="flex justify-center space-x-4 px-4">
        <Button type="submit" className="h-9 w-44">
          保存する
        </Button>
        <Button
          type="button"
          className="h-9 w-44"
          variant={"tomatoOutline"}
          onClick={() => router.push(`/chef/${userId}`)}
        >
          キャンセル
        </Button>
      </div>
    </Form>
  );
}
