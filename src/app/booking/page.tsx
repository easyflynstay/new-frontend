"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getMyGiftCards, type GiftCard } from "@/services/giftcards";
import { createBookingOrder, createBooking, type CreateBookingPayload } from "@/services/booking";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";
import { usdToInr, formatInr } from "@/lib/currency";

const INDIAN_AIRPORTS = new Set([
  "DEL", "BOM", "BLR", "MAA", "CCU", "HYD", "COK", "GOI", "AMD", "TRV", "IXC",
  "LKO", "PNQ", "ATQ", "BBI", "GAU", "SXR", "JAI", "VNS", "IXB", "BHO", "IDR",
]);

function isDomestic(from: string, to: string): boolean {
  return INDIAN_AIRPORTS.has((from || "").toUpperCase()) && INDIAN_AIRPORTS.has((to || "").toUpperCase());
}

const ALL_SEAT_CLASSES = [
  { id: "economy", label: "Economy", icon: "💺", desc: "Standard comfort" },
  { id: "premium", label: "Premium Economy", icon: "🪑", desc: "Extra legroom" },
  { id: "business", label: "Business Class", icon: "✨", desc: "Lie-flat seats" },
  { id: "first", label: "First Class", icon: "👑", desc: "Private suite" },
];

const DOMESTIC_SEAT_CLASSES = ALL_SEAT_CLASSES.filter((c) => c.id === "business" || c.id === "first");

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const flightId = searchParams.get("flightId") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const cabin = searchParams.get("cabin") || "business";
  const price = parseFloat(searchParams.get("price") || "0");
  const airline = searchParams.get("airline") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const passengers = searchParams.get("passengers") || "1";

  const tripType = returnDate ? "round" : "one-way";
  const checkIn = departure;
  const checkOut = returnDate || departure;
  const totalAmountUsd = price * parseInt(passengers, 10) || 0;
  const totalAmount = usdToInr(totalAmountUsd);
  const domestic = isDomestic(from, to);
  const seatClassOptions = domestic ? DOMESTIC_SEAT_CLASSES : ALL_SEAT_CLASSES;

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seatClass, setSeatClass] = useState(domestic ? "business" : cabin);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "giftcard" | null>(null);
  const [giftCardLast4, setGiftCardLast4] = useState("");
  const [userGiftCards, setUserGiftCards] = useState<GiftCard[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [trackingLink] = useState("");
  const [emailSent] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (user) {
      setName([user.first_name, user.last_name].filter(Boolean).join(" ") || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    getMyGiftCards().then(setUserGiftCards).catch(() => setUserGiftCards([]));
  }, [user]);

  const matchedGiftCard = user && giftCardLast4.length === 4
    ? userGiftCards.find((c) => c.status === "active" && c.code.slice(-4).toUpperCase() === giftCardLast4.toUpperCase())
    : null;
  const giftCardBalance = matchedGiftCard ? Number(matchedGiftCard.balance) : 0;
  const giftCardToUse = matchedGiftCard && giftCardBalance >= totalAmount ? totalAmount : 0;
  const giftCardSufficient = matchedGiftCard != null && giftCardBalance >= totalAmount;

  const canProceedPassenger = name.trim().length > 0 && email.trim().length > 0 && phone.trim().length >= 10;

  const handlePayWithRazorpay = async () => {
    setSubmitLoading(true);
    setPaymentError("");
    try {
      await loadRazorpayScript();
      const order = await createBookingOrder(totalAmount);
      openRazorpayCheckout({
        orderId: order.order_id,
        amountPaise: order.amount,
        currency: order.currency,
        userName: name,
        userEmail: email,
        onSuccess: async () => {
          await submitBooking();
          setSubmitLoading(false);
        },
        onDismiss: () => {
          setSubmitLoading(false);
          setPaymentError("Payment was cancelled.");
        },
      });
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string }; }; message?: string }).response?.data?.detail
        : (err as Error)?.message;
      setPaymentError(message || "Payment failed.");
      setSubmitLoading(false);
    }
  };

  const submitBooking = async (giftcardCode?: string, giftcardAmountUsed?: number) => {
    const payload: CreateBookingPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      from,
      to,
      tripType: tripType as "one-way" | "round",
      checkIn,
      checkOut,
      class: seatClass,
      travelers: passengers,
    };
    if (giftcardCode && giftcardAmountUsed != null) {
      payload.giftcardCode = giftcardCode;
      payload.giftcardAmountUsed = giftcardAmountUsed;
    }
    const res = await createBooking(payload);
    setBookingId(res.booking_id);
    setStep(4);
  };

  const handlePayWithGiftCard = async () => {
    if (!matchedGiftCard || !giftCardSufficient) {
      setPaymentError("Enter last 4 digits of a gift card with balance ≥ ₹" + totalAmount.toLocaleString() + ".");
      return;
    }
    setSubmitLoading(true);
    setPaymentError("");
    try {
      await submitBooking(matchedGiftCard.code, giftCardToUse);
    } catch (err: unknown) {
      const detail = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
        : undefined;
      setPaymentError(detail || "Booking failed.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handlePayOnline = () => {
    setPaymentMethod("online");
    handlePayWithRazorpay();
  };

  if (!flightId || !from || !to) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Missing flight details. Please select a flight from search results.</p>
              <Link href="/flights"><Button variant="accent" className="mt-4 text-primary">Search Flights</Button></Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="relative h-28 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&h=300&fit=crop" alt="Booking" fill className="object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative flex h-full items-center justify-center">
          <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">Complete Your Booking</h1>
        </div>
      </section>
      <BookingSteps currentStep={step} />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-2xl px-4">
          {/* Flight summary (always visible) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border-2 border-accent/30 bg-accent/5 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary text-white">
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading font-semibold text-foreground">{decodeURIComponent(airline)}</p>
                <p className="text-sm text-muted-foreground">
                  {from} → {to} · {passengers} passenger{passengers !== "1" ? "s" : ""}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {departure}{returnDate ? ` · Return ${returnDate}` : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-heading text-xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">total</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: Passenger details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Passenger Details</h2>
                    <p className="text-sm text-white/80">We’ll use this for your booking and e-ticket</p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label>Full name</Label>
                      <Input
                        className="mt-1"
                        placeholder="John Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        className="mt-1"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Phone number</Label>
                      <Input
                        type="tel"
                        className="mt-1"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={() => router.push("/flights")}>Back to results</Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(2)} disabled={!canProceedPassenger}>
                        Continue to Seat Class
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Seat class */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={cn("border-2 overflow-hidden", seatClass === "first" && "border-accent")}>
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Select Seat Class</h2>
                    <p className="text-sm text-white/80">
                      {domestic ? "Domestic: Business & First class available" : "Choose your cabin"}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {seatClassOptions.map((s) => (
                        <motion.button
                          key={s.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSeatClass(s.id)}
                          className={cn(
                            "border-2 p-4 text-left transition-all rounded-sm",
                            seatClass === s.id ? "border-accent bg-accent/10" : "border-border hover:bg-muted/50"
                          )}
                        >
                          <span className="text-2xl">{s.icon}</span>
                          <p className="mt-1 font-heading font-semibold">{s.label}</p>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(3)}>
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 overflow-hidden">
                  <CardHeader className="bg-primary text-white">
                    <h2 className="font-heading text-xl font-semibold">Payment</h2>
                    <p className="text-sm text-white/80">Total: {formatInr(totalAmount)}</p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-5">
                    {paymentError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{paymentError}</div>
                    )}

                    {user ? (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePayOnline}
                            disabled={submitLoading}
                            className="flex flex-col items-center gap-2 border-2 border-border p-6 hover:border-accent/50 hover:bg-accent/5 transition-all rounded-sm"
                          >
                            <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                            <span className="font-semibold">Pay Online</span>
                            <span className="text-xs text-muted-foreground">Card, UPI, Net Banking</span>
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentMethod("giftcard")}
                            className={cn(
                              "flex flex-col items-center gap-2 border-2 p-6 transition-all rounded-sm",
                              paymentMethod === "giftcard" ? "border-accent bg-accent/10" : "border-border hover:border-accent/50 hover:bg-accent/5"
                            )}
                          >
                            <div className="flex h-12 w-12 items-center justify-center bg-accent/20 text-accent">
                              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" />
                              </svg>
                            </div>
                            <span className="font-semibold">Pay via Gift Card</span>
                            <span className="text-xs text-muted-foreground">Use your balance</span>
                          </motion.button>
                        </div>

                        {paymentMethod === "giftcard" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="border border-border rounded-lg p-4 space-y-3"
                          >
                            <Label>Last 4 digits of gift card code</Label>
                            <Input
                              maxLength={4}
                              placeholder="XXXX"
                              value={giftCardLast4}
                              onChange={(e) => setGiftCardLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                              className="font-mono text-lg w-24"
                            />
                            {matchedGiftCard && (
                              <div className="text-sm">
                                <p className="text-muted-foreground">Balance: ₹{giftCardBalance.toLocaleString()}</p>
                                {giftCardSufficient ? (
                                  <p className="font-medium text-emerald-600">Full amount covered by gift card.</p>
                                ) : giftCardBalance > 0 ? (
                                  <p className="text-amber-600 text-xs">Insufficient balance. Need ₹{totalAmount.toLocaleString()}. Use Pay Online or another card.</p>
                                ) : null}
                              </div>
                            )}
                            <Button
                              variant="accent"
                              className="text-primary w-full"
                              disabled={submitLoading || !giftCardSufficient}
                              onClick={handlePayWithGiftCard}
                            >
                              {submitLoading ? "Processing..." : "Pay with Gift Card"}
                            </Button>
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Guest checkout: pay securely with Razorpay.</p>
                        <Button
                          variant="accent"
                          size="lg"
                          className="text-primary w-full"
                          disabled={submitLoading}
                          onClick={handlePayOnline}
                        >
                          {submitLoading ? "Opening payment..." : "Pay Online (Razorpay)"}
                        </Button>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && bookingId && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-2 border-accent overflow-hidden">
                  <CardHeader className="bg-accent/10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                      className="mx-auto mb-2 flex h-16 w-16 items-center justify-center bg-accent rounded-full"
                    >
                      <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h2 className="font-heading text-2xl font-semibold text-primary">Booking Confirmed!</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {emailSent ? "A confirmation email has been sent with your tracking link." : "Save your tracking link below (confirmation email could not be sent)."}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <p className="font-mono text-xl font-bold text-primary tracking-wide">{bookingId}</p>
                    <p className="text-xs text-muted-foreground mt-1">Your Booking Reference</p>
                    {trackingLink && (
                      <p className="mt-3 text-sm text-muted-foreground break-all">
                        Track booking: <a href={trackingLink} className="text-accent font-medium underline hover:no-underline">{trackingLink}</a>
                      </p>
                    )}
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Link href={trackingLink || `/track-booking?booking_id=${bookingId}`}>
                        <Button variant="accent" className="text-primary">View E-Ticket</Button>
                      </Link>
                      <Link href="/dashboard/bookings">
                        <Button variant="outline">My Bookings</Button>
                      </Link>
                      <Link href="/">
                        <Button variant="outline">Home</Button>
                      </Link>
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
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 border-4 border-muted border-t-accent animate-spin rounded-full" /></div>}>
      <BookingContent />
    </Suspense>
  );
}
