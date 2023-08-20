"use client";

import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const InputField = (props: Props) => {
  const { name, label, placeholder } = props;
  const { register } = useFormContext();
  return (
    <div className="space-y-1">
      <label className="px-4 font-bold">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full appearance-none rounded-none border-y px-4 py-3"
        {...register(name)}
      />
    </div>
  );
};
