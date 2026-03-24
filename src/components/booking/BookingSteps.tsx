"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Travellers", short: "Details" },
  { id: 2, label: "Payment", short: "Pay" },
  { id: 3, label: "Confirmation", short: "Done" },
];

export interface BookingStepsProps {
  currentStep: number;
  className?: string;
}

export function BookingSteps({ currentStep, className }: BookingStepsProps) {
  return (
    <nav
      aria-label="Booking progress"
      className={cn("border-b border-border bg-card", className)}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-2 sm:px-5 sm:py-2.5">
        <div className="mx-auto flex max-w-2xl items-center sm:max-w-3xl">
          {steps.map((step, i) => {
            const done = step.id < currentStep;
            const active = step.id === currentStep;
            const prevDone = i > 0 && steps[i - 1]!.id < currentStep;
            return (
              <Fragment key={step.id}>
                {i > 0 && (
                  <div
                    className={cn(
                      "mx-0.5 h-0.5 min-w-[1rem] flex-1 sm:mx-1.5 sm:min-w-[2rem]",
                      prevDone ? "bg-accent" : "bg-border"
                    )}
                    aria-hidden
                  />
                )}
                <div className="flex shrink-0 flex-col items-center gap-0.5 px-0.5 sm:gap-1 sm:px-1">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center border-2 text-[11px] font-bold transition-colors sm:h-9 sm:w-9 sm:text-xs",
                      done && "border-primary bg-primary text-primary-foreground",
                      active && !done && "border-accent bg-accent/15 text-primary",
                      !done && !active && "border-border bg-muted/40 text-muted-foreground"
                    )}
                    aria-current={active ? "step" : undefined}
                  >
                    {done ? (
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={cn(
                      "hidden text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:block sm:max-w-[6.5rem] sm:text-[11px]",
                      (done || active) && "text-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  <span
                    className={cn(
                      "text-center text-[9px] font-semibold uppercase tracking-wide text-muted-foreground sm:hidden",
                      (done || active) && "text-foreground"
                    )}
                  >
                    {step.short}
                  </span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
