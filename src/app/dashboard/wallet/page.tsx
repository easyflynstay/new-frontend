"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const mockTx = [
  { id: "1", type: "credit" as const, amount: 500, date: "Mar 01, 2026", desc: "Added funds via card", method: "Visa •••• 4242" },
  { id: "2", type: "debit" as const, amount: 2899, date: "Mar 05, 2026", desc: "Booking BK-20260315-001", method: "Emirates BLR→JFK" },
  { id: "3", type: "credit" as const, amount: 150, date: "Feb 20, 2026", desc: "Referral bonus", method: "Reward" },
  { id: "4", type: "credit" as const, amount: 1000, date: "Feb 10, 2026", desc: "Gift card redeemed", method: "Gold Card" },
  { id: "5", type: "debit" as const, amount: 749, date: "Jan 28, 2026", desc: "Booking BK-20260110-000", method: "Qatar JFK→BLR" },
];

export default function WalletPage() {
  const [balance] = useState(1200);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">Wallet</h1>
        <p className="mt-1 text-muted-foreground">Manage your balance, add funds, and view transaction history.</p>
      </motion.div>

      {/* Wallet card */}
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
                <p className="mt-2 font-heading text-4xl font-bold">₹{balance.toLocaleString("en-IN")}<span className="text-lg text-white/50">.00</span></p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center bg-accent">
                <span className="font-heading text-lg font-bold text-primary">E</span>
              </div>
            </div>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Card holder</p>
                <p className="text-sm font-medium">John Smith</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Member Since</p>
                <p className="text-sm font-medium">Jan 2024</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Tier</p>
                <p className="text-sm font-medium text-accent">Gold</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex gap-3"
      >
        <Button variant="accent" className="text-primary" onClick={() => setShowAdd(!showAdd)}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Money
        </Button>
        <Button variant="outline">
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
          Transfer
        </Button>
      </motion.div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 border border-border bg-white p-5 overflow-hidden"
        >
          <p className="font-heading font-semibold text-sm mb-3">Add funds to your wallet</p>
          <div className="flex gap-3 mb-3">
            {[100, 250, 500, 1000].map((a) => (
              <button key={a} className="border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:bg-accent/5 transition-colors">₹{a}</button>
            ))}
          </div>
          <div className="flex gap-3">
            <Input placeholder="Custom amount" type="number" className="max-w-[200px]" />
            <Button variant="accent" className="text-primary">Add Funds</Button>
          </div>
        </motion.div>
      )}

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 border border-border bg-white shadow-card overflow-hidden"
      >
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Transaction History</h2>
          <span className="text-xs text-muted-foreground">{mockTx.length} transactions</span>
        </div>
        <div className="divide-y divide-border">
          {mockTx.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center",
                t.type === "credit" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              )}>
                {t.type === "credit" ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{t.desc}</p>
                <p className="text-xs text-muted-foreground">{t.method}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={cn("text-sm font-semibold", t.type === "credit" ? "text-emerald-600" : "text-red-500")}>
                  {t.type === "credit" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-muted-foreground">{t.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
