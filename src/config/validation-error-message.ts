export const VALIDATION_ERROR_MESSAGE = {
  REQUIRED: "必ず入力してください",
  INVALID_TYPE: "入力値に誤りがります",
  STRING_MAX_LENGTH: "{:attribute}文字以下で入力してください",
  STRING_MIN_LENGTH: "{:attribute}文字以上で入力してください",
  MULTIPLE_FORM_MIN_LENGTH: "{:attribute}つ以上作成してください",
  MULTIPLE_FORM_MAX_LENGTH: "{:attribute}つ以下で作成してください",
  NUMBER_EQUAL_OR_GREATER_THAN: "{:attribute}以上にしてください",
  NUMBER_GREATER_THAN: "{:attribute}より大きくしてください}",
  NUMBER_EQUAL_OR_LESS_THAN: "{:attribute}以下にしてください",
  NUMBER_LESS_THAN: "{:attribute}未満にしてください",
  FILE_SIZE_MAX: "ファイルサイズは最大{:attribute}です",
  FILE_IMAGE_EXT: "画像の種類は.jpgもしくは.pngのみ可能です",
  INVALID_URL: "有効なURLを入力してください",
} as const;

export type ValidationErrorMessage = (typeof VALIDATION_ERROR_MESSAGE)[keyof typeof VALIDATION_ERROR_MESSAGE];
