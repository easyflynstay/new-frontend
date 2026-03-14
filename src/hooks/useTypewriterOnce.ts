"use client";

import { useState, useEffect, useRef } from "react";

const DEFAULT_SPEED = 50;

/**
 * Types out text once, letter by letter. Returns { displayText, isComplete }.
 */
export function useTypewriterOnce(
  text: string,
  isActive = true,
  speedMs = DEFAULT_SPEED
) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive || !text) return;
    indexRef.current = 0;
    setDisplayText("");
    setIsComplete(false);
    const tick = () => {
      const idx = indexRef.current;
      if (idx < text.length) {
        indexRef.current = idx + 1;
        setDisplayText(text.slice(0, idx + 1));
        timeoutRef.current = setTimeout(tick, speedMs);
      } else {
        setIsComplete(true);
      }
    };
    timeoutRef.current = setTimeout(tick, speedMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, isActive, speedMs]);

  return { displayText, isComplete };
}
