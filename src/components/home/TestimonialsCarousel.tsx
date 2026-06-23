"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  text: string;
  from: string;
  rating: number;
  image?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rajesh Sharma",
    text: "Incredible service! Saved over ₹2,55,000 on my business class flight to London. The team at EASYFLYNSTAY went above and beyond with every detail.",
    from: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Meera Ghosh",
    text: "From booking to boarding, everything was seamless. The concierge team helped me change my dates last minute with zero hassle.",
    from: "Kolkata, West Bengal",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    text: "Will book again without a second thought. Professional, reliable, and the fares were genuinely the best I could find anywhere online.",
    from: "New Delhi, NCR",
    image: "https://images.unsplash.com/photo-1580897813144-1bb6601748c1?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Vikram Reddy",
    text: "EASYFLYNSTAY found me a first class deal to Singapore that was far better than what I saw elsewhere. Absolutely phenomenal.",
    from: "Hyderabad, Telangana",
    image: "https://images.unsplash.com/photo-1622484214939-672cfdc7ee23?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Priya Menon",
    text: "Their 24/7 concierge is the real deal. Had an issue at 2 AM and they resolved it within minutes. Premium service all the way.",
    from: "Bengaluru, Karnataka",
    image: "https://images.unsplash.com/photo-1609501676725-22b931343fcb?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Dhruba Das",
    text: "Been using EASYFLYNSTAY for two years now. Every single booking has been flawless. My go-to for all business travel.",
    from: "Guwahati, Assam",
    rating: 5,
  },
];

const SLIDE_INTERVAL_MS = 5000;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

function TestimonialAvatar({ name, image }: { name: string; image?: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = Boolean(image?.trim()) && !imageFailed;

  if (!showPhoto) {
    return (
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent/30 bg-primary/10 font-heading text-sm font-semibold text-primary"
        aria-hidden="true"
        title={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-accent/30">
      <Image
        src={image!}
        alt={name}
        fill
        className="object-cover"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}

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

function StarRating({ count }: { count: number }) {
  return (
    <div className="mb-3 flex text-accent">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const visibleCount = useVisibleCount();
  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const visibleItems = Array.from({ length: visibleCount }, (_, offset) => {
    const item = TESTIMONIALS[(activeIndex + offset) % total];
    return { ...item, key: `${item.name}-${activeIndex + offset}` };
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
          "grid gap-6",
          visibleCount === 1 && "grid-cols-1 max-w-md mx-auto",
          visibleCount === 2 && "grid-cols-2",
          visibleCount === 3 && "grid-cols-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {visibleItems.map((t) => (
            <motion.article
              key={t.key}
              layout
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="border border-border bg-card p-6 shadow-card h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <TestimonialAvatar name={t.name} image={t.image} />
                <div className="min-w-0">
                  <p className="font-heading font-semibold truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.from}</p>
                </div>
              </div>
              <StarRating count={t.rating} />
              <p className="text-muted-foreground italic text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex ? "bg-accent w-8" : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
