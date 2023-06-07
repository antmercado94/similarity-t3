import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merge tailwind classes
// -- py-2 px-2 -> p-2
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
