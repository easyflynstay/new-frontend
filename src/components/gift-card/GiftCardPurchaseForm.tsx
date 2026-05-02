"use client";

import { useState, useMemo, useEffect, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  GIFT_CARD_DEMO,
  GIFT_CARD_MAX_PURCHASE_INR,
  GIFT_CARD_MIN_PURCHASE_INR,
  getGiftCardDiscountPercent,
  getGiftCardPayableInr,
  getGiftCardTierFromAmount,
  getGiftCardValidityMonths,
  giftCardPreviewValidity,
  giftCardVariantFromTier,
  isGiftCardPurchaseInRange,
  type GiftCardTier,
} from "@/lib/gift-card-tiers";
import { buyGiftCard, verifyGiftCardPayment, type GiftCardEliteShipping } from "@/services/giftcards";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";
import { GiftCardVisual } from "@/components/gift-card";
import { filterDigitsOnly } from "@/lib/input-filters";

const GIFT_CARD_AMOUNT_MAX_DIGITS = 12;

const TIER_ORDER: GiftCardTier[] = ["Prime", "Signature", "Elite"];

const PRESETS = [50_000, 75_000, 100_000, 150_000, 200_000, 250_000, 300_000, 400_000, 500_000];

type UserLite = { first_name?: string; last_name?: string; email?: string } | null;

type Props = {
  user: UserLite;
  onPurchased: (data: { code: string; balance: string; expiryDate: string; amount: number }) => void;
};

const emptyShip = (): GiftCardEliteShipping => ({
  apartment: "",
  street: "",
  city: "",
  district: "",
  pincode: "",
});

type ShipFieldKey = keyof GiftCardEliteShipping;

type ShipErrors = Partial<Record<ShipFieldKey, string>>;

function validateEliteShipping(s: GiftCardEliteShipping): ShipErrors {
  const errors: ShipErrors = {};
  const apt = s.apartment.trim();
  const street = s.street.trim();
  const city = s.city.trim();
  const district = s.district.trim();
  const pinDigits = s.pincode.replace(/\D/g, "");

  if (!apt) {
    errors.apartment = "Enter the apartment, house, or villa name.";
  } else if (apt.length < 2) {
    errors.apartment = "Use at least 2 characters.";
  }
  if (!street) {
    errors.street = "Enter the street address (road, area, landmarks).";
  } else if (street.length < 3) {
    errors.street = "Use at least 3 characters.";
  }
  if (!city) {
    errors.city = "Enter the city or town.";
  } else if (city.length < 2) {
    errors.city = "Use at least 2 characters.";
  }
  if (!district) {
    errors.district = "Enter the district or taluk.";
  } else if (district.length < 2) {
    errors.district = "Use at least 2 characters.";
  }
  if (pinDigits.length !== 6) {
    errors.pincode = "Enter a valid 6-digit PIN code.";
  }
  return errors;
}

