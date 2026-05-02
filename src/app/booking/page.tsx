"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import { cn, isValidEmail } from "@/lib/utils";
import { filterDigitsOnly } from "@/lib/input-filters";
import { useAuth } from "@/contexts/AuthContext";
import { getMyGiftCards, type GiftCard } from "@/services/giftcards";
import {
  createBookingOrder,
  createBooking,
  submitQuoteScreenshot,
  type CreateBookingPayload,
  type FlightSegmentSnapshot,
} from "@/services/booking";
import { validateCoupon } from "@/services/coupons";
import { loadRazorpayScript, openRazorpayCheckout } from "@/lib/razorpay";
import { usdToInr, formatInr } from "@/lib/currency";
import { computeTierDiscount, TIER_L1_INR, TIER_L2_INR } from "@/lib/pricing";
import { isDomesticIndiaRoute } from "@/lib/indianAirports";
import { PaymentPinEntry } from "@/components/payment/PaymentPinEntry";
import { PremiumDateInput } from "@/components/flights/flight-search-fields";
import { getAxiosErrorMessage } from "@/lib/api";
import { getGiftCardTierFromAmount, giftCardVariantFromTier } from "@/lib/gift-card-tiers";
import { dateIsoToMmYy } from "@/lib/gift-card-format";
import { GiftCardVisual, giftCardPropsBooking } from "@/components/gift-card";

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

