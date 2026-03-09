"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TicketData {
  pnr: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  passengerName: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  airline: string;
  flightNo: string;
  seatClass: string;
  seat: string;
  gate: string;
  terminal: string;
  duration: string;
  bookingDate: string;
}

const statusConfig = {
  confirmed: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700", dot: "bg-emerald-500" },
  pending: { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-700", dot: "bg-amber-500" },
  cancelled: { bg: "bg-red-50", border: "border-red-400", text: "text-red-700", dot: "bg-red-500" },
  completed: { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-700", dot: "bg-blue-500" },
};

export default function TrackBookingPage() {
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const mockTicket: TicketData = {
    pnr: bookingId || "——",
    status: "confirmed",
    passengerName: "John Smith",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "JFK",
    destinationCity: "New York",
    date: "Mar 17, 2026",
    departureTime: "08:00",
    arrivalTime: "18:30",
    airline: "Emirates",
    flightNo: "EK 505",
    seatClass: "Business Class",
    seat: "4A",
    gate: "B12",
    terminal: "T3",
    duration: "14h 30m",
    bookingDate: "Mar 09, 2026",
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
    }, 1500);
  };

  const sc = statusConfig[mockTicket.status];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header banner */}
        <section className="relative h-48 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1920&h=400&fit=crop"
            alt="Airport terminal"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h1 className="font-heading text-3xl font-bold md:text-4xl">Track Your Booking</h1>
              <p className="mt-2 text-white/80">Enter your booking details to view your e-ticket</p>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Search form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-2 overflow-hidden">
              <CardHeader className="bg-primary text-white">
                <h2 className="font-heading text-lg font-semibold">Find your booking</h2>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <Label>Booking ID / PNR</Label>
                    <Input
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      placeholder="e.g. BK-20240315-00001"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Email or Phone</Label>
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email or phone number"
                      className="mt-1"
                      required
                    />
                  </div>
                  <Button type="submit" variant="accent" className="text-primary h-10 px-8" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Searching...
                      </span>
                    ) : "Track"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ticket display */}
          <AnimatePresence>
            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-10"
              >
                {/* E-Ticket */}
                <div className="relative overflow-hidden border-2 border-border bg-white shadow-lg">
                  {/* Ticket header */}
                  <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-accent">
                        <span className="font-heading text-lg font-bold text-primary">E</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-white">Easyflynstay</h3>
                        <p className="text-xs text-white/60">Electronic Ticket</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn("inline-flex items-center gap-1.5 px-3 py-1", sc.bg, sc.border, "border")}>
                        <span className={cn("h-2 w-2 rounded-full", sc.dot)} />
                        <span className={cn("text-xs font-semibold uppercase", sc.text)}>{mockTicket.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* PNR Banner */}
                  <div className="border-b border-border bg-accent/5 px-6 py-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">PNR / Booking Reference</span>
                      <p className="font-heading text-2xl font-bold text-primary tracking-widest">{mockTicket.pnr}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Booked on</span>
                      <p className="text-sm font-medium">{mockTicket.bookingDate}</p>
                    </div>
                  </div>

                  {/* Route section */}
                  <div className="px-6 py-6">
                    <div className="flex items-center justify-between gap-4">
                      {/* Departure */}
                      <div className="text-center flex-1">
                        <p className="font-heading text-4xl font-bold text-primary">{mockTicket.origin}</p>
                        <p className="text-sm text-muted-foreground">{mockTicket.originCity}</p>
                        <p className="mt-2 text-2xl font-semibold">{mockTicket.departureTime}</p>
                        <p className="text-xs text-muted-foreground">{mockTicket.date}</p>
                      </div>

                      {/* Flight path */}
                      <div className="flex-1 flex flex-col items-center px-4">
                        <p className="text-xs text-muted-foreground mb-2">{mockTicket.duration}</p>
                        <div className="relative w-full flex items-center">
                          <div className="h-0.5 flex-1 bg-accent/40" />
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="mx-2"
                          >
                            <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </motion.div>
                          <div className="h-0.5 flex-1 bg-accent/40" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{mockTicket.airline} • {mockTicket.flightNo}</p>
                      </div>

                      {/* Arrival */}
                      <div className="text-center flex-1">
                        <p className="font-heading text-4xl font-bold text-primary">{mockTicket.destination}</p>
                        <p className="text-sm text-muted-foreground">{mockTicket.destinationCity}</p>
                        <p className="mt-2 text-2xl font-semibold">{mockTicket.arrivalTime}</p>
                        <p className="text-xs text-muted-foreground">{mockTicket.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tear line */}
                  <div className="relative flex items-center px-0">
                    <div className="h-6 w-3 rounded-r-full bg-muted" />
                    <div className="flex-1 border-t-2 border-dashed border-border" />
                    <div className="h-6 w-3 rounded-l-full bg-muted" />
                  </div>

                  {/* Details grid */}
                  <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Passenger</span>
                      <p className="font-medium text-sm">{mockTicket.passengerName}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Class</span>
                      <p className="font-medium text-sm text-accent">{mockTicket.seatClass}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Seat</span>
                      <p className="font-medium text-sm">{mockTicket.seat}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Gate</span>
                      <p className="font-medium text-sm">{mockTicket.gate}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Terminal</span>
                      <p className="font-medium text-sm">{mockTicket.terminal}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Flight</span>
                      <p className="font-medium text-sm">{mockTicket.flightNo}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Date</span>
                      <p className="font-medium text-sm">{mockTicket.date}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Duration</span>
                      <p className="font-medium text-sm">{mockTicket.duration}</p>
                    </div>
                  </div>

                  {/* Ticket footer */}
                  <div className="bg-muted/50 px-6 py-3 flex items-center justify-between border-t border-border">
                    <p className="text-xs text-muted-foreground">Please arrive at the airport at least 3 hours before departure.</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"/></svg>
                        Print
                      </Button>
                      <Button variant="accent" size="sm" className="text-xs text-primary">
                        <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick info cards below ticket */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="border border-border bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Baggage</p>
                        <p className="text-sm font-medium">2 × 23kg checked</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="border border-border bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-green-50 text-green-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Check-in</p>
                        <p className="text-sm font-medium">Online available</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="border border-border bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center bg-accent/10 text-accent">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Support</p>
                        <p className="text-sm font-medium">888-668-0828</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
