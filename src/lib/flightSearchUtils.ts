import type { FlightCardProps } from "@/components/flights/FlightCard";
import { usdToInr } from "@/lib/currency";

export type StopsFilterOption = "any" | "nonstop" | "one" | "two_plus";
export type DepartureBucket = "early" | "morning" | "afternoon" | "evening";

export function flightDisplayPrice(f: FlightCardProps): number {
  return f.currency === "USD" ? usdToInr(f.price) : f.price;
}

/** Parse hour 0–23 from times like "14:30" or "2:30 PM". */
export function parseDepartureHour(time: string): number | null {
  const t = time.trim().toUpperCase();
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const ap = m[3];
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  if (!ap && h > 24) return null;
  if (!ap && h <= 24) {
    // 24h
    if (h >= 24) h = 0;
  }
  return Math.min(23, Math.max(0, h));
}

export function hourInDepartureBucket(hour: number | null, bucket: DepartureBucket): boolean {
  if (hour === null) return true;
  switch (bucket) {
    case "early":
      return hour >= 0 && hour < 6;
    case "morning":
      return hour >= 6 && hour < 12;
    case "afternoon":
      return hour >= 12 && hour < 18;
    case "evening":
      return hour >= 18 && hour < 24;
    default:
      return true;
  }
}

export interface AirlineOption {
  code: string;
  name: string;
  count: number;
}

export function buildAirlineOptions(flights: FlightCardProps[]): AirlineOption[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const f of flights) {
    const code = (f.airlineCode || "").toUpperCase().slice(0, 2) || "—";
    const prev = map.get(code);
    if (prev) prev.count += 1;
    else map.set(code, { name: f.airlineName || code, count: 1 });
  }
  return [...map.entries()]
    .map(([code, v]) => ({ code, name: v.name, count: v.count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPriceBounds(flights: FlightCardProps[]): { min: number; max: number } {
  if (flights.length === 0) return { min: 0, max: 0 };
  const prices = flights.map(flightDisplayPrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
