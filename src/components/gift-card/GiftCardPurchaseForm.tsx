"use client";

import { useState, useMemo } from "react";
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

export function GiftCardPurchaseForm({ user, onPurchased }: Props) {
  const [buyAmount, setBuyAmount] = useState("");
  const [buyError, setBuyError] = useState("");
  const [buyLoading, setBuyLoading] = useState(false);
  const [ship, setShip] = useState<GiftCardEliteShipping>(emptyShip);

  const face = useMemo(() => {
    const n = parseFloat(buyAmount.replace(/,/g, "").trim());
    return Number.isFinite(n) && n >= 1 ? Math.round(n * 100) / 100 : 0;
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
      const p = buildShippingPayload()!;
      if (!p.apartment || !p.street || !p.city || !p.district || p.pincode.length !== 6) {
        setBuyError("Please complete all shipping fields with a valid 6-digit PIN code.");
        return;
      }
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
        <p className="text-xs text-muted-foreground mt-0.5">
          Use ₹{GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} – ₹
          {GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")}. When the amount is valid, only the
          matching tier is highlighted; others are dimmed. Invalid amounts dim all three.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-4">
          {TIER_ORDER.map((tier) => {
            const demo = GIFT_CARD_DEMO[tier];
            const { validFrom, validThru } = giftCardPreviewValidity(tierPreviewIssue, tier);
            const vari = giftCardVariantFromTier(tier);
            const isActive = activeTier === tier;
            const isDim = face > 0 && (!purchaseInRange || !isActive);
            return (
              <div
                key={tier}
                className={cn(
                  "transition-all duration-300",
                  isDim && "opacity-40 grayscale pointer-events-none select-none"
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
                    isActive && purchaseInRange && "ring-2 ring-accent ring-offset-2"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="text-sm font-semibold">Gift card value (₹)</Label>
        <p className="text-xs text-muted-foreground mt-0.5">
          Purchase range ₹{GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} – ₹
          {GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")}. You receive the full face value;
          Signature and Elite are billed at a discounted price.
        </p>
        <div className="relative mt-2 max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
            ₹
          </span>
          <Input
            type="text"
            inputMode="decimal"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value.replace(/[^\d.]/g, ""))}
            placeholder="e.g. 100000"
            className="pl-8 h-12 text-lg font-semibold"
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
          className="rounded-lg border border-border bg-muted/20 p-4 space-y-3"
        >
          <p className="text-sm font-semibold text-foreground">Shipping — Elite physical card</p>
          <p className="text-xs text-muted-foreground">
            We use this to mail your physical card. All fields are required.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs">Apartment / House name</Label>
              <Input
                value={ship.apartment}
                onChange={(e) => setShip((s) => ({ ...s, apartment: e.target.value }))}
                className="mt-1"
                placeholder="Apartment, suite, etc."
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Street address</Label>
              <Input
                value={ship.street}
                onChange={(e) => setShip((s) => ({ ...s, street: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">City</Label>
              <Input
                value={ship.city}
                onChange={(e) => setShip((s) => ({ ...s, city: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">District</Label>
              <Input
                value={ship.district}
                onChange={(e) => setShip((s) => ({ ...s, district: e.target.value }))}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">PIN code</Label>
              <Input
                value={ship.pincode}
                onChange={(e) =>
                  setShip((s) => ({ ...s, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) }))
                }
                className="mt-1 font-mono"
                maxLength={6}
                placeholder="6 digits"
                required
              />
            </div>
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
              Enter an amount between ₹{GIFT_CARD_MIN_PURCHASE_INR.toLocaleString("en-IN")} and ₹
              {GIFT_CARD_MAX_PURCHASE_INR.toLocaleString("en-IN")} to see pricing and continue.
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
