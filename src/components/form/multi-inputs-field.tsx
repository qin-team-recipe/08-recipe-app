"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { TbTrash } from "react-icons/tb";

import { AddInputButton } from "@/components/form/add-input-button";

type Props = {
  fieldName: string;
  label: string;
  maxRows: number;
  placeholder?: string;
};

export const MultiInputsField = (props: Props) => {
  const { fieldName, label, maxRows, placeholder } = props;
  const { control, register } = useFormContext();
  const { append, fields, remove } = useFieldArray({ name: fieldName, control });

  return (
    <div>
      <label className="mb-1 px-4 font-bold">{label}</label>

      {fields.length === 0 && (
        <input
          type="text"
          placeholder={placeholder}
          className={"w-full appearance-none rounded-none border-y px-4 py-3"}
          {...register(`${fieldName}.0.value` as const)}
        />
      )}

      {fields.map((item, index) => (
        <div key={item.id} className="relative flex items-center justify-end">
          <input
            type="text"
            placeholder={placeholder}
            className={`${index === 0 && "border-t"} w-full appearance-none rounded-none border-b px-4 py-3`}
            {...register(`${fieldName}.${index}.value` as const)}
          />
          {/* TODO: 仮で置いてる削除ボタンです。ちゃんとしたものに置き換える */}
          {index !== 0 && (
            <button type="button" className="absolute right-4 hover:opacity-60" onClick={() => remove(index)}>
              <TbTrash className="h-6 w-6 stroke-mauve-11 stroke-[1.5]" />
            </button>
          )}
        </div>
      ))}

      {fields.length < maxRows && (
        <AddInputButton className="mx-4 mt-2" text="リンクを追加する" onClick={() => append({ value: "" })} />
      )}
    </div>
  );
};
