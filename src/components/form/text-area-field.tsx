"use client";

import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  fieldName: string;
  label: string;
  maxRows?: number;
  minRows?: number;
  placeholder?: string;
};

export const TextareaField = (props: Props) => {
  const { fieldName, label, maxRows, minRows, placeholder } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col space-y-1">
      <label className="px-4 font-bold">{label}</label>
      <TextareaAutosize
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        className="border-mauve-normal w-full resize-none appearance-none rounded-none border-y px-4 py-3"
        {...register(fieldName)}
      />
      {errors[fieldName] && (
        <div role="alert" className="px-4 pt-1 text-sm font-semibold text-tomato-9">
          {errors[fieldName]?.message?.toString()}
        </div>
      )}
    </div>
  );
};
