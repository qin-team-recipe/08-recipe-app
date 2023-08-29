"use client";

import React from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { AddInputButton } from "@/components/form/add-input-button";
import { DropDownMenuRecipeIngredient } from "@/features/recipes/components/dropdown-menu-recipe-ingredient";
import { cn } from "@/lib/utils";

type Props = {
  fieldName: string;
  label: string;
  placeholder?: string;
};

export const RecipeFormProcedure = (props: Props) => {
  const { fieldName, label, placeholder } = props;
  const { control, register } = useFormContext();
  const { append, fields, remove, swap } = useFieldArray({ name: fieldName, control });

  const moveUp = (index: number): void => {
    console.log("moveUp called");
    if (index !== 0) {
      swap(index, index - 1);
    }
  };

  const moveDown = (index: number): void => {
    console.log("moveDown called");
    if (index !== fields.length) {
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
        <div key={0} className="relative flex items-center justify-end bg-whitea-13 border-y">
          <TextareaAutosize
            placeholder={placeholder}
            className="w-full resize-none appearance-none rounded-none px-4 py-3"
            {...register(fieldName)}
          />
          <DropDownMenuRecipeIngredient
            index={0}
            edit={function (index: number): void {
              throw new Error("Function not implemented.");
            }}
            moveUp={(index) => moveUp(index)}
            moveDown={(index) => moveDown(index)}
            deleteList={(index) => deleteList(index)}
          />
        </div>
      )}

      {fields.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "relative flex items-center justify-end bg-whitea-13",
            index === 0 && "border-y",
            index !== 0 && "border-b",
          )}
        >
          <TextareaAutosize
            placeholder={placeholder}
            className="w-full resize-none appearance-none rounded-none px-4 py-3"
            {...register(fieldName)}
          />
          <DropDownMenuRecipeIngredient
            index={index}
            edit={function (index: number): void {
              throw new Error("Function not implemented.");
            }}
            moveUp={(index) => moveUp(index)}
            moveDown={(index) => moveDown(index)}
            deleteList={(index) => deleteList(index)}
          />
        </div>
      ))}
      <AddInputButton className="mx-4 mt-2" text="工程を追加する" onClick={() => append({ value: "" })} />
    </div>
  );
};
