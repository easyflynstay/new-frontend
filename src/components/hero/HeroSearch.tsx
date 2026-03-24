"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AirportInput,
  CustomSelect,
  PremiumDateInput,
  ALL_CABIN_OPTIONS,
} from "@/components/flights/flight-search-fields";

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
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
  const planeIconTo = (
    <svg className="h-4 w-4 rotate-90" fill="currentColor" viewBox="0 0 24 24">
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
      className="relative w-full max-w-6xl overflow-visible border border-slate-200 bg-white shadow-[0_28px_72px_-14px_rgba(11,31,59,0.22)] ring-1 ring-slate-900/[0.06] backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-90" aria-hidden />
      {/* Trip type (left) + International / Domestic (right) */}
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex shrink-0 rounded-none border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setTripType("oneway")}
            className={cn(
              "flex items-center gap-2 rounded-none px-4 py-2.5 text-sm font-semibold tracking-wide transition-all whitespace-nowrap",
              tripType === "oneway"
                ? "bg-accent text-primary shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
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
                ? "bg-accent text-primary shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            )}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Round Trip
          </button>
        </div>
        <div className="flex shrink-0 items-center rounded-none border border-slate-200 bg-white p-1 shadow-sm sm:ml-auto">
          <button
            type="button"
            onClick={() => setTripScope("international")}
            className={cn(
              "whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] transition-all",
              tripScope === "international"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            )}
          >
            International
          </button>
          <button
            type="button"
            onClick={() => setTripScope("domestic")}
            className={cn(
              "whitespace-nowrap rounded-none px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] transition-all",
              tripScope === "domestic"
                ? "bg-accent text-primary shadow-sm hover:bg-accent/90"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            )}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* Main fields - overflow-visible so calendar and dropdowns are not clipped */}
      <div className="overflow-visible bg-white px-4 py-5 sm:px-6 sm:py-6">
        {/* Route row: FROM | swap (centered) | TO */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* From */}
          <div className="flex-1">
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            title="Swap cities"
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-none border-2 border-accent bg-white text-accent shadow-md transition-colors hover:bg-accent hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </motion.button>

          {/* To */}
          <div className="flex-1">
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="mt-5 grid gap-4 overflow-visible sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Departure
            </label>
            <PremiumDateInput
              value={departure}
              onChange={setDeparture}
              placeholder="Select departure"
              headerLabel="Departure"
            />
          </div>

          {tripType === "round" && (
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Return
              </label>
              <PremiumDateInput
                value={returnDate}
                onChange={setReturnDate}
                min={departure || new Date().toISOString().slice(0, 10)}
                placeholder="Select return"
                headerLabel="Return"
              />
            </div>
          )}

          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Travelers
            </label>
            <CustomSelect
              value={passengers}
              onChange={setPassengers}
              options={passengerOptions}
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Cabin Class
            </label>
            <CustomSelect
              value={cabinValue}
              onChange={setCabin}
              options={ALL_CABIN_OPTIONS}
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
          </div>
        </div>
      </div>

      {/* Search bar — trust row + CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 sm:py-4">
        {formError ? (
          <p className="w-full text-sm text-red-600 font-medium" role="alert">
            {formError}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Seamless experience
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Best price guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            24/7 support
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="font-bold tracking-[0.08em] text-primary shadow-md shadow-accent/25"
          >
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
