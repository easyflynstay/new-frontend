"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  getMyGiftCards,
  transferGiftCard,
  renewGiftCard,
  type GiftCard,
} from "@/services/giftcards";

function tierFromAmount(amount: number) {
  if (amount >= 5000) return { tier: "Black", gradient: "from-gray-900 via-gray-800 to-gray-900", textColor: "text-gray-100" };
  if (amount >= 1000) return { tier: "Gold", gradient: "from-amber-400 via-yellow-300 to-amber-500", textColor: "text-amber-900" };
  return { tier: "Silver", gradient: "from-slate-300 via-slate-200 to-slate-400", textColor: "text-slate-700" };
}

export default function GiftCardsPage() {
  const [activeTab, setActiveTab] = useState<"my-cards" | "send" | "redeem">("my-cards");
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [recipientEmail, setRecipientEmail] = useState("");
  const [selectedCardCode, setSelectedCardCode] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMsg, setTransferMsg] = useState("");

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
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Transfer failed.";
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
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Renewal failed.";
      setRenewMsg(msg);
    } finally {
      setRenewLoading(null);
    }
  };

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">Gift Cards</h1>
        <p className="mt-1 text-muted-foreground">Manage your gift cards, send to friends, or renew expiring cards.</p>
      </motion.div>

      <div className="mt-6 flex border-b border-border">
        {[
          { id: "my-cards" as const, label: "My Cards" },
          { id: "send" as const, label: "Transfer Card" },
          { id: "redeem" as const, label: "Buy New" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* My Cards */}
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
              <Button variant="outline" className="mt-4" onClick={fetchCards}>Retry</Button>
            </div>
          ) : cards.length > 0 ? (
            <>
              {renewMsg && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 text-sm">{renewMsg}</div>
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
                      <div className={cn("relative h-40 bg-gradient-to-br p-5 flex flex-col justify-between", gradient, (isExpired || isFrozen) && "opacity-60")}>
                        <div className="absolute inset-0 opacity-15">
                          <svg className="h-full w-full" viewBox="0 0 300 160" fill="none">
                            <circle cx="260" cy="30" r="90" fill="white" fillOpacity="0.15" />
                          </svg>
                        </div>
                        <div className="relative flex justify-between items-start">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">Easyflynstay</p>
                            <p className={cn("font-heading text-xl font-bold", textColor)}>{tier}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {(isExpired || isFrozen) && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-black/20 text-white">
                                {card.status}
                              </span>
                            )}
                            <svg className="h-5 w-5 text-black/20" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                          </div>
                        </div>
                        <div className="relative">
                          <p className="text-[9px] text-black/30">Code</p>
                          <p className="font-mono text-sm font-bold text-black/50">{card.code}</p>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Remaining Balance</span>
                          <span className="font-heading font-bold text-primary">₹{Number(card.balance).toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-muted overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${(Number(card.balance) / Number(card.initial_amount)) * 100}%` }}
                          />
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-[10px] text-muted-foreground">₹{Number(card.balance).toLocaleString()} of ₹{Number(card.initial_amount).toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">Exp: {new Date(card.expiry_date).toLocaleDateString()}</p>
                        </div>
                        {card.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full text-xs"
                            onClick={() => handleRenew(card.code)}
                            disabled={renewLoading === card.code}
                          >
                            {renewLoading === card.code ? "Renewing..." : "Extend Expiry (+6 months)"}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-muted-foreground/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
              </svg>
              <p className="mt-3 text-muted-foreground">No gift cards yet.</p>
              <p className="text-sm text-muted-foreground">Purchase one to get started!</p>
            </div>
          )}
          <div className="mt-6">
            <Link href="/gift-cards">
              <Button variant="accent" className="text-primary">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Purchase New Gift Card
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Transfer */}
      {activeTab === "send" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <div className="border border-border bg-white p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold mb-4">Transfer a Gift Card</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Transfer one of your active gift cards to another registered user. The card will be frozen on your account and a new one created for the recipient.
            </p>
            {transferMsg && (
              <div className={cn(
                "mb-4 px-4 py-3 text-sm border",
                transferMsg.includes("success") ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"
              )}>
                {transferMsg}
              </div>
            )}
            <form onSubmit={handleTransfer} className="space-y-4 max-w-md">
              <div>
                <Label>Select a Card to Transfer</Label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {cards.filter(c => c.status === "active").map((c) => (
                    <button
                      type="button"
                      key={c.code}
                      onClick={() => setSelectedCardCode(c.code)}
                      className={cn(
                        "border-2 px-4 py-2 text-sm transition-colors",
                        selectedCardCode === c.code ? "border-accent bg-accent/10" : "border-border hover:border-accent"
                      )}
                    >
                      {c.code} (₹{Number(c.balance).toLocaleString()})
                    </button>
                  ))}
                  {cards.filter(c => c.status === "active").length === 0 && (
                    <p className="text-sm text-muted-foreground">No active cards to transfer.</p>
                  )}
                </div>
              </div>
              <div>
                <Label>Recipient&apos;s Email</Label>
                <Input
                  type="email"
                  className="mt-1"
                  placeholder="friend@example.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                className="text-primary"
                disabled={transferLoading || !selectedCardCode || !recipientEmail}
              >
                {transferLoading ? "Transferring..." : "Transfer Gift Card"}
              </Button>
            </form>
          </div>
        </motion.div>
      )}

      {/* Buy New */}
      {activeTab === "redeem" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <div className="border border-border bg-white p-6 shadow-card">
            <h3 className="font-heading text-lg font-semibold mb-2">Buy a New Gift Card</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Purchase a gift card for yourself or to transfer to someone later. Payment is processed via Razorpay.
            </p>
            <Link href="/gift-cards">
              <Button variant="accent" className="text-primary">
                Go to Gift Card Store
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
