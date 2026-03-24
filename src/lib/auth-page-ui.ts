import { cn } from "@/lib/utils";

export const authInputClassName = cn(
  "mt-2 h-11 border border-primary/20 bg-[#faf9f7] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors",
  "placeholder:text-muted-foreground/60",
  "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 focus-visible:ring-offset-0",
  "[&:-webkit-autofill]:[-webkit-text-fill-color:#2C2C2C] [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#faf9f7]"
);

export const authLabelClassName =
  "text-xs font-semibold uppercase tracking-wider text-primary/90";

export const authCardClassName =
  "overflow-hidden border border-primary/10 border-t-[3px] border-t-accent bg-card/95 shadow-[0_24px_56px_-16px_rgba(11,31,59,0.16)] backdrop-blur-sm";

export const authFormColumnClassName =
  "flex flex-1 items-center justify-center bg-gradient-to-b from-muted/30 via-background to-background py-14 px-4 sm:py-16 lg:bg-gradient-to-br lg:from-background lg:via-muted/15 lg:to-background";

export const authMainClassName = "flex flex-1 flex-col lg:flex-row";

export const authErrorAlertClassName =
  "border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-800 shadow-sm";

export const authSuccessAlertClassName =
  "border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-900 shadow-sm";

export const authPrimaryButtonClassName =
  "h-11 w-full text-base font-semibold text-primary shadow-sm transition-shadow hover:shadow-md";
