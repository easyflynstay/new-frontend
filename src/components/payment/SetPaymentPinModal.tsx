"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedModal } from "@/components/ui/animated-modal";
import { cn } from "@/lib/utils";

interface SetPaymentPinModalProps {
  open: boolean;
  onSet: (pin: string) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

export function SetPaymentPinModal({ open, onSet, loading = false, error }: SetPaymentPinModalProps) {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = "set-pin-title";

  useEffect(() => {
    if (open) {
      setPin("");
      setConfirm("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const match = pin.length === 6 && confirm.length === 6 && pin === confirm;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!match) return;
    await onSet(pin);
    setPin("");
    setConfirm("");
  };

  return (
    <AnimatedModal open={open} labelledBy={titleId} zIndex="z-50" dismissible={false}>
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-semibold text-foreground">
          Create payment PIN
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a 6-digit PIN to authorize wallet and gift card transactions. You will need it for every payment.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="pin">6-digit PIN</Label>
            <Input
              id="pin"
              ref={inputRef}
              type="password"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className={cn("mt-1 font-mono text-center text-lg tracking-[0.5em]")}
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm PIN</Label>
            <Input
              id="confirm"
              type="password"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className={cn("mt-1 font-mono text-center text-lg tracking-[0.5em]")}
              autoComplete="off"
            />
            {confirm.length === 6 && pin !== confirm && (
              <p className="mt-1 text-sm text-red-600">PINs do not match.</p>
            )}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="accent" disabled={!match || loading}>
              {loading ? "Setting..." : "Set PIN"}
            </Button>
          </div>
        </form>
      </div>
    </AnimatedModal>
  );
}
