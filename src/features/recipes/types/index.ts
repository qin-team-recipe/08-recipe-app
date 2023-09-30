import { ComponentProps } from "react";

import { Selectable } from "kysely";
import { z } from "zod";

import { FILE_IMAGE_SIZE_LIMIT, IMAGE_TYPES_ACCEPTABLE } from "@/config/constant";
import { VALIDATION_ERROR_MESSAGE } from "@/config/validation-error-message";
import { replaceValidationMessageAttribute } from "@/lib/utils";
import { Recipe, RecipeCookingProcedure, RecipeImage, RecipeIngredient, RecipeLink, User } from "@/types/db";
import { RecipeStatus } from "@/types/enums";

export type RecipeListItemType = Omit<Selectable<Recipe>, "deletedAt"> & {
  imgSrc: string;
  favoriteCount: number;
};

export type RecipeDetail = Selectable<Recipe> & { user: Pick<Selectable<User>, "id" | "name" | "image"> | null } & {
  recipeImages: Pick<Selectable<RecipeImage>, "id" | "imgSrc" | "index">[];
} & {
  recipeIngredients: Pick<Selectable<RecipeIngredient>, "id" | "name" | "index">[];
} & { recipeCookingProcedures: Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">[] } & {
  recipeLinks: Pick<Selectable<RecipeLink>, "id" | "url" | "category" | "index">[];
};

export type RecipeCookingProcedureSelectable = Pick<Selectable<RecipeCookingProcedure>, "id" | "name" | "index">;
export type RecipeIngredientSelectable = Pick<Selectable<RecipeIngredient>, "id" | "name" | "index">;

export type RecipeStepProp = {
  data: RecipeCookingProcedureSelectable[];
} & ComponentProps<"div">;

export const RecipeFormSchema = z.object({
  name: z
    .string({
      required_error: VALIDATION_ERROR_MESSAGE.REQUIRED,
      invalid_type_error: VALIDATION_ERROR_MESSAGE.INVALID_TYPE,
    })
    .nonempty({ message: VALIDATION_ERROR_MESSAGE.REQUIRED })
    .max(100, { message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.STRING_MAX_LENGTH, "100") }),
  description: z
    .string({ invalid_type_error: VALIDATION_ERROR_MESSAGE.INVALID_TYPE })
    .max(255, { message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.STRING_MAX_LENGTH, "255") })
    .or(z.string().length(0)),
  servings: z.number().positive({
    message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.NUMBER_EQUAL_OR_GREATER_THAN, "1"),
  }),
  status: z.enum([RecipeStatus.public, RecipeStatus.private, RecipeStatus.draft]),
  recipeIngredients: z
    .array(
      z.object({
        value: z
          .string()
          .nonempty({ message: VALIDATION_ERROR_MESSAGE.REQUIRED })
          .max(20, { message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.STRING_MAX_LENGTH, "20") }),
      }),
    )
    .nonempty(replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.MULTIPLE_FORM_MAX_LENGTH, "1")),
  recipeCookingProcedures: z
    .array(
      z.object({
        value: z
          .string()
          .nonempty({ message: VALIDATION_ERROR_MESSAGE.REQUIRED })
          .max(50, { message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.STRING_MAX_LENGTH, "50") }),
      }),
    )
    .min(1, { message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.MULTIPLE_FORM_MAX_LENGTH, "1") }),
  recipeLinks: z.array(
    z.object({
      value: z.string().url({ message: VALIDATION_ERROR_MESSAGE.INVALID_URL }).nullish().or(z.string().length(0)),
    }),
  ),
  recipeImage: z
    .custom<File>()
    .refine((file) => typeof file === "object", { message: VALIDATION_ERROR_MESSAGE.REQUIRED })
    .refine((file) => file && file.size < FILE_IMAGE_SIZE_LIMIT, {
      message: replaceValidationMessageAttribute(VALIDATION_ERROR_MESSAGE.FILE_SIZE_MAX, "5MB"),
    })
    .refine(
      (file) => {
        console.log("zod validation recipeImage");
        console.log("file", file);
        console.log("file.type", file.type);
        return file && IMAGE_TYPES_ACCEPTABLE.includes(file.type);
      },
      {
        message: VALIDATION_ERROR_MESSAGE.FILE_IMAGE_EXT,
      },
    )
    .or(z.custom<FileList>().refine((files) => files?.length === 0)),
});

export type RecipeFormType = z.infer<typeof RecipeFormSchema>;