/** Shared field chrome: hint + error + a11y ids */
function ShipField({
  id,
  label,
  helper,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  helper: string;
  error?: string;
  children: (a11y: { invalid: boolean; describedBy: string }) => ReactNode;
  className?: string;
}) {
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;
  const invalid = Boolean(error);
  const describedBy = invalid ? `${hintId} ${errId}` : hintId;
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-xs font-medium text-foreground">
        {label}
      </Label>
      <p id={hintId} className="mt-1 text-[11px] leading-snug text-muted-foreground">
        {helper}
      </p>
      {children({ invalid, describedBy })}
      {error ? (
        <p id={errId} role="alert" className="mt-1 text-[11px] leading-snug text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function GiftCardPurchaseForm({ user, onPurchased }: Props) {
  const [buyAmount, setBuyAmount] = useState("");
  const [buyError, setBuyError] = useState("");
  const [buyLoading, setBuyLoading] = useState(false);
  const [ship, setShip] = useState<GiftCardEliteShipping>(emptyShip);
  const [shipErrors, setShipErrors] = useState<ShipErrors>({});

  const patchShip = useCallback((key: ShipFieldKey, value: string) => {
    setShip((prev) => ({ ...prev, [key]: value }));
    setShipErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setBuyError((prev) => (prev === "Check the shipping fields highlighted below." ? "" : prev));
  }, []);

  const face = useMemo(() => {
    const d = filterDigitsOnly(buyAmount, GIFT_CARD_AMOUNT_MAX_DIGITS);
    if (!d) return 0;
    const n = parseInt(d, 10);
    return Number.isFinite(n) && n >= 1 ? n : 0;
  }, [buyAmount]);

  const cardHolderName = useMemo(() => {
    if (!user) return "Member";
    const name = [user.first_name, user.last_name]
      .filter((x): x is string => Boolean(x && String(x).trim()))
      .join(" ")
      .trim();
    return name || "Member";
  }, [user]);

  /** First day of current month: tier previews show Prime 12mo / Signature 24mo / Elite 36mo from that issue date. */
  const tierPreviewIssue = useMemo(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const purchaseInRange = isGiftCardPurchaseInRange(face);
  const activeTier = purchaseInRange ? getGiftCardTierFromAmount(face) : null;

  const showEliteForm = purchaseInRange && activeTier === "Elite";

  useEffect(() => {
    if (!showEliteForm) setShipErrors({});
  }, [showEliteForm]);

  const buildShippingPayload = (): GiftCardEliteShipping | undefined => {
    if (!showEliteForm) return undefined;
    return {
      apartment: ship.apartment.trim(),
      street: ship.street.trim(),
      city: ship.city.trim(),
      district: ship.district.trim(),
      pincode: ship.pincode.replace(/\D/g, "").slice(0, 6),
    };
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!face) {
      setBuyError("Please enter a gift card value.");
      return;
    }
    if (!isGiftCardPurchaseInRange(face)) {
      setBuyError(
        `Enter an amount between ₹${GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} and ₹${GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")}.`
      );
      return;
    }
    if (showEliteForm) {
      const errs = validateEliteShipping(ship);
      if (Object.keys(errs).length > 0) {
        setShipErrors(errs);
        setBuyError("Check the shipping fields highlighted below.");
        requestAnimationFrame(() => {
          const firstKey = (["apartment", "street", "city", "district", "pincode"] as const).find(
            (k) => errs[k]
          );
          if (firstKey) document.getElementById(`ship-${firstKey}`)?.focus();
        });
        return;
      }
      setShipErrors({});
    }
    setBuyLoading(true);
    setBuyError("");

    const shipping = showEliteForm ? buildShippingPayload()! : undefined;

    try {
      await loadRazorpayScript();
      const order = await buyGiftCard(face, shipping);

      openRazorpayCheckout({
        orderId: order.order_id,
        amountPaise: order.amount,
        currency: order.currency,
        userName: user ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() : undefined,
        userEmail: user?.email,
        onSuccess: async (response) => {
          try {
            const result = await verifyGiftCardPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              face_value: face,
              ...(shipping ? { shipping } : {}),
            });
            onPurchased({
              code: result.code,
              balance: result.balance,
              expiryDate: result.expiry_date,
              amount: face,
            });
            setBuyAmount("");
            setShip(emptyShip());
            setShipErrors({});
          } catch (err: unknown) {
            const detail =
              err && typeof err === "object" && "response" in err
                ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
                : undefined;
            setBuyError(
              typeof detail === "string" ? detail : "Payment verified but gift card creation failed."
            );
          } finally {
            setBuyLoading(false);
          }
        },
        onDismiss: () => {
          setBuyLoading(false);
          setBuyError("Payment was cancelled.");
        },
      });
    } catch (err: unknown) {
      const detail =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string } }; message?: string }).response?.data
              ?.detail
          : (err as Error)?.message;
      setBuyError(
        (typeof detail === "string" ? detail : null) || "Failed to initiate payment."
      );
      setBuyLoading(false);
    }
  };

  return (
    <form onSubmit={handleBuy} className="w-full space-y-8">
      {buyError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{buyError}</div>
      )}

      <div>
        <p className="text-sm font-semibold text-foreground">Choose a tier (by gift value)</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          ₹{GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} – ₹
          {GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-4">
          {TIER_ORDER.map((tier) => {
            const demo = GIFT_CARD_DEMO[tier];
            const { validFrom, validThru } = giftCardPreviewValidity(tierPreviewIssue, tier);
            const vari = giftCardVariantFromTier(tier);
            const isActive = purchaseInRange && activeTier === tier;
            const showSelectionState = face > 0;
            const dimThis =
              showSelectionState &&
              (!purchaseInRange || (purchaseInRange && activeTier !== tier));
            return (
              <div
                key={tier}
                className={cn(
                  "transition-all duration-300",
                  dimThis && "opacity-40 grayscale pointer-events-none select-none"
                )}
              >
                <GiftCardVisual
                  variant={vari}
                  tier={tier}
                  cardNumber={demo.cardNumber}
                  cardHolder={cardHolderName}
                  validFrom={validFrom}
                  validThru={validThru}
                  className={cn(
                    "w-full max-w-full",
                    isActive && "ring-2 ring-accent ring-offset-2"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="gift-card-face-inr" className="text-sm font-semibold">
          Gift card value (₹)
        </Label>
        <p id="gift-card-face-hint" className="mt-1 text-xs text-muted-foreground">
          ₹{GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} – ₹
          {GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")}.
        </p>
        <div className="relative mt-1.5 max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
            ₹
          </span>
          <Input
            id="gift-card-face-inr"
            type="text"
            inputMode="numeric"
            value={buyAmount}
            onChange={(e) => setBuyAmount(filterDigitsOnly(e.target.value, GIFT_CARD_AMOUNT_MAX_DIGITS))}
            className="pl-8 h-12 text-lg font-semibold"
            aria-describedby="gift-card-face-hint"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setBuyAmount(String(amt))}
              className={cn(
                "border-2 px-3 py-1.5 text-xs font-semibold transition-all rounded-md",
                buyAmount === String(amt)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border hover:border-accent/40 text-foreground"
              )}
            >
              ₹{amt.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
      </div>

      {showEliteForm && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-muted/20 p-4 sm:p-5 space-y-4"
        >
          <p className="text-sm font-semibold text-foreground">Shipping — Elite physical card</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ShipField
              id="ship-apartment"
              label="Apartment / House name"
              helper="Building, villa, or tower name as used on postal mail."
              error={shipErrors.apartment}
              className="sm:col-span-2"
            >
              {({ invalid, describedBy }) => (
                <Input
                  id="ship-apartment"
                  value={ship.apartment}
                  onChange={(e) => patchShip("apartment", e.target.value)}
                  className={cn("mt-1.5", invalid && "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/30")}
                  autoComplete="address-line2"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  maxLength={200}
                />
              )}
            </ShipField>
            <ShipField
              id="ship-street"
              label="Street address"
              helper="Street, road name, number, and nearby landmarks."
              error={shipErrors.street}
              className="sm:col-span-2"
            >
              {({ invalid, describedBy }) => (
                <Input
                  id="ship-street"
                  value={ship.street}
                  onChange={(e) => patchShip("street", e.target.value)}
                  className={cn("mt-1.5", invalid && "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/30")}
                  autoComplete="street-address"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  maxLength={300}
                />
              )}
            </ShipField>
            <ShipField
              id="ship-city"
              label="City"
              helper="City or town for delivery."
              error={shipErrors.city}
            >
              {({ invalid, describedBy }) => (
                <Input
                  id="ship-city"
                  value={ship.city}
                  onChange={(e) => patchShip("city", e.target.value)}
                  className={cn("mt-1.5", invalid && "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/30")}
                  autoComplete="address-level2"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  maxLength={100}
                />
              )}
            </ShipField>
            <ShipField
              id="ship-district"
              label="District"
              helper="District, taluk, or subdivision."
              error={shipErrors.district}
            >
              {({ invalid, describedBy }) => (
                <Input
                  id="ship-district"
                  value={ship.district}
                  onChange={(e) => patchShip("district", e.target.value)}
                  className={cn("mt-1.5", invalid && "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/30")}
                  autoComplete="address-level1"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  maxLength={100}
                />
              )}
            </ShipField>
            <ShipField
              id="ship-pincode"
              label="PIN code"
              helper="Six digits, India Post PIN only (numbers)."
              error={shipErrors.pincode}
              className="sm:col-span-2"
            >
              {({ invalid, describedBy }) => (
                <Input
                  id="ship-pincode"
                  type="text"
                  inputMode="numeric"
                  value={ship.pincode}
                  onChange={(e) => patchShip("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className={cn("mt-1.5 max-w-[200px] font-mono", invalid && "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600/30")}
                  autoComplete="postal-code"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  maxLength={6}
                />
              )}
            </ShipField>
          </div>
        </motion.div>
      )}

      {face > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border border-border bg-muted/30 p-4 max-w-md"
        >
          {purchaseInRange ? (
            (() => {
              const t = getGiftCardTierFromAmount(face);
              const disc = getGiftCardDiscountPercent(t);
              const months = getGiftCardValidityMonths(t);
              const payable = getGiftCardPayableInr(face);
              return (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gift card value</span>
                    <span className="font-semibold">₹{face.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Tier</span>
                    <span className="font-semibold">{t}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Valid for</span>
                    <span className="font-semibold">
                      {months} month{months === 1 ? "" : "s"}
                    </span>
                  </div>
                  {disc > 0 && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">
                        Discount ({t === "Signature" ? "1" : "2"}%)
                      </span>
                      <span className="font-semibold text-emerald-700">
                        −₹
                        {(face - payable).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 border-t border-border pt-3 flex items-center justify-between">
                    <span className="font-semibold">Total payable</span>
                    <span className="font-heading text-xl font-bold text-primary">
                      ₹{payable.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    Charged at checkout. Your gift card is loaded with the full{" "}
                    <strong>₹{face.toLocaleString("en-IN")}</strong> value.
                  </p>
                </>
              );
            })()
          ) : (
            <p className="text-sm text-red-700">
              Enter ₹{GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} – ₹
              {GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")}.
            </p>
          )}
        </motion.div>
      )}

      <div className="max-w-md">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full text-primary font-bold"
          disabled={buyLoading || !purchaseInRange}
        >
          {buyLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-primary/30 border-t-primary animate-spin rounded-full" />
              Processing...
            </span>
          ) : (
            <>
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Proceed to payment
            </>
          )}
        </Button>
        {/* <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Secured by Razorpay. Supports UPI, Cards, Net Banking & Wallets.
        </p> */}
      </div>
    </form>
  );
}
