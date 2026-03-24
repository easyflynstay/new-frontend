"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

const GAP = 8;
const VIEWPORT_MARGIN = 16;

export type FlipOverlayAlign = "left" | "right";

export type FlipOverlayStrategy = "absolute" | "fixed";

export interface UseFlipOverlayOptions {
  /** Used when panel has not laid out yet */
  fallbackHeight?: number;
  align?: FlipOverlayAlign;
  /** Stretch panel to wrapper width (airport list, cabin select) */
  fullWidth?: boolean;
  /** Re-run measure when inner content changes (e.g. calendar month) */
  recalcKey?: number | string;
  /**
   * `fixed` positions in viewport coordinates — use with a portal so the panel
   * is not clipped by `overflow: hidden` on ancestors (e.g. booking cards).
   */
  strategy?: FlipOverlayStrategy;
}

export interface FixedOverlayStyle {
  top: number;
  left: number;
  maxHeight: number;
}

/**
 * Flip floating panel below the anchor by default; flips above when viewport
 * space below is insufficient. Place `data-flip-anchor` on the trigger inside
 * `wrapperRef`.
 */
export function useFlipOverlay(open: boolean, options?: UseFlipOverlayOptions) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [fixedStyle, setFixedStyle] = useState<FixedOverlayStyle | null>(null);

  const fallbackHeight = options?.fallbackHeight ?? 280;
  const align = options?.align ?? "left";
  const fullWidth = options?.fullWidth ?? false;
  const recalcKey = options?.recalcKey;
  const strategy = options?.strategy ?? "absolute";

  const update = useCallback(() => {
    const wrap = wrapperRef.current;
    if (!open || !wrap) return;

    const anchor = wrap.querySelector("[data-flip-anchor]") as HTMLElement | null;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const panel = panelRef.current;
    const effectiveHeight = Math.max(
      panel?.offsetHeight ?? 0,
      panel?.scrollHeight ?? 0,
      fallbackHeight
    );
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - VIEWPORT_MARGIN;
    const preferTop = spaceBelow < effectiveHeight + GAP && spaceAbove > spaceBelow;
    setPlacement(preferTop ? "top" : "bottom");

    if (strategy === "fixed") {
      const panelH = Math.max(panel?.offsetHeight ?? 0, fallbackHeight);
      const panelW = Math.max(panel?.offsetWidth ?? 0, 320);
      let top = preferTop ? rect.top - panelH - GAP : rect.bottom + GAP;
      top = Math.max(VIEWPORT_MARGIN, Math.min(top, window.innerHeight - VIEWPORT_MARGIN - panelH));
      let left = rect.left;
      const maxLeft = window.innerWidth - panelW - VIEWPORT_MARGIN;
      left = Math.min(Math.max(left, VIEWPORT_MARGIN), maxLeft);
      const maxPanelH = window.innerHeight - top - VIEWPORT_MARGIN;
      setFixedStyle({
        top,
        left,
        maxHeight: Math.max(220, Math.min(maxPanelH, window.innerHeight - 2 * VIEWPORT_MARGIN)),
      });
      return;
    }

    setFixedStyle(null);
    if (!panel) return;
  }, [open, fallbackHeight, strategy]);

  useLayoutEffect(() => {
    if (!open) {
      setPlacement("bottom");
      setFixedStyle(null);
      return;
    }

    update();
    const raf = requestAnimationFrame(() => update());

    const panel = panelRef.current;
    const ro = panel ? new ResizeObserver(() => update()) : null;
    if (panel && ro) ro.observe(panel);

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, update, recalcKey]);

  let positionClass: string;
  if (strategy === "fixed") {
    positionClass = "";
  } else if (fullWidth) {
    positionClass =
      placement === "bottom" ? "left-0 right-0 top-full mt-2" : "left-0 right-0 bottom-full mb-2";
  } else if (align === "right") {
    positionClass =
      placement === "bottom" ? "right-0 top-full mt-1" : "right-0 bottom-full mb-1";
  } else {
    positionClass =
      placement === "bottom" ? "left-0 top-full mt-2" : "left-0 bottom-full mb-2";
  }

  return {
    wrapperRef,
    panelRef,
    placement,
    positionClass,
    fixedStyle: strategy === "fixed" ? fixedStyle : null,
  };
}
