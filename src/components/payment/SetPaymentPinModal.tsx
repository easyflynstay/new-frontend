"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  useEffect(() => {
    if (open) {
      setPin("");
      setConfirm("");
      setTimeout(() => inputRef.current?.focus(), 100);
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="set-pin-title"
    >
      <div
        className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 id="set-pin-title" className="text-lg font-semibold text-foreground">
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
    </div>
  );
}
