"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const seatClasses = [
  { id: "economy", label: "Economy", icon: "💺", desc: "Standard comfort" },
  { id: "premium", label: "Premium Economy", icon: "🪑", desc: "Extra legroom" },
  { id: "business", label: "Business Class", icon: "✨", desc: "Lie-flat seats" },
  { id: "first", label: "First Class", icon: "👑", desc: "Private suite" },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId");
  const [step, setStep] = useState(1);
  const [seatClass, setSeatClass] = useState("business");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Header */}
      <section className="relative h-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&h=300&fit=crop"
          alt="Booking"
          fill
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative flex h-full items-center justify-center">
          <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">Complete Your Booking</h1>
        </div>
      </section>
      <BookingSteps currentStep={step} />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-2xl px-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card className="border-2 overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Flight Selection</h2>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 border border-border bg-muted/30 p-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-accent/10">
                        <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                      </div>
                      <div>
                        <p className="font-medium">Flight #{flightId || "—"}</p>
                        <p className="text-sm text-muted-foreground">BLR → JFK · Business Class</p>
                      </div>
                    </div>
                    <Button variant="accent" className="mt-6 text-primary" onClick={() => setStep(2)}>Continue to Passenger Details</Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card className="border-2 overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Passenger Details</h2>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>First name</Label><Input className="mt-1" placeholder="John" /></div>
                      <div><Label>Last name</Label><Input className="mt-1" placeholder="Smith" /></div>
                    </div>
                    <div><Label>Email</Label><Input type="email" className="mt-1" placeholder="you@example.com" /></div>
                    <div><Label>Phone</Label><Input type="tel" className="mt-1" placeholder="+1 (555) 000-0000" /></div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(3)}>Continue</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card className={cn("border-2 overflow-hidden", seatClass === "first" && "border-accent")}>
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Select Seat Class</h2>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {seatClasses.map((s) => (
                        <motion.button
                          key={s.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSeatClass(s.id)}
                          className={cn(
                            "border-2 p-4 text-left transition-all",
                            seatClass === s.id ? "border-accent bg-accent/10" : "border-border hover:bg-muted"
                          )}
                        >
                          <span className="text-2xl">{s.icon}</span>
                          <p className="mt-1 font-heading font-semibold">{s.label}</p>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(4)}>Continue to Payment</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Card className="border-2 overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Payment</h2>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div><Label>Card number</Label><Input className="mt-1" placeholder="1234 5678 9012 3456" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Expiry</Label><Input className="mt-1" placeholder="MM/YY" /></div>
                      <div><Label>CVC</Label><Input className="mt-1" placeholder="CVC" /></div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(5)}>Pay & Confirm</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <Card className="border-2 border-accent overflow-hidden">
                  <CardHeader className="bg-accent/10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mx-auto mb-2 flex h-16 w-16 items-center justify-center bg-accent"
                    >
                      <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </motion.div>
                    <h2 className="font-heading text-2xl font-semibold text-accent">Booking Confirmed!</h2>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">Your booking has been confirmed. A confirmation email has been sent.</p>
                    <p className="mt-4 font-heading text-xl font-bold text-primary">BK-{Date.now().toString().slice(-8)}</p>
                    <p className="text-xs text-muted-foreground">Your Booking Reference</p>
                    <div className="mt-6 flex justify-center gap-3">
                      <Link href="/dashboard/bookings"><Button variant="accent" className="text-primary">View My Bookings</Button></Link>
                      <Link href="/track-booking"><Button variant="outline">Track Booking</Button></Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
