"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  getWallet,
  createWalletAddOrder,
  verifyWalletPayment,
  type WalletTransaction,
} from "@/services/wallet";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

const PRESET_AMOUNTS = [100, 250, 500, 1000];

export default function WalletPage() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  const fetchWallet = useCallback(async () => {
    try {
      const w = await getWallet();
      setBalance(w.balance);
      setTransactions(w.transactions);
    } catch {
      setBalance(0);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const amountToAdd = selectedAmount ?? (customAmount ? parseFloat(customAmount) : 0);
  const isValidAmount = amountToAdd >= 1;

  const handleAddFunds = async () => {
    if (!isValidAmount) return;
    setAddError("");
    setAddLoading(true);
    try {
      const order = await createWalletAddOrder(amountToAdd);
      await loadRazorpayScript();
      openRazorpayCheckout({
        orderId: order.order_id,
        amountPaise: order.amount,
        currency: order.currency,
        userName: user ? `${user.first_name} ${user.last_name}` : undefined,
        userEmail: user?.email,
        onSuccess: async (res) => {
          await verifyWalletPayment({
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
          });
          await fetchWallet();
          setShowAdd(false);
          setSelectedAmount(null);
          setCustomAmount("");
        },
        onDismiss: () => setAddLoading(false),
      });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        (err as Error)?.message ||
        "Failed to add funds.";
      setAddError(msg);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">Wallet</h1>
        <p className="mt-1 text-muted-foreground">Manage your balance, add funds, and view transaction history.</p>
      </motion.div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-10 w-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0a2e5c] text-white shadow-xl">
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 600 300" fill="none">
                  <circle cx="500" cy="80" r="200" fill="white" fillOpacity="0.15" />
                  <circle cx="100" cy="250" r="120" fill="white" fillOpacity="0.1" />
                </svg>
              </div>
              <div className="relative p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Available Balance</p>
                    <p className="mt-2 font-heading text-4xl font-bold">
                      ₹{balance.toLocaleString("en-IN")}
                      <span className="text-lg text-white/50">.00</span>
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center bg-accent">
                    <span className="font-heading text-lg font-bold text-primary">E</span>
                  </div>
                </div>
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Card holder</p>
                    <p className="text-sm font-medium">
                      {user ? `${user.first_name} ${user.last_name}` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Member Since</p>
                    <p className="text-sm font-medium">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Tier</p>
                    <p className="text-sm font-medium text-accent">Gold</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex gap-3"
          >
            <Button variant="accent" className="text-primary" onClick={() => setShowAdd(!showAdd)}>
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Money
            </Button>
          </motion.div>

          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 border border-border bg-white p-5 overflow-hidden"
            >
              <p className="font-heading font-semibold text-sm mb-3">Add funds to your wallet</p>
              {addError && (
                <p className="text-sm text-red-600 mb-3">{addError}</p>
              )}
              <div className="flex gap-3 mb-3">
                {PRESET_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(a);
                      setCustomAmount("");
                    }}
                    className={cn(
                      "border px-4 py-2 text-sm font-medium transition-colors",
                      selectedAmount === a ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-accent hover:bg-accent/5"
                    )}
                  >
                    ₹{a}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap items-center">
                <Input
                  placeholder="Custom amount (₹)"
                  type="number"
                  min={1}
                  className="max-w-[200px]"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                />
                <Button
                  variant="accent"
                  className="text-primary"
                  disabled={addLoading || !isValidAmount}
                  onClick={handleAddFunds}
                >
                  {addLoading ? "Opening…" : "Add Funds"}
                </Button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 border border-border bg-white shadow-card overflow-hidden"
          >
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Transaction History</h2>
              <span className="text-xs text-muted-foreground">{transactions.length} transactions</span>
            </div>
            <div className="divide-y divide-border">
              {transactions.length > 0 ? (
                transactions.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center",
                        t.type === "credit" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                      )}
                    >
                      {t.type === "credit" ? (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{t.description || t.type}</p>
                      <p className="text-xs text-muted-foreground">{t.reference_id || "—"}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          t.type === "credit" ? "text-emerald-600" : "text-red-500"
                        )}
                      >
                        {t.type === "credit" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{formatDate(t.created_at)}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="px-6 py-10 text-center text-muted-foreground">No transactions yet.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
