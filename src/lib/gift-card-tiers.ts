import { formatInr } from "@/lib/currency";

/** Purchase flow: backend enforces the same range. */
export const GIFT_CARD_MIN_PURCHASE_INR = 50_000;
export const GIFT_CARD_MAX_PURCHASE_INR = 500_000;

export function isGiftCardPurchaseInRange(amount: number): boolean {
  return (
    Number.isFinite(amount) &&
    amount >= GIFT_CARD_MIN_PURCHASE_INR &&
    amount <= GIFT_CARD_MAX_PURCHASE_INR
  );
}

export type GiftCardTier = "Prime" | "Signature" | "Elite";

/** Visual finish for the physical card component */
export type GiftCardVariant = "gold" | "silver" | "platinum";

export function giftCardVariantFromTier(tier: GiftCardTier): GiftCardVariant {
  if (tier === "Signature") return "gold";
  if (tier === "Elite") return "platinum";
  return "silver";
}

/** Tier by initial load amount (₹), aligned with marketing tiers on /gift-cards */
export function getGiftCardTierFromAmount(amount: number): GiftCardTier {
  if (amount >= 250_000) return "Elite";
  if (amount >= 100_000) return "Signature";
  return "Prime";
}

/** Signature 1% off pay; Elite 2% off pay; you still receive the full face value on the card. */
export function getGiftCardDiscountPercent(tier: GiftCardTier): number {
  if (tier === "Signature") return 0.01;
  if (tier === "Elite") return 0.02;
  return 0;
}

export function getGiftCardValidityMonths(tier: GiftCardTier): number {
  if (tier === "Elite") return 36;
  if (tier === "Signature") return 24;
  return 12;
}

/**
 * What the customer pays (₹) for Razorpay after tier discount. Rounded to 2 decimals.
 */
export function getGiftCardPayableInr(faceValueInr: number): number {
  if (!isGiftCardPurchaseInRange(faceValueInr)) return 0;
  const tier = getGiftCardTierFromAmount(faceValueInr);
  const d = getGiftCardDiscountPercent(tier);
  return Math.round(faceValueInr * (1 - d) * 100) / 100;
}

/** Demo / marketing defaults per tier (carousel, hero) */
export const GIFT_CARD_DEMO: Record<
  GiftCardTier,
  { cardholderName: string; cardNumber: string; validFrom: string; validThru: string }
> = {
  Prime: {
    cardholderName: "Rahul Sharma",
    cardNumber: "XXXX XXXX XXXX 1234",
    validFrom: "03/26",
    validThru: "03/29",
  },
  Signature: {
    cardholderName: "Priya Mehta",
    cardNumber: "XXXX XXXX XXXX 5678",
    validFrom: "03/26",
    validThru: "03/29",
  },
  Elite: {
    cardholderName: "Arjun Kapoor",
    cardNumber: "XXXX XXXX XXXX 9012",
    validFrom: "03/26",
    validThru: "03/29",
  },
};

/**
 * Tailwind classes for the card face — single source for colors by tier.
 */
export const giftCardTierStyles: Record<
  GiftCardTier,
  {
    gradient: string;
    brandSub: string;
    tierTitle: string;
    iconBox: string;
    icon: string;
    code: string;
    smallMuted: string;
    eBox: string;
    eLetter: string;
    /** "Choose your tier" amount line */
    rangeValue: string;
  }
> = {
  Prime: {
    gradient: "from-slate-300 via-slate-200 to-slate-400",
    brandSub: "text-slate-600",
    tierTitle: "text-slate-800",
    iconBox: "bg-black/10",
    icon: "text-slate-600",
    code: "text-slate-700",
    smallMuted: "text-slate-500",
    eBox: "bg-primary",
    eLetter: "text-accent",
    rangeValue: "text-slate-800",
  },
  Signature: {
    gradient: "from-amber-400 via-yellow-300 to-amber-500",
    brandSub: "text-amber-950/70",
    tierTitle: "text-amber-950",
    iconBox: "bg-amber-950/15",
    icon: "text-amber-950/80",
    code: "text-amber-950/90",
    smallMuted: "text-amber-950/85",
    eBox: "bg-white/20",
    eLetter: "text-accent",
    rangeValue: "text-amber-950",
  },
  Elite: {
    gradient: "from-gray-900 via-gray-800 to-black",
    brandSub: "text-white/80",
    tierTitle: "text-white",
    iconBox: "bg-white/20",
    icon: "text-accent",
    code: "text-white/90",
    smallMuted: "text-white/70",
    eBox: "bg-primary",
    eLetter: "text-accent",
    rangeValue: "text-accent",
  },
};

export type GiftTierMarketing = {
  name: GiftCardTier;
  tagline: string;
  valueMin: number;
  valueMax: number;
  color: string;
  borderColor: string;
  textColor: string;
  accentColor: string;
  bgCard: string;
  chipBg: string;
  features: string[];
  popular: boolean;
};

export const GIFT_TIER_MARKETING: GiftTierMarketing[] = [
  {
    name: "Prime",
    tagline: "The Perfect Start",
    valueMin: 50_000,
    valueMax: 100_000,
    color: "from-slate-300 via-slate-200 to-slate-400",
    borderColor: "border-slate-300",
    textColor: "text-slate-700",
    accentColor: "text-slate-500",
    bgCard: "bg-gradient-to-br from-slate-50 to-white",
    chipBg: "bg-slate-100",
    features: [
      "Valid for 12 months",
      "Redeemable on any flight",
      "Digital delivery via email",
    ],
    popular: false,
  },
  {
    name: "Signature",
    tagline: "Most Popular Choice",
    valueMin: 100_000,
    valueMax: 250_000,
    color: "from-amber-400 via-yellow-300 to-amber-500",
    borderColor: "border-accent",
    textColor: "text-amber-800",
    accentColor: "text-accent",
    bgCard: "bg-gradient-to-br from-amber-50/50 to-white",
    chipBg: "bg-accent/10",
    features: [
      "Valid for 24 months",
      "Redeemable on any flight",
      "Priority booking assistance",
      "1% discount on purchase",
    ],
    popular: true,
  },
  {
    name: "Elite",
    tagline: "Ultimate Luxury",
    valueMin: 250_000,
    valueMax: 500_000,
    color: "from-gray-900 via-gray-800 to-black",
    borderColor: "border-gray-800",
    textColor: "text-white",
    accentColor: "text-accent",
    bgCard: "bg-gradient-to-br from-gray-900 to-black",
    chipBg: "bg-white/10",
    features: [
      "Valid for 36 months",
      "Redeemable on any flight or hotel",
      "Dedicated personal travel concierge",
      "2% discount on purchase",
      "Premium physical card with gift box",
      "VIP customer support line",
    ],
    popular: false,
  },
];

export function tierValueRangeLine(t: GiftTierMarketing) {
  return `${formatInr(t.valueMin)} – ${formatInr(t.valueMax)}`;
}
