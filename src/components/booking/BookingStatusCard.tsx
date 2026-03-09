"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

export interface BookingStatusCardProps {
  bookingId: string;
  status: BookingStatus;
  passengerName?: string;
  flight?: string;
  date?: string;
  className?: string;
}

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "border-accent bg-accent/5 text-accent",
  pending: "border-amber-500/50 bg-amber-50 text-amber-800",
  cancelled: "border-red-200 bg-red-50 text-red-800",
  completed: "border-green-200 bg-green-50 text-green-800",
};

export function BookingStatusCard({
  bookingId,
  status,
  passengerName,
  flight,
  date,
  className,
}: BookingStatusCardProps) {
  return (
    <Card className={cn("rounded-none border-2 shadow-card", className)}>
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold">Booking #{bookingId}</h3>
          <span className={cn("border px-2 py-1 text-xs font-medium uppercase", statusStyles[status])}>{status}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {passengerName && <p className="text-sm"><span className="text-muted-foreground">Passenger:</span> {passengerName}</p>}
        {flight && <p className="mt-1 text-sm"><span className="text-muted-foreground">Flight:</span> {flight}</p>}
        {date && <p className="mt-1 text-sm"><span className="text-muted-foreground">Date:</span> {date}</p>}
      </CardContent>
    </Card>
  );
}
