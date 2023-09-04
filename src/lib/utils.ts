import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceValidationMessageAttribute(message: string, attribute: string) {
  return message.replace("{:attribute}", attribute);
}
