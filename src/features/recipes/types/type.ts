import { Updateable } from "kysely";
import { z } from "zod";

import { CONF_FILE_IMAGE_SIZE_LIMIT } from "@/config/config";
import { IMAGE_TYPES } from "@/config/constants";
import {
  VM_FILE_IMAGE_EXT,
  VM_FILE_SIZE_MAX,
  VM_INVALID_TYPE_ERROR,
  VM_MULTIPLE_FORM_MAX_LENGTH,
  VM_NUMBER_EQUAL_OR_GREATER_THAN,
  VM_REQUIRED_ERROR,
  VM_STRING_MAX_LENGTH,
  VM_VALID_URL,
} from "@/config/validation-message";
import { replaceValidationMessageAttribute } from "@/lib/utils";
import { Recipe } from "@/types/db";

export const RecipeFormSchema = z.object({
  name: z
    .string({ required_error: VM_REQUIRED_ERROR, invalid_type_error: VM_INVALID_TYPE_ERROR })
    .nonempty({ message: VM_REQUIRED_ERROR })
    .max(100, { message: replaceValidationMessageAttribute(VM_STRING_MAX_LENGTH, "100") }),
  description: z
    .string({ invalid_type_error: VM_INVALID_TYPE_ERROR })
    .max(255, { message: replaceValidationMessageAttribute(VM_STRING_MAX_LENGTH, "255") })
    .or(z.string().length(0)),
  servings: z.number().positive({ message: replaceValidationMessageAttribute(VM_NUMBER_EQUAL_OR_GREATER_THAN, "1") }),
  isPublic: z.boolean(),
  recipeIngredients: z
    .array(
      z.object({
        value: z
          .string()
          .nonempty({ message: VM_REQUIRED_ERROR })
          .max(20, { message: replaceValidationMessageAttribute(VM_STRING_MAX_LENGTH, "20") }),
      }),
    )
    .nonempty(replaceValidationMessageAttribute(VM_MULTIPLE_FORM_MAX_LENGTH, "1")),
  recipeCookingProcedures: z
    .array(
      z.object({
        value: z
          .string()
          .nonempty({ message: VM_REQUIRED_ERROR })
          .max(50, { message: replaceValidationMessageAttribute(VM_STRING_MAX_LENGTH, "50") }),
      }),
    )
    .min(1, { message: replaceValidationMessageAttribute(VM_MULTIPLE_FORM_MAX_LENGTH, "1") }),
  recipeLinks: z.array(
    z.object({ value: z.string().url({ message: VM_VALID_URL }).nullish().or(z.string().length(0)) }),
  ),
  recipeImage: z
    .custom<File>()
    .refine((file) => typeof file === "object", { message: VM_REQUIRED_ERROR })
    .refine((file) => file && file.size < CONF_FILE_IMAGE_SIZE_LIMIT, {
      message: replaceValidationMessageAttribute(VM_FILE_SIZE_MAX, "5MB"),
    })
    .refine((file) => file && IMAGE_TYPES.includes(file.type), {
      message: VM_FILE_IMAGE_EXT,
    })
    .or(z.custom<FileList>().refine((files) => files?.length === 0)),
});

export type RecipeForm = z.infer<typeof RecipeFormSchema>;
