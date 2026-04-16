/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FlightsSearchStrip } from "@/components/flights/FlightsSearchStrip";
import { FlightCard, type FlightCardProps } from "@/components/flights/FlightCard";
import {
  FlightFiltersPanel,
  type FlightFiltersValue,
  activeFilterCount,
} from "@/components/flights/FlightFiltersPanel";
import api from "@/lib/api";
import {
  buildAirlineOptions,
  flightDisplayPrice,
  getPriceBounds,
  hourInDepartureBucket,
  parseDepartureHour,
  type DepartureBucket,
} from "@/lib/flightSearchUtils";
import { cn } from "@/lib/utils";

type SortKey = "price" | "duration" | "departure";

function parseDuration(d: string): number {
  let mins = 0;
  const hMatch = d.match(/(\d+)h/);
  const mMatch = d.match(/(\d+)m/);
  if (hMatch) mins += parseInt(hMatch[1]) * 60;
  if (mMatch) mins += parseInt(mMatch[1]);
  return mins;
}

const defaultFilters = (priceMin: number, priceMax: number): FlightFiltersValue => ({
  stops: "any",
  excludedAirlineCodes: [],
  depBuckets: [] as DepartureBucket[],
  priceMin,
  priceMax,
});

function FlightsContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const passengers = searchParams.get("passengers") || "1";
  const cabin = searchParams.get("cabin") || "economy";
  const currency = searchParams.get("currency") || "INR";

  const searchKey = `${origin}|${destination}|${departure}|${returnDate}|${cabin}|${passengers}|${currency}`;

  const [flights, setFlights] = useState<FlightCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FlightFiltersValue>(() => defaultFilters(0, 0));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const PER_PAGE = 10;
  const prevSearchKey = useRef(searchKey);

  const goToPage = (p: number) => {
    setPage(p);
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
        max: "250",
        currency,
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
        const first = detail[0];
        if (first?.msg) {
          msg = String(first.msg);
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [origin, destination, departure, returnDate, passengers, cabin, currency]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  useEffect(() => {
    if (prevSearchKey.current !== searchKey) {
      prevSearchKey.current = searchKey;
      setFlights([]);
      setFilters(defaultFilters(0, 0));
      setPage(1);
      setMobileFiltersOpen(false);
    }
  }, [searchKey]);

  const priceBounds = useMemo(() => getPriceBounds(flights), [flights]);

  useEffect(() => {
    if (!loading && flights.length > 0) {
      const b = getPriceBounds(flights);
      setFilters((f) => ({
        ...f,
        priceMin: b.min,
        priceMax: b.max,
      }));
    }
  }, [loading, flights]);

  const airlineOptions = useMemo(() => buildAirlineOptions(flights), [flights]);

  const filteredFlights = useMemo(() => {
    return flights.filter((f) => {
      const code = (f.airlineCode || "").toUpperCase().slice(0, 2) || "—";
      if (filters.excludedAirlineCodes.includes(code)) return false;

      const p = flightDisplayPrice(f);
      if (priceBounds.max > priceBounds.min) {
        if (p < filters.priceMin || p > filters.priceMax) return false;
      }

      if (filters.stops === "nonstop" && f.stops !== 0) return false;
      if (filters.stops === "one" && f.stops !== 1) return false;
      if (filters.stops === "two_plus" && f.stops < 2) return false;

      if (filters.depBuckets.length > 0) {
        const h = parseDepartureHour(f.departureTime);
        const matches = filters.depBuckets.some((b) => hourInDepartureBucket(h, b));
        if (!matches) return false;
      }

      return true;
    });
  }, [flights, filters, priceBounds.max, priceBounds.min]);

  const sorted = useMemo(() => {
    return [...filteredFlights].sort((a, b) => {
      if (sortBy === "price") return flightDisplayPrice(a) - flightDisplayPrice(b);
      if (sortBy === "duration") return parseDuration(a.duration) - parseDuration(b.duration);
      return a.departureTime.localeCompare(b.departureTime);
    });
  }, [filteredFlights, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const filterBadge = activeFilterCount(filters, priceBounds);

  const clearFilters = () => {
    const b = getPriceBounds(flights);
    setFilters(defaultFilters(b.min, b.max));
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      {/* Inline search strip — same flow as homepage (router → /flights?… → fetch) */}
      <header className="relative z-20 overflow-visible border-b border-slate-200/90 bg-gradient-to-b from-slate-50 to-white shadow-sm">
        <div className="h-1 bg-gradient-to-r from-primary/30 via-accent to-primary/30" aria-hidden />
        <FlightsSearchStrip
          syncKey={searchKey}
          originCode={origin}
          destinationCode={destination}
          departure={departure}
          returnDate={returnDate}
          passengers={passengers}
          cabin={cabin}
          currency={currency}
          resultBadge={
            !loading && !error && flights.length > 0
              ? { filteredCount: filteredFlights.length, totalCount: flights.length }
              : null
          }
        />
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-5 lg:py-8">
          {/* Mobile filter toggle */}
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((o) => !o)}
              className="flex w-full items-center justify-between border border-border bg-card px-4 py-3 text-left text-sm font-semibold shadow-sm"
            >
              <span>Filters {filterBadge > 0 ? `(${filterBadge} active)` : ""}</span>
              <svg
                className={cn("h-5 w-5 transition-transform", mobileFiltersOpen && "rotate-180")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            {/* Filters sidebar */}
            <aside
              className={cn(
                "w-full shrink-0 lg:sticky lg:top-20 lg:w-[280px] xl:w-[300px]",
                !mobileFiltersOpen && "hidden lg:block"
              )}
            >
              {!loading && !error && flights.length > 0 ? (
                <FlightFiltersPanel
                  value={filters}
                  onChange={(next) => {
                    setFilters(next);
                    setPage(1);
                  }}
                  onClear={clearFilters}
                  priceBounds={priceBounds}
                  airlines={airlineOptions}
                  filteredCount={filteredFlights.length}
                  totalCount={flights.length}
                />
              ) : (
                <div className="hidden border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground lg:block">
                  Filters appear after results load.
                </div>
              )}
            </aside>

            {/* Results column */}
            <div className="min-w-0 flex-1">
              {/* Sort toolbar */}
              {!loading && !error && flights.length > 0 && (
                <div className="mb-4 flex flex-col gap-3 border border-border bg-card px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{sorted.length}</span> flights
                    <span className="mx-2 text-border">·</span>
                    Sort by lowest first
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(["price", "duration", "departure"] as SortKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSortBy(key);
                          goToPage(1);
                        }}
                        className={cn(
                          "border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                          sortBy === key
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:bg-muted"
                        )}
                      >
                        {key === "departure" ? "Departure time" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-card py-20 shadow-sm">
                  <div className="relative mb-6">
                    <div className="h-14 w-14 border-4 border-muted border-t-accent animate-spin rounded-full" />
                    <svg
                      className="absolute inset-0 m-auto h-5 w-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                  <p className="font-heading text-lg font-semibold text-primary">Searching flights…</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {origin} to {destination} · {cabin}
                  </p>
                </div>
              )}

              {!loading && error && (
                <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-card py-20 shadow-sm">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center border border-red-200 bg-red-50">
                    <svg className="h-7 w-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <p className="font-heading text-lg font-semibold text-primary">No flights found</p>
                  <p className="mt-1 max-w-md text-center text-sm text-muted-foreground">{error}</p>
                  <Link href="/" className="mt-4">
                    <span className="inline-flex border-2 border-accent bg-accent px-6 py-2 text-xs font-bold uppercase tracking-wide text-primary">
                      Search again
                    </span>
                  </Link>
                </div>
              )}

              {!loading && !error && flights.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-card py-20 shadow-sm">
                  <p className="font-heading text-lg font-semibold text-primary">No flights available</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try different dates or airports.</p>
                  <Link href="/" className="mt-4">
                    <span className="inline-flex border-2 border-accent bg-accent px-6 py-2 text-xs font-bold uppercase tracking-wide text-primary">
                      Modify search
                    </span>
                  </Link>
                </div>
              )}

              {!loading && !error && paginated.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  key={`${page}-${sortBy}-${filterBadge}`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                  }}
                  className="space-y-3"
                >
                  {paginated.map((f) => (
                    <motion.div
                      key={f.id}
                      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
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

              {!loading && !error && flights.length > 0 && sorted.length === 0 && (
                <div className="rounded-sm border border-border bg-card py-16 text-center shadow-sm">
                  <p className="font-medium text-foreground">No flights match your filters</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting price, stops, or airlines.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 text-sm font-semibold text-accent underline-offset-2 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {!loading && !error && sorted.length > 0 && (
                <nav
                  className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-6"
                  aria-label="Flights pagination"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(1)}
                    disabled={page === 1}
                    className="border border-border bg-card px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                  >
                    First
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="border border-border bg-card px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                  >
                    Previous
                  </button>
                  <span className="px-3 text-sm text-muted-foreground">
                    Page <strong className="text-foreground">{page}</strong> of{" "}
                    <strong className="text-foreground">{totalPages}</strong>
                    <span className="ml-2 text-xs">
                      ({(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length})
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => goToPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="border border-border bg-card px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage(totalPages)}
                    disabled={page === totalPages}
                    className="border border-border bg-card px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-muted"
                  >
                    Last
                  </button>
                </nav>
              )}
            </div>
          </div>
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
        <div className="flex min-h-screen items-center justify-center bg-muted/30">
          <div className="h-10 w-10 border-4 border-muted border-t-accent animate-spin rounded-full" />
        </div>
      }
    >
      <FlightsContent />
    </Suspense>
  );
}
