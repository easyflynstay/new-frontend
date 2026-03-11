"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getMyBookings, type MyBookingItem } from "@/services/booking";

function formatDate(iso: string) {
  try {
    return new Date(iso.slice(0, 10)).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

function BookingCard({
  b,
  index,
}: {
  b: MyBookingItem;
  index: number;
}) {
  const isCompleted = b.status === "completed";
  const statusLabel = isCompleted ? "Completed" : "Confirmed";
  const statusColor = isCompleted
    ? "bg-blue-50 text-blue-700 border-blue-300"
    : "bg-emerald-50 text-emerald-700 border-emerald-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-border bg-white shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/20 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-white text-xs font-bold">
            {b.from_place?.slice(0, 1) || "—"}
          </div>
          <div>
            <p className="text-sm font-semibold">{b.from_place} → {b.to_place}</p>
            <p className="text-[10px] text-muted-foreground">{b.booking_id}</p>
          </div>
        </div>
        <span className={cn("border px-2.5 py-0.5 text-xs font-semibold", statusColor)}>
          {statusLabel}
        </span>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="font-heading text-2xl font-bold text-primary">{b.from_place}</p>
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="mt-1 text-lg font-semibold">{formatDate(b.check_in)}</p>
          </div>
          <div className="flex-1 mx-6 flex flex-col items-center">
            <p className="text-[10px] text-muted-foreground">Trip</p>
            <div className="relative w-full flex items-center">
              <div className="h-px flex-1 bg-accent/40" />
              <svg className="mx-1 h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              <div className="h-px flex-1 bg-accent/40" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{b.class_type}</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-2xl font-bold text-primary">{b.to_place}</p>
            <p className="text-xs text-muted-foreground">Arrival</p>
            <p className="mt-1 text-lg font-semibold">{b.check_out ? formatDate(b.check_out) : "—"}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-muted/10 px-5 py-3">
        <div className="flex gap-5 text-xs text-muted-foreground">
          <span><strong className="text-foreground">Date:</strong> {formatDate(b.check_in)}</span>
          <span><strong className="text-foreground">Travelers:</strong> {b.travelers}</span>
        </div>
        <Link href={`/track-booking?booking_id=${encodeURIComponent(b.booking_id)}`}>
          <Button variant="outline" size="sm" className="text-xs">View Details</Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<MyBookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    setError(null);
    getMyBookings()
      .then((list) => {
        setBookings(list);
      })
      .catch((err: unknown) => {
        const msg = err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string }; status?: number } }).response?.data?.detail
          : (err as Error)?.message;
        const status = err && typeof err === "object" && "response" in err
          ? (err as { response?: { status?: number } }).response?.status;
        if (status === 401) {
          setError("Please sign in again to view your bookings.");
        } else {
          setError(msg && String(msg).trim() ? String(msg) : "Could not load bookings. Please try again.");
        }
        setBookings([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const upcoming = bookings.filter((b) => b.status === "confirmed");
  const past = bookings.filter((b) => b.status === "completed");

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="mt-1 text-muted-foreground">View and manage your upcoming and past flights.</p>
      </motion.div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-10 w-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-amber-800 font-medium">{error}</p>
          <Button variant="outline" className="mt-4" onClick={fetchBookings}>
            Try again
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <h2 className="font-heading text-lg font-semibold text-foreground">Upcoming Flights</h2>
            </div>
            <div className="space-y-4">
              {upcoming.length > 0 ? (
                upcoming.map((b, i) => <BookingCard key={b.booking_id} b={b} index={i} />)
              ) : (
                <p className="text-muted-foreground py-6 text-center border border-dashed border-border rounded-lg">
                  No upcoming flights.
                </p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <h2 className="font-heading text-lg font-semibold text-foreground">Past Flights</h2>
            </div>
            <div className="space-y-4">
              {past.length > 0 ? (
                past.map((b, i) => <BookingCard key={b.booking_id} b={b} index={i} />)
              ) : (
                <p className="text-muted-foreground py-6 text-center border border-dashed border-border rounded-lg">
                  No past flights.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
