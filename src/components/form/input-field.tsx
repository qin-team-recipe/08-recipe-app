"use client";

import { useFormContext } from "react-hook-form";

import { ErrorFormMessage } from "@/components/form/form-error-message";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const InputField = (props: Props) => {
  const { name, label, placeholder } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-1">
      <label className="px-4 font-bold">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full appearance-none rounded-none px-4 py-3",
          !errors[name] && "border-y",
          errors[name] && "box-border border-2 border-tomato-9",
        )}
        {...register(name)}
      />
      <ErrorFormMessage>{errors[name] && errors[name].message}</ErrorFormMessage>
    </div>
  );
};
