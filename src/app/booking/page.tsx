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
import { PaymentPinEntry } from "@/components/payment/PaymentPinEntry";

const INDIAN_AIRPORTS = new Set([
  "DEL", "BOM", "BLR", "MAA", "CCU", "HYD", "COK", "GOI", "AMD", "TRV", "IXC",
  "LKO", "PNQ", "ATQ", "BBI", "GAU", "SXR", "JAI", "VNS", "IXB", "BHO", "IDR",
]);

function isDomestic(from: string, to: string): boolean {
  return INDIAN_AIRPORTS.has((from || "").toUpperCase()) && INDIAN_AIRPORTS.has((to || "").toUpperCase());
}

function computeAgeFromDob(dob: string): number | null {
  if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const [y, m, d] = dob.split("-").map((x) => parseInt(x, 10));
  if (!y || !m || !d) return null;
  const birth = new Date(y, m - 1, d);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hasHadBirthday =
    now.getMonth() > birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hasHadBirthday) age -= 1;
  if (age < 0 || age > 120) return null;
  return age;
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const flightId = searchParams.get("flightId") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const cabin = searchParams.get("cabin") || "economy";
  const price = parseFloat(searchParams.get("price") || "0");
  const currencyFromUrl = (searchParams.get("currency") || "INR").toUpperCase();
  const airline = searchParams.get("airline") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const passengers = searchParams.get("passengers") || "1";

  const tripType = returnDate ? "round" : "one-way";
  const checkIn = departure;
  const checkOut = returnDate || departure;
  const passengerCountNum = parseInt(passengers, 10) || 1;
  const totalAmount =
    currencyFromUrl === "INR"
      ? price * passengerCountNum
      : usdToInr(price * passengerCountNum);
  const domestic = isDomestic(from, to);

  const passengerCount = Math.max(1, parseInt(passengers, 10) || 1);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengerDetails, setPassengerDetails] = useState<
    { firstName: string; lastName: string; dob: string; gender: string }[]
  >(() => Array.from({ length: passengerCount }, () => ({ firstName: "", lastName: "", dob: "", gender: "" })));
  const [seatClass] = useState(domestic ? "economy" : cabin);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "giftcard" | null>(null);
  const [giftCardLast4, setGiftCardLast4] = useState("");
  const [selectedGiftCardCodes, setSelectedGiftCardCodes] = useState<string[]>([]);
  const [userGiftCards, setUserGiftCards] = useState<GiftCard[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showGiftCardPin, setShowGiftCardPin] = useState(false);

  useEffect(() => {
    if (user) {
      const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "";
      setName(fullName);
      setEmail(user.email || "");
      setPassengerDetails((prev) => {
        const next = prev.slice(0, passengerCount);
        while (next.length < passengerCount) next.push({ firstName: "", lastName: "", dob: "", gender: "" });
        if (next[0]) {
          next[0] = {
            ...next[0],
            firstName: next[0].firstName || (user.first_name || ""),
            lastName: next[0].lastName || (user.last_name || ""),
          };
        }
        return next;
      });
    }
  }, [user, passengerCount]);

  useEffect(() => {
    setPassengerDetails((prev) => {
      if (prev.length === passengerCount) return prev;
      const next = Array.from({ length: passengerCount }, (_, i) => prev[i] || { firstName: "", lastName: "", dob: "", gender: "" });
      return next;
    });
  }, [passengerCount]);

  useEffect(() => {
    if (!user) return;
    getMyGiftCards().then(setUserGiftCards).catch(() => setUserGiftCards([]));
  }, [user]);

  const activeGiftCards = userGiftCards
    .filter((c) => c.status === "active")
    .slice()
    .sort((a, b) => Number(b.balance) - Number(a.balance));

  const manualMatchedGiftCard =
    user && giftCardLast4.length === 4
      ? activeGiftCards.find(
        (c) => c.code.slice(-4).toUpperCase() === giftCardLast4.toUpperCase().trim()
      ) || null
      : null;

  const selectedCards =
    selectedGiftCardCodes.length > 0
      ? activeGiftCards.filter((c) => selectedGiftCardCodes.includes(c.code))
      : manualMatchedGiftCard
        ? [manualMatchedGiftCard]
        : [];

  const allocations = (() => {
    let remaining = totalAmount;
    const out: Array<{ code: string; amountUsed: number; balance: number; last4: string }> = [];
    for (const c of selectedCards) {
      const bal = Number(c.balance);
      if (remaining <= 0) break;
      const use = Math.max(0, Math.min(bal, remaining));
      if (use > 0) {
        out.push({ code: c.code, amountUsed: use, balance: bal, last4: c.code.slice(-4).toUpperCase() });
        remaining -= use;
      }
    }
    return { items: out, remaining, totalUsed: totalAmount - remaining };
  })();

  const giftCardSufficient = allocations.remaining <= 0 && allocations.items.length > 0;

  const primaryName =
    [passengerDetails[0]?.firstName, passengerDetails[0]?.lastName].filter(Boolean).join(" ").trim() || name.trim();

  const canProceedPassenger =
    email.trim().length > 0 &&
    phone.trim().length >= 10 &&
    passengerDetails.length >= passengerCount &&
    passengerDetails
      .slice(0, passengerCount)
      .every((p) => p.firstName.trim().length > 0 && p.lastName.trim().length > 0 && p.dob.trim().length > 0 && p.gender.trim().length > 0);

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
        userName: primaryName,
        userEmail: email,
        userContact: phone ? (phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "").slice(-10)}`) : undefined,
        onSuccess: async () => {
          await submitBooking();
          setSubmitLoading(false);
        },
        onDismiss: () => {
          setSubmitLoading(false);
          setPaymentError("Payment was cancelled.");
        },
        onError: (err) => {
          setPaymentError(err.message || "Payment could not be opened.");
          setSubmitLoading(false);
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

  const submitBooking = async (
    giftcardCode?: string,
    giftcardAmountUsed?: number,
    paymentPin?: string,
    giftcards?: { giftcardCode: string; amountUsed: number }[]
  ) => {
    const payload: CreateBookingPayload = {
      name: primaryName,
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
    if (user?.customer_id) payload.customerId = user.customer_id;
    if (passengerDetails.length >= passengerCount) {
      payload.passengerDetails = passengerDetails.slice(0, passengerCount).map((p) => ({
        firstName: p.firstName.trim(),
        lastName: p.lastName.trim(),
        dob: p.dob.trim(),
        gender: p.gender.trim(),
      }));
    }
    if (giftcards && giftcards.length > 0) {
      payload.giftcards = giftcards;
      if (paymentPin) payload.paymentPin = paymentPin;
    } else if (giftcardCode && giftcardAmountUsed != null) {
      payload.giftcardCode = giftcardCode;
      payload.giftcardAmountUsed = giftcardAmountUsed;
      if (paymentPin) payload.paymentPin = paymentPin;
    }
    try {
      const res = await createBooking(payload);
      setBookingId(res.booking_id);
      if (res.tracking_link) setTrackingLink(res.tracking_link);
      setStep(3);
    } catch (err: unknown) {
      const detail = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string } } }).response?.data?.detail
        : (err as Error)?.message;
      setPaymentError(detail || "Booking failed.");
      throw err;
    }
  };

  const handlePayWithGiftCard = () => {
    if (!giftCardSufficient) {
      setPaymentError("Select gift cards with combined balance ≥ ₹" + totalAmount.toLocaleString() + ".");
      return;
    }
    setPaymentError("");
    setShowGiftCardPin(true);
  };

  const handleGiftCardPinConfirm = async (pin: string) => {
    if (!giftCardSufficient) return;
    setSubmitLoading(true);
    setPaymentError("");
    try {
      const giftcardsPayload = allocations.items.map((it) => ({ giftcardCode: it.code, amountUsed: it.amountUsed }));
      if (giftcardsPayload.length > 1) {
        await submitBooking(undefined, undefined, pin, giftcardsPayload);
      } else if (giftcardsPayload.length === 1) {
        await submitBooking(giftcardsPayload[0].giftcardCode, giftcardsPayload[0].amountUsed, pin);
      } else {
        throw new Error("No gift cards selected.");
      }
      setShowGiftCardPin(false);
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
                    {passengerCount === 1 ? (
                      <>
                        <p className="text-sm text-muted-foreground font-medium">Passenger details</p>
                        <div className="rounded-lg border border-border p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>First name</Label>
                              <Input
                                className="mt-1"
                                placeholder="John"
                                value={passengerDetails[0]?.firstName || ""}
                                onChange={(e) =>
                                  setPassengerDetails((prev) => {
                                    const next = [...prev];
                                    next[0] = { ...(next[0] || { firstName: "", lastName: "", dob: "", gender: "" }), firstName: e.target.value };
                                    return next;
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label>Last name</Label>
                              <Input
                                className="mt-1"
                                placeholder="Smith"
                                value={passengerDetails[0]?.lastName || ""}
                                onChange={(e) =>
                                  setPassengerDetails((prev) => {
                                    const next = [...prev];
                                    next[0] = { ...(next[0] || { firstName: "", lastName: "", dob: "", gender: "" }), lastName: e.target.value };
                                    return next;
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Date of birth</Label>
                              <Input
                                type="date"
                                className="mt-1"
                                value={passengerDetails[0]?.dob || ""}
                                onChange={(e) =>
                                  setPassengerDetails((prev) => {
                                    const next = [...prev];
                                    next[0] = { ...(next[0] || { firstName: "", lastName: "", dob: "", gender: "" }), dob: e.target.value };
                                    return next;
                                  })
                                }
                              />
                              {passengerDetails[0]?.dob ? (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Age: {computeAgeFromDob(passengerDetails[0].dob) ?? "—"}
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <Label>Gender</Label>
                              <select
                                className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                value={passengerDetails[0]?.gender || ""}
                                onChange={(e) =>
                                  setPassengerDetails((prev) => {
                                    const next = [...prev];
                                    next[0] = { ...(next[0] || { firstName: "", lastName: "", dob: "", gender: "" }), gender: e.target.value };
                                    return next;
                                  })
                                }
                              >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                          </div>
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
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground font-medium">Contact details (one for the booking)</p>
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
                        <p className="text-sm text-muted-foreground font-medium pt-2">Passenger details</p>
                        {passengerDetails.slice(0, passengerCount).map((p, i) => (
                          <div key={i} className="rounded-lg border border-border p-4 space-y-3">
                            <p className="text-xs font-semibold text-muted-foreground">Passenger {i + 1}</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>First name</Label>
                                <Input
                                  className="mt-1"
                                  placeholder="John"
                                  value={p.firstName}
                                  onChange={(e) =>
                                    setPassengerDetails((prev) => {
                                      const next = [...prev];
                                      if (next[i]) next[i] = { ...next[i], firstName: e.target.value };
                                      return next;
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Last name</Label>
                                <Input
                                  className="mt-1"
                                  placeholder="Smith"
                                  value={p.lastName}
                                  onChange={(e) =>
                                    setPassengerDetails((prev) => {
                                      const next = [...prev];
                                      if (next[i]) next[i] = { ...next[i], lastName: e.target.value };
                                      return next;
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>Date of birth</Label>
                                <Input
                                  type="date"
                                  className="mt-1"
                                  value={p.dob}
                                  onChange={(e) =>
                                    setPassengerDetails((prev) => {
                                      const next = [...prev];
                                      if (next[i]) next[i] = { ...next[i], dob: e.target.value };
                                      return next;
                                    })
                                  }
                                />
                                {p.dob ? (
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Age: {computeAgeFromDob(p.dob) ?? "—"}
                                  </p>
                                ) : null}
                              </div>
                              <div>
                                <Label>Gender</Label>
                                <select
                                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                  value={p.gender}
                                  onChange={(e) =>
                                    setPassengerDetails((prev) => {
                                      const next = [...prev];
                                      if (next[i]) next[i] = { ...next[i], gender: e.target.value };
                                      return next;
                                    })
                                  }
                                >
                                  <option value="">Select</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={() => router.push("/flights")}>Back to results</Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(2)} disabled={!canProceedPassenger}>
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
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
                            <div className="space-y-2">
                              <Label>Select a gift card</Label>
                              {activeGiftCards.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No active gift cards found in your account.</p>
                              ) : (
                                <div className="space-y-2">
                                  {activeGiftCards.map((c) => {
                                    const last4 = c.code.slice(-4).toUpperCase();
                                    const balance = Number(c.balance);
                                    const checked = selectedGiftCardCodes.includes(c.code);

                                    return (
                                      <label
                                        key={c.giftcard_id ?? c.code}
                                        className={cn(
                                          "flex cursor-pointer items-center justify-between gap-4 rounded-md border p-3 transition-colors",
                                          checked ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                                        )}
                                      >
                                        <div className="flex items-center gap-3">
                                          <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => {
                                              setSelectedGiftCardCodes((prev) => {
                                                const next = prev.includes(c.code)
                                                  ? prev.filter((x) => x !== c.code)
                                                  : [...prev, c.code];
                                                return next;
                                              });
                                              setGiftCardLast4("");
                                            }}
                                            className="h-4 w-4 accent-[hsl(var(--accent))]"
                                          />
                                          <div className="min-w-0">
                                            <p className="font-mono text-sm font-semibold text-foreground">
                                              •••• {last4}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              Balance: ₹{balance.toLocaleString()}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="shrink-0 text-right">
                                          <span className="text-xs text-muted-foreground">
                                            {checked ? "Selected" : "Tap to select"}
                                          </span>
                                        </div>
                                      </label>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            <div className="pt-2 border-t border-border/60">
                              <Label className="text-xs text-muted-foreground">Or enter last 4 characters manually</Label>
                              <div className="mt-2 flex items-center gap-3">
                                <Input
                                  maxLength={4}
                                  placeholder="e.g. 80IX"
                                  value={giftCardLast4}
                                  onChange={(e) => {
                                    const next = e.target.value
                                      .replace(/[^A-Za-z0-9]/g, "")
                                      .slice(0, 4)
                                      .toUpperCase();
                                    setGiftCardLast4(next);
                                    setSelectedGiftCardCodes([]);
                                  }}
                                  className="font-mono text-lg w-32"
                                />
                                <span className="text-xs text-muted-foreground">We’ll match it to your active cards.</span>
                              </div>
                            </div>
                            {allocations.items.length > 0 && (
                              <div className="text-sm">
                                <p className="text-muted-foreground">
                                  Selected total: ₹{allocations.totalUsed.toLocaleString()}{" "}
                                  {allocations.remaining > 0 ? (
                                    <span className="text-amber-600 text-xs">
                                      (Need ₹{allocations.remaining.toLocaleString()} more)
                                    </span>
                                  ) : (
                                    <span className="font-medium text-emerald-600">(Covers full amount)</span>
                                  )}
                                </p>
                                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                                  {allocations.items.map((it) => (
                                    <p key={it.code} className="font-mono">
                                      •••• {it.last4}: will use ₹{Math.round(it.amountUsed).toLocaleString()} (bal ₹{it.balance.toLocaleString()})
                                    </p>
                                  ))}
                                </div>
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
                      <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && bookingId && (
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
                      You will receive a confirmation email shortly with your tracking link. Save your booking reference below.
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
      <PaymentPinEntry
        open={showGiftCardPin}
        onClose={() => setShowGiftCardPin(false)}
        onConfirm={handleGiftCardPinConfirm}
        title="Enter payment PIN"
        description="Enter your 6-digit PIN to pay with your gift card."
        loading={submitLoading}
        error={paymentError}
      />
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
