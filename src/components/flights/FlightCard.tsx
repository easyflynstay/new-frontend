"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usdToInr, formatInr } from "@/lib/currency";

interface Segment {
  carrierCode: string;
  carrierName: string;
  flightNumber: string;
  aircraft: string;
  departureAirport: string;
  departureTime: string;
  departureTerminal: string;
  arrivalAirport: string;
  arrivalTime: string;
  arrivalTerminal: string;
  duration: string;
  stops: number;
  /** Layover duration after this segment (e.g. "1h 15m") at arrivalAirport. */
  layoverAfter?: string;
}

interface ReturnFlight {
  duration: string;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  stops: number;
  segments: Segment[];
}

export interface FlightCardProps {
  id: string;
  airlineName: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  departureCode: string;
  arrivalCode: string;
  cabin: string;
  bookableSeats: number;
  segments: Segment[];
  returnFlight?: ReturnFlight | null;
  className?: string;
  /** For booking link (from search params) */
  departureDate?: string;
  returnDate?: string;
  passengers?: string;
}

const cabinLabels: Record<string, string> = {
  economy: "Economy",
  premium: "Premium Economy",
  business: "Business Class",
  first: "First Class",
};

/** Airline logo from Kiwi CDN (IATA 2-letter code). Fallback to initials. */
function getAirlineLogoUrl(airlineCode: string): string {
  const code = (airlineCode || "").toUpperCase().slice(0, 2);
  if (!code) return "";
  return `https://images.kiwi.com/airlines/64/${code}.png`;
}

