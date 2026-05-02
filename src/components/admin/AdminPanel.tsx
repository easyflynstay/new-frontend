"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { adminSendTrackingEmail, adminUpdatePnr, adminUploadTicket } from "@/services/booking";
import { adminLogin, adminLogout, adminMe } from "@/services/admin";
import { adminGenerateCoupons } from "@/services/coupons";
import { cn } from "@/lib/utils";
import { filterDecimalDigits, filterDigitsOnly } from "@/lib/input-filters";

function AlertBanner({ type, children }: { type: "success" | "error"; children: ReactNode }) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-none border px-4 py-3 text-sm leading-relaxed",
        type === "success"
          ? "border-emerald-200 bg-emerald-50/90 text-emerald-900"
          : "border-red-200 bg-red-50/90 text-red-900"
      )}
    >
      {children}
    </div>
  );
}

function AdminSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="overflow-hidden border border-border border-t-[3px] border-t-accent bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="border-b border-border/70 bg-muted/25 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex gap-4">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/30 bg-accent/10 text-accent"
            aria-hidden
          >
            {icon}
          </div>
          <div className="min-w-0 space-y-1">
            <h2 className="font-heading text-lg font-semibold tracking-tight text-primary sm:text-xl">{title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">{children}</CardContent>
    </Card>
  );
}

const iconClass = "h-5 w-5";

