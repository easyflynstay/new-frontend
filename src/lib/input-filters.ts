/**
 * For phone / currency amounts entered as plain digits (no spaces, letters, or symbols).
 * Pass maxLen to cap length (e.g. 15 for international phone digits).
 */
export function filterDigitsOnly(value: string, maxLen?: number): string {
  let s = value.replace(/\D/g, "");
  if (maxLen !== undefined && s.length > maxLen) {
    s = s.slice(0, maxLen);
  }
  return s;
}

/**
 * Digits with at most one decimal point (e.g. discount percent). Strips other characters.
 */
export function filterDecimalDigits(value: string, maxFracDigits: number): string {
  const t = value.replace(/[^\d.]/g, "");
  if (!t) return "";
  const firstDot = t.indexOf(".");
  if (firstDot === -1) return t;
  let whole = t.slice(0, firstDot).replace(/\./g, "");
  let frac = t.slice(firstDot + 1).replace(/\./g, "");
  if (maxFracDigits >= 0) frac = frac.slice(0, maxFracDigits);
  if (whole === "" && frac !== "") whole = "0";
  if (frac.length > 0) return `${whole}.${frac}`;
  return t.endsWith(".") ? `${whole}.` : whole;
}
