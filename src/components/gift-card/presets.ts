import type { GiftCardVisualProps } from "./GiftCardVisual";

/**
 * One place for GiftCardVisual layout classes so marketing, dashboard, and
 * booking stay visually aligned with the canonical card design.
 */
export const giftCardClassName = {
  /** Home, landing strip: width only */
  marketing: "w-full",
  /** /gift-cards hero carousel: fill stacked card area */
  marketingCarousel: "h-full w-full",
  /** Tier product cards: face only, flush to light panel — no double shadow */
  tierFace: "w-full max-w-none border-0 shadow-none ring-0",
  /** My cards and purchase success: fill grid cell; no panel behind the card */
  dashboard: "w-full max-w-none shadow-none",
} as const;

const bookingCompactBase = "w-full !max-w-full shadow-md";

/** Booking checkout: small row, number line only (no name/expiry to save space) */
export const giftCardPropsBooking: Pick<
  GiftCardVisualProps,
  "size" | "showMetadata" | "className"
> = {
  size: "compact",
  showMetadata: false,
  className: bookingCompactBase,
};
