"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FlightCardProps {
  id: string;
  airlineName: string;
  airlineLogo?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  departureCode: string;
  arrivalCode: string;
  className?: string;
}

const airlineColors: Record<string, string> = {
  Emirates: "bg-red-50 text-red-700 border-red-200",
  "Qatar Airways": "bg-purple-50 text-purple-700 border-purple-200",
  "British Airways": "bg-blue-50 text-blue-700 border-blue-200",
  Lufthansa: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Turkish Airlines": "bg-red-50 text-red-600 border-red-200",
};

export function FlightCard({
  id,
  airlineName,
  departureTime,
  arrivalTime,
  duration,
  stops,
  price,
  departureCode,
  arrivalCode,
  className,
}: FlightCardProps) {
  const colorClass = airlineColors[airlineName] || "bg-muted text-primary border-border";

  return (
    <motion.div whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(11,31,59,0.12)" }} transition={{ duration: 0.2 }}>
      <Card className={cn("overflow-hidden border-2 shadow-card transition-all hover:border-accent/50", className)}>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("flex h-12 w-12 items-center justify-center border font-heading text-lg font-bold", colorClass)}>
              {airlineName.slice(0, 2)}
            </div>
            <div>
              <p className="font-medium text-foreground">{airlineName}</p>
              <p className="text-xs text-muted-foreground">
                {stops === 0 ? (
                  <span className="text-emerald-600 font-medium">Direct flight</span>
                ) : (
                  <span>{stops} stop{stops > 1 ? "s" : ""}</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <p className="text-xl font-bold">{departureTime}</p>
              <p className="text-xs text-muted-foreground font-medium">{departureCode}</p>
            </div>
            <div className="flex flex-col items-center px-4">
              <p className="text-xs text-muted-foreground mb-1">{duration}</p>
              <div className="relative flex items-center w-24">
                <div className="h-px flex-1 bg-accent/50" />
                <svg className="mx-1 h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
                <div className="h-px flex-1 bg-accent/50" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{arrivalTime}</p>
              <p className="text-xs text-muted-foreground font-medium">{arrivalCode}</p>
            </div>
            <div className="border-l border-border pl-6">
              <p className="text-2xl font-heading font-bold text-primary">${price.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border bg-muted/20 p-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Business class available</span>
          <Link href={`/booking?flightId=${id}`}>
            <Button variant="accent" className="text-primary">SELECT FLIGHT</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
