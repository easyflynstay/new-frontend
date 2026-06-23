"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedModal } from "@/components/ui/animated-modal";
import { filterDigitsOnly } from "@/lib/input-filters";
import { getAxiosErrorMessage } from "@/lib/api";
import { submitDestinationQuote } from "@/services/booking";

const PHONE_DIGIT_MAX = 15;

type Props = {
  open: boolean;
  destination: string;
  onClose: () => void;
};

export function DestinationQuoteModal({ open, destination, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setError(null);
      setName("");
      setPhone("");
      setEmail("");
    }
  }, [open]);

  useEffect(() => {
    if (open && panelRef.current) {
      const el = panelRef.current.querySelector<HTMLElement>("input:not([type='hidden'])");
      el?.focus();
    }
  }, [open, sent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await submitDestinationQuote({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        destination,
      });
      setSent(true);
    } catch (err) {
      setError(getAxiosErrorMessage(err, "Failed to submit enquiry. Please try again."));
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatedModal open={open} onClose={onClose} panelRef={panelRef} labelledBy={titleId}>
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3 sm:px-6 sm:py-3.5">
        <div className="min-w-0 pr-2">
          <h2 id={titleId} className="font-heading text-base font-semibold text-foreground sm:text-lg">
            Get Quote
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {destination ? `Enquiry for ${destination}` : "Tell us how to reach you and we will call you back."}
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 p-2 text-muted-foreground hover:text-foreground leading-none text-xl transition-colors"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="px-5 py-4 sm:px-6 sm:py-5">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="quote-sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-sm text-muted-foreground">
                Thank you. Your enquiry has been sent. Our team will call you back shortly.
              </p>
              <Button type="button" className="mt-5 rounded-none" variant="outline" onClick={onClose}>
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="quote-form"
              onSubmit={handleSubmit}
              className="space-y-3.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div>
                <Label htmlFor="quote-name">Name</Label>
                <Input
                  id="quote-name"
                  className="mt-1 h-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <Label htmlFor="quote-phone">Mobile Number</Label>
                <Input
                  id="quote-phone"
                  type="tel"
                  inputMode="numeric"
                  className="mt-1 h-9"
                  value={phone}
                  onChange={(e) => setPhone(filterDigitsOnly(e.target.value, PHONE_DIGIT_MAX))}
                  required
                  autoComplete="tel"
                />
              </div>
              <div>
                <Label htmlFor="quote-email">Email ID</Label>
                <Input
                  id="quote-email"
                  type="email"
                  className="mt-1 h-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button type="submit" disabled={sending} className="rounded-none bg-accent text-accent-foreground">
                  {sending ? "Submitting…" : "Submit enquiry"}
                </Button>
                <Button type="button" variant="outline" className="rounded-none" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </AnimatedModal>
  );
}
