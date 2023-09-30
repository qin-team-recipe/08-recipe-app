import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ValidationErrorMessage } from "@/config/validation-error-message";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceValidationMessageAttribute(message: ValidationErrorMessage, attribute: string) {
  return message.replace("{:attribute}", attribute);
}
