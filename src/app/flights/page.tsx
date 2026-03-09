"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FlightCard } from "@/components/flights/FlightCard";

const mockFlights = [
  { id: "1", airlineName: "Emirates", departureTime: "08:00", arrivalTime: "18:30", duration: "14h 30m", stops: 0, price: 2899, departureCode: "BLR", arrivalCode: "JFK" },
  { id: "2", airlineName: "Qatar Airways", departureTime: "22:15", arrivalTime: "06:45", duration: "16h 30m", stops: 1, price: 2549, departureCode: "BLR", arrivalCode: "JFK" },
  { id: "3", airlineName: "British Airways", departureTime: "11:00", arrivalTime: "20:00", duration: "15h", stops: 1, price: 2799, departureCode: "BLR", arrivalCode: "JFK" },
  { id: "4", airlineName: "Lufthansa", departureTime: "14:30", arrivalTime: "23:15", duration: "14h 45m", stops: 1, price: 2650, departureCode: "BLR", arrivalCode: "JFK" },
  { id: "5", airlineName: "Turkish Airlines", departureTime: "19:00", arrivalTime: "05:30", duration: "16h 30m", stops: 1, price: 2399, departureCode: "BLR", arrivalCode: "JFK" },
];

function FlightsContent() {
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "BLR";
  const destination = searchParams.get("destination") || "JFK";

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
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl font-semibold">{origin}</span>
                <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
                <span className="text-xl font-semibold">{destination}</span>
                <span className="ml-2 border border-accent/50 bg-accent/20 px-2 py-0.5 text-xs text-accent">{mockFlights.length} flights found</span>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {mockFlights.length} results sorted by price</p>
            <div className="flex gap-2">
              {["Price", "Duration", "Departure"].map((f) => (
                <button key={f} className="border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">{f}</button>
              ))}
            </div>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="space-y-4"
          >
            {mockFlights.map((f) => (
              <motion.div key={f.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FlightCard
                  id={f.id}
                  airlineName={f.airlineName}
                  departureTime={f.departureTime}
                  arrivalTime={f.arrivalTime}
                  duration={f.duration}
                  stops={f.stops}
                  price={f.price}
                  departureCode={f.departureCode}
                  arrivalCode={f.arrivalCode}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <FlightsContent />
    </Suspense>
  );
}
