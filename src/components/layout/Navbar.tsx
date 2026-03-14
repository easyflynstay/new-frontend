"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/track-booking", label: "TRACK BOOKING" },
  { href: "/gift-cards", label: "GIFT CARDS" },
  { href: "/blog", label: "BLOG" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [advisoryClosed, setAdvisoryClosed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <AnimatePresence>
        {!advisoryClosed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2 bg-accent px-4 py-2 text-sm text-primary">
              <span className="animate-shimmer">Travel Advisory: Check your booking status for any route updates.</span>
              <button type="button" aria-label="Close advisory" className="ml-2 p-1 hover:bg-accent-foreground/10" onClick={() => setAdvisoryClosed(true)}>×</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="border-b border-border bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-full.svg" alt="Easyflynstay" width={320} height={80} className="h-16 w-auto sm:h-20 sm:w-auto" priority />
          </Link>
          <div className="flex items-center gap-4 text-sm text-charcoal">
            <span className="hidden sm:inline font-medium">PREMIUM TRAVEL EXPERIENCE</span>
            <span className="hidden sm:inline font-medium">24/7 CONCIERGE</span>
            <span className="font-semibold text-accent">+91 63 66 02 88 63</span>
            {!user && (
              <Link href="/admin" className="ml-auto font-medium text-primary hover:underline">Admin Login</Link>
            )}
          </div>
        </div>
      </div>
      <nav className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-2">
          <button
            type="button"
            className="mr-2 p-2 text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <div className={cn("flex-wrap items-center gap-1", mobileOpen ? "flex w-full flex-col md:flex-row md:w-auto" : "hidden md:flex")}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10",
                  pathname === link.href && "bg-accent text-primary"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center bg-accent text-primary font-bold text-xs">
                    {user.first_name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden sm:inline">{user.first_name}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 top-full mt-1 w-48 bg-white border border-border shadow-card-hover z-50"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-foreground">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                        </svg>
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/gift-cards"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
                        </svg>
                        My Gift Cards
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        My Bookings
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login"><Button variant="accent" size="sm" className="text-primary">MY TRIPS</Button></Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
