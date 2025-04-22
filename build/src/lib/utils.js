import { clsx } from "clsx"; // No need for "type ClassValue" in JS

export function cn(...inputs) {
  return clsx(inputs);
}
