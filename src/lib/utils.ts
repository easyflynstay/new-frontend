import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Show only last 4 characters of gift card code; rest hidden forever in UI. */
export function maskGiftCardCode(code: string | undefined | null): string {
  if (!code || typeof code !== "string") return "••••";
  if (code.length <= 4) return "••••";
  return "••••••••" + code.slice(-4);
}
