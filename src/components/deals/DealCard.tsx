"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DealCardProps {
  title: string;
  description: string;
  price: string;
  image?: string;
  badge?: string;
  href?: string;
  className?: string;
}

export function DealCard({ title, description, price, image, badge, href = "/flights", className }: DealCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={href}>
        <Card className={cn("overflow-hidden rounded-none border-2 shadow-card transition-shadow hover:shadow-card-hover", className)}>
          <div className="relative h-48 w-full bg-muted">
            {image ? (
              <Image src={image} alt={title} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary/5 font-heading text-4xl text-primary/20">{title.slice(0, 1)}</div>
            )}
            {badge && (
              <span className="absolute left-2 top-2 rounded-none border border-accent bg-accent/90 px-2 py-1 text-xs font-medium text-primary">{badge}</span>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            <div className="mt-3 border-t border-accent/30 pt-3">
              <p className="text-xl font-heading font-semibold text-primary">{price}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
