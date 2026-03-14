"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { adminUpdatePnr, adminUploadTicket } from "@/services/booking";
import { adminLogin, adminLogout, adminMe } from "@/services/admin";

export default function AdminPage() {
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
      const res = err && typeof err === "object" && "response" in err
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
      setTicketMessage({ type: "success", text: `Ticket attached for ${bid}. User can download it from the track-booking page.` });
      setTicketBookingId("");
      setTicketFile(null);
    } catch (err: unknown) {
      const res = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { detail?: string }; status?: number } }).response
        : undefined;
      const detail = res?.data?.detail ?? (err as Error)?.message ?? "Failed to attach ticket.";
      setTicketMessage({ type: "error", text: String(detail) });
    } finally {
      setTicketLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <p className="text-muted-foreground">Checking admin session…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-12">
          <div className="mx-auto max-w-sm space-y-6">
            <h1 className="font-heading text-2xl font-bold text-primary">Admin sign in</h1>
            <Card className="border-2">
              <CardContent className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="loginId">Login ID</Label>
                    <Input id="loginId" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Admin login ID" className="mt-1" autoComplete="username" required />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-1" autoComplete="current-password" required />
                  </div>
                  {loginError && (
                    <div className="rounded-lg px-4 py-3 text-sm bg-red-50 text-red-700 border border-red-200">
                      {loginError}
                    </div>
                  )}
                  <Button type="submit" variant="accent" className="text-primary w-full" disabled={loginLoading}>
                    {loginLoading ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="flex justify-center">
              <Link href="/"><Button variant="outline">Back to Home</Button></Link>
            </div>
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="font-heading text-2xl font-bold text-primary">Admin</h1>
            <Button type="button" variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
              Logout
            </Button>
          </div>

          <Card className="border-2">
            <CardHeader className="bg-primary text-white">
              <h2 className="font-heading text-lg font-semibold">Update PNR</h2>
              <p className="text-sm text-white/80">
                PNR will appear on the user&apos;s ticket (Track Booking & My Bookings).
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handlePnrSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="bookingId">Booking ID</Label>
                  <Input id="bookingId" value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder="e.g. BK-20240315-00001" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="pnr">PNR</Label>
                  <Input id="pnr" value={pnr} onChange={(e) => setPnr(e.target.value)} placeholder="e.g. ABC123" className="mt-1 font-mono" required />
                </div>
                {message && (
                  <div className={`rounded-lg px-4 py-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {message.text}
                  </div>
                )}
                <Button type="submit" variant="accent" className="text-primary" disabled={loading}>{loading ? "Updating…" : "Update PNR"}</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="bg-primary text-white">
              <h2 className="font-heading text-lg font-semibold">Attach Ticket</h2>
              <p className="text-sm text-white/80">
                Upload a ticket (PDF or image). User can download it from the Track Booking page.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="ticketBookingId">Booking ID</Label>
                  <Input id="ticketBookingId" value={ticketBookingId} onChange={(e) => setTicketBookingId(e.target.value)} placeholder="e.g. BK-20240315-00001" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="ticketFile">Ticket file (PDF, PNG, JPG)</Label>
                  <Input id="ticketFile" type="file" accept=".pdf,.png,.jpg,.jpeg" className="mt-1" onChange={(e) => setTicketFile(e.target.files?.[0] ?? null)} required />
                </div>
                {ticketMessage && (
                  <div className={`rounded-lg px-4 py-3 text-sm ${ticketMessage.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {ticketMessage.text}
                  </div>
                )}
                <Button type="submit" variant="accent" className="text-primary" disabled={ticketLoading}>{ticketLoading ? "Uploading…" : "Attach Ticket"}</Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Link href="/"><Button variant="outline">Back to Home</Button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
