"use client";

import React, { ReactNode } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import { AddInputButton } from "@/components/form/add-input-button";
import { DropDownMenuRecipeInfoList } from "@/features/recipes";
import { cn } from "@/lib/utils";

type Props = {
  fieldName: string;
  label: string;
  labelAddInputButton: string;
  maxRows: number;
  placeholder?: string;
};

export const RecipeFormMultiField = (props: Props) => {
  const { fieldName, label, maxRows, placeholder } = props;
  const { control, register } = useFormContext();
  const { append, fields, remove, swap } = useFieldArray({ name: fieldName, control });

  console.log("fields", fields);

  const moveUp = (index: number): void => {
    console.log("moveUp called");
    if (index !== 0) {
      swap(index, index - 1);
    }
  };

  const moveDown = (index: number): void => {
    console.log("moveDown called");
    console.log("index", index);
    console.log("fields", fields);
    console.log("fields.length", fields.length);
    if (index < fields.length - 1) {
      swap(index, index + 1);
    }
  };

  const deleteList = (index: number): void => {
    remove(index);
  };

  return (
    <div>
      <label className="mb-1 px-4 font-bold">{label}</label>

      {fields.length === 0 && (
        <div key={0} className="relative flex items-center justify-end border-y bg-whitea-13">
          <input
            type="text"
            placeholder={placeholder}
            className={"w-full appearance-none rounded-none px-4 py-3 "}
            {...register(`${fieldName}.0.value` as const)}
          />
          <DropDownMenuRecipeInfoList
            index={0}
            length={1}
            moveUp={(index) => moveUp(index)}
            moveDown={(index) => moveDown(index)}
            deleteList={(index) => deleteList(index)}
          />
        </div>
      )}

      {fields.map((item, index, array) => (
        <div
          key={item.id}
          className={cn(
            "relative flex items-center justify-end bg-whitea-13",
            index === 0 && "border-y",
            index !== 0 && "border-b",
          )}
        >
          <input
            type="text"
            placeholder={placeholder}
            className="w-full appearance-none rounded-none px-4 py-3 pr-11"
            {...register(`${fieldName}.${index}.value` as const)}
          />
          <DropDownMenuRecipeInfoList
            index={index}
            length={array.length}
            moveUp={(index) => moveUp(index)}
            moveDown={(index) => moveDown(index)}
            deleteList={(index) => deleteList(index)}
          />
        </div>
      ))}

      {fields.length < maxRows && (
        <AddInputButton
          className="mx-4 mt-2"
          text={props.labelAddInputButton + "を追加する"}
          onClick={() => append({ value: "" })}
        />
      )}
    </div>
  );
};
