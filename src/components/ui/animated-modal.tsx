"use client";

import { useEffect, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedModalProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  describedBy?: string;
  panelRef?: RefObject<HTMLDivElement>;
  zIndex?: string;
  /** When false, backdrop click and Escape do not close the modal. */
  dismissible?: boolean;
};

export function AnimatedModal({
  open,
  onClose,
  children,
  className,
  labelledBy,
  describedBy,
  panelRef,
  zIndex = "z-[100]",
  dismissible = true,
}: AnimatedModalProps) {
  useEffect(() => {
    if (!open || !dismissible || !onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, dismissible]);

  const handleBackdropClose = () => {
    if (dismissible && onClose) onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.div
          key="animated-modal"
          className={cn("fixed inset-0 overflow-y-auto overflow-x-hidden", zIndex)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="relative flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
            <motion.button
              type="button"
              className="absolute inset-0 z-0 min-h-full w-full cursor-default bg-primary/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={handleBackdropClose}
              aria-label="Close dialog"
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              aria-describedby={describedBy}
              className={cn(
                "relative z-10 my-8 flex w-full max-w-md flex-col border border-border bg-card shadow-xl sm:my-10",
                className
              )}
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.85 }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
