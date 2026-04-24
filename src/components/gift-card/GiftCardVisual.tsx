"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatPhysicalCardNumberDisplay } from "@/lib/gift-card-format";
import type { GiftCardVariant } from "@/lib/gift-card-tiers";

const PLANE_PATH =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const VARIANT: Record<
  GiftCardVariant,
  {
    base: string;
    sheenA: string;
    sheenB: string;
    edge: string;
    brand: string;
    tier: string;
    number: string;
    meta: string;
    holderName: string;
    glassIcon: string;
    plane: string;
    eBadge: string;
    eText: string;
  }
> = {
  gold: {
    base: "from-[#e0a820] via-[#f0d050] to-[#c28e0a]",
    sheenA: "bg-[radial-gradient(ellipse_80%_60%_at_20%_15%,rgba(255,255,255,0.45),transparent_55%)]",
    sheenB: "bg-[radial-gradient(ellipse_90%_70%_at_90%_100%,rgba(120,60,0,0.18),transparent_50%)]",
    edge: "from-amber-900/12 via-transparent to-amber-950/20",
    brand: "text-amber-950/85",
    tier: "text-amber-950",
    number: "text-[#4a320f]",
    meta: "text-[#4a320f]",
    holderName: "text-amber-950",
    glassIcon: "bg-[#EEC43C] ring-1 ring-amber-900/15 shadow-sm",
    plane: "text-[#4a320f]",
    eBadge: "bg-[#EEC43C] ring-1 ring-amber-900/15 shadow-sm",
    eText: "text-[#4a320f]",
  },
  silver: {
    base: "from-[#e8eaef] via-[#f4f5f8] to-[#c5cbd8]",
    sheenA: "bg-[radial-gradient(ellipse_80%_60%_at_20%_15%,rgba(255,255,255,0.9),transparent_55%)]",
    sheenB: "bg-[radial-gradient(ellipse_100%_80%_at_90%_100%,rgba(100,120,150,0.12),transparent_55%)]",
    edge: "from-slate-900/6 via-transparent to-slate-900/10",
    brand: "text-slate-600",
    tier: "text-slate-800",
    number: "text-slate-700",
    meta: "text-slate-700",
    holderName: "text-slate-800",
    glassIcon: "bg-[#D8DCE3] shadow-sm",
    plane: "text-[#3d4a5c]",
    eBadge: "bg-[#D8DCE3] shadow-sm",
    eText: "text-[#3d4a5c]",
  },
  platinum: {
    base: "from-[#1a1d24] via-[#252a33] to-[#0c0e12]",
    sheenA: "bg-[radial-gradient(ellipse_70%_50%_at_25%_0%,rgba(255,255,255,0.12),transparent_60%)]",
    sheenB: "bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(201,162,39,0.15),transparent_45%)]",
    edge: "from-white/5 via-transparent to-black/40",
    brand: "text-zinc-400",
    tier: "text-zinc-50",
    number: "text-zinc-200",
    meta: "text-zinc-200",
    holderName: "text-zinc-100",
    glassIcon: "bg-white/10 shadow-inner backdrop-blur-md",
    plane: "text-[#C9A227]",
    eBadge: "bg-white/10 shadow-inner backdrop-blur-md",
    eText: "text-[#C9A227]",
  },
};

export type GiftCardVisualProps = {
  variant: GiftCardVariant;
  /** Display name e.g. Prime, Signature, Elite */
  tier: string;
  /** Raw or masked code — last 4 shown, rest as X */
  cardNumber: string;
  cardHolder: string;
  /** Kept for API compatibility; not shown on the card face. */
  validFrom?: string;
  validThru: string;
  className?: string;
  size?: "standard" | "compact";
  dimmed?: boolean;
  statusSlot?: ReactNode;
  /** Renders between number row and bottom metadata (e.g. tier marketing value) */
  promoSlot?: ReactNode;
  /** When true: expiry on the number row; name + E bottom bar. Hides for compact face-only. */
  showMetadata?: boolean;
  /** `top` = flush to a panel below (e.g. marketing tier product card) */
  rounded?: "all" | "top";
};

/**
 * Fintech-style physical gift card: layered gradients, glass chrome, clear hierarchy.
 * Pure presentational — balances/actions live in parent.
 */
