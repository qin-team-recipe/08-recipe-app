"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

import { Controller, useFormContext } from "react-hook-form";
import { TbMinus, TbPlus } from "react-icons/tb";

type Props = {
  fieldName: string;
  label: string;
};

export const ImageInputField = (props: Props) => {
  const { fieldName, label } = props;
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const { control, setValue } = useFormContext();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(fieldName, file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setValue(fieldName, undefined);
    setPreviewImage(undefined);
  };

  return (
    <div className="flex flex-col space-y-2 px-4">
      <label className="font-bold">{label}</label>

      {previewImage ? (
        <div className="relative w-[100px]">
          <Image
            src={previewImage}
            width={100}
            height={100}
            className="h-[100px] w-[100px] rounded-lg object-cover"
            alt="profile image"
          />
          <button
            className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-tomato-9"
            onClick={handleRemoveImage}
            type="button"
          >
            <TbMinus className="mx-auto h-4 w-4 stroke-whitea-13" />
          </button>
        </div>
      ) : (
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <button
              type="button"
              onClick={() => inputFileRef.current?.click()}
              className="border-mauve-normal h-[100px] w-[100px] rounded-lg border px-4 py-7"
            >
              <input
                {...field}
                ref={inputFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  field.onChange(event);
                  handleImageChange(event);
                }}
              />
              <div>
                <label className="text-xs text-mauve-11">画像を設定</label>
                <TbPlus className="mx-auto stroke-mauve-11" />
              </div>
            </button>
          )}
        />
      )}
    </div>
  );
};
