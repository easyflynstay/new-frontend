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

/** Show only last 4 characters of gift card code; rest hidden forever in UI. */
export function maskGiftCardCode(code: string | undefined | null): string {
  if (!code || typeof code !== "string") return "••••";
  if (code.length <= 4) return "••••";
  return "••••••••" + code.slice(-4);
}
