"use client";

import { useId, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getPasswordRules } from "@/lib/password-policy";

type Props = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  /** When true, shows rule checklist under the field. */
  showStrengthHints?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function PasswordFieldWithStrength({
  id: idProp,
  label,
  value,
  onChange,
  autoComplete = "new-password",
  showStrengthHints = true,
  className,
  inputClassName,
  labelClassName,
}: Props) {
  const uid = useId();
  const id = idProp ?? `pw-${uid}`;
  const [show, setShow] = useState(false);

  const rules = useMemo(() => getPasswordRules(value), [value]);

  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClassName, "pr-11")}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          <EyeIcon open={show} />
        </button>
      </div>
      {showStrengthHints ? (
        <ul className="mt-2 space-y-1.5 text-xs" aria-live="polite">
          {rules.map((r) => (
            <li
              key={r.key}
              className={cn(
                "flex gap-2 leading-snug",
                r.met ? "font-medium text-emerald-700" : "text-muted-foreground"
              )}
            >
              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center font-mono text-[10px]">
                {r.met ? "✓" : "·"}
              </span>
              {r.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
