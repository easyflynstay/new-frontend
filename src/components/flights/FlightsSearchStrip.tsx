"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AirportInput,
  CustomSelect,
  PremiumDateInput,
  ALL_CABIN_OPTIONS,
} from "@/components/flights/flight-search-fields";

const passengerOptions = [
  { value: "1", label: "1 Passenger", sub: "Solo traveler" },
  { value: "2", label: "2 Passengers", sub: "Couple or duo" },
  { value: "3", label: "3 Passengers", sub: "Small group" },
  { value: "4", label: "4 Passengers", sub: "Family" },
  { value: "5", label: "5 Passengers", sub: "Group booking" },
];

export interface FlightsSearchStripProps {
  syncKey: string;
  originCode: string;
  destinationCode: string;
  departure: string;
  returnDate: string;
  passengers: string;
  cabin: string;
  currency: string;
  resultBadge?: { filteredCount: number; totalCount: number } | null;
}

const labelCls = "mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500";

export function FlightsSearchStrip({
  syncKey,
  originCode: urlOrigin,
  destinationCode: urlDest,
  departure: urlDeparture,
  returnDate: urlReturn,
  passengers: urlPassengers,
  cabin: urlCabin,
  currency,
  resultBadge,
}: FlightsSearchStripProps) {
  const router = useRouter();
  const [tripType, setTripType] = useState<"round" | "oneway">(() => (urlReturn ? "round" : "oneway"));
  const [originCode, setOriginCode] = useState(urlOrigin);
  const [originDisplay, setOriginDisplay] = useState(urlOrigin);
  const [destCode, setDestCode] = useState(urlDest);
  const [destDisplay, setDestDisplay] = useState(urlDest);
  const [departure, setDeparture] = useState(urlDeparture);
  const [returnDate, setReturnDate] = useState(urlReturn);
  const [passengers, setPassengers] = useState(urlPassengers || "1");
  const [cabin, setCabin] = useState(urlCabin || "economy");
  const [formError, setFormError] = useState<string | null>(null);

  const cabinValue = ALL_CABIN_OPTIONS.some((o) => o.value === cabin) ? cabin : ALL_CABIN_OPTIONS[0]?.value ?? "economy";

  useEffect(() => {
    setTripType(urlReturn ? "round" : "oneway");
    setOriginCode(urlOrigin);
    setOriginDisplay(urlOrigin);
    setDestCode(urlDest);
    setDestDisplay(urlDest);
    setDeparture(urlDeparture);
    setReturnDate(urlReturn);
    setPassengers(urlPassengers || "1");
    setCabin(urlCabin || "economy");
    setFormError(null);
  }, [syncKey, urlOrigin, urlDest, urlDeparture, urlReturn, urlPassengers, urlCabin]);

  const swapCities = () => {
    setOriginCode(destCode);
    setOriginDisplay(destDisplay);
    setDestCode(originCode);
    setDestDisplay(originDisplay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const origin = originCode.trim();
    const destination = destCode.trim();
    const dep = departure.trim();

    if (!origin) {
      setFormError("Please select origin city or airport.");
      return;
    }
    if (!destination) {
      setFormError("Please select destination city or airport.");
      return;
    }
    if (origin.length !== 3 || destination.length !== 3) {
      setFormError("Choose airports from the suggestions (3-letter codes).");
      return;
    }
    if (!dep || !/^\d{4}-\d{2}-\d{2}$/.test(dep)) {
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
      currency: currency || "INR",
    });
    if (tripType === "round" && returnDate.trim()) params.set("return", returnDate.trim());

    router.push(`/flights?${params.toString()}`);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[1400px] overflow-visible px-4 py-4 sm:px-5 sm:py-4"
    >
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        Search flights
      </p>

      <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
        <div className="flex h-12 shrink-0 items-center border border-slate-200 bg-white p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => setTripType("oneway")}
            className={cn(
              "h-full px-3 text-[11px] font-bold uppercase tracking-wide transition-colors",
              tripType === "oneway"
                ? "bg-accent text-primary shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            One way
          </button>
          <button
            type="button"
            onClick={() => setTripType("round")}
            className={cn(
              "h-full px-3 text-[11px] font-bold uppercase tracking-wide transition-colors",
              tripType === "round"
                ? "bg-accent text-primary shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            Round trip
          </button>
        </div>

        <div className="w-full min-w-[15rem] flex-[1.35_1_280px] sm:min-w-[17rem] md:min-w-[18rem] lg:min-w-[20rem] lg:flex-[1.5_1_320px]">
          <label className={labelCls}>From</label>
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

        <div className="flex h-12 shrink-0 items-center justify-center self-end">
          <button
            type="button"
            onClick={swapCities}
            title="Swap cities"
            className="flex h-12 w-12 items-center justify-center border-2 border-accent bg-white text-accent shadow-sm transition-colors hover:bg-accent hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        <div className="w-full min-w-[15rem] flex-[1.35_1_280px] sm:min-w-[17rem] md:min-w-[18rem] lg:min-w-[20rem] lg:flex-[1.5_1_320px]">
          <label className={labelCls}>To</label>
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

        <div className="w-full min-w-[12rem] sm:w-52 sm:min-w-[13rem]">
          <label className={labelCls}>Departure</label>
          <PremiumDateInput
            value={departure}
            onChange={setDeparture}
            placeholder="Departure"
            headerLabel="Departure"
          />
        </div>

        {tripType === "round" && (
          <div className="w-full min-w-[12rem] sm:w-52 sm:min-w-[13rem]">
            <label className={labelCls}>Return</label>
            <PremiumDateInput
              value={returnDate}
              onChange={setReturnDate}
              min={departure || new Date().toISOString().slice(0, 10)}
              placeholder="Return"
              headerLabel="Return"
            />
          </div>
        )}

        <div className="w-full shrink-0 sm:w-48">
          <label className={labelCls}>Travellers</label>
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

        <div className="w-full shrink-0 sm:w-52">
          <label className={labelCls}>Cabin</label>
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

        <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:ml-auto sm:w-auto">
          {resultBadge ? (
            <span className="inline-flex h-12 items-center border border-border bg-white px-3 text-xs font-semibold tabular-nums text-foreground shadow-sm">
              {resultBadge.filteredCount} of {resultBadge.totalCount} flights
            </span>
          ) : null}
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="h-12 shrink-0 px-6 text-xs font-bold text-primary"
          >
            <svg className="mr-2 h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Modify Search
          </Button>
        </div>
      </div>

      {formError ? (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          {formError}
        </p>
      ) : null}
    </form>
  );
}