export function AdminPanel() {
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [bookingId, setBookingId] = useState("");
  const [pnr, setPnr] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [ticketBookingId, setTicketBookingId] = useState("");
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketMessage, setTicketMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [notifyBookingId, setNotifyBookingId] = useState("");
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [couponCount, setCouponCount] = useState(5);
  const [couponDiscountMode, setCouponDiscountMode] = useState<"percent" | "inr">("percent");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState("10");
  const [couponDiscountInr, setCouponDiscountInr] = useState("500");
  const [couponGenLoading, setCouponGenLoading] = useState(false);
  const [couponGenMessage, setCouponGenMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [generatedCouponCodes, setGeneratedCouponCodes] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    adminMe()
      .then(() => {
        if (!cancelled) setIsLoggedIn(true);
      })
      .catch(() => {
        if (!cancelled) setIsLoggedIn(false);
      })
      .finally(() => {
        if (!cancelled) setSessionLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = loginId.trim();
    const pwd = password;
    if (!id || !pwd) {
      setLoginError("Login ID and password are required.");
      return;
    }
    setLoginError(null);
    setLoginLoading(true);
    try {
      await adminLogin(id, pwd);
      setIsLoggedIn(true);
      setPassword("");
    } catch {
      setLoginError("Invalid login ID or password.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handlePnrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bid = bookingId.trim();
    const p = pnr.trim();
    if (!bid || !p) {
      setMessage({ type: "error", text: "Booking ID and PNR are required." });
      return;
    }
    setMessage(null);
    setLoading(true);
    try {
      await adminUpdatePnr(bid, p);
      setMessage({ type: "success", text: `PNR updated for ${bid}. It will now show on the user's ticket.` });
      setPnr("");
      setBookingId("");
    } catch (err: unknown) {
      const res =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string }; status?: number } }).response
          : undefined;
      const detail = res?.data?.detail ?? (err as Error)?.message ?? "Failed to update PNR.";
      setMessage({ type: "error", text: String(detail) });
    } finally {
      setLoading(false);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bid = ticketBookingId.trim();
    if (!bid || !ticketFile) {
      setTicketMessage({ type: "error", text: "Booking ID and a ticket file (PDF/image) are required." });
      return;
    }
    setTicketMessage(null);
    setTicketLoading(true);
    try {
      await adminUploadTicket(bid, ticketFile);
      setTicketMessage({
        type: "success",
        text: `Ticket attached for ${bid}. User can download it from the track-booking page.`,
      });
      setTicketBookingId("");
      setTicketFile(null);
    } catch (err: unknown) {
      const res =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string }; status?: number } }).response
          : undefined;
      const detail = res?.data?.detail ?? (err as Error)?.message ?? "Failed to attach ticket.";
      setTicketMessage({ type: "error", text: String(detail) });
    } finally {
      setTicketLoading(false);
    }
  };

  const handleCouponGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const count = Math.min(250, Math.max(1, parseInt(String(couponCount), 10) || 0));
    if (!count) {
      setCouponGenMessage({ type: "error", text: "Enter a valid count (1–250)." });
      return;
    }
    setCouponGenMessage(null);
    setCouponGenLoading(true);
    try {
      let res;
      if (couponDiscountMode === "percent") {
        const pct = parseFloat(couponDiscountPercent.replace(/,/g, ""));
        if (Number.isNaN(pct) || pct <= 0 || pct > 100) {
          setCouponGenMessage({ type: "error", text: "Enter a percent between 0 and 100 (e.g. 19.99)." });
          setCouponGenLoading(false);
          return;
        }
        res = await adminGenerateCoupons({ count, discountType: "percent", discountPercent: pct });
      } else {
        const inr = parseFloat(couponDiscountInr.replace(/,/g, ""));
        if (Number.isNaN(inr) || inr <= 0) {
          setCouponGenMessage({ type: "error", text: "Enter a positive INR amount for the fixed discount." });
          setCouponGenLoading(false);
          return;
        }
        res = await adminGenerateCoupons({ count, discountType: "inr", discountAmountInr: inr });
      }
      setGeneratedCouponCodes(res.codes);
      const summary =
        res.discount_type === "percent"
          ? `${res.discount_percent}% off the fare each`
          : `₹${res.discount_amount_inr} off the fare each (capped by order total)`;
      setCouponGenMessage({
        type: "success",
        text: `Created ${res.count} code(s), ${summary}. Copy the list below and share with customers.`,
      });
    } catch (err: unknown) {
      const res =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string }; status?: number } }).response
          : undefined;
      const detail = res?.data?.detail ?? (err as Error)?.message ?? "Failed to generate coupons.";
      setCouponGenMessage({ type: "error", text: String(detail) });
      setGeneratedCouponCodes([]);
    } finally {
      setCouponGenLoading(false);
    }
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bid = notifyBookingId.trim();
    if (!bid) {
      setNotifyMessage({ type: "error", text: "Booking ID is required." });
      return;
    }
    setNotifyMessage(null);
    setNotifyLoading(true);
    try {
      const res = await adminSendTrackingEmail(bid);
      setNotifyMessage({
        type: "success",
        text: `Tracking email sent to ${res.email} for ${bid}.`,
      });
      setNotifyBookingId("");
    } catch (err: unknown) {
      const res =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { detail?: string } } }).response
          : undefined;
      const detail = res?.data?.detail ?? (err as Error)?.message ?? "Failed to send tracking email.";
      setNotifyMessage({ type: "error", text: String(detail) });
    } finally {
      setNotifyLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-muted/30">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-pulse border-2 border-accent border-t-transparent" aria-hidden />
            <p className="text-sm font-medium text-muted-foreground">Verifying session…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col bg-muted/30">
        <Navbar />
        <main className="flex flex-1 flex-col px-4 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Restricted</p>
              <h1 className="mt-2 font-heading text-3xl font-bold text-primary">Administration</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sign in to manage bookings, tickets, and promotional codes.
              </p>
            </div>
            <Card className="overflow-hidden border border-border border-t-[3px] border-t-accent bg-card shadow-sm">
              <CardHeader className="border-b border-border/80 bg-primary px-5 py-4 text-primary-foreground sm:px-6">
                <h2 className="font-heading text-base font-semibold">Sign in</h2>
                <p className="mt-0.5 text-xs text-primary-foreground/80">Use your admin credentials.</p>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="loginId" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Login ID
                    </Label>
                    <Input
                      id="loginId"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder="Admin login ID"
                      className="mt-0"
                      autoComplete="username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="mt-0"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  {loginError && <AlertBanner type="error">{loginError}</AlertBanner>}
                  <Button type="submit" variant="accent" className="w-full text-primary" disabled={loginLoading}>
                    {loginLoading ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <p className="text-center text-xs text-muted-foreground">
              <Link href="/" className="font-medium text-accent underline-offset-4 hover:underline">
                ← Back to website
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar />
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Operations</p>
            <h1 className="mt-1 font-heading text-2xl font-bold text-primary sm:text-3xl">Admin console</h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Coupons, PNRs, e-tickets, and customer notifications in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              View site
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
            >
              Log out
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-8 sm:px-5 sm:py-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 lg:gap-10">
          <AdminSection
            title="Discount coupons"
            description="Create single-use codes as a percentage off the fare or a fixed INR amount. Amounts are applied at checkout and capped by the order total."
            icon={
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            }
          >
            <form onSubmit={handleCouponGenerateSubmit} className="space-y-6">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Discount type</Label>
                <div className="mt-2 inline-flex w-full flex-wrap rounded-none border border-border bg-muted/30 p-1 sm:w-auto">
                  {(["percent", "inr"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCouponDiscountMode(mode)}
                      className={cn(
                        "flex-1 px-4 py-2.5 text-center text-sm font-medium transition-colors sm:flex-none sm:min-w-[10rem]",
                        couponDiscountMode === mode
                          ? "bg-card text-primary shadow-sm ring-1 ring-border"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {mode === "percent" ? "Percent off" : "Fixed INR"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="couponCount" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Quantity (max 250)
                  </Label>
                  <Input
                    id="couponCount"
                    type="text"
                    inputMode="numeric"
                    className="max-w-[120px]"
                    value={couponCount === 0 ? "" : String(couponCount)}
                    onChange={(e) => {
                      const d = filterDigitsOnly(e.target.value, 3);
                      if (d === "") {
                        setCouponCount(1);
                        return;
                      }
                      const n = Math.min(250, Math.max(1, parseInt(d, 10)));
                      setCouponCount(Number.isFinite(n) ? n : 1);
                    }}
                    required
                  />
                </div>
                {couponDiscountMode === "percent" ? (
                  <div className="space-y-2">
                    <Label htmlFor="couponDiscount" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Percent off (≤ 100)
                    </Label>
                    <Input
                      id="couponDiscount"
                      type="text"
                      inputMode="decimal"
                      value={couponDiscountPercent}
                      onChange={(e) => setCouponDiscountPercent(filterDecimalDigits(e.target.value, 6))}
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="couponDiscountInr" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      INR off per redemption
                    </Label>
                    <Input
                      id="couponDiscountInr"
                      type="text"
                      inputMode="numeric"
                      value={couponDiscountInr}
                      onChange={(e) => setCouponDiscountInr(filterDigitsOnly(e.target.value, 12))}
                      required
                    />
                  </div>
                )}
              </div>
              {couponGenMessage && <AlertBanner type={couponGenMessage.type}>{couponGenMessage.text}</AlertBanner>}
              <Button type="submit" variant="accent" className="text-primary" disabled={couponGenLoading}>
                {couponGenLoading ? "Generating…" : "Generate codes"}
              </Button>
              {generatedCouponCodes.length > 0 && (
                <div className="space-y-2 border-t border-border pt-6">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Generated codes
                  </Label>
                  <p className="text-xs text-muted-foreground">Click the box and copy — one code per line.</p>
                  <textarea
                    readOnly
                    className="min-h-[160px] w-full border border-border bg-muted/20 p-4 font-mono text-sm leading-relaxed text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={generatedCouponCodes.join("\n")}
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              )}
            </form>
          </AdminSection>

          <AdminSection
            title="Update PNR"
            description="Attach the airline PNR so it appears on Track Booking and in the customer’s dashboard."
            icon={
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            }
          >
            <form onSubmit={handlePnrSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bookingId" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Booking ID
                  </Label>
                  <Input
                    id="bookingId"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="font-mono text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pnr" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    PNR
                  </Label>
                  <Input
                    id="pnr"
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value)}
                    className="font-mono text-sm"
                    required
                  />
                </div>
              </div>
              {message && <AlertBanner type={message.type}>{message.text}</AlertBanner>}
              <Button type="submit" variant="accent" className="text-primary" disabled={loading}>
                {loading ? "Updating…" : "Save PNR"}
              </Button>
            </form>
          </AdminSection>

          <AdminSection
            title="Attach e-ticket"
            description="Upload PDF or image. The traveller can download it from the Track Booking page."
            icon={
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            }
          >
            <form onSubmit={handleTicketSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="ticketBookingId" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Booking ID
                </Label>
                <Input
                  id="ticketBookingId"
                  value={ticketBookingId}
                  onChange={(e) => setTicketBookingId(e.target.value)}
                  placeholder="BK-20240315-00001"
                  className="font-mono text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticketFile" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  File
                </Label>
                <Input
                  id="ticketFile"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="cursor-pointer border-dotted bg-muted/20 py-3 file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary"
                  onChange={(e) => setTicketFile(e.target.files?.[0] ?? null)}
                  required
                />
              </div>
              {ticketMessage && <AlertBanner type={ticketMessage.type}>{ticketMessage.text}</AlertBanner>}
              <Button type="submit" variant="accent" className="text-primary" disabled={ticketLoading}>
                {ticketLoading ? "Uploading…" : "Upload ticket"}
              </Button>
            </form>
          </AdminSection>

          <AdminSection
            title="Resend confirmation email"
            description="Sends the booking email with tracking link again — useful after PNR or ticket changes."
            icon={
              <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          >
            <form onSubmit={handleNotifySubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="notifyBookingId" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Booking ID
                </Label>
                <Input
                  id="notifyBookingId"
                  value={notifyBookingId}
                  onChange={(e) => setNotifyBookingId(e.target.value)}
                  className="font-mono text-sm"
                  required
                />
              </div>
              {notifyMessage && <AlertBanner type={notifyMessage.type}>{notifyMessage.text}</AlertBanner>}
              <Button type="submit" variant="accent" className="text-primary" disabled={notifyLoading}>
                {notifyLoading ? "Sending…" : "Send email"}
              </Button>
            </form>
          </AdminSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
