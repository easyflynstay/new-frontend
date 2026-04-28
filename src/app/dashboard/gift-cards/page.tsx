"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { getMyGiftCards, transferGiftCard, renewGiftCard, type GiftCard } from "@/services/giftcards";
import { getAxiosErrorMessage } from "@/lib/api";
import { maskGiftCardCode, cn } from "@/lib/utils";
import { PaymentPinEntry } from "@/components/payment/PaymentPinEntry";
import {
  getGiftCardTierFromAmount,
  giftCardTierStyles,
  giftCardVariantFromTier,
} from "@/lib/gift-card-tiers";
import { dateIsoToMmYy } from "@/lib/gift-card-format";
import { GiftCardVisual, giftCardClassName, GiftCardPurchaseForm } from "@/components/gift-card";

export default function GiftCardsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"my-cards" | "buy" | "transfer">("buy");
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Buy state
  const [buySuccess, setBuySuccess] = useState<{
    code: string;
    balance: string;
    expiryDate: string;
    amount: number;
  } | null>(null);

  // Transfer state
  const [recipientEmail, setRecipientEmail] = useState("");
  const [selectedCardCode, setSelectedCardCode] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMsg, setTransferMsg] = useState("");
  const [showTransferPin, setShowTransferPin] = useState(false);
  const [transferPinError, setTransferPinError] = useState("");

  // Renew state
  const [renewLoading, setRenewLoading] = useState<string | null>(null);
  const [renewMsg, setRenewMsg] = useState("");

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyGiftCards();
      setCards(data);
    } catch (e) {
      const msg = getAxiosErrorMessage(
        e,
        "Failed to load gift cards. Is the API running? (e.g. backend on port 8000 and NEXT_PUBLIC_API_URL in .env.)"
      );
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCardCode || !recipientEmail) return;
    setTransferMsg("");
    setTransferPinError("");
    setShowTransferPin(true);
  };

  const handleTransferPinConfirm = async (payment_pin: string) => {
    if (!selectedCardCode || !recipientEmail) return;
    setTransferLoading(true);
    setTransferPinError("");
    try {
      const res = await transferGiftCard({
        giftcard_code: selectedCardCode,
        recipient_email: recipientEmail,
        payment_pin,
      });
      const name = (res as { recipient_name?: string }).recipient_name || recipientEmail;
      setTransferMsg(`Transferred to ${name}.`);
      setShowTransferPin(false);
      setRecipientEmail("");
      setSelectedCardCode("");
      fetchCards();
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
        : undefined;
      setTransferMsg("");
      setTransferPinError(msg || "Transfer failed.");
    } finally {
      setTransferLoading(false);
    }
  };

  const handleRenew = async (code: string) => {
    setRenewLoading(code);
    setRenewMsg("");
    try {
      const res = await renewGiftCard({ giftcard_code: code });
      setRenewMsg(`Renewed! New expiry: ${res.expiry_date}`);
      fetchCards();
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
        : undefined;
      setRenewMsg(msg || "Renewal failed.");
    } finally {
      setRenewLoading(null);
    }
  };

  const activeCards = cards.filter((c) => c.status === "active");

  return (
    <div className="w-full max-w-screen-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">Gift Cards</h1>
        <p className="mt-1 text-muted-foreground">
          Purchase, manage, and transfer your gift cards.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mt-6 flex border-b border-border">
        {[
          { id: "buy" as const, label: "Purchase", icon: "M12 4.5v15m7.5-7.5h-15" },
          { id: "my-cards" as const, label: "My Cards", icon: "M4 7V4h16v3M9 20h6M12 4v16" },
          { id: "transfer" as const, label: "Transfer", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground",
              tab.id === "transfer" && "hidden"
            )}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── My Cards ── */}
      {activeTab === "my-cards" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col animate-pulse">
                  <div className="aspect-[85.6/54] w-full max-w-full rounded-[20px] bg-muted" />
                  <div className="pt-4 space-y-3">
                    <div className="h-4 bg-muted w-2/3" />
                    <div className="h-2 bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <Button variant="outline" className="mt-4" onClick={fetchCards}>
                Retry
              </Button>
            </div>
          ) : cards.length > 0 ? (
            <>
              {renewMsg && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text-sm">
                  {renewMsg}
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6 w-full">
                {cards.map((card) => {
                  const tier = getGiftCardTierFromAmount(Number(card.initial_amount));
                  const isExpired = card.status === "expired";
                  const isFrozen = card.status === "frozen";
                  const cardHolder =
                    [user?.first_name, user?.last_name]
                      .filter((x): x is string => Boolean(x && String(x).trim()))
                      .join(" ")
                      .trim() || "Member";
                  return (
                    <motion.div
                      key={card.giftcard_id}
                      className="flex w-full min-w-0 flex-col"
                    >
                      <GiftCardVisual
                        variant={giftCardVariantFromTier(tier)}
                        tier={tier}
                        cardNumber={card.code}
                        cardHolder={cardHolder}
                        validFrom={dateIsoToMmYy(card.created_at)}
                        validThru={dateIsoToMmYy(card.expiry_date)}
                        dimmed={isExpired || isFrozen}
                        statusSlot={
                          isExpired || isFrozen ? (
                            <span className="rounded-md bg-black/30 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                              {card.status}
                            </span>
                          ) : undefined
                        }
                        className={giftCardClassName.dashboard}
                      />

                      <div className="pt-4 sm:pt-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Remaining Balance</span>
                          <span className="font-heading font-bold text-primary">
                            ₹{Number(card.balance).toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-muted overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{
                              width: `${(Number(card.balance) / Number(card.initial_amount)) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-[10px] text-muted-foreground">
                            ₹{Number(card.balance).toLocaleString()} of ₹
                            {Number(card.initial_amount).toLocaleString()}
                          </p>
                          {/* <p className="text-[10px] text-muted-foreground">
                            Exp: {new Date(card.expiry_date).toLocaleDateString()}
                          </p> */}
                        </div>
                        {card.status === "active" && (
                          <div className="mt-3 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={() => handleRenew(card.code)}
                              disabled={renewLoading === card.code}
                            >
                              {renewLoading === card.code ? "Renewing..." : "Extend Expiry"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs hidden"
                              onClick={() => {
                                setSelectedCardCode(card.code);
                                setActiveTab("transfer");
                              }}
                            >
                              Transfer
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center bg-muted/50 border border-border">
                <svg
                  className="h-8 w-8 text-muted-foreground/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21"
                  />
                </svg>
              </div>
              <p className="mt-4 font-heading font-semibold text-foreground">No gift cards yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Purchase your first gift card to get started.
              </p>
              <Button
                variant="accent"
                className="mt-4 text-primary"
                onClick={() => setActiveTab("buy")}
              >
                Purchase Gift Card
              </Button>
            </div>
          )}
        </motion.div>
      )}

      {/* ── Purchase ── */}
      {activeTab === "buy" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <div
            className={cn(
              "overflow-hidden",
              buySuccess ? "border-0 bg-transparent" : "border border-border bg-white"
            )}
          >
            {!buySuccess && (
              <div className="bg-primary px-6 py-4">
                <h3 className="font-heading text-lg font-semibold text-white">Purchase a Gift Card</h3>
                <p className="text-sm text-white/60 mt-0.5">
                  Gift card purchase is processed securely. Card is bound to your account.
                </p>
              </div>
            )}

            <div className={cn("p-6", buySuccess && "px-0 sm:px-0 pt-2 pb-6")}>
              <AnimatePresence mode="wait">
                {buySuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <div className="mx-auto max-w-md rounded-2xl border border-accent/25 bg-gradient-to-b from-amber-50/80 via-white to-white px-6 py-8 sm:px-10 sm:py-10 shadow-[0_1px_0_rgba(201,162,39,0.12),0_24px_48px_-28px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.85)]">
                      <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
                      <div className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-amber-100/90 to-amber-50/80 ring-1 ring-accent/30">
                        <svg
                          className="h-7 w-7 text-amber-800/90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.75}
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="mt-5 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-amber-900/50">
                        Thank you
                      </p>
                      <h4 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Your gift of travel is ready
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                        Thankyou for purchasing the gift card. Your card is now in your account. You can view your card and balance anytime under{" "}
                        <span className="font-medium text-foreground">My Cards</span>.
                      </p>
                      <div className="mt-8 flex w-full max-w-sm mx-auto justify-center text-left">
                        <GiftCardVisual
                          variant={giftCardVariantFromTier(
                            getGiftCardTierFromAmount(buySuccess.amount)
                          )}
                          tier={getGiftCardTierFromAmount(buySuccess.amount)}
                          cardNumber={buySuccess.code}
                          cardHolder={
                            [user?.first_name, user?.last_name]
                              .filter((x): x is string => Boolean(x && String(x).trim()))
                              .join(" ")
                              .trim() || "Member"
                          }
                          validFrom={dateIsoToMmYy(new Date().toISOString())}
                          validThru={dateIsoToMmYy(buySuccess.expiryDate)}
                          className={giftCardClassName.dashboard}
                        />
                      </div>
                      <div className="mt-6 rounded-xl border border-accent/30 bg-gradient-to-b from-amber-50/50 to-amber-50/20 px-5 py-4 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-950/50">
                          Card reference (masked)
                        </p>
                        <p className="mt-2 font-mono text-xl font-bold tracking-[0.12em] text-amber-950 sm:text-2xl">
                          {maskGiftCardCode(buySuccess.code)}
                        </p>
                        <p className="mt-3 text-sm font-semibold text-amber-900/80">
                          Balance · ₹{Number(buySuccess.balance).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                      <Button
                        variant="accent"
                        className="min-w-[180px] text-primary"
                        onClick={() => {
                          setBuySuccess(null);
                          setActiveTab("my-cards");
                        }}
                      >
                        View My Cards
                      </Button>
                      <Button
                        variant="outline"
                        className="min-w-[180px] border-foreground/15"
                        onClick={() => setBuySuccess(null)}
                      >
                        Buy another
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <GiftCardPurchaseForm
                      user={user}
                      onPurchased={(data) => {
                        setBuySuccess({
                          code: data.code,
                          balance: data.balance,
                          expiryDate: data.expiryDate,
                          amount: data.amount,
                        });
                        fetchCards();
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Transfer (tab and card button are hidden; code kept for future use) ── */}
      {activeTab === "transfer" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <div className="border border-border bg-white overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h3 className="font-heading text-lg font-semibold text-white">Transfer a Gift Card</h3>
              <p className="text-sm text-white/60 mt-0.5">
                Your card will be frozen and a new card created for the recipient with the same
                balance.
              </p>
            </div>

            <div className="p-6">
              {transferMsg && (
                <div className="mb-4 px-4 py-3 text-sm border bg-emerald-50 border-emerald-200 text-emerald-700">
                  {transferMsg}
                </div>
              )}

              {activeCards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active cards available for transfer.</p>
                  <Button
                    variant="accent"
                    className="mt-4 text-primary"
                    onClick={() => setActiveTab("buy")}
                  >
                    Purchase a Gift Card
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleTransferSubmit} className="space-y-5 max-w-md">
                  <div>
                    <Label className="text-sm font-semibold">Select Card to Transfer</Label>
                    <div className="mt-2 space-y-2">
                      {activeCards.map((c) => {
                        const tier = getGiftCardTierFromAmount(Number(c.initial_amount));
                        const t = giftCardTierStyles[tier];
                        return (
                          <button
                            type="button"
                            key={c.code}
                            onClick={() => setSelectedCardCode(c.code)}
                            className={cn(
                              "flex w-full items-center gap-3 border-2 p-3 text-left transition-all",
                              selectedCardCode === c.code
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/40"
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br",
                                t.gradient
                              )}
                            >
                              <span
                                className={cn("text-[9px] font-bold", t.tierTitle)}
                              >
                                {tier[0]}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-sm font-semibold">{maskGiftCardCode(c.code)}</p>
                              <p className="text-xs text-muted-foreground">
                                Balance: ₹{Number(c.balance).toLocaleString()} · Exp:{" "}
                                {new Date(c.expiry_date).toLocaleDateString()}
                              </p>
                            </div>
                            {selectedCardCode === c.code && (
                              <svg
                                className="h-5 w-5 shrink-0 text-accent"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Recipient&apos;s Email</Label>
                    <p className="text-xs text-muted-foreground mt-0.5 mb-1.5">
                      Must be a registered EASYFLYNSTAY user.
                    </p>
                    <Input
                      type="email"
                      placeholder="friend@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                    />
                  </div>

                  {selectedCardCode && recipientEmail && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
                    >
                      <p className="font-semibold flex items-center gap-1.5">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        This action cannot be undone
                      </p>
                      <p className="mt-1">
                        Your card will be frozen and a new card created for the recipient with the same
                        balance for <span className="font-semibold">{recipientEmail}</span>.
                      </p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full text-primary font-bold"
                    disabled={transferLoading || !selectedCardCode || !recipientEmail}
                  >
                    {transferLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-primary/30 border-t-primary animate-spin rounded-full" />
                        Transferring...
                      </span>
                    ) : (
                      "Transfer Gift Card"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <PaymentPinEntry
        open={showTransferPin}
        onClose={() => { setShowTransferPin(false); setTransferPinError(""); }}
        onConfirm={handleTransferPinConfirm}
        title="Enter payment PIN"
        description="Enter your 6-digit PIN to authorize this transfer."
        loading={transferLoading}
        error={transferPinError}
      />
    </div>
  );
}
