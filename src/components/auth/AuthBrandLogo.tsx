import Image from "next/image";
import { cn } from "@/lib/utils";

type AuthBrandLogoProps = {
  /** Hero column (desktop) vs card header (mobile) */
  variant?: "hero" | "compact";
  className?: string;
};

export function AuthBrandLogo({ variant = "hero", className }: AuthBrandLogoProps) {
  const compact = variant === "compact";
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-none",
        compact
          ? "shadow-sm ring-1 ring-primary/15"
          : "shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] ring-2 ring-accent/45",
        className
      )}
    >
      <Image
        src="/logo.svg"
        alt="EASYFLYNSTAY"
        width={160}
        height={160}
        className={cn(
          "rounded-none",
          compact ? "h-10 w-10 sm:h-11 sm:w-11" : "h-20 w-20 sm:h-24 sm:w-24 md:h-[5.5rem] md:w-[5.5rem]"
        )}
      />
    </div>
  );
}
