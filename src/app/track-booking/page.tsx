"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { trackBooking, getTicketDownloadUrl, type TrackBookingResponse } from "@/services/booking";

const statusConfig = {
  confirmed: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700", dot: "bg-emerald-500" },
  pending: { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-700", dot: "bg-amber-500" },
};

function formatDate(d: string): string {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function TrackBookingContent() {
  const searchParams = useSearchParams();
  const urlBookingId = searchParams.get("booking_id") || "";

  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<TrackBookingResponse | null>(null);

  useEffect(() => {
    if (urlBookingId) {
      setBookingId(urlBookingId);
      setLoading(true);
      setError("");
      trackBooking(urlBookingId)
        .then(setBooking)
        .catch(() => setError("Booking not found."))
        .finally(() => setLoading(false));
    }
  }, [urlBookingId]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;
    setLoading(true);
    setError("");
    setBooking(null);
    try {
      const data = await trackBooking(bookingId.trim(), email.trim() || undefined);
      setBooking(data);
    } catch {
      setError("Booking not found. Check the booking ID and email.");
    } finally {
      setLoading(false);
    }
  };

  const sc = statusConfig.confirmed;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative h-48 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1920&h=400&fit=crop"
            alt="Airport terminal"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h1 className="font-heading text-3xl font-bold md:text-4xl">Track Your Booking</h1>
              <p className="mt-2 text-white/80">View your e-ticket and booking details</p>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Search form - show when no booking in URL or when we need to search again */}
          {!urlBookingId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="border-2 overflow-hidden">
                <CardHeader className="bg-primary text-white">
                  <h2 className="font-heading text-lg font-semibold">Find your booking</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1">
                      <Label>Booking ID</Label>
                      <Input
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Email (optional)</Label>
                      <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button type="submit" variant="accent" className="text-primary h-10 px-8" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          Searching...
                        </span>
                      ) : "Track"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {loading && urlBookingId && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-12 w-12 border-4 border-muted border-t-accent animate-spin rounded-full" />
              <p className="mt-4 text-muted-foreground">Loading your ticket...</p>
            </div>
          )}

          {error && !booking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-4 text-center text-red-700"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence>
            {booking && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-10"
              >
                <div className="relative overflow-hidden border-2 border-border bg-white shadow-lg">
                  <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-accent">
                        <span className="font-heading text-lg font-bold text-primary">E</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-white">EASYFLYNSTAY</h3>
                        <p className="text-xs text-white/60">Electronic Ticket</p>
                      </div>
                    </div>
                    <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 border", sc.bg, sc.border)}>
                      <span className={cn("h-2 w-2 rounded-full", sc.dot)} />
                      <span className={cn("text-xs font-semibold uppercase", sc.text)}>Confirmed</span>
                    </div>
                  </div>

                  {/* PNR / Booking reference - PNR value "Will be updated soon" */}
                  <div className="border-b border-border bg-accent/5 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Booking Reference</span>
                      <p className="font-heading text-2xl font-bold text-primary tracking-widest">{booking.booking_id}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider block">PNR</span>
                      <p className="font-mono text-lg font-semibold text-primary">
                        {booking.pnr ? booking.pnr : <span className="text-muted-foreground italic">Will be updated soon</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Booked on</span>
                      <p className="text-sm font-medium">{formatDate(booking.created_at)}</p>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="px-6 py-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-center flex-1">
                        <p className="font-heading text-4xl font-bold text-primary">{booking.from_place}</p>
                        <p className="text-sm text-muted-foreground">Departure</p>
                        <p className="mt-2 text-lg font-semibold">{formatDate(booking.check_in)}</p>
                      </div>
                      <div className="flex-1 flex flex-col items-center px-4">
                        <div className="relative w-full flex items-center">
                          <div className="h-0.5 flex-1 bg-accent/40" />
                          <motion.div
                            animate={{ x: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="mx-2"
                          >
                            <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                          </motion.div>
                          <div className="h-0.5 flex-1 bg-accent/40" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{booking.trip_type === "round" ? "Round trip" : "One way"}</p>
                      </div>
                      <div className="text-center flex-1">
                        <p className="font-heading text-4xl font-bold text-primary">{booking.to_place}</p>
                        <p className="text-sm text-muted-foreground">Arrival</p>
                        <p className="mt-2 text-lg font-semibold">{booking.trip_type === "round" ? formatDate(booking.check_out) : formatDate(booking.check_in)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center px-0">
                    <div className="h-6 w-3 rounded-r-full bg-muted" />
                    <div className="flex-1 border-t-2 border-dashed border-border" />
                    <div className="h-6 w-3 rounded-l-full bg-muted" />
                  </div>

                  <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Passenger</span>
                      <p className="font-medium text-sm">{booking.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Class</span>
                      <p className="font-medium text-sm text-accent">{booking.class_type}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Travelers</span>
                      <p className="font-medium text-sm">{booking.travelers}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Contact</span>
                      <p className="font-medium text-sm">{booking.email}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</span>
                      <p className="font-medium text-sm">{booking.phone}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Departure</span>
                      <p className="font-medium text-sm">{formatDate(booking.check_in)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Return</span>
                      <p className="font-medium text-sm">{booking.trip_type === "round" ? formatDate(booking.check_out) : "—"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Booking ID</span>
                      <p className="font-mono text-sm font-medium">{booking.booking_id}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 px-6 py-3 flex flex-wrap items-center justify-between gap-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Please arrive at the airport at least 3 hours before departure for international flights.</p>
                    <div className="flex items-center gap-2">
                      {booking.ticket_path && (
                        <a href={getTicketDownloadUrl(booking.booking_id, email.trim() || undefined)} target="_blank" rel="noopener noreferrer" download>
                          <Button variant="accent" size="sm" className="text-xs text-primary">
                            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                            Download ticket
                          </Button>
                        </a>
                      )}
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => window.print()}>
                        <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"/></svg>
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function TrackBookingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 border-4 border-muted border-t-accent animate-spin rounded-full" /></div>}>
      <TrackBookingContent />
    </Suspense>
  );
}
