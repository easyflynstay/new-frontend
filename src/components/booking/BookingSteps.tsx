"use client";

import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Passenger details" },
  { id: 2, label: "Seat class" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Confirmation" },
];

export interface BookingStepsProps {
  currentStep: number;
  className?: string;
}

export function BookingSteps({ currentStep, className }: BookingStepsProps) {
  return (
    <nav aria-label="Booking progress" className={cn("border-b border-border bg-card py-4", className)}>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2 px-4 sm:gap-4">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center border-2 text-sm font-medium sm:h-12 sm:w-12",
                step.id <= currentStep ? "border-accent bg-accent text-primary" : "border-border bg-muted text-muted-foreground"
              )}
            >
              {step.id}
            </div>
            <span className={cn("ml-2 hidden text-sm sm:block", step.id <= currentStep ? "font-medium text-foreground" : "text-muted-foreground")}>
              {step.label}
            </span>
            {i < steps.length - 1 && <div className="mx-2 h-0.5 w-4 bg-border sm:mx-4 sm:w-8" />}
          </div>
        ))}
      </div>
    </nav>
  );
}
