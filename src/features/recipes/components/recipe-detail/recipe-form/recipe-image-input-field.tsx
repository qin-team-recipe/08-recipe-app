"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Controller, useFormContext } from "react-hook-form";
import { TbMinus, TbPlus } from "react-icons/tb";

import { ErrorFormMessage } from "@/components/form/form-error-message";

type Props = {
  name: string;
  label: string;
  previewImageSrc: string | undefined;
};

export const RecipeImageInputField = (props: Props) => {
  console.log("RecipeImageInputField called");
  console.log("props", props);
  const { name, label, previewImageSrc } = props;
  const [previewImage, setPreviewImage] = useState<string | undefined>(previewImageSrc);
  console.log("previewImage", previewImage);
  const {
    control,
    trigger,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handleImageChange called");
    const file = event.target.files?.[0];
    console.log("file in handleImageChange", file);
    if (file) {
      setValue(name, file);
      setPreviewImage(URL.createObjectURL(file));
      trigger(name);
    }
  };

  const handleRemoveImage = () => {
    setValue(name, undefined);
    setPreviewImage(undefined);
  };

  useEffect(() => {
    setPreviewImage(previewImageSrc);
  }, [previewImageSrc]);

  return (
    <div className="mt-8 flex flex-col space-y-2 px-4">
      <label className="font-bold">{label}</label>

      {previewImage && !errors[name] ? (
        <div className="relative w-[100px]">
          <Image
            src={previewImage}
            width={100}
            height={100}
            className="h-[100px] w-[100px] rounded-lg object-cover"
            alt="profile image"
          />
          <button
            className="absolute -right-2 -top-2 h-5 w-5 rounded-full  bg-tomato-9"
            onClick={handleRemoveImage}
            type="button"
          >
            <TbMinus className="mx-auto h-4 w-4 stroke-whitea-13" />
          </button>
        </div>
      ) : (
        <div>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, ...field } }) => (
              <button
                type="button"
                onClick={() => inputFileRef.current?.click()}
                className="h-[100px] w-[100px] rounded-lg border border-mauve-7 bg-whitea-13 px-4 py-7"
              >
                <input
                  {...field}
                  {...rest}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    field.onChange(event);
                    handleImageChange(event);
                  }}
                  ref={(event) => {
                    ref(event);
                    inputFileRef.current = event;
                  }}
                />
                <div>
                  <label className="text-xs text-mauve-11">画像を設定</label>
                  <TbPlus className="mx-auto stroke-mauve-11" />
                </div>
              </button>
            )}
          />
          <ErrorFormMessage>{errors[name] && errors[name].message}</ErrorFormMessage>
        </div>
      )}
    </div>
  );
};
