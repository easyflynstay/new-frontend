"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { formatUsdAsInr } from "@/lib/currency";
import { cn } from "@/lib/utils";

export const POPULAR_DESTINATIONS = [
  { dest: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=450&fit=crop&q=85", priceUsd: 899 },
  { dest: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=450&fit=crop&q=85", priceUsd: 1299 },
  { dest: "Singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=450&fit=crop&q=85", priceUsd: 1099 },
  { dest: "Nepal", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=450&fit=crop&q=85", priceUsd: 799 },
  { dest: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=450&fit=crop&q=85", priceUsd: 999 },
  { dest: "Vietnam", img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=450&fit=crop&q=85", priceUsd: 849 },
] as const;

const SLIDE_INTERVAL_MS = 4000;

type Props = {
  onCardClick: (destination: string) => void;
};

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visibleCount;
}

export function DestinationCarousel({ onCardClick }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const visibleCount = useVisibleCount();
  const total = POPULAR_DESTINATIONS.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const visibleItems = Array.from({ length: visibleCount }, (_, offset) => {
    const item = POPULAR_DESTINATIONS[(activeIndex + offset) % total];
    return { ...item, key: `${item.dest}-${activeIndex + offset}` };
  });

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={cn(
          "grid gap-4",
          visibleCount === 1 && "grid-cols-1 max-w-sm mx-auto",
          visibleCount === 2 && "grid-cols-2",
          visibleCount === 3 && "grid-cols-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item) => (
            <motion.button
              key={item.key}
              type="button"
              layout
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              onClick={() => onCardClick(item.dest)}
              className="group relative h-72 overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label={`Get quote for ${item.dest}`}
            >
              <Image
                src={item.img}
                alt={item.dest}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-heading text-xl font-semibold text-white">{item.dest}</h3>
                <span className="text-sm text-accent font-medium">From {formatUsdAsInr(item.priceUsd)}</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {POPULAR_DESTINATIONS.map((item, i) => (
          <button
            key={item.dest}
            type="button"
            aria-label={`Show ${item.dest}`}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex ? "bg-accent w-8" : "bg-white/30 w-2 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
