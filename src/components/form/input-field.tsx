"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  label?: string;
  placeholder?: string;
};

export const InputField = (props: Props) => {
  const { fieldName, label, placeholder } = props;
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
        className="w-full appearance-none rounded-none border-y px-4 py-3"
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
