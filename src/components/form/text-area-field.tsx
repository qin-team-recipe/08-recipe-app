"use client";

import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { ErrorFormMessage } from "@/components/form/form-error-message";
import { cn } from "@/lib/utils";

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
    <div>
      <div className="flex flex-col space-y-1">
        <label className="px-4 font-bold">{label}</label>
        <TextareaAutosize
          minRows={minRows}
          maxRows={maxRows}
          placeholder={placeholder}
          className={cn(
            "w-full resize-none appearance-none rounded-none px-4 py-3",
            !errors[fieldName] && "border-y",
            errors[fieldName] && "box-border border-2 border-tomato-9",
          )}
          {...register(fieldName)}
        />
      </div>
      <ErrorFormMessage>{errors[fieldName] && errors[fieldName].message}</ErrorFormMessage>
    </div>
  );
};
