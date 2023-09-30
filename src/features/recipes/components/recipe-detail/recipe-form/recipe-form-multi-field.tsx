"use client";

import React from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import { AddInputButton } from "@/components/form/add-input-button";
import { ErrorFormMessage } from "@/components/form/form-error-message";
import { cn } from "@/lib/utils";

import { DropDownMenuRecipeInfoList } from "./dropdown-menu-recipe-info-list";

type Props = {
  fieldName: string;
  label: string;
  labelAddInputButton: string;
  maxRows: number;
  placeholder?: string;
};

export const RecipeFormMultiField = (props: Props) => {
  const { fieldName, label, maxRows, placeholder } = props;
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
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
    <div className="mt-8">
      <label className="mb-1 px-4 font-bold">{label}</label>
      <div className="mt-1">
        {fields.length === 0 && (
          <div key={0}>
            <div className="relative flex items-center justify-end border-y border-mauve-7 bg-whitea-13">
              <input
                type="text"
                placeholder={placeholder}
                className={cn(
                  "h-12 w-full appearance-none rounded-none px-4 py-3 text-sm",
                  errors[fieldName] && errors[fieldName][0]?.value && "box-border rounded-sm border-2 border-tomato-9",
                )}
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
            <ErrorFormMessage>
              {errors[fieldName] && errors[fieldName][0]?.value && errors[fieldName][0].value.message}
            </ErrorFormMessage>
          </div>
        )}

        {fields.map((item, index, array) => (
          <div key={item.id}>
            <div
              className={cn(
                "relative flex items-center justify-end border-mauve-7 bg-whitea-13",
                index === 0 && "border-y",
                index !== 0 && "border-b",
                errors[fieldName] &&
                  errors[fieldName][index - 1]?.value &&
                  !errors[fieldName][index]?.value &&
                  "border-t",
              )}
            >
              <input
                type="text"
                placeholder={placeholder}
                className={cn(
                  "h-12 w-full appearance-none rounded-none px-4 py-3 pr-11 text-sm",
                  errors[fieldName] &&
                    errors[fieldName][index]?.value &&
                    "box-border rounded-sm border-2 border-tomato-9",
                )}
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
            <ErrorFormMessage>
              {errors[fieldName] && errors[fieldName][index]?.value && errors[fieldName][index].value.message}
            </ErrorFormMessage>
          </div>
        ))}
      </div>
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
