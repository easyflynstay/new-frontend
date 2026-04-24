import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Loose check aligned with typical EmailStr / HTML5 email expectations */
export function isValidEmail(s: string): boolean {
  const t = s.trim();
  if (t.length < 5) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

/** Show only last 4 characters; mask the rest (aligned with backend email masking). */
export function maskGiftCardCode(code: string | undefined | null): string {
  if (!code || typeof code !== "string") return "••••";
  const t = code.trim();
  if (t.length <= 4) return "•".repeat(4);
  return "•".repeat(t.length - 4) + t.slice(-4);
}
