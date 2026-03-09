"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getMyGiftCards, type GiftCard } from "@/services/giftcards";

const recentActivity = [
  { action: "Booking confirmed", detail: "BLR → JFK · Business Class", time: "2 hours ago", icon: "✓", color: "bg-emerald-500" },
  { action: "Wallet credited", detail: "+$500.00 added to wallet", time: "1 day ago", icon: "$", color: "bg-blue-500" },
  { action: "Gift card purchased", detail: "Gold Card — $1,000", time: "3 days ago", icon: "★", color: "bg-amber-500" },
  { action: "Flight completed", detail: "JFK → BLR · Jan 10, 2026", time: "2 months ago", icon: "✈", color: "bg-muted-foreground" },
];

const quickActions = [
  { label: "Book a Flight", href: "/booking", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg> },
  { label: "Track Booking", href: "/track-booking", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
  { label: "Send Gift Card", href: "/dashboard/gift-cards", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" /></svg> },
  { label: "Contact Support", href: "/contact", icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);

  useEffect(() => {
    getMyGiftCards().then(setGiftCards).catch(() => {});
  }, []);

  const totalGiftCardBalance = giftCards.reduce((sum, c) => sum + Number(c.balance), 0);
  const activeCards = giftCards.filter((c) => c.status === "active");

  const stats = [
    {
      label: "Gift Card Balance",
      value: `₹${totalGiftCardBalance.toLocaleString()}`,
      change: `${activeCards.length} active card${activeCards.length !== 1 ? "s" : ""}`,
      changeColor: "text-emerald-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
      ),
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Upcoming Flights",
      value: "0",
      change: "No upcoming flights",
      changeColor: "text-blue-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Gift Cards",
      value: String(giftCards.length),
      change: activeCards.length > 0 ? `${activeCards.length} active` : "No cards yet",
      changeColor: "text-accent",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Member Since",
      value: user?.created_at ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—",
      change: "Premium Member",
      changeColor: "text-purple-600",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
          Welcome back, {user?.first_name || "Traveler"}
        </h1>
        <p className="mt-1 text-muted-foreground">Here&apos;s a summary of your travel account.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={itemVariants}
            className="border border-border bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-foreground">{s.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center ${s.bg} ${s.iconColor}`}>
                {s.icon}
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${s.changeColor}`}>{s.change}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 border border-border bg-white shadow-card">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Recent Activity</h2>
            <Link href="/dashboard/bookings" className="text-xs font-medium text-accent hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center text-white text-xs font-bold ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-white shadow-card">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-heading text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((qa) => (
              <Link key={qa.label} href={qa.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-accent/5 transition-colors cursor-pointer"
                >
                  <span className="text-accent">{qa.icon}</span>
                  {qa.label}
                  <svg className="ml-auto h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </motion.div>
              </Link>
            ))}
          </div>

          {giftCards.length > 0 && (
            <div className="mx-4 mb-4 border-2 border-accent/30 bg-accent/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Top Gift Card</p>
              <p className="mt-1 font-mono text-sm font-bold text-foreground">{giftCards[0].code}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Balance</span>
                <span className="font-heading font-bold text-accent">₹{Number(giftCards[0].balance).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">Expires {new Date(giftCards[0].expiry_date).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
