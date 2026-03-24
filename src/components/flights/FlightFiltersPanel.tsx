"use client";

import { cn } from "@/lib/utils";
import { formatInr } from "@/lib/currency";
import type { AirlineOption, DepartureBucket, StopsFilterOption } from "@/lib/flightSearchUtils";

const DEP_LABELS: Record<DepartureBucket, { label: string; sub: string }> = {
  early: { label: "Before 6 AM", sub: "12 AM – 6 AM" },
  morning: { label: "6 AM – 12 PM", sub: "Morning" },
  afternoon: { label: "12 PM – 6 PM", sub: "Afternoon" },
  evening: { label: "After 6 PM", sub: "6 PM – 12 AM" },
};

export interface FlightFiltersValue {
  stops: StopsFilterOption;
  excludedAirlineCodes: string[];
  depBuckets: DepartureBucket[];
  priceMin: number;
  priceMax: number;
}

interface FlightFiltersPanelProps {
  value: FlightFiltersValue;
  onChange: (next: FlightFiltersValue) => void;
  onClear: () => void;
  priceBounds: { min: number; max: number };
  airlines: AirlineOption[];
  filteredCount: number;
  totalCount: number;
  className?: string;
}

export function activeFilterCount(
  v: FlightFiltersValue,
  bounds: { min: number; max: number }
): number {
  let n = 0;
  if (v.stops !== "any") n += 1;
  if (v.excludedAirlineCodes.length > 0) n += 1;
  if (v.depBuckets.length > 0 && v.depBuckets.length < 4) n += 1;
  if (bounds.max > bounds.min && (v.priceMin > bounds.min || v.priceMax < bounds.max)) n += 1;
  return n;
}

export function FlightFiltersPanel({
  value,
  onChange,
  onClear,
  priceBounds,
  airlines,
  filteredCount,
  totalCount,
  className,
}: FlightFiltersPanelProps) {
  const { min: pMin, max: pMax } = priceBounds;
  const samePrice = pMax <= pMin || totalCount === 0;
  const active = activeFilterCount(value, priceBounds);
  const span = Math.max(1, pMax - pMin);
  const leftPct = ((value.priceMin - pMin) / span) * 100;
  const rightPct = ((value.priceMax - pMin) / span) * 100;
  const fillWidth = Math.max(0, rightPct - leftPct);

  const setPriceMin = (raw: number) => {
    const next = Math.min(Math.max(raw, pMin), value.priceMax);
    onChange({ ...value, priceMin: next });
  };
  const setPriceMax = (raw: number) => {
    const next = Math.max(Math.min(raw, pMax), value.priceMin);
    onChange({ ...value, priceMax: next });
  };

  const toggleExcludeAirline = (code: string) => {
    const set = new Set(value.excludedAirlineCodes);
    if (set.has(code)) set.delete(code);
    else set.add(code);
    onChange({ ...value, excludedAirlineCodes: [...set] });
  };

  const toggleBucket = (b: DepartureBucket) => {
    const set = new Set(value.depBuckets);
    if (set.has(b)) set.delete(b);
    else set.add(b);
    onChange({ ...value, depBuckets: [...set] });
  };

  return (
    <div
      className={cn(
        "border border-border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="border-b border-border bg-muted/40 px-4 py-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-foreground">
          Filters
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredCount}</span>
          <span> of {totalCount} flights</span>
        </p>
      </div>

      <div className="max-h-[calc(100vh-12rem)] divide-y divide-border overflow-y-auto overscroll-contain lg:max-h-none">
        {/* Price */}
        <section className="px-4 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Price
          </h3>
          {samePrice ? (
            <p className="mt-2 text-sm text-muted-foreground">No price range for this result set.</p>
          ) : (
            <>
              <div className="mt-4 flex items-baseline justify-between gap-3 border-b border-border pb-3 text-sm">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">From</span>
                  <p className="mt-0.5 font-semibold tabular-nums text-foreground">{formatInr(value.priceMin)}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">To</span>
                  <p className="mt-0.5 font-semibold tabular-nums text-foreground">{formatInr(value.priceMax)}</p>
                </div>
              </div>
              <div className="relative mt-5">
                <div className="pointer-events-none absolute inset-x-0 top-[18px] h-1 -translate-y-1/2 rounded-full bg-slate-200" />
                <div
                  className="pointer-events-none absolute top-[18px] h-1 -translate-y-1/2 rounded-full bg-primary/40"
                  style={{
                    left: `${leftPct}%`,
                    width: `${fillWidth}%`,
                  }}
                  aria-hidden
                />
                <div className="relative h-9">
                  <input
                    type="range"
                    min={pMin}
                    max={pMax}
                    value={value.priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    className="flight-price-range flight-price-range-min absolute inset-x-0 top-0"
                    aria-label="Minimum price"
                  />
                  <input
                    type="range"
                    min={pMin}
                    max={pMax}
                    value={value.priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="flight-price-range flight-price-range-max absolute inset-x-0 top-0"
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            </>
          )}
        </section>

        {/* Stops */}
        <section className="px-4 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Stops
          </h3>
          <div className="mt-3 space-y-2">
            {(
              [
                ["any", "Any"] as const,
                ["nonstop", "Non-stop only"] as const,
                ["one", "1 stop"] as const,
                ["two_plus", "2+ stops"] as const,
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-transparent px-1 py-1.5 text-sm transition-colors hover:bg-muted/60"
              >
                <input
                  type="radio"
                  name="stops-filter"
                  checked={value.stops === key}
                  onChange={() => onChange({ ...value, stops: key })}
                  className="h-3.5 w-3.5 border-border text-primary focus:ring-accent"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Departure from origin */}
        <section className="px-4 py-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Departure time
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground">Outbound departure (origin)</p>
          <div className="mt-3 space-y-1">
            {(Object.keys(DEP_LABELS) as DepartureBucket[]).map((b) => {
              const { label, sub } = DEP_LABELS[b];
              const checked = value.depBuckets.includes(b);
              return (
                <label
                  key={b}
                  className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-transparent px-1 py-1.5 text-sm transition-colors hover:bg-muted/60"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBucket(b)}
                    className="h-3.5 w-3.5 rounded border-border text-accent focus:ring-accent"
                  />
                  <span>
                    {label}
                    <span className="ml-1 text-xs text-muted-foreground">({sub})</span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Airlines */}
        {airlines.length > 0 && (
          <section className="px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Airlines
              </h3>
              {value.excludedAirlineCodes.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...value, excludedAirlineCodes: [] })}
                  className="text-[11px] font-medium text-accent hover:underline"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="mt-3 max-h-52 space-y-1 overflow-y-auto pr-1">
              {airlines.map((a) => {
                const included = !value.excludedAirlineCodes.includes(a.code);
                return (
                  <label
                    key={a.code}
                    className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-transparent px-1 py-1.5 text-sm transition-colors hover:bg-muted/60"
                  >
                    <input
                      type="checkbox"
                      checked={included}
                      onChange={() => toggleExcludeAirline(a.code)}
                      className="h-3.5 w-3.5 rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="min-w-0 flex-1 truncate">{a.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{a.count}</span>
                  </label>
                );
              })}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              Uncheck to hide an airline from results.
            </p>
          </section>
        )}
      </div>

      {active > 0 && (
        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={onClear}
            className="w-full border border-border bg-background py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-muted"
          >
            Clear all filters ({active})
          </button>
        </div>
      )}
    </div>
  );
}
