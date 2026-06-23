"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedModal } from "@/components/ui/animated-modal";
import { cn } from "@/lib/utils";

interface PaymentPinEntryProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void | Promise<void>;
  title?: string;
  description?: string;
  loading?: boolean;
  error?: string;
}

export function PaymentPinEntry({
  open,
  onClose,
  onConfirm,
  title = "Enter payment PIN",
  description = "Enter your 6-digit PIN to authorize this transaction.",
  loading = false,
  error,
}: PaymentPinEntryProps) {
  const [pin, setPin] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = "pin-title";

  useEffect(() => {
    if (open) {
      setPin("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) return;
    await onConfirm(pin);
    setPin("");
  };

  return (
    <AnimatedModal open={open} onClose={onClose} labelledBy={titleId} zIndex="z-50">
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="pin">6-digit PIN</Label>
            <Input
              id="pin"
              ref={inputRef}
              type="password"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]*"
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className={cn("mt-1 font-mono text-center text-lg tracking-[0.5em]")}
              autoComplete="off"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={pin.length !== 6 || loading}>
              {loading ? "Verifying..." : "Confirm"}
            </Button>
          </div>
        </form>
      </div>
    </AnimatedModal>
  );
}
