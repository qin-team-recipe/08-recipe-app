"use client";

import React from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

import { AddInputButton } from "@/components/form/add-input-button";
import { ErrorFormMessage } from "@/components/form/form-error-message";
import { cn } from "@/lib/utils";

import { DropDownMenuRecipeCookingProcedure } from "./dropdown-menu-recipe-cooking-procedure";

type Props = {
  fieldName: string;
  label: string;
  labelAddInputButton: string;
  placeholder?: string;
};

export const RecipeFormProcedure = (props: Props) => {
  const { fieldName, label, placeholder } = props;
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { append, fields, remove, swap } = useFieldArray({ name: fieldName, control });

  const moveUp = (index: number): void => {
    console.log("moveUp called");
    if (index !== 0) {
      swap(index, index - 1);
    }
  };

  const moveDown = (index: number): void => {
    console.log("moveDown called");
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
        <div key={0}>
          <div className="relative flex items-center justify-end border-y bg-whitea-13">
            <TextareaAutosize
              placeholder={placeholder}
              className={cn(
                "w-full resize-none appearance-none rounded-none px-4 py-3",
                errors[fieldName] && errors[fieldName][0]?.value && "box-border border-2 border-tomato-9",
              )}
              {...register(`${fieldName}.0.value` as const)}
            />
            <DropDownMenuRecipeCookingProcedure
              index={0}
              length="1"
              edit={function (index: number): void {
                throw new Error("Function not implemented.");
              }}
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
              "relative flex items-center justify-end bg-whitea-13",
              index === 0 && "border-y",
              index !== 0 && "border-b",
            )}
          >
            <TextareaAutosize
              placeholder={placeholder}
              className={cn(
                "w-full resize-none appearance-none rounded-none px-4 py-3",
                errors[fieldName] && errors[fieldName][index]?.value && "box-border border-2 border-tomato-9",
                errors[fieldName] &&
                  errors[fieldName][index - 1]?.value &&
                  !errors[fieldName][index]?.value &&
                  "border-t",
              )}
              {...register(`${fieldName}.${index}.value` as const)}
            />
            <DropDownMenuRecipeCookingProcedure
              index={index}
              length={array.length}
              edit={function (index: number): void {
                throw new Error("Function not implemented.");
              }}
              moveUp={(index) => moveUp(index)}
              moveDown={(index) => moveDown(index)}
              deleteList={(index) => deleteList(index)}
            />
          </div>
          <ErrorFormMessage>
            {errors[fieldName] && errors[fieldName][0]?.value && errors[fieldName][0].value.message}
          </ErrorFormMessage>
        </div>
      ))}
      <AddInputButton className="mx-4 mt-2" text="工程を追加する" onClick={() => append({ value: "" })} />
    </div>
  );
};
