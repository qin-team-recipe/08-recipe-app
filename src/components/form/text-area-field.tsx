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
  const { register } = useFormContext();

  return (
    <div className="flex flex-col space-y-1">
      <label className="px-4 font-bold">{label}</label>
      <TextareaAutosize
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        className="w-full resize-none appearance-none rounded-none border-y px-4 py-3"
        {...register(fieldName)}
      />
    </div>
  );
};