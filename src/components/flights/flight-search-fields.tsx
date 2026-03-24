"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFlipOverlay } from "@/hooks/useFlipOverlay";
import api from "@/lib/api";

export interface Airport {
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

export function AirportInput({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const listOpen = open && results.length > 0;
  const { wrapperRef, panelRef, placement, positionClass } = useFlipOverlay(listOpen, {
    fullWidth: true,
    fallbackHeight: 260,
  });

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
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
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
    <div ref={wrapperRef} className="group relative flex-1">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70 transition-colors group-focus-within:text-accent [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </div>
        <input
          ref={inputRef}
          data-flip-anchor
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
          className="h-12 w-full rounded-none border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-800 shadow-none placeholder:text-slate-400 transition-all hover:border-slate-300 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        {loading && focused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 border-2 border-accent/30 border-t-accent animate-spin rounded-full" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {listOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: placement === "bottom" ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "bottom" ? -4 : 4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-[200] max-h-[min(18rem,calc(100vh-2rem))] overflow-auto rounded-none border border-slate-200 bg-white shadow-xl shadow-slate-900/10",
              positionClass
            )}
          >
            {results.map((airport, idx) => (
              <button
                key={`${airport.iata_code}-${idx}`}
                type="button"
                onClick={() => handleSelect(airport)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/5 focus:bg-accent/5 focus:outline-none border-b border-slate-100 last:border-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent/10 text-xs font-bold text-primary tracking-wide">
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

export function CustomSelect({
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
  const { wrapperRef, panelRef, placement, positionClass } = useFlipOverlay(open, {
    fullWidth: true,
    fallbackHeight: 240,
  });
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        data-flip-anchor
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-12 w-full items-center gap-2.5 rounded-none border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-none transition-all",
          open
            ? "border-accent/40 ring-2 ring-accent/20"
            : "hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
        )}
      >
        {icon && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-accent/10 text-accent [&>svg]:h-4 [&>svg]:w-4">
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
            ref={panelRef}
            initial={{ opacity: 0, y: placement === "bottom" ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "bottom" ? -4 : 4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-[200] max-h-[min(22rem,calc(100vh-2rem))] overflow-y-auto overflow-x-hidden rounded-none border border-slate-200 bg-white shadow-xl shadow-slate-900/10",
              positionClass
            )}
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
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors border-b border-slate-100 last:border-0",
                  opt.value === value
                    ? "bg-accent/5 text-primary font-semibold"
                    : "hover:bg-accent/5 text-foreground"
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

/** First of month, clamped to [minD, maxD] month range. */
function clampViewToRange(candidate: Date, minD: Date, maxD: Date | null): Date {
  const v = new Date(candidate.getFullYear(), candidate.getMonth(), 1);
  const minV = new Date(minD.getFullYear(), minD.getMonth(), 1);
  if (v < minV) return minV;
  if (maxD) {
    const maxV = new Date(maxD.getFullYear(), maxD.getMonth(), 1);
    if (v > maxV) return maxV;
  }
  return v;
}

function isMonthFullyOutsideRange(year: number, month: number, minD: Date, maxD: Date | null): boolean {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  end.setHours(0, 0, 0, 0);
  const minX = new Date(minD);
  minX.setHours(0, 0, 0, 0);
  if (end < minX) return true;
  if (maxD) {
    const maxX = new Date(maxD);
    maxX.setHours(0, 0, 0, 0);
    if (start > maxX) return true;
  }
  return false;
}

export function PremiumDateInput({
  value,
  onChange,
  min,
  max,
  placeholder = "Select date",
  headerLabel = "Select date",
  showTodayShortcut = true,
  compact = false,
}: {
  value: string;
  onChange: (val: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  headerLabel?: string;
  showTodayShortcut?: boolean;
  /** Shorter trigger (e.g. booking forms) to match h-10 inputs */
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });

  const { wrapperRef, panelRef, placement, fixedStyle } = useFlipOverlay(open, {
    strategy: "fixed",
    fallbackHeight: 420,
    recalcKey: viewDate.getTime(),
  });
  const [portalMounted, setPortalMounted] = useState(false);
  /** Month/year custom dropdown inside calendar panel */
  const [subPicker, setSubPicker] = useState<null | "month" | "year">(null);
  const subPickerRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalMounted(true);
  }, []);

  useEffect(() => {
    if (!open) setSubPicker(null);
  }, [open]);

  useEffect(() => {
    if (subPicker !== "year" || !yearListRef.current) return;
    const el = yearListRef.current.querySelector("[data-selected='true']");
    el?.scrollIntoView({ block: "nearest" });
  }, [subPicker, viewDate.getFullYear()]);

  useEffect(() => {
    if (!subPicker) return;
    function onDoc(e: MouseEvent) {
      if (subPickerRef.current?.contains(e.target as Node)) return;
      setSubPicker(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [subPicker]);

  const minDate = (() => {
    if (min) {
      const d = new Date(min + "T12:00:00");
      if (Number.isNaN(d.getTime())) {
        const t = new Date();
        t.setHours(0, 0, 0, 0);
        return t;
      }
      d.setHours(0, 0, 0, 0);
      return d;
    }
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  })();

  const maxDate = max
    ? (() => {
        const d = new Date(max + "T12:00:00");
        if (Number.isNaN(d.getTime())) return null;
        d.setHours(0, 0, 0, 0);
        return d;
      })()
    : null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      if (wrapperRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open || !value) return;
    const d = new Date(value + "T00:00:00");
    if (Number.isNaN(d.getTime())) return;
    setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
  }, [open, value]);

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
    setViewDate((d) => clampViewToRange(new Date(d.getFullYear(), d.getMonth() - 1, 1), minDate, maxDate));
  };
  const nextMonth = () => {
    setViewDate((d) => clampViewToRange(new Date(d.getFullYear(), d.getMonth() + 1, 1), minDate, maxDate));
  };

  const minCalendarYear = minDate.getFullYear();
  const maxCalendarYear = maxDate
    ? maxDate.getFullYear()
    : Math.max(minCalendarYear, new Date().getFullYear() + 2);
  const calendarYears: number[] = [];
  for (let y = minCalendarYear; y <= maxCalendarYear; y++) calendarYears.push(y);

  const viewFirst = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const minFirst = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const maxFirst = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth(), 1) : null;
  const canPrevMonth = viewFirst.getTime() > minFirst.getTime();
  const canNextMonth = !maxFirst || viewFirst.getTime() < maxFirst.getTime();

  const calendarTriggerClass =
    "flex h-9 min-h-9 items-center justify-between gap-1.5 border border-slate-200/90 bg-white px-2.5 text-left text-sm font-semibold text-primary shadow-sm outline-none transition-colors hover:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

  const goToToday = () => {
    if (!showTodayShortcut) return;
    const y = today.getFullYear();
    const m = today.getMonth();
    const day = today.getDate();
    const candidate = new Date(y, m, day);
    candidate.setHours(0, 0, 0, 0);
    if (candidate < minDate) return;
    if (maxDate && candidate > maxDate) return;
    pick(y, m, day);
  };

  const canPickToday =
    showTodayShortcut &&
    today.getTime() >= minDate.getTime() &&
    (!maxDate || today.getTime() <= maxDate.getTime());

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        data-flip-anchor
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center rounded-none border border-slate-200 bg-white font-medium transition-all text-left shadow-none",
          compact ? "h-10 min-h-10 gap-2 px-2.5 text-sm" : "h-12 gap-2.5 px-3 text-sm",
          value ? "text-slate-800" : "text-slate-500",
          "hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40",
          open && "border-accent/40 ring-2 ring-accent/20"
        )}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-none bg-accent/10 text-accent",
            compact ? "h-7 w-7" : "h-8 w-8"
          )}
        >
          <svg
            className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
        <span className="min-w-0 flex-1 truncate">
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg
          className={cn(
            "shrink-0 text-muted-foreground/50 transition-transform",
            compact ? "h-3.5 w-3.5" : "h-4 w-4",
            open && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {portalMounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: placement === "bottom" ? -8 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: placement === "bottom" ? -6 : 6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="fixed z-[260] flex w-[min(100vw-1.25rem,23rem)] min-w-[20rem] max-w-[calc(100vw-1.25rem)] flex-col overflow-hidden border border-border border-t-[3px] border-t-accent bg-card shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35)] sm:min-w-[22rem] sm:max-w-none"
                style={
                  fixedStyle
                    ? {
                        top: fixedStyle.top,
                        left: fixedStyle.left,
                        maxHeight: fixedStyle.maxHeight,
                      }
                    : { top: 0, left: 0, maxHeight: "min(32rem, 85vh)", visibility: "hidden" }
                }
              >
            <div className="relative z-20 shrink-0 border-b border-primary/10 bg-primary px-3 py-3 sm:px-4">
              <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{headerLabel}</p>
              <div ref={subPickerRef} className="flex flex-wrap items-stretch justify-center gap-2 sm:flex-nowrap sm:items-center">
                <button
                  type="button"
                  onClick={prevMonth}
                  disabled={!canPrevMonth}
                  aria-label="Previous month"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                    canPrevMonth ? "hover:bg-accent/15 hover:text-accent" : "cursor-not-allowed opacity-35"
                  )}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="relative min-w-0 flex-1 sm:max-w-[11.5rem]">
                  <button
                    type="button"
                    aria-expanded={subPicker === "month"}
                    aria-haspopup="listbox"
                    className={cn(calendarTriggerClass, "w-full rounded-none")}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubPicker((p) => (p === "month" ? null : "month"));
                    }}
                  >
                    <span className="min-w-0 truncate text-primary">{MONTHS[viewDate.getMonth()]}</span>
                    <svg
                      className={cn("h-4 w-4 shrink-0 text-primary/60 transition-transform", subPicker === "month" && "rotate-180")}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {subPicker === "month" && (
                      <motion.div
                        role="listbox"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-0 right-0 top-[calc(100%+4px)] z-[300] max-h-52 overflow-y-auto rounded-none border border-slate-200 bg-white py-1 shadow-xl"
                      >
                        {MONTHS.map((name, idx) => {
                          const disabled = isMonthFullyOutsideRange(viewDate.getFullYear(), idx, minDate, maxDate);
                          const selected = idx === viewDate.getMonth();
                          return (
                            <button
                              key={name}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              disabled={disabled}
                              className={cn(
                                "flex w-full items-center px-3 py-2.5 text-left text-sm transition-colors",
                                disabled && "cursor-not-allowed text-muted-foreground/45",
                                !disabled && selected && "bg-accent/15 font-semibold text-primary",
                                !disabled && !selected && "text-foreground hover:bg-slate-50"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (disabled) return;
                                setViewDate((prev) => clampViewToRange(new Date(prev.getFullYear(), idx, 1), minDate, maxDate));
                                setSubPicker(null);
                              }}
                            >
                              {name}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative w-[5.5rem] shrink-0 sm:w-24">
                  <button
                    type="button"
                    aria-expanded={subPicker === "year"}
                    aria-haspopup="listbox"
                    className={cn(calendarTriggerClass, "w-full rounded-none")}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSubPicker((p) => (p === "year" ? null : "year"));
                    }}
                  >
                    <span className="tabular-nums text-primary">{viewDate.getFullYear()}</span>
                    <svg
                      className={cn("h-4 w-4 shrink-0 text-primary/60 transition-transform", subPicker === "year" && "rotate-180")}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {subPicker === "year" && (
                      <motion.div
                        ref={yearListRef}
                        role="listbox"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-0 right-0 top-[calc(100%+4px)] z-[300] max-h-52 overflow-y-auto rounded-none border border-slate-200 bg-white py-1 shadow-xl"
                      >
                        {calendarYears.map((y) => {
                          const selected = y === viewDate.getFullYear();
                          return (
                            <button
                              key={y}
                              type="button"
                              role="option"
                              aria-selected={selected}
                              data-selected={selected ? "true" : undefined}
                              className={cn(
                                "flex w-full items-center px-3 py-2.5 text-left text-sm tabular-nums transition-colors",
                                selected ? "bg-accent/15 font-semibold text-primary" : "text-foreground hover:bg-slate-50"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewDate((prev) => clampViewToRange(new Date(y, prev.getMonth(), 1), minDate, maxDate));
                                setSubPicker(null);
                              }}
                            >
                              {y}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  disabled={!canNextMonth}
                  aria-label="Next month"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                    canNextMonth ? "hover:bg-accent/15 hover:text-accent" : "cursor-not-allowed opacity-35"
                  )}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative z-0 min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="bg-gradient-to-b from-muted/50 to-card px-2 pb-1 pt-3 sm:px-3">
              <div className="grid grid-cols-7 gap-y-0.5 text-center">
                {WEEKDAYS.map((w) => (
                  <div
                    key={w}
                    className="py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/90 sm:text-[11px]"
                  >
                    {w}
                  </div>
                ))}
                {days.map((day, i) => {
                  if (day === null) return <div key={`pad-${i}`} className="min-h-[2.5rem]" aria-hidden />;
                  const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                  const isDisabled = d < minDate || (maxDate !== null && d > maxDate);
                  const isToday = d.getTime() === today.getTime();
                  const isSelected = selectedDate && d.getTime() === selectedDate.getTime();
                  return (
                    <div key={day} className="flex min-h-[2.5rem] items-center justify-center p-0.5">
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => !isDisabled && pick(viewDate.getFullYear(), viewDate.getMonth(), day)}
                        className={cn(
                          "relative flex h-10 w-10 items-center justify-center text-sm font-medium transition-all duration-150",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                          isDisabled && "cursor-not-allowed text-muted-foreground/35",
                          !isDisabled &&
                            !isSelected &&
                            "text-foreground hover:bg-accent/20 hover:text-primary hover:shadow-sm",
                          isToday &&
                            !isSelected &&
                            !isDisabled &&
                            "font-semibold text-primary after:absolute after:inset-0.5 after:rounded-sm after:ring-2 after:ring-accent/50 after:content-['']",
                          isSelected &&
                            "bg-accent font-semibold text-primary shadow-md ring-1 ring-primary/15 hover:bg-accent hover:text-primary"
                        )}
                      >
                        {day}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {showTodayShortcut && (
              <div className="flex justify-center border-t border-border bg-muted/25 px-3 py-2.5 sm:px-4">
                <button
                  type="button"
                  onClick={goToToday}
                  disabled={!canPickToday}
                  className={cn(
                    "min-h-9 rounded-none px-4 text-xs font-semibold uppercase tracking-wide transition-colors",
                    canPickToday
                      ? "text-primary hover:bg-accent/15 hover:text-primary"
                      : "cursor-not-allowed text-muted-foreground/45"
                  )}
                >
                  Today
                </button>
              </div>
            )}
            </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export const ALL_CABIN_OPTIONS = [
  { value: "economy", label: "Economy", sub: "Standard seating" },
  { value: "premium", label: "Premium Economy", sub: "Extra legroom & comfort" },
  { value: "business", label: "Business Class", sub: "Lie-flat seats & lounge access" },
  { value: "first", label: "First Class", sub: "Ultimate luxury experience" },
];
