"use client";

import { useEffect, useId, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INVESTOR_EMAIL } from "@/lib/contact-info";
import { filterDigitsOnly } from "@/lib/input-filters";
import { cn } from "@/lib/utils";

const PHONE_DIGIT_MAX = 15;

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
/** Template configured in EmailJS to deliver to invest@easyflynstay.com */
const INVESTOR_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_INVESTOR_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function InvestorContactModal({ open, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && panelRef.current) {
      const el = panelRef.current.querySelector<HTMLElement>('input:not([type="hidden"]), textarea, button');
      el?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!SERVICE_ID || !INVESTOR_TEMPLATE_ID || !PUBLIC_KEY) {
      setError(
        "Investor form is not configured. Add NEXT_PUBLIC_EMAILJS_INVESTOR_TEMPLATE_ID (template sending to " +
          INVESTOR_EMAIL +
          "), plus NEXT_PUBLIC_EMAILJS_SERVICE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, then redeploy."
      );
      return;
    }
    setError(null);
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        INVESTOR_TEMPLATE_ID,
        {
          form_type: "Investor relations",
          to_label: INVESTOR_EMAIL,
          from_name: `${firstName.trim()} ${lastName.trim()}`.trim() || "Investor inquiry",
          from_email: email.trim(),
          phone: phone.trim(),
          organization: organization.trim(),
          investment_amount: investmentAmount.trim(),
          role: role.trim(),
          message: message.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setSent(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setInvestmentAmount("");
      setRole("");
      setMessage("");
    } catch (err) {
      setError((err as Error).message || "Failed to send. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden">
      <div className="relative flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
        <div
          className="absolute inset-0 z-0 min-h-full w-full bg-primary/60 backdrop-blur-sm"
          aria-hidden
          onClick={onClose}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn(
            "relative z-10 w-full max-w-2xl border border-border bg-card shadow-xl",
            "my-8 sm:my-10 flex flex-col"
          )}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3 sm:px-6 sm:py-3.5">
            <div className="min-w-0 pr-2">
              <h2 id={titleId} className="font-heading text-base font-semibold text-foreground sm:text-lg">
                Contact investor relations
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                We will respond to {INVESTOR_EMAIL} inquiries as promptly as we can.
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 p-2 text-muted-foreground hover:text-foreground leading-none text-xl"
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <div className="px-5 py-4 sm:px-6 sm:py-5">
            {sent ? (
              <>
                <p className="text-sm text-muted-foreground">
                  Thank you. Your message has been sent. Our team will be in touch.
                </p>
                <Button type="button" className="mt-5 rounded-none" variant="outline" onClick={onClose}>
                  Close
                </Button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <Label htmlFor="inv-fn">First name</Label>
                    <Input
                      id="inv-fn"
                      className="mt-1 h-9"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inv-ln">Last name</Label>
                    <Input
                      id="inv-ln"
                      className="mt-1 h-9"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <Label htmlFor="inv-email">Work email</Label>
                    <Input
                      id="inv-email"
                      type="email"
                      className="mt-1 h-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inv-phone">Phone</Label>
                    <Input
                      id="inv-phone"
                      type="tel"
                      inputMode="numeric"
                      className="mt-1 h-9"
                      value={phone}
                      onChange={(e) => setPhone(filterDigitsOnly(e.target.value, PHONE_DIGIT_MAX))}
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="inv-org">Organization / fund</Label>
                  <Input
                    id="inv-org"
                    className="mt-1 h-9"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <Label htmlFor="inv-amount">Investment amount</Label>
                    <Input
                      id="inv-amount"
                      type="text"
                      inputMode="numeric"
                      className="mt-1 h-9"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(filterDigitsOnly(e.target.value))}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <Label htmlFor="inv-role">Role (optional)</Label>
                    <Input
                      id="inv-role"
                      className="mt-1 h-9"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="inv-msg">Inquiry</Label>
                  <textarea
                    id="inv-msg"
                    rows={3}
                    className={cn(
                      "mt-1 min-h-[4.5rem] w-full resize-y border border-input bg-background px-3 py-2 text-sm",
                      "ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    )}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button type="submit" disabled={sending} className="rounded-none bg-accent text-accent-foreground">
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                  <Button type="button" variant="outline" className="rounded-none" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
