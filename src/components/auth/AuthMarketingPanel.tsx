"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AuthBrandLogo } from "@/components/auth/AuthBrandLogo";

export type AuthMarketingPanelProps = {
  imageSrc: string;
  imageAlt: string;
  /** Optional line above the title (e.g. product area). Omit when the logo wordmark is enough. */
  eyebrow?: string;
  title: string;
  description: string;
  priority?: boolean;
};

export function AuthMarketingPanel({
  imageSrc,
  imageAlt,
  eyebrow = "Easyflynstay",
  title,
  description,
  priority = false,
}: AuthMarketingPanelProps) {
  return (
    <div className="relative hidden min-h-[240px] lg:block lg:min-h-0 lg:w-1/2">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 0"
        priority={priority}
      />
      <div className="absolute inset-0 bg-slate-950/55" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/[0.92] via-primary/80 to-slate-950/85"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/35" aria-hidden />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center p-10 lg:p-14">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-center text-white"
        >
          <div className="mb-8 flex justify-center">
            <AuthBrandLogo variant="hero" />
          </div>
          {eyebrow ? (
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
          ) : null}
          <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] sm:text-[2.65rem]">
            {title}
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-accent/80" aria-hidden />
          <p className="mx-auto mt-6 max-w-sm text-[15px] leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
