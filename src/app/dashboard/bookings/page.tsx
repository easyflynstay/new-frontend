"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const upcoming = [
  {
    id: "BK-20260315-001",
    airline: "Emirates",
    code: "EK",
    airlineColor: "bg-red-600",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "JFK",
    destCity: "New York",
    departureTime: "08:00",
    arrivalTime: "18:30",
    date: "Mar 17, 2026",
    duration: "14h 30m",
    cabin: "Business Class",
    seat: "4A",
    status: "Confirmed",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-300",
  },
];

const past = [
  {
    id: "BK-20260110-000",
    airline: "Qatar Airways",
    code: "QR",
    airlineColor: "bg-[#5C0632]",
    origin: "JFK",
    originCity: "New York",
    destination: "BLR",
    destCity: "Bengaluru",
    departureTime: "22:15",
    arrivalTime: "06:45",
    date: "Jan 10, 2026",
    duration: "16h 30m",
    cabin: "Business Class",
    seat: "7B",
    status: "Completed",
    statusColor: "bg-blue-50 text-blue-700 border-blue-300",
  },
  {
    id: "BK-20251220-003",
    airline: "Singapore Airlines",
    code: "SQ",
    airlineColor: "bg-[#00256C]",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "SIN",
    destCity: "Singapore",
    departureTime: "14:30",
    arrivalTime: "22:00",
    date: "Dec 20, 2025",
    duration: "5h 30m",
    cabin: "First Class",
    seat: "1A",
    status: "Completed",
    statusColor: "bg-blue-50 text-blue-700 border-blue-300",
  },
];

interface FlightBooking {
  id: string;
  airline: string;
  code: string;
  airlineColor: string;
  origin: string;
  originCity: string;
  destination: string;
  destCity: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  duration: string;
  cabin: string;
  seat: string;
  status: string;
  statusColor: string;
}

function BookingCard({ b, index }: { b: FlightBooking; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-border bg-white shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/20 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-8 w-8 items-center justify-center text-white text-xs font-bold", b.airlineColor)}>
            {b.code}
          </div>
          <div>
            <p className="text-sm font-semibold">{b.airline}</p>
            <p className="text-[10px] text-muted-foreground">{b.id}</p>
          </div>
        </div>
        <span className={cn("border px-2.5 py-0.5 text-xs font-semibold", b.statusColor)}>{b.status}</span>
      </div>

      {/* Route */}
      <div className="px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="font-heading text-2xl font-bold text-primary">{b.origin}</p>
            <p className="text-xs text-muted-foreground">{b.originCity}</p>
            <p className="mt-1 text-lg font-semibold">{b.departureTime}</p>
          </div>

          <div className="flex-1 mx-6 flex flex-col items-center">
            <p className="text-[10px] text-muted-foreground mb-1">{b.duration}</p>
            <div className="relative w-full flex items-center">
              <div className="h-px flex-1 bg-accent/40" />
              <svg className="mx-1 h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
              <div className="h-px flex-1 bg-accent/40" />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{b.cabin}</p>
          </div>

          <div className="text-center">
            <p className="font-heading text-2xl font-bold text-primary">{b.destination}</p>
            <p className="text-xs text-muted-foreground">{b.destCity}</p>
            <p className="mt-1 text-lg font-semibold">{b.arrivalTime}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-muted/10 px-5 py-3">
        <div className="flex gap-5 text-xs text-muted-foreground">
          <span><strong className="text-foreground">Date:</strong> {b.date}</span>
          <span><strong className="text-foreground">Seat:</strong> {b.seat}</span>
        </div>
        <Button variant="outline" size="sm" className="text-xs">View Details</Button>
      </div>
    </motion.div>
  );
}

export default function BookingsPage() {
  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="mt-1 text-muted-foreground">View and manage your upcoming and past flights.</p>
      </motion.div>

      {/* Upcoming */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <h2 className="font-heading text-lg font-semibold text-foreground">Upcoming Flights</h2>
        </div>
        <div className="space-y-4">
          {upcoming.map((b, i) => <BookingCard key={b.id} b={b} index={i} />)}
        </div>
      </div>

      {/* Past */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-muted-foreground" />
          <h2 className="font-heading text-lg font-semibold text-foreground">Past Flights</h2>
        </div>
        <div className="space-y-4">
          {past.map((b, i) => <BookingCard key={b.id} b={b} index={i} />)}
        </div>
      </div>
    </div>
  );
}
