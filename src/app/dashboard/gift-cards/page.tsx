"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  getMyGiftCards,
  buyGiftCard,
  verifyGiftCardPayment,
  transferGiftCard,
  renewGiftCard,
  type GiftCard,
} from "@/services/giftcards";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";

function tierFromAmount(amount: number) {
  if (amount >= 250000) return { tier: "Signature", gradient: "from-gray-900 via-gray-800 to-gray-900", textColor: "text-gray-100" };
  if (amount >= 100000) return { tier: "Elite", gradient: "from-amber-400 via-yellow-300 to-amber-500", textColor: "text-amber-950" };
  return { tier: "Prime", gradient: "from-slate-300 via-slate-200 to-slate-400", textColor: "text-slate-700" };
}

const presetAmounts = [50000, 100000, 200000, 250000, 500000];

export default function GiftCardsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"my-cards" | "buy" | "transfer">("my-cards");
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Buy state
  const [buyAmount, setBuyAmount] = useState("");
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [buySuccess, setBuySuccess] = useState<{ code: string; balance: string } | null>(null);

  // Transfer state
  const [recipientEmail, setRecipientEmail] = useState("");
  const [selectedCardCode, setSelectedCardCode] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMsg, setTransferMsg] = useState("");

  // Renew state
  const [renewLoading, setRenewLoading] = useState<string | null>(null);
  const [renewMsg, setRenewMsg] = useState("");

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyGiftCards();
      setCards(data);
    } catch {
      setError("Failed to load gift cards.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(buyAmount);
    if (!amount || amount < 50000) {
      setBuyError("Please enter a valid amount (min ₹50,000 for Prime tier).");
      return;
    }
    setBuyLoading(true);
    setBuyError("");
    setBuySuccess(null);

    try {
      await loadRazorpayScript();
      const order = await buyGiftCard(amount);

      openRazorpayCheckout({
        orderId: order.order_id,
        amountPaise: order.amount,
        currency: order.currency,
        userName: user ? `${user.first_name} ${user.last_name}` : undefined,
        userEmail: user?.email,
        onSuccess: async (response) => {
          try {
            const result = await verifyGiftCardPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setBuySuccess({ code: result.code, balance: result.balance });
            setBuyAmount("");
            fetchCards();
          } catch (err: unknown) {
            const detail = err && typeof err === "object" && "response" in err
              ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
              : undefined;
            setBuyError(detail || "Payment verified but gift card creation failed.");
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
      const detail = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string } }; message?: string }).response?.data?.detail
        : (err as Error)?.message;
      setBuyError(detail || "Failed to initiate payment.");
      setBuyLoading(false);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCardCode || !recipientEmail) return;
    setTransferLoading(true);
    setTransferMsg("");
    try {
      await transferGiftCard({ giftcard_code: selectedCardCode, recipient_email: recipientEmail });
      setTransferMsg("Gift card transferred successfully! The recipient will receive an email.");
      setRecipientEmail("");
      setSelectedCardCode("");
      fetchCards();
    } catch (err: unknown) {
      const msg = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
        : undefined;
      setTransferMsg(msg || "Transfer failed.");
      setTransferMsg(msg);
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
      setRenewMsg(msg);
    } finally {
      setRenewLoading(null);
    }
  };

  const activeCards = cards.filter((c) => c.status === "active");

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">Gift Cards</h1>
        <p className="mt-1 text-muted-foreground">
          Purchase, manage, and transfer your gift cards.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mt-6 flex border-b border-border">
        {[
          { id: "my-cards" as const, label: "My Cards", icon: "M4 7V4h16v3M9 20h6M12 4v16" },
          { id: "buy" as const, label: "Purchase", icon: "M12 4.5v15m7.5-7.5h-15" },
          { id: "transfer" as const, label: "Transfer", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
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
            <div className="grid gap-6 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="border border-border bg-white shadow-card overflow-hidden animate-pulse">
                  <div className="h-40 bg-muted" />
                  <div className="p-4 space-y-3">
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
              <div className="grid gap-6 sm:grid-cols-2">
                {cards.map((card) => {
                  const { tier, gradient, textColor } = tierFromAmount(Number(card.initial_amount));
                  const isExpired = card.status === "expired";
                  const isFrozen = card.status === "frozen";
                  return (
                    <motion.div
                      key={card.giftcard_id}
                      whileHover={{ y: -4 }}
                      className="border border-border bg-white shadow-card overflow-hidden"
                    >
                      <div
                        className={cn(
                          "relative h-48 bg-gradient-to-br p-6 flex flex-col justify-between",
                          gradient,
                          (isExpired || isFrozen) && "opacity-60"
                        )}
                      >
                        <div className="absolute inset-0 opacity-15">
                          <svg className="h-full w-full" viewBox="0 0 300 192" fill="none">
                            <circle cx="260" cy="30" r="90" fill="white" fillOpacity="0.15" />
                          </svg>
                        </div>
                        <div className="relative flex justify-between items-start">
                          <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/40">
                              EasyFlyNStay
                            </p>
                            <p className={cn("font-heading text-xl font-bold", textColor)}>
                              {tier}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {(isExpired || isFrozen) && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/20 text-white">
                                {card.status}
                              </span>
                            )}
                            <svg
                              className="h-5 w-5 text-black/20"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <p className="text-[9px] text-black/30 uppercase tracking-wider">Gift Card Number</p>
                          <p className="font-mono text-base font-bold tracking-widest text-black/60">{card.code}</p>
                        </div>
                      </div>

                      <div className="p-4">
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
                          <p className="text-[10px] text-muted-foreground">
                            Exp: {new Date(card.expiry_date).toLocaleDateString()}
                          </p>
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
                              className="flex-1 text-xs"
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
          <div className="border border-border bg-white shadow-card overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h3 className="font-heading text-lg font-semibold text-white">Purchase a Gift Card</h3>
              <p className="text-sm text-white/60 mt-0.5">
                Processed securely via Razorpay. Card is bound to your account.
              </p>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {buySuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center bg-emerald-50 border border-emerald-200">
                      <svg
                        className="h-8 w-8 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="mt-4 font-heading text-xl font-bold text-primary">
                      Gift Card Created!
                    </h4>
                    <p className="mt-2 text-muted-foreground">Your gift card is ready to use.</p>
                    <div className="mt-4 inline-block border-2 border-accent bg-accent/5 px-6 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Your Gift Card Code
                      </p>
                      <p className="mt-1 font-mono text-2xl font-bold text-primary tracking-wider">
                        {buySuccess.code}
                      </p>
                      <p className="mt-1 text-sm text-accent font-semibold">
                        Balance: ₹{Number(buySuccess.balance).toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center gap-3">
                      <Button
                        variant="accent"
                        className="text-primary"
                        onClick={() => {
                          setBuySuccess(null);
                          setActiveTab("my-cards");
                        }}
                      >
                        View My Cards
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setBuySuccess(null);
                          setBuyAmount("");
                        }}
                      >
                        Buy Another
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBuy}
                    className="max-w-md"
                  >
                    {buyError && (
                      <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                        {buyError}
                      </div>
                    )}

                    <Label className="text-sm font-semibold">Select Amount (₹)</Label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {presetAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setBuyAmount(String(amt))}
                          className={cn(
                            "border-2 px-4 py-2.5 text-sm font-semibold transition-all",
                            buyAmount === String(amt)
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-border hover:border-accent/40 text-foreground"
                          )}
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Label className="text-xs text-muted-foreground">Or enter custom amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                          ₹
                        </span>
                        <Input
                          type="number"
                          min="50000"
                          step="1"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="e.g. 50000, 100000"
                          className="pl-8 h-12 text-lg font-semibold"
                        />
                      </div>
                    </div>

                    {buyAmount && parseFloat(buyAmount) > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 border border-border bg-muted/30 p-4"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Gift card value</span>
                          <span className="font-semibold">
                            ₹{parseFloat(buyAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Tier</span>
                          <span className="font-semibold">
                            {tierFromAmount(parseFloat(buyAmount)).tier}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-muted-foreground">Valid for</span>
                          <span className="font-semibold">6 months</span>
                        </div>
                        <div className="mt-3 border-t border-border pt-3 flex items-center justify-between">
                          <span className="font-semibold">Total payable</span>
                          <span className="font-heading text-xl font-bold text-primary">
                            ₹{parseFloat(buyAmount).toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="mt-6 w-full text-primary font-bold"
                      disabled={buyLoading || !buyAmount || parseFloat(buyAmount) < 1}
                    >
                      {buyLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-primary/30 border-t-primary animate-spin rounded-full" />
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
                          Proceed to Payment
                        </>
                      )}
                    </Button>

                    <p className="mt-3 text-center text-[11px] text-muted-foreground">
                      Secured by Razorpay. Supports UPI, Cards, Net Banking & Wallets.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Transfer ── */}
      {activeTab === "transfer" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <div className="border border-border bg-white shadow-card overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <h3 className="font-heading text-lg font-semibold text-white">Transfer a Gift Card</h3>
              <p className="text-sm text-white/60 mt-0.5">
                Your card will be frozen and a new card created for the recipient with the same
                balance.
              </p>
            </div>

            <div className="p-6">
              {transferMsg && (
                <div
                  className={cn(
                    "mb-4 px-4 py-3 text-sm border",
                    transferMsg.includes("success")
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  )}
                >
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
                <form onSubmit={handleTransfer} className="space-y-5 max-w-md">
                  <div>
                    <Label className="text-sm font-semibold">Select Card to Transfer</Label>
                    <div className="mt-2 space-y-2">
                      {activeCards.map((c) => {
                        const { tier, gradient } = tierFromAmount(Number(c.initial_amount));
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
                                "flex h-10 w-10 shrink-0 items-center justify-center bg-gradient-to-br",
                                gradient
                              )}
                            >
                              <span className="text-[9px] font-bold text-white/80">{tier[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-sm font-semibold">{c.code}</p>
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
                      Must be a registered Easyflynstay user.
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
                        Card <span className="font-mono font-bold">{selectedCardCode}</span> will
                        be frozen on your account. A new card with the full balance will be created
                        for <span className="font-semibold">{recipientEmail}</span>.
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
    </div>
  );
}
