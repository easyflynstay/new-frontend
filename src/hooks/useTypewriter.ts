"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const TYPING_SPEED = 60;
const DELETING_SPEED = 60;
const PAUSE_AFTER_TYPED = 2000;
const PAUSE_AFTER_DELETED = 800;

export function useTypewriter(text: string, isActive: boolean) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);
  const phaseRef = useRef<"typing" | "pausing" | "deleting" | "waiting">("typing");

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    indexRef.current = 0;
    phaseRef.current = "typing";
    setDisplayText("");
    setIsTyping(true);
  }, [clearTimer]);

  useEffect(() => {
    if (!isActive) {
      clearTimer();
      return;
    }
    reset();
    const tick = () => {
      const phase = phaseRef.current;
      const idx = indexRef.current;
      if (phase === "typing") {
        if (idx < text.length) {
          indexRef.current = idx + 1;
          setDisplayText(text.slice(0, idx + 1));
          timeoutRef.current = setTimeout(tick, TYPING_SPEED);
        } else {
          phaseRef.current = "pausing";
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPED);
        }
      } else if (phase === "pausing") {
        phaseRef.current = "deleting";
        setIsTyping(false);
        tick();
      } else if (phase === "deleting") {
        if (idx > 0) {
          indexRef.current = idx - 1;
          setDisplayText(text.slice(0, idx - 1));
          timeoutRef.current = setTimeout(tick, DELETING_SPEED);
        } else {
          phaseRef.current = "waiting";
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETED);
        }
      } else {
        indexRef.current = 0;
        phaseRef.current = "typing";
        setIsTyping(true);
        setDisplayText("");
        timeoutRef.current = setTimeout(tick, TYPING_SPEED);
      }
    };
    timeoutRef.current = setTimeout(tick, TYPING_SPEED);
    return clearTimer;
  }, [text, isActive, clearTimer, reset]);

  return { displayText, isTyping };
}
