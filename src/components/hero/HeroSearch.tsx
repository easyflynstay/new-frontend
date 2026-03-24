"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface Airport {
  iata_code: string;
  name: string;
  municipality: string;
  iso_country: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function AirportInput({
  value,
  displayValue,
  onSelect,
  placeholder,
  icon,
}: {
  value: string;
  displayValue: string;
  onSelect: (airport: Airport) => void;
  placeholder: string;
  icon: React.ReactNode;
}) {
  const [query, setQuery] = useState(displayValue);
  const [results, setResults] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(displayValue);
  }, [displayValue]);

  useEffect(() => {
    if (!focused) return;
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    api
      .get<Airport[]>("/airports", { params: { q: trimmed } })
      .then((res) => {
        if (!cancelled) {
          setResults(res.data.slice(0, 8));
          setOpen(res.data.length > 0);
        }
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, focused]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
        if (!value) setQuery(displayValue);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [value, displayValue]);

  const handleSelect = useCallback(
    (airport: Airport) => {
      onSelect(airport);
      setQuery(`${airport.iata_code} – ${airport.municipality}`);
      setOpen(false);
      setFocused(false);
    },
    [onSelect]
  );

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40">
          {icon}
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!focused) setFocused(true);
          }}
          onFocus={() => {
            setFocused(true);
            if (query.trim().length >= 2 && results.length > 0) setOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="h-12 w-full rounded-none border border-border/80 bg-white/80 pl-10 pr-4 text-sm font-medium shadow-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all hover:border-primary/30"
        />
        {loading && focused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 border-2 border-accent/30 border-t-accent animate-spin rounded-full" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-72 overflow-auto rounded-none border border-border/80 bg-white shadow-xl shadow-black/10"
          >
            {results.map((airport, idx) => (
              <button
                key={`${airport.iata_code}-${idx}`}
                type="button"
                onClick={() => handleSelect(airport)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/5 focus:bg-accent/5 focus:outline-none border-b border-border/30 last:border-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/5 text-xs font-bold text-primary tracking-wide">
                  {airport.iata_code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {airport.municipality}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {airport.name} · {airport.iso_country}
                  </p>
                </div>
                <svg
                  className="h-4 w-4 shrink-0 text-muted-foreground/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string; sub?: string }[];
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-12 w-full items-center gap-3 rounded-none border bg-white/80 px-4 text-sm font-medium shadow-sm transition-all",
          open ? "border-primary/50 bg-white ring-2 ring-primary/20" : "border-border/80 hover:border-primary/30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        )}
      >
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary">
            {icon}
          </span>
        )}
        <span className="flex-1 text-left truncate">{selected?.label}</span>
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-none border border-border/80 bg-white shadow-xl shadow-black/10"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border/30 last:border-0",
                  opt.value === value
                    ? "bg-accent/5 text-primary font-semibold"
                    : "hover:bg-muted/50 text-foreground"
                )}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{opt.label}</p>
                  {opt.sub && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">{opt.sub}</p>
                  )}
                </div>
                {opt.value === value && (
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const days = last.getDate();
  const pad: (number | null)[] = Array(startPad).fill(null);
  return [...pad, ...Array.from({ length: days }, (_, i) => i + 1)];
}

function PremiumDateInput({
  value,
  onChange,
  min,
  placeholder = "Select date",
}: {
  value: string;
  onChange: (val: string) => void;
  min?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const minDate = min ? new Date(min + "T00:00:00") : new Date();
  minDate.setHours(0, 0, 0, 0);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const formatDisplay = (val: string) => {
    if (!val) return "";
    const d = new Date(val + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const days = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const selectedDate = value ? new Date(value + "T00:00:00") : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pick = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${dd}`);
    setOpen(false);
  };

  const prevMonth = () => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-12 w-full items-center gap-3 rounded-none border bg-white/80 px-4 text-sm font-medium transition-all text-left shadow-sm",
          value ? "text-foreground" : "text-muted-foreground/70",
          "border-border/80 hover:border-primary/40 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          open && "border-primary/50 bg-white ring-2 ring-primary/20"
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-primary/10 text-primary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
        <span className="flex-1 truncate">
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg
          className={cn("h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-[100] mt-2 overflow-hidden rounded-none border border-border/80 bg-white shadow-xl shadow-black/10"
          >
            <div className="border-b border-border/50 bg-muted/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-none text-muted-foreground hover:bg-white hover:text-foreground transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm font-semibold text-foreground">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-none text-muted-foreground hover:bg-white hover:text-foreground transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-7 gap-0.5 text-center">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {w}
                  </div>
                ))}
                {days.map((day, i) => {
                  if (day === null) return <div key={`pad-${i}`} />;
                  const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                  const isDisabled = d < minDate;
                  const isToday = d.getTime() === today.getTime();
                  const isSelected = selectedDate && d.getTime() === selectedDate.getTime();
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => !isDisabled && pick(viewDate.getFullYear(), viewDate.getMonth(), day)}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-none text-sm font-medium transition-colors",
                        isDisabled && "cursor-not-allowed text-muted-foreground/40",
                        !isDisabled && "hover:bg-primary/10 hover:text-primary",
                        isToday && !isSelected && "bg-muted text-foreground font-semibold",
                        isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ALL_CABIN_OPTIONS = [
  { value: "economy", label: "Economy", sub: "Standard seating" },
  { value: "premium", label: "Premium Economy", sub: "Extra legroom & comfort" },
  { value: "business", label: "Business Class", sub: "Lie-flat seats & lounge access" },
  { value: "first", label: "First Class", sub: "Ultimate luxury experience" },
];

export function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tripType, setTripType] = useState<"round" | "oneway">(() =>
    searchParams.get("return") ? "round" : "oneway"
  );
  const [tripScope, setTripScope] = useState<"international" | "domestic">("international");
  const [originCode, setOriginCode] = useState(() => searchParams.get("origin") ?? "");
  const [originDisplay, setOriginDisplay] = useState(() => searchParams.get("origin") ?? "");
  const [destCode, setDestCode] = useState(() => searchParams.get("destination") ?? "");
  const [destDisplay, setDestDisplay] = useState(() => searchParams.get("destination") ?? "");
  const [departure, setDeparture] = useState(() => searchParams.get("departure") ?? "");
  const [returnDate, setReturnDate] = useState(() => searchParams.get("return") ?? "");
  const [passengers, setPassengers] = useState(() => searchParams.get("passengers") ?? "1");
  const [cabin, setCabin] = useState(() => searchParams.get("cabin") ?? "economy");
  const [formError, setFormError] = useState<string | null>(null);

  const cabinValue = ALL_CABIN_OPTIONS.some((o) => o.value === cabin) ? cabin : ALL_CABIN_OPTIONS[0]?.value ?? "economy";

  useEffect(() => {
    setFormError(null);
  }, [originCode, destCode, departure, returnDate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const origin = originCode.trim();
    const destination = destCode.trim();
    const dep = departure.trim();

    if (!origin) {
      setFormError("Please select origin city or airport");
      return;
    }
    if (!destination) {
      setFormError("Please select destination city or airport");
      return;
    }
    if (origin.length !== 3 || destination.length !== 3) {
      setFormError("Please select valid airports from the suggestions for From and To.");
      return;
    }
    if (!dep) {
      setFormError("Please select a departure date.");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dep)) {
      setFormError("Please select a valid departure date.");
      return;
    }
    if (tripType === "round" && returnDate.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(returnDate.trim())) {
      setFormError("Please select a valid return date.");
      return;
    }

    const params = new URLSearchParams({
      origin,
      destination,
      departure: dep,
      passengers,
      cabin: cabinValue,
      scope: tripScope,
      currency: "INR",
    });
    if (tripType === "round" && returnDate.trim()) params.set("return", returnDate.trim());
    router.push(`/flights?${params.toString()}`);
  };

  const swapCities = () => {
    setOriginCode(destCode);
    setOriginDisplay(destDisplay);
    setDestCode(originCode);
    setDestDisplay(originDisplay);
  };

  const planeIconFrom = (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
  const planeIconTo = (
    <svg className="h-5 w-5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );

  const passengerOptions = [
    { value: "1", label: "1 Passenger", sub: "Solo traveler" },
    { value: "2", label: "2 Passengers", sub: "Couple or duo" },
    { value: "3", label: "3 Passengers", sub: "Small group" },
    { value: "4", label: "4 Passengers", sub: "Family" },
    { value: "5", label: "5 Passengers", sub: "Group booking" },
  ];

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative w-full max-w-5xl overflow-visible border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 backdrop-blur-sm"
    >
      {/* Trip type (left) + International / Business Domestic (rightmost) */}
      <div className="flex flex-col gap-3 border-b border-slate-200/80 bg-amber-50/90 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-5">
        <div className="flex shrink-0 rounded-none border border-slate-200 bg-white p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setTripType("oneway")}
            className={cn(
              "flex items-center gap-2 rounded-none px-4 py-2.5 text-sm font-semibold tracking-wide transition-all whitespace-nowrap",
              tripType === "oneway"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            One Way
          </button>
          <button
            type="button"
            onClick={() => setTripType("round")}
            className={cn(
              "flex items-center gap-2 rounded-none px-4 py-2.5 text-sm font-semibold tracking-wide transition-all whitespace-nowrap",
              tripType === "round"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Round Trip
          </button>
        </div>
        <div className="flex shrink-0 items-center rounded-none border border-slate-200 bg-white p-0.5 shadow-sm sm:ml-auto">
          <button
            type="button"
            onClick={() => setTripScope("international")}
            className={cn(
              "whitespace-nowrap rounded-none px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
              tripScope === "international"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            International
          </button>
          <button
            type="button"
            onClick={() => setTripScope("domestic")}
            className={cn(
              "whitespace-nowrap rounded-none px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-all",
              tripScope === "domestic"
                ? "bg-accent text-primary shadow-sm hover:bg-accent/90"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* Main fields - overflow-visible so calendar and dropdowns are not clipped */}
      <div className="overflow-visible p-5 sm:p-6 bg-white">
        {/* Route row: FROM | swap (centered) | TO */}
        <div className="flex items-center gap-2">
          {/* From */}
          <div className="flex-1 group">
            <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" strokeWidth={2} />
                <path strokeLinecap="round" strokeWidth={2} d="M12 2v4m0 12v4" />
              </svg>
              From
            </label>
            <AirportInput
              value={originCode}
              displayValue={originDisplay}
              onSelect={(a) => {
                setOriginCode(a.iata_code);
                setOriginDisplay(`${a.iata_code} – ${a.municipality}`);
              }}
              placeholder="City or airport"
              icon={planeIconFrom}
            />
          </div>

          {/* Swap button - centered between text boxes */}
          <motion.button
            type="button"
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={swapCities}
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center self-center border-2 border-accent bg-white text-accent shadow-md hover:bg-accent hover:text-white transition-colors rounded-none"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </motion.button>

          {/* To */}
          <div className="flex-1 group">
            <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              To
            </label>
            <AirportInput
              value={destCode}
              displayValue={destDisplay}
              onSelect={(a) => {
                setDestCode(a.iata_code);
                setDestDisplay(`${a.iata_code} – ${a.municipality}`);
              }}
              placeholder="City or airport"
              icon={planeIconTo}
            />
          </div>
        </div>

        {/* Date & options row */}
        <div className="mt-4 grid gap-4 overflow-visible sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Departure
            </label>
            <PremiumDateInput
              value={departure}
              onChange={setDeparture}
              placeholder="Select departure"
            />
          </div>

          {tripType === "round" && (
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Return
              </label>
              <PremiumDateInput
                value={returnDate}
                onChange={setReturnDate}
                min={departure || new Date().toISOString().slice(0, 10)}
                placeholder="Select return"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Travelers
            </label>
            <CustomSelect
              value={passengers}
              onChange={setPassengers}
              options={passengerOptions}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <svg className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Cabin Class
            </label>
            <CustomSelect
              value={cabinValue}
              onChange={setCabin}
              options={ALL_CABIN_OPTIONS}
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Search button bar - neutral background so assurance text is always readable */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 bg-slate-50/90 px-5 sm:px-6 py-4">
        {formError ? (
          <p className="w-full text-sm text-red-600 font-medium" role="alert">
            {formError}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Seamless Experience
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Best price guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            24/7 support
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" variant="accent" size="lg" className="text-primary px-10 font-bold tracking-wide shadow-lg">
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            SEARCH FLIGHTS
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
}
