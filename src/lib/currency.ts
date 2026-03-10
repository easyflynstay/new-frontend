/**
 * Display currency in Indian Rupees (INR).
 * Use for all user-facing amounts (deals, prices, wallet, gift cards, etc.).
 */
const USD_TO_INR = 85;

export function usdToInr(usd: number): number {
  return Math.round(usd * USD_TO_INR);
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`;
}

/** Format a USD amount for display in INR (e.g. deals that are stored as USD). */
export function formatUsdAsInr(usd: number): string {
  return formatInr(usdToInr(usd));
}
