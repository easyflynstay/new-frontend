/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FlightCard, type FlightCardProps } from "@/components/flights/FlightCard";
import api from "@/lib/api";

type SortKey = "price" | "duration" | "departure";

function parseDuration(d: string): number {
  let mins = 0;
  const hMatch = d.match(/(\d+)h/);
  const mMatch = d.match(/(\d+)m/);
  if (hMatch) mins += parseInt(hMatch[1]) * 60;
  if (mMatch) mins += parseInt(mMatch[1]);
  return mins;
}

function FlightsContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const passengers = searchParams.get("passengers") || "1";
  const cabin = searchParams.get("cabin") || "economy";

  const [flights, setFlights] = useState<FlightCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const resultsRef = useRef<HTMLDivElement>(null);

  const goToPage = (p: number) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fetchFlights = useCallback(async () => {
    if (!origin || !destination || !departure) {
      setError("Please provide origin, destination, and departure date.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = {
        origin,
        destination,
        departure,
        passengers,
        cabin,
        max: "50",
        currency: "INR",
      };
      if (returnDate) params["return"] = returnDate;

      const res = await api.get<FlightCardProps[]>("/flights/search", { params });
      setFlights(res.data);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      let msg = "Unable to fetch flights. Please try again.";
      if (typeof detail === "string") {
        msg = detail;
      } else if (Array.isArray(detail) && detail.length > 0) {
        // Pydantic-style error list
        const first = detail[0];
        if (first?.msg) {
          msg = String(first.msg);
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [origin, destination, departure, returnDate, passengers, cabin]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const sorted = [...flights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "duration") return parseDuration(a.duration) - parseDuration(b.duration);
    return a.departureTime.localeCompare(b.departureTime);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative h-44 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1920&h=350&fit=crop"
            alt="Airplane in sky"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex h-full items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mx-auto max-w-4xl px-4 text-white"
            >
              <h1 className="font-heading text-2xl font-bold md:text-3xl">Flight Results</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-xl font-semibold">{origin}</span>
                <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
                <span className="text-xl font-semibold">{destination}</span>
                {returnDate && (
                  <span className="border border-white/30 bg-white/10 px-2 py-0.5 text-xs">Round trip</span>
                )}
                {departure && (
                  <span className="text-sm text-white/80">{departure}</span>
                )}
                {!loading && (
                  <span className="border border-accent/50 bg-accent/20 px-2 py-0.5 text-xs text-accent">
                    {flights.length} flight{flights.length !== 1 ? "s" : ""} found
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Link
                  href={{
                    pathname: "/",
                    query: {
                      origin,
                      destination,
                      departure,
                      return: returnDate || undefined,
                      passengers,
                      cabin,
                    },
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-white/90 underline-offset-2 hover:underline"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Modify search
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10">
          {/* Sort bar + top pagination */}
          {!loading && !error && flights.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {sorted.length} flight{sorted.length !== 1 ? "s" : ""} found · sorted by {sortBy} (low to high)
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  {(["price", "duration", "departure"] as SortKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setSortBy(key); goToPage(1); }}
                      className={`border px-3 py-1.5 text-xs font-medium transition-colors ${sortBy === key
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:bg-muted"
                        }`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-1 border-l border-border pl-3">
                    <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative mb-6">
                <div className="h-16 w-16 border-4 border-muted border-t-accent animate-spin rounded-full" />
                <svg
                  className="absolute inset-0 m-auto h-6 w-6 text-accent"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <p className="font-heading text-lg font-semibold text-primary">Searching flights...</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Finding the best {cabin} fares from {origin} to {destination}
              </p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 flex h-16 w-16 items-center justify-center bg-red-50 border border-red-200">
                <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="font-heading text-lg font-semibold text-primary">No flights found</p>
              <p className="mt-1 max-w-md text-center text-sm text-muted-foreground">{error}</p>
              <Link href="/" className="mt-4">
                <button className="border border-accent bg-accent/10 px-6 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">
                  Search again
                </button>
              </Link>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && flights.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 flex h-16 w-16 items-center justify-center bg-muted">
                <svg className="h-8 w-8 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <p className="font-heading text-lg font-semibold text-primary">No flights available</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try different dates or airports for more results.
              </p>
              <Link href="/" className="mt-4">
                <button className="border border-accent bg-accent/10 px-6 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">
                  Modify search
                </button>
              </Link>
            </div>
          )}

          {/* Flight results */}
          {!loading && !error && paginated.length > 0 && (
            <motion.div
              ref={resultsRef}
              initial="hidden"
              animate="visible"
              key={page}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
              }}
              className="space-y-4"
            >
              {paginated.map((f) => (
                <motion.div
                  key={f.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                >
                  <FlightCard
                    {...f}
                    departureDate={departure}
                    returnDate={returnDate || undefined}
                    passengers={passengers}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination controls below results */}
          {!loading && !error && sorted.length > 0 && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-8"
              aria-label="Flights pagination"
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(1)}
                  disabled={page === 1}
                  className="border border-border px-3 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  aria-label="First page"
                >
                  First
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="border border-border px-3 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  aria-label="Previous page"
                >
                  Previous
                </button>
              </div>
              <div className="flex items-center gap-2 px-4">
                <span className="text-sm font-medium text-foreground">
                  Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                </span>
                <span className="text-xs text-muted-foreground">
                  ({(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length})
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="border border-border px-3 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  aria-label="Next page"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(totalPages)}
                  disabled={page === totalPages}
                  className="border border-border px-3 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
                  aria-label="Last page"
                >
                  Last
                </button>
              </div>
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 border-4 border-muted border-t-accent animate-spin rounded-full" />
        </div>
      }
    >
      <FlightsContent />
    </Suspense>
  );
}
