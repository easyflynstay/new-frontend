/** Volume discounts on fare subtotal (after per-ticket markup from search). INR. */
export const TIER_L1_INR = 100_000;
export const TIER_L2_INR = 200_000;

export function tierDiscountPercent(subtotalInr: number): number {
  if (subtotalInr >= TIER_L2_INR) return 0.04;
  if (subtotalInr >= TIER_L1_INR) return 0.02;
  return 0;
}

export function computeTierDiscount(grossFareInr: number): {
  tierPercent: number;
  tierDiscountInr: number;
  subtotalAfterTier: number;
} {
  const tierPercent = tierDiscountPercent(grossFareInr);
  const tierDiscountInr = Math.round(grossFareInr * tierPercent * 100) / 100;
  const subtotalAfterTier = Math.max(0, Math.round((grossFareInr - tierDiscountInr) * 100) / 100);
  return { tierPercent, tierDiscountInr, subtotalAfterTier };
}
