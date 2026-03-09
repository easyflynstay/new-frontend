"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface WalletCardProps {
  balance: number;
  onAddMoney?: () => void;
  className?: string;
}

export function WalletCard({ balance, onAddMoney, className }: WalletCardProps) {
  return (
    <Card className={cn("rounded-none border-2 shadow-card", className)}>
      <CardHeader className="border-b border-border">
        <h3 className="font-heading text-lg font-semibold">Wallet Balance</h3>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-3xl font-heading font-bold text-primary">${balance.toLocaleString()}</p>
        {onAddMoney && (
          <Button variant="accent" size="sm" className="mt-4 text-primary" onClick={onAddMoney}>Add Money</Button>
        )}
      </CardContent>
    </Card>
  );
}