function SegmentDetail({ seg }: { seg: Segment; idx?: number }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary/5 text-[10px] font-bold text-primary">
        {seg.carrierCode}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs font-medium">
          <span>{seg.carrierName} {seg.carrierCode}{seg.flightNumber}</span>
          {seg.aircraft && (
            <span className="text-muted-foreground">· {seg.aircraft}</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm">
          <div>
            <span className="font-semibold">{seg.departureTime}</span>
            <span className="ml-1 text-xs text-muted-foreground">{seg.departureAirport}</span>
            {seg.departureTerminal && (
              <span className="text-[10px] text-muted-foreground"> T{seg.departureTerminal}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <div className="h-px w-6 bg-border" />
            <span className="text-[10px]">{seg.duration}</span>
            <div className="h-px w-6 bg-border" />
          </div>
          <div>
            <span className="font-semibold">{seg.arrivalTime}</span>
            <span className="ml-1 text-xs text-muted-foreground">{seg.arrivalAirport}</span>
            {seg.arrivalTerminal && (
              <span className="text-[10px] text-muted-foreground"> T{seg.arrivalTerminal}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlightCard({
  id,
  airlineName,
  airlineCode,
  departureTime,
  arrivalTime,
  duration,
  stops,
  price,
  currency,
  departureCode,
  arrivalCode,
  cabin,
  bookableSeats,
  segments,
  returnFlight,
  className,
  departureDate,
  returnDate,
  passengers = "1",
}: FlightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const displayPrice = currency === "USD" ? usdToInr(price) : price;
  const priceDisplay = formatInr(displayPrice);

  const primaryFlightNumber =
    segments.length > 0
      ? `${segments[0].carrierCode}${segments[0].flightNumber}`.replace(/\s+/g, "")
      : "";
  const layoverSummary = segments
    .map((s) => s.layoverAfter)
    .filter(Boolean)
    .join(" · ");

  const segmentsEncoded =
    segments.length > 0 ? `&segments=${encodeURIComponent(JSON.stringify(segments))}` : "";
  const bookingHref = `/booking?flightId=${id}&from=${departureCode}&to=${arrivalCode}&cabin=${cabin}&price=${price}&currency=${currency || "INR"}&airline=${encodeURIComponent(airlineName)}&flightNumber=${encodeURIComponent(primaryFlightNumber)}&departureTime=${encodeURIComponent(departureTime)}&arrivalTime=${encodeURIComponent(arrivalTime)}&stops=${stops}&layoverTime=${encodeURIComponent(layoverSummary)}&journeyDuration=${encodeURIComponent(duration)}${segmentsEncoded}${departureDate ? `&departure=${departureDate}` : ""}${returnDate ? `&return=${returnDate}` : ""}&passengers=${passengers}`;

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className={cn("overflow-hidden border shadow-card transition-all hover:shadow-card-hover hover:border-accent/40", className)}>
        <CardContent className="p-0">
          {/* Main outbound row */}
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-border bg-white">
                {!logoError ? (
                  <Image
                    src={getAirlineLogoUrl(airlineCode)}
                    alt={airlineName}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain p-1"
                    onError={() => setLogoError(true)}
                  />
                ) : null}
                <span
                  className={cn(
                    "absolute inset-0 items-center justify-center bg-primary/5 font-bold text-xs text-primary tracking-wide",
                    logoError ? "flex" : "hidden"
                  )}
                >
                  {airlineCode}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">{airlineName}</p>
                <p className="text-xs text-muted-foreground">
                  {stops === 0 ? (
                    <span className="text-emerald-600 font-medium">Direct</span>
                  ) : (
                    <span>{stops} stop{stops > 1 ? "s" : ""}</span>
                  )}
                  {segments.length > 1 && (
                    <span className="ml-1">
                      · via {segments.slice(0, -1).map((s) => s.arrivalAirport).join(", ")}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-bold">{departureTime}</p>
                <p className="text-xs text-muted-foreground font-medium">{departureCode}</p>
              </div>
              <div className="flex flex-col items-center px-2">
                <p className="text-[10px] text-muted-foreground mb-1">{duration}</p>
                <div className="relative flex items-center w-20">
                  <div className="h-px flex-1 bg-accent/40" />
                  <svg className="mx-0.5 h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                  <div className="h-px flex-1 bg-accent/40" />
                </div>
                {stops > 0 && (
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: stops }).map((_, i) => (
                      <div key={i} className="h-1 w-1 rounded-full bg-accent/60" />
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{arrivalTime}</p>
                <p className="text-xs text-muted-foreground font-medium">{arrivalCode}</p>
              </div>

              <div className="border-l border-border pl-5">
                <p className="text-2xl font-heading font-bold text-primary">
                  {priceDisplay}
                </p>
                <p className="text-[10px] text-muted-foreground">per person</p>
              </div>
            </div>
          </div>

          {/* Return flight summary (if round trip) */}
          {returnFlight && (
            <div className="flex flex-col gap-4 border-t border-dashed border-border/60 bg-muted/20 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <svg className="h-3.5 w-3.5 text-accent rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
                <span className="font-medium text-foreground">Return</span>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="text-base font-bold">{returnFlight.departureTime}</p>
                  <p className="text-[10px] text-muted-foreground">{returnFlight.departureCode}</p>
                </div>
                <div className="flex flex-col items-center px-2">
                  <p className="text-[10px] text-muted-foreground">{returnFlight.duration}</p>
                  <div className="relative flex items-center w-16">
                    <div className="h-px flex-1 bg-accent/40" />
                    <svg className="mx-0.5 h-3 w-3 text-accent rotate-180" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                    <div className="h-px flex-1 bg-accent/40" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold">{returnFlight.arrivalTime}</p>
                  <p className="text-[10px] text-muted-foreground">{returnFlight.arrivalCode}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {returnFlight.stops === 0 ? (
                    <span className="text-emerald-600 font-medium">Direct</span>
                  ) : (
                    `${returnFlight.stops} stop${returnFlight.stops > 1 ? "s" : ""}`
                  )}
                </span>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-border bg-muted/20 p-0">
          <div className="flex w-full items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {cabinLabels[cabin] || cabin}
              </span>
              {bookableSeats > 0 && bookableSeats <= 4 && (
                <span className="border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-600">
                  Only {bookableSeats} left
                </span>
              )}
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                Flight details
                <svg
                  className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <Link href={bookingHref}>
              <Button variant="accent" className="text-primary text-xs px-6">SELECT FLIGHT</Button>
            </Link>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full overflow-hidden"
              >
                <div className="border-t border-border px-5 py-4 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Outbound · {segments.length} segment{segments.length > 1 ? "s" : ""}
                  </p>
                  {segments.map((seg, i) => (
                    <React.Fragment key={`out-${i}`}>
                      <SegmentDetail seg={seg} idx={i} />
                      {seg.layoverAfter && (
                        <div className="flex items-center gap-2 py-2 pl-11 text-sm font-semibold text-foreground">
                          <span className="text-muted-foreground font-medium">Layover at {seg.arrivalAirport}</span>
                          <span>{seg.layoverAfter}</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  {returnFlight && returnFlight.segments.length > 0 && (
                    <>
                      <div className="my-3 border-t border-dashed border-border" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Return · {returnFlight.segments.length} segment{returnFlight.segments.length > 1 ? "s" : ""}
                      </p>
                      {returnFlight.segments.map((seg, i) => (
                        <React.Fragment key={`ret-${i}`}>
                          <SegmentDetail seg={seg} idx={i} />
                          {seg.layoverAfter && (
                            <div className="flex items-center gap-2 py-2 pl-11 text-sm font-semibold text-foreground">
                              <span className="text-muted-foreground font-medium">Layover at {seg.arrivalAirport}</span>
                              <span>{seg.layoverAfter}</span>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