export function GiftCardVisual({
  variant,
  tier,
  cardNumber,
  cardHolder,
  validThru,
  className,
  size = "standard",
  dimmed,
  statusSlot,
  promoSlot,
  showMetadata = true,
  rounded = "all",
}: GiftCardVisualProps) {
  const v = VARIANT[variant];
  const numberLine = formatPhysicalCardNumberDisplay(cardNumber);
  const isCompact = size === "compact";
  const roundMain = rounded === "top" ? "rounded-t-[20px] rounded-b-none" : "rounded-[20px]";

  return (
    <div
      className={cn(
        "group/card relative w-full max-w-[400px] select-none",
        "transition-transform duration-300 will-change-transform",
        "hover:scale-[1.02] motion-reduce:transform-none",
        roundMain,
        "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.28),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.35)]",
        dimmed && "opacity-55 grayscale-[0.2]",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[85.6/54] w-full overflow-hidden ring-1 ring-black/5",
          roundMain,
          "bg-gradient-to-br",
          v.base
        )}
      >
        {/* Layered depth (non-flat) */}
        <div className={cn("pointer-events-none absolute inset-0", v.sheenA)} />
        <div className={cn("pointer-events-none absolute inset-0", v.sheenB)} />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
            v.edge
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent mix-blend-overlay" />

        <div
          className={cn(
            "relative z-10 flex h-full min-h-0 flex-col",
            isCompact ? "p-3.5" : "p-5 sm:p-6"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                className={cn(
                  "font-semibold uppercase leading-none tracking-[0.22em]",
                  isCompact ? "text-[8px] sm:text-[9px]" : "text-[9px] sm:text-[10px]",
                  v.brand
                )}
              >
                EasyFlyNStay
              </p>
              <h3
                className={cn(
                  "mt-1 font-serif font-bold leading-[1.08] tracking-tight",
                  isCompact ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl",
                  v.tier
                )}
              >
                {tier}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {statusSlot}
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-none sm:h-10 sm:w-10",
                  v.glassIcon
                )}
                aria-hidden
              >
                <svg
                  className={cn("h-4 w-4 sm:h-[18px] sm:w-[18px] place-self-center", v.plane)}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={PLANE_PATH} />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center py-0.5">
            {showMetadata ? (
              <div
                className={cn(
                  "flex w-full min-w-0 items-center justify-between gap-3",
                  isCompact && "gap-2"
                )}
              >
                <p
                  className={cn(
                    "min-w-0 font-mono font-semibold tabular-nums leading-none",
                    isCompact
                      ? "text-[11px] tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]"
                      : "text-[0.9rem] tracking-[0.2em] sm:text-[0.95rem] sm:tracking-[0.22em]",
                    v.number
                  )}
                  style={{ fontFeatureSettings: '"tnum" 1' }}
                >
                  {numberLine}
                </p>
                <p
                  className={cn(
                    "shrink-0 font-mono font-semibold tabular-nums leading-none",
                    isCompact
                      ? "text-[11px] tracking-[0.1em] sm:text-xs"
                      : "text-[0.9rem] tracking-[0.12em] sm:text-[0.95rem] sm:tracking-[0.1em]",
                    v.meta
                  )}
                >
                  {validThru}
                </p>
              </div>
            ) : (
              <p
                className={cn(
                  "font-mono font-semibold tabular-nums leading-none",
                  isCompact
                    ? "text-[11px] tracking-[0.16em] sm:text-xs sm:tracking-[0.2em]"
                    : "text-[0.9rem] tracking-[0.2em] sm:text-[0.95rem] sm:tracking-[0.22em]",
                  v.number
                )}
                style={{ fontFeatureSettings: '"tnum" 1' }}
              >
                {numberLine}
              </p>
            )}
            {promoSlot != null && (
              <div className={cn("mt-2", isCompact && "mt-1.5")}>{promoSlot}</div>
            )}
          </div>

          {showMetadata && (
            <div
              className={cn(
                "mt-auto flex min-h-[2.75rem] items-center justify-between gap-2 sm:min-h-12",
                isCompact && "min-h-9 sm:min-h-10"
              )}
            >
              <p
                className={cn(
                  "min-w-0 flex-1 pr-2 text-left font-serif font-bold leading-[1.15]",
                  "translate-y-1 sm:translate-y-0.5",
                  isCompact ? "text-sm sm:text-base" : "text-lg sm:text-xl",
                  v.holderName
                )}
              >
                {cardHolder}
              </p>
              <div
                className="flex shrink-0 items-center self-center -mt-0.5 sm:-mt-1"
                aria-hidden
              >
                <div
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-none sm:h-10 sm:w-10",
                    v.eBadge
                  )}
                >
                  <span
                    className={cn(
                      "col-start-1 row-start-1 font-serif font-bold leading-none",
                      isCompact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
                      /* Georgia cap E is heavier on the left; nudge left so it looks centered in the tile */
                      "-translate-x-[0.05em] -translate-y-[0.01em]",
                      v.eText
                    )}
                  >
                    E
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