function formatBookingDate(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso || "—";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function displayCabin(c: string): string {
  const k = (c || "economy").toLowerCase();
  if (k === "economy") return "Economy";
  if (k === "business") return "Business";
  if (k === "first") return "First";
  return c ? c.charAt(0).toUpperCase() + c.slice(1) : "Economy";
}

/** Restore /flights search URL (uses origin/destination; booking links use from/to). */
const DATE_OF_BIRTH_MIN = "1900-01-01";
const BOOKING_PHONE_DIGIT_MAX = 15;

/** Razorpay requires at least ₹1 when charging a positive amount. */
function razorpayChargeableInr(payable: number): number {
  if (payable <= 0) return 0;
  const r = Math.round(payable * 100) / 100;
  if (r > 0 && r < 1) return 1;
  return r;
}

function todayIsoDate(): string {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildFlightsResultsHref(p: {
  from: string;
  to: string;
  departure: string;
  returnDate: string;
  passengers: string;
  cabin: string;
  currency: string;
}): string {
  if (!p.from || !p.to || !p.departure) return "/flights";
  const q = new URLSearchParams();
  q.set("origin", p.from);
  q.set("destination", p.to);
  q.set("departure", p.departure);
  if (p.returnDate) q.set("return", p.returnDate);
  q.set("passengers", p.passengers || "1");
  q.set("cabin", (p.cabin || "economy").toLowerCase());
  q.set("currency", (p.currency || "INR").toUpperCase());
  return `/flights?${q.toString()}`;
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
  const flightNumberFromUrl = searchParams.get("flightNumber") || "";
  const departureTimeFromUrl = searchParams.get("departureTime") || "";
  const arrivalTimeFromUrl = searchParams.get("arrivalTime") || "";
  const stopsFromUrl = searchParams.get("stops");
  const layoverTimeFromUrl = searchParams.get("layoverTime") || "";
  const journeyDurationFromUrl = searchParams.get("journeyDuration") || "";
  const segmentsParam = searchParams.get("segments") || "";
  const departure = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";
  const passengers = searchParams.get("passengers") || "1";
  const stopsParsed = stopsFromUrl != null && stopsFromUrl !== "" ? parseInt(stopsFromUrl, 10) : undefined;

  const flightsResultsHref = buildFlightsResultsHref({
    from,
    to,
    departure,
    returnDate,
    passengers,
    cabin,
    currency: currencyFromUrl,
  });

  const dateOfBirthMax = todayIsoDate();

  const tripType = returnDate ? "round" : "one-way";
  const checkIn = departure;
  const checkOut = returnDate || departure;
  const passengerCountNum = parseInt(passengers, 10) || 1;
  const totalAmount =
    currencyFromUrl === "INR"
      ? price * passengerCountNum
      : usdToInr(price * passengerCountNum);

  const grossFareInr = totalAmount;

  const flightSegmentsFromUrl = useMemo((): FlightSegmentSnapshot[] | undefined => {
    if (!segmentsParam.trim()) return undefined;
    try {
      const parsed: unknown = JSON.parse(segmentsParam);
      if (!Array.isArray(parsed) || parsed.length === 0) return undefined;
      return parsed as FlightSegmentSnapshot[];
    } catch {
      return undefined;
    }
  }, [segmentsParam]);

  const { tierDiscountInr, subtotalAfterTier, tierPercent } = useMemo(
    () => computeTierDiscount(grossFareInr),
    [grossFareInr]
  );

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponFieldError, setCouponFieldError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountInr: number;
    payableInr: number;
    discountType: "percent" | "inr";
    discountPercent?: number;
    /** Face value for fixed-INR coupons */
    discountAmountInr?: number;
  } | null>(null);

  const payableAmount = appliedCoupon ? appliedCoupon.payableInr : subtotalAfterTier;
  const domestic = isDomesticIndiaRoute(from, to);
  const tripLabel = tripType === "round" ? "Round trip" : "One way";

  const passengerCount = Math.max(1, parseInt(passengers, 10) || 1);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengerDetails, setPassengerDetails] = useState<
    { firstName: string; lastName: string; dob: string; gender: string }[]
  >(() => Array.from({ length: passengerCount }, () => ({ firstName: "", lastName: "", dob: "", gender: "" })));
  const [seatClass] = useState(domestic ? "economy" : cabin);
  const cabinLabel = displayCabin(seatClass);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "giftcard" | null>(null);
  const [giftCardLast4, setGiftCardLast4] = useState("");
  const [selectedGiftCardCodes, setSelectedGiftCardCodes] = useState<string[]>([]);
  const [userGiftCards, setUserGiftCards] = useState<GiftCard[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showGiftCardPin, setShowGiftCardPin] = useState(false);
  const [quoteFile, setQuoteFile] = useState<File | null>(null);
  const [quoteNote, setQuoteNote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState("");
  const [quoteSuccessRef, setQuoteSuccessRef] = useState<string | null>(null);

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
    let remaining = payableAmount;
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
    return { items: out, remaining, totalUsed: payableAmount - remaining };
  })();

  const giftCardSufficient = allocations.remaining <= 0 && allocations.items.length > 0;

  const primaryName =
    [passengerDetails[0]?.firstName, passengerDetails[0]?.lastName].filter(Boolean).join(" ").trim() || name.trim();

  const canProceedPassenger =
    isValidEmail(email) &&
    phone.trim().length >= 10 &&
    passengerDetails.length >= passengerCount &&
    passengerDetails
      .slice(0, passengerCount)
      .every((p) => p.firstName.trim().length > 0 && p.lastName.trim().length > 0 && p.dob.trim().length > 0 && p.gender.trim().length > 0);

  const handleApplyCoupon = async () => {
    const raw = couponInput.trim();
    if (!raw) {
      setCouponFieldError("Enter a coupon code.");
      return;
    }
    setCouponFieldError("");
    setCouponLoading(true);
    try {
      const res = await validateCoupon(raw, subtotalAfterTier);
      if (!res.valid) {
        setAppliedCoupon(null);
        setCouponFieldError(res.message || "This code cannot be applied.");
        return;
      }
      setAppliedCoupon({
        code: (res.code || raw).toUpperCase(),
        discountInr: res.discount_inr ?? 0,
        payableInr: Math.max(0, res.payable_inr ?? subtotalAfterTier),
        discountType: res.discount_type === "inr" ? "inr" : "percent",
        discountPercent: res.discount_percent,
        discountAmountInr: res.discount_amount_inr,
      });
    } catch (err: unknown) {
      setAppliedCoupon(null);
      setCouponFieldError(getAxiosErrorMessage(err, "Could not validate coupon."));
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponFieldError("");
  };

  const handleQuoteScreenshotSubmit = async () => {
    if (!quoteFile) {
      setQuoteError("Choose a screenshot or PDF to upload.");
      return;
    }
    if (!email.trim() || phone.trim().length < 8) {
      setQuoteError("Please fill email and phone above first.");
      return;
    }
    setQuoteError("");
    setQuoteLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", quoteFile);
      fd.append("name", primaryName.trim() || "Customer");
      fd.append("email", email.trim());
      fd.append("phone", phone.trim());
      fd.append("from_place", from);
      fd.append("to_place", to);
      fd.append("message", quoteNote.trim());
      fd.append("trip_type", tripType);
      fd.append("cabin", seatClass);
      fd.append("travelers", passengers);
      fd.append("check_in", checkIn);
      fd.append("check_out", checkOut);
      const res = await submitQuoteScreenshot(fd);
      setQuoteSuccessRef(res.reference);
      setQuoteFile(null);
      setQuoteNote("");
    } catch (err: unknown) {
      setQuoteError(getAxiosErrorMessage(err, "Upload failed."));
    } finally {
      setQuoteLoading(false);
    }
  };

  const handlePayWithRazorpay = async () => {
    setSubmitLoading(true);
    setPaymentError("");
    try {
      const charge = razorpayChargeableInr(payableAmount);
      if (charge <= 0) {
        const ok = await submitBooking();
        setSubmitLoading(false);
        if (!ok) return;
        return;
      }
      await loadRazorpayScript();
      const order = await createBookingOrder(charge);
      openRazorpayCheckout({
        orderId: order.order_id,
        amountPaise: order.amount,
        currency: order.currency,
        userName: primaryName,
        userEmail: email,
        userContact: phone ? (phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "").slice(-10)}`) : undefined,
        onSuccess: async () => {
          try {
            await submitBooking();
          } finally {
            setSubmitLoading(false);
          }
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
      setPaymentError(getAxiosErrorMessage(err, "Payment failed."));
      setSubmitLoading(false);
    }
  };

  const submitBooking = async (
    giftcardCode?: string,
    giftcardAmountUsed?: number,
    paymentPin?: string,
    giftcards?: { giftcardCode: string; amountUsed: number }[]
  ): Promise<boolean> => {
    const safeGross =
      Number.isFinite(grossFareInr) && grossFareInr > 0 ? grossFareInr : totalAmount;
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
      grossFareInr: safeGross,
    };
    if (airline.trim()) payload.airlineName = airline.trim();
    if (flightNumberFromUrl.trim()) payload.flightNumber = flightNumberFromUrl.trim();
    if (departureTimeFromUrl.trim()) payload.departureTime = departureTimeFromUrl.trim();
    if (arrivalTimeFromUrl.trim()) payload.arrivalTime = arrivalTimeFromUrl.trim();
    if (stopsParsed !== undefined && !Number.isNaN(stopsParsed)) payload.stops = stopsParsed;
    if (layoverTimeFromUrl.trim()) payload.layoverTime = layoverTimeFromUrl.trim();
    if (journeyDurationFromUrl.trim()) payload.journeyDuration = journeyDurationFromUrl.trim();
    if (flightSegmentsFromUrl?.length) payload.flightSegments = flightSegmentsFromUrl;
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
    if (appliedCoupon) {
      payload.couponCode = appliedCoupon.code;
      payload.orderAmountInr = subtotalAfterTier;
    }
    try {
      const res = await createBooking(payload);
      if (res.webhook_payload != null) {
        console.log("[booking webhook JSON]", JSON.stringify(res.webhook_payload, null, 2));
      }
      setBookingId(res.booking_id);
      if (res.tracking_link) setTrackingLink(res.tracking_link);
      setStep(3);
      return true;
    } catch (err: unknown) {
      setPaymentError(getAxiosErrorMessage(err, "Booking failed."));
      return false;
    }
  };

  const handlePayWithGiftCard = () => {
    if (!giftCardSufficient) {
      setPaymentError("Select gift cards with combined balance ≥ ₹" + Math.ceil(payableAmount).toLocaleString("en-IN") + ".");
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
      let ok = false;
      if (giftcardsPayload.length > 1) {
        ok = await submitBooking(undefined, undefined, pin, giftcardsPayload);
      } else if (giftcardsPayload.length === 1) {
        ok = await submitBooking(giftcardsPayload[0].giftcardCode, giftcardsPayload[0].amountUsed, pin);
      } else {
        throw new Error("No gift cards selected.");
      }
      if (ok) setShowGiftCardPin(false);
    } catch (err: unknown) {
      setPaymentError(getAxiosErrorMessage(err, "Booking failed."));
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
      <div className="flex min-h-screen flex-col bg-muted/30">
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md border border-border shadow-sm">
            <CardContent className="space-y-4 px-8 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-border bg-muted/50 text-muted-foreground">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold text-primary">No flight selected</h1>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  We need a flight from your search to continue checkout. Go back to results and choose a fare.
                </p>
              </div>
              <Link href="/flights">
                <Button variant="accent" className="text-primary">
                  Search flights
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar />
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-5 sm:py-4">
          <nav className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground sm:text-xs">
            <Link href={flightsResultsHref} className="transition-colors hover:text-foreground">
              Flights
            </Link>
            <span className="text-border">/</span>
            <span className="font-medium text-foreground">Checkout</span>
          </nav>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h1 className="font-heading text-xl font-bold text-primary sm:text-2xl">Complete your booking</h1>
            <p className="max-w-xl text-xs text-muted-foreground sm:text-sm sm:text-right">
              Review itinerary, add travellers, pay securely.
            </p>
          </div>
        </div>
      </header>
      <BookingSteps currentStep={step} />
      <main className="flex-1 py-4 sm:py-5 lg:py-6">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:items-start lg:gap-6 xl:gap-8">
            <aside className="order-first lg:sticky lg:top-20">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border border-t-[3px] border-t-accent bg-card shadow-sm"
              >
                <div className="border-b border-accent/40 bg-primary px-3 py-2 sm:px-4 sm:py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-[11px]">Your itinerary</p>
                  <p className="mt-0.5 line-clamp-2 font-heading text-xs font-semibold leading-tight text-primary-foreground sm:text-sm">
                    {decodeURIComponent(airline)}
                  </p>
                </div>
                <div className="space-y-3 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-heading text-lg font-bold tracking-tight text-primary sm:text-xl">{from}</span>
                    <div className="flex min-w-0 flex-1 flex-col items-center px-1">
                      <div className="h-px w-full max-w-[3rem] bg-accent/45 sm:max-w-[4rem]" />
                      <svg className="-my-0.5 h-4 w-4 text-accent sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                      <div className="h-px w-full max-w-[3rem] bg-accent/45 sm:max-w-[4rem]" />
                    </div>
                    <span className="font-heading text-lg font-bold tracking-tight text-primary sm:text-xl">{to}</span>
                  </div>
                  <dl className="divide-y divide-border/80 border-t border-border pt-3 text-xs sm:text-sm">
                    <div className="flex items-start justify-between gap-3 py-2 first:pt-0">
                      <dt className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">Trip</dt>
                      <dd className="min-w-0 text-right font-medium leading-snug text-foreground">{tripLabel}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 py-2">
                      <dt className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">Cabin</dt>
                      <dd className="min-w-0 text-right font-medium text-foreground">{cabinLabel}</dd>
                    </div>
                    {returnDate ? (
                      <>
                        <div className="flex items-start justify-between gap-3 py-2">
                          <dt className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">Depart</dt>
                          <dd className="min-w-0 text-right font-medium leading-snug text-foreground">{formatBookingDate(departure)}</dd>
                        </div>
                        <div className="flex items-start justify-between gap-3 py-2">
                          <dt className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">Return</dt>
                          <dd className="min-w-0 text-right font-medium leading-snug text-foreground">{formatBookingDate(returnDate)}</dd>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-start justify-between gap-3 py-2">
                        <dt className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">Date</dt>
                        <dd className="min-w-0 text-right font-medium leading-snug text-foreground">{formatBookingDate(departure)}</dd>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3 py-2">
                      <dt className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">Travellers</dt>
                      <dd className="min-w-0 text-right font-medium text-foreground">
                        {passengers} {passengers === "1" ? "adult" : "adults"}
                      </dd>
                    </div>
                  </dl>
                  <div className="border-t border-border pt-3 space-y-1">
                    <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                      <span>Fare total</span>
                      <span>{formatInr(grossFareInr)}</span>
                    </div>
                    {tierDiscountInr > 0 ? (
                      <div className="flex justify-between gap-2 text-xs font-medium text-emerald-800">
                        <span>Volume discount ({Math.round(tierPercent * 100)}%)</span>
                        <span>−{formatInr(tierDiscountInr)}</span>
                      </div>
                    ) : null}
                    {appliedCoupon ? (
                      <>
                        <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                          <span>After volume discount</span>
                          <span>{formatInr(subtotalAfterTier)}</span>
                        </div>
                        <div className="flex justify-between gap-2 text-xs text-emerald-700 font-medium">
                          <span>
                            Coupon ({appliedCoupon.code}
                            {appliedCoupon.discountType === "percent" && appliedCoupon.discountPercent != null
                              ? ` · ${appliedCoupon.discountPercent}%`
                              : appliedCoupon.discountType === "inr" && appliedCoupon.discountAmountInr != null
                                ? ` · ₹${appliedCoupon.discountAmountInr} off`
                                : ""}
                            )
                          </span>
                          <span>−{formatInr(appliedCoupon.discountInr)}</span>
                        </div>
                      </>
                    ) : null}
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-[11px] pt-1">Total due</p>
                    <p className="mt-0.5 font-heading text-xl font-bold text-primary sm:text-2xl">{formatInr(payableAmount)}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground sm:text-xs">Taxes and fees where applicable</p>
                  </div>
                </div>
              </motion.div>
            </aside>
            <div className="min-w-0 max-w-3xl lg:max-w-none">
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
                <Card className="overflow-visible border border-border shadow-sm">
                  <CardHeader className="border-b border-border bg-primary px-4 py-3 text-primary-foreground sm:px-5 sm:py-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/75 sm:text-[11px]">Step 1</p>
                    <h2 className="mt-0.5 font-heading text-lg font-semibold sm:text-xl">Traveller details</h2>
                    <p className="mt-0.5 text-xs text-primary-foreground/85 sm:text-sm">For booking confirmation and e-ticket.</p>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-5">
                    {passengerCount === 1 ? (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Passenger</p>
                        <div className="space-y-3 border border-border bg-card p-4">
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
                              <div className="mt-1">
                                <PremiumDateInput
                                  compact
                                  value={passengerDetails[0]?.dob || ""}
                                  onChange={(val) =>
                                    setPassengerDetails((prev) => {
                                      const next = [...prev];
                                      next[0] = {
                                        ...(next[0] || { firstName: "", lastName: "", dob: "", gender: "" }),
                                        dob: val,
                                      };
                                      return next;
                                    })
                                  }
                                  min={DATE_OF_BIRTH_MIN}
                                  max={dateOfBirthMax}
                                  placeholder="Select date of birth"
                                  headerLabel="Date of birth"
                                  showTodayShortcut={false}
                                />
                              </div>
                              {passengerDetails[0]?.dob ? (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Age: {computeAgeFromDob(passengerDetails[0].dob) ?? "—"}
                                </p>
                              ) : null}
                            </div>
                            <div>
                              <Label>Gender</Label>
                              <select
                                className="mt-1 flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                            inputMode="numeric"
                            className="mt-1"
                            value={phone}
                            onChange={(e) => setPhone(filterDigitsOnly(e.target.value, BOOKING_PHONE_DIGIT_MAX))}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Contact (one per booking)</p>
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
                            inputMode="numeric"
                            className="mt-1"
                            value={phone}
                            onChange={(e) => setPhone(filterDigitsOnly(e.target.value, BOOKING_PHONE_DIGIT_MAX))}
                          />
                        </div>
                        <p className="pt-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Passengers</p>
                        {passengerDetails.slice(0, passengerCount).map((p, i) => (
                          <div key={i} className="space-y-3 border border-border bg-card p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Passenger {i + 1}</p>
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
                                <div className="mt-1">
                                  <PremiumDateInput
                                    compact
                                    value={p.dob}
                                    onChange={(val) =>
                                      setPassengerDetails((prev) => {
                                        const next = [...prev];
                                        if (next[i]) next[i] = { ...next[i], dob: val };
                                        return next;
                                      })
                                    }
                                    min={DATE_OF_BIRTH_MIN}
                                    max={dateOfBirthMax}
                                    placeholder="Select date of birth"
                                    headerLabel="Date of birth"
                                    showTodayShortcut={false}
                                  />
                                </div>
                                {p.dob ? (
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Age: {computeAgeFromDob(p.dob) ?? "—"}
                                  </p>
                                ) : null}
                              </div>
                              <div>
                                <Label>Gender</Label>
                                <select
                                  className="mt-1 flex h-10 w-full rounded-none border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

                    <div className="space-y-3 border border-dashed border-border bg-muted/20 p-4">
                      <p className="text-sm font-semibold text-foreground">Found a better price elsewhere?</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Upload a screenshot or PDF of the competing fare. We will email you within 12 hours with our best price. Reference will be sent
                        to your email.
                      </p>
                      <div>
                        <Label className="text-xs text-muted-foreground">Optional note</Label>
                        <Input
                          className="mt-1"
                          value={quoteNote}
                          onChange={(e) => setQuoteNote(e.target.value)}
                          disabled={quoteLoading}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Screenshot / PDF</Label>
                        <input
                          type="file"
                          accept="image/*,.pdf,application/pdf"
                          className="mt-1 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-none file:border file:border-border file:bg-card file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground"
                          onChange={(e) => {
                            const picked = e.target.files?.[0];
                            setQuoteFile(picked ?? null);
                            setQuoteError("");
                          }}
                          disabled={quoteLoading}
                        />
                      </div>
                      {quoteError ? <p className="text-sm text-red-700">{quoteError}</p> : null}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => void handleQuoteScreenshotSubmit()}
                        disabled={quoteLoading || !quoteFile}
                      >
                        {quoteLoading ? "Sending…" : "Submit screenshot"}
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                      <Button variant="outline" onClick={() => router.push(flightsResultsHref)}>
                        Back to results
                      </Button>
                      <Button variant="accent" className="text-primary" onClick={() => setStep(2)} disabled={!canProceedPassenger}>
                        Continue to payment
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
                <Card className="overflow-visible border border-border shadow-sm">
                  <CardHeader className="border-b border-border bg-primary px-4 py-3 text-primary-foreground sm:px-5 sm:py-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/75 sm:text-[11px]">Step 2</p>
                    <h2 className="mt-0.5 font-heading text-lg font-semibold sm:text-xl">Payment</h2>
                    <p className="mt-0.5 text-xs text-primary-foreground/85 sm:text-sm">
                      {formatInr(payableAmount)} due
                      {tierDiscountInr > 0 ? ` (includes ${Math.round(tierPercent * 100)}% volume discount)` : ""}
                      {appliedCoupon ? ` after coupon` : ""} — choose a method below.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4 sm:p-5">
                    {paymentError && (
                      <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{paymentError}</div>
                    )}

                    <div className="space-y-2 border border-border bg-muted/15 p-4">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">Coupon code</Label>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Input
                          className="font-mono sm:max-w-xs"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponFieldError("");
                          }}
                          disabled={!!appliedCoupon || couponLoading || submitLoading}
                        />
                        {appliedCoupon ? (
                          <Button type="button" variant="outline" onClick={handleRemoveCoupon} disabled={submitLoading}>
                            Remove
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => void handleApplyCoupon()}
                            disabled={couponLoading || submitLoading}
                          >
                            {couponLoading ? "Checking…" : "Apply"}
                          </Button>
                        )}
                      </div>
                      {couponFieldError ? (
                        <p className="text-sm text-red-700">{couponFieldError}</p>
                      ) : null}
                      {appliedCoupon ? (
                        <p className="text-sm text-emerald-800">
                          Applied
                          {appliedCoupon.discountType === "percent" && appliedCoupon.discountPercent != null
                            ? ` (${appliedCoupon.discountPercent}% off)`
                            : appliedCoupon.discountType === "inr"
                              ? " (fixed amount off)"
                              : ""}
                          : −{formatInr(appliedCoupon.discountInr)} · You pay {formatInr(appliedCoupon.payableInr)}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Percent-off or fixed-INR codes apply after volume discounts. One use per code. Automatic
                          discounts: {formatInr(TIER_L1_INR)}+ = 2% off fare, {formatInr(TIER_L2_INR)}+ = 4% off fare.
                        </p>
                      )}
                    </div>

                    {payableAmount <= 0 ? (
                      <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                        {appliedCoupon
                          ? "Coupon covers the full amount. Confirm your booking below — no payment step required."
                          : "No payment is due. Confirm your booking below."}
                      </div>
                    ) : null}

                    {user ? (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePayOnline}
                            disabled={submitLoading || payableAmount <= 0}
                            className="flex flex-col items-center gap-1.5 border border-border bg-card p-4 transition-all hover:border-accent/60 hover:bg-accent/5 sm:p-5"
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
                            disabled={payableAmount <= 0}
                            className={cn(
                              "flex flex-col items-center gap-1.5 border p-4 transition-all bg-card sm:p-5",
                              paymentMethod === "giftcard" ? "border-accent bg-accent/10" : "border-border hover:border-accent/60 hover:bg-accent/5",
                              payableAmount <= 0 && "pointer-events-none opacity-50"
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

                        {payableAmount <= 0 ? (
                          <Button
                            variant="accent"
                            className="text-primary w-full"
                            size="lg"
                            disabled={submitLoading}
                            onClick={() => void handlePayWithRazorpay()}
                          >
                            {submitLoading ? "Confirming…" : "Complete booking"}
                          </Button>
                        ) : null}

                        {paymentMethod === "giftcard" && payableAmount > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-3 border border-border bg-muted/20 p-4"
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
                                    const gcTier = getGiftCardTierFromAmount(Number(c.initial_amount));
                                    const gcHolder =
                                      [user?.first_name, user?.last_name]
                                        .filter((x): x is string => Boolean(x && String(x).trim()))
                                        .join(" ")
                                        .trim() || "You";

                                    return (
                                      <label
                                        key={c.giftcard_id ?? c.code}
                                        className={cn(
                                          "flex cursor-pointer items-stretch justify-between gap-3 border p-2 sm:p-3 transition-colors",
                                          checked ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                                        )}
                                      >
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
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
                                            className="h-4 w-4 shrink-0 self-center accent-[hsl(var(--accent))]"
                                          />
                                          <div className="hidden w-[220px] shrink-0 self-center sm:block">
                                            <GiftCardVisual
                                              variant={giftCardVariantFromTier(gcTier)}
                                              tier={gcTier}
                                              cardNumber={c.code}
                                              cardHolder={gcHolder}
                                              validFrom={dateIsoToMmYy(c.created_at)}
                                              validThru={dateIsoToMmYy(c.expiry_date)}
                                              {...giftCardPropsBooking}
                                            />
                                          </div>
                                          <div className="min-w-0 self-center sm:py-0.5">
                                            <p className="font-mono text-sm font-semibold text-foreground sm:hidden">
                                              •••• {last4}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                              Balance: ₹{balance.toLocaleString()}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="shrink-0 text-right self-center">
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
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {payableAmount <= 0
                            ? appliedCoupon
                              ? "Your coupon covers this booking. Confirm to finish."
                              : "No payment is due for this fare. Confirm to finish."
                            : "Guest checkout — pay securely with Razorpay. Your details stay encrypted."}
                        </p>
                        {payableAmount <= 0 ? (
                          <Button
                            variant="accent"
                            size="lg"
                            className="text-primary w-full"
                            disabled={submitLoading}
                            onClick={() => void handlePayWithRazorpay()}
                          >
                            {submitLoading ? "Confirming…" : "Complete booking"}
                          </Button>
                        ) : (
                          <Button
                            variant="accent"
                            size="lg"
                            className="text-primary w-full"
                            disabled={submitLoading}
                            onClick={handlePayOnline}
                          >
                            {submitLoading ? "Opening payment..." : "Pay Online (Razorpay)"}
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back to details
                      </Button>
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
                <Card className="overflow-visible border border-border border-t-[3px] border-t-accent shadow-sm">
                  <CardHeader className="border-b border-border bg-accent/10 px-4 py-5 text-center sm:px-6 sm:py-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                      className="mx-auto mb-2 flex h-12 w-12 items-center justify-center border-2 border-accent bg-accent text-primary sm:mb-3 sm:h-14 sm:w-14"
                    >
                      <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-[11px]">Step 3</p>
                    <h2 className="mt-1 font-heading text-xl font-bold text-primary sm:text-2xl">Booking confirmed</h2>
                    <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground leading-snug sm:text-sm sm:leading-relaxed">
                      Confirmation email sent. Save your reference below; track or download your e-ticket anytime.
                    </p>
                  </CardHeader>
                  <CardContent className="px-4 py-5 text-center sm:px-8 sm:py-6">
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
          </div>
        </div>
      </main>
      <Footer />
      {quoteSuccessRef ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="flex max-h-[90vh] w-full max-w-md flex-col gap-4 overflow-y-auto border border-border bg-card p-6 shadow-lg">
            <h3 className="font-heading text-lg font-semibold text-primary">We received your screenshot</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reference <span className="font-mono font-semibold text-foreground">{quoteSuccessRef}</span>. Our team will get back to you within 12 hours
              with the best price we can offer. A confirmation has been sent to your email.
            </p>
            <Button variant="accent" className="text-primary w-full sm:w-auto" onClick={() => setQuoteSuccessRef(null)}>
              OK
            </Button>
          </div>
        </div>
      ) : null}
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
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted/30 px-4">
          <div className="relative">
            <div className="h-12 w-12 border-4 border-muted border-t-accent animate-spin" />
            <svg className="absolute inset-0 m-auto h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <p className="font-heading text-sm font-semibold text-primary">Loading checkout…</p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
