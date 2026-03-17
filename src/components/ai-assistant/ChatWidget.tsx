"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChatWindow } from "./ChatWindow";
import type { ChatMessageData, UserState } from "./types";

const API_URL = "/api/chat/message/stream";
const DEFAULT_LANGUAGE_CODE = "en-IN";

export function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() =>
    typeof crypto !== "undefined" ? crypto.randomUUID() : ""
  );
  const [languageCode, setLanguageCode] = useState(DEFAULT_LANGUAGE_CODE);
  const [userState, setUserState] = useState<UserState | null>(null);
  /** One booking-details snapshot per user message, so initial and updated UIs both persist. */
  const [userStateSnapshots, setUserStateSnapshots] = useState<UserState[]>([]);
  const [isSearchReady, setIsSearchReady] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const streamInProgressRef = useRef(false);

  const appendToLastAssistant = useCallback((chunk: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      const lastIdx = updated.length - 1;
      if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
        updated[lastIdx] = {
          ...updated[lastIdx],
          content: updated[lastIdx].content + chunk,
        };
      }
      return updated;
    });
  }, []);

  const fetchSessionParams = useCallback(async () => {
    try {
      const res = await fetch(`/api/chat/session/${sessionId}/params`);
      if (!res.ok) {
        setUserState(null);
        setIsSearchReady(false);
        return;
      }
      const data = (await res.json()) as {
        params?: UserState;
        complete?: boolean;
      };
      if (!data.params || data.complete === false) {
        setUserState(null);
        setIsSearchReady(false);
        return;
      }
      const p = data.params;
      if (p.origin && p.destination && p.departure) {
        setUserState(p);
        setIsSearchReady(Boolean(p.passengers && p.cabin));
      } else {
        setUserState(null);
        setIsSearchReady(false);
      }
    } catch {
      setUserState(null);
      setIsSearchReady(false);
    }
  }, [sessionId]);

  const streamResponse = useCallback(
    async (userMessage: string, currentMessagesWithAssistant: ChatMessageData[]) => {
      if (streamInProgressRef.current) return;
      streamInProgressRef.current = true;
      setIsLoading(true);

      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            message: userMessage,
            history: currentMessagesWithAssistant.slice(0, -1),
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const processLine = (trimmed: string): boolean => {
          if (!trimmed.startsWith("data:")) return false;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) return false;
          try {
            const parsed = JSON.parse(jsonStr) as {
              done?: boolean;
              user_state?: UserState;
              content?: string;
            };
            if (parsed.done) {
              if (parsed.user_state) {
                setUserState(parsed.user_state);
                setUserStateSnapshots((prev) => [...prev, parsed.user_state!]);
                const { origin, destination, departure, passengers, cabin } =
                  parsed.user_state;
                setIsSearchReady(
                  Boolean(origin && destination && departure && passengers && cabin)
                );
              } else {
                void fetchSessionParams();
              }
              streamInProgressRef.current = false;
              setIsLoading(false);
              return true;
            }
            if (parsed.content != null && parsed.content !== "") {
              appendToLastAssistant(String(parsed.content));
            }
          } catch {
            // skip malformed JSON
          }
          return false;
        };

        while (true) {
          const { done, value } = await reader.read();
          if (value) buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && processLine(trimmed)) return;
          }
          if (done) break;
        }
        if (buffer.trim()) {
          for (const line of buffer.split("\n")) {
            const trimmed = line.trim();
            if (trimmed && processLine(trimmed)) return;
          }
        }
        streamInProgressRef.current = false;
        setIsLoading(false);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          appendToLastAssistant("\n\n*Sorry, something went wrong. Please try again.*");
        }
      } finally {
        streamInProgressRef.current = false;
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [sessionId, appendToLastAssistant, fetchSessionParams]
  );

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      setSearchError(null);
      const userMsg: ChatMessageData = { role: "user", content: text.trim() };
      const assistantPlaceholder: ChatMessageData = { role: "assistant", content: "" };
      setMessages((prev) => {
        const next = [...prev, userMsg, assistantPlaceholder];
        void streamResponse(text.trim(), next);
        return next;
      });
    },
    [streamResponse]
  );

  const handleRestart = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    fetch("/api/chat/restart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    }).catch(() => { });
    setMessages([]);
    setIsLoading(false);
    setSessionId(typeof crypto !== "undefined" ? crypto.randomUUID() : "");
    setUserState(null);
    setUserStateSnapshots([]);
    setIsSearchReady(false);
  }, [sessionId]);

  const handleSearchFlights = useCallback(() => {
    setSearchError(null);
    if (!userState) {
      setSearchError("Booking details are missing. Please share your origin, destination, and travel date in the chat.");
      return;
    }
    const origin = (userState.origin ?? "").trim();
    const destination = (userState.destination ?? "").trim();
    const departure = (userState.departure ?? "").trim();
    const passengers = (userState.passengers ?? "").trim() || "1";
    const cabin = (userState.cabin ?? "economy").trim().toLowerCase();

    if (!origin || !destination) {
      setSearchError("Please provide both origin and destination (cities or airport codes) in the chat before searching.");
      return;
    }
    if (origin.length !== 3 || destination.length !== 3) {
      setSearchError("Origin and destination must be 3-letter airport codes (e.g. BLR, DEL, JFK). Please complete the conversation so we can fill these correctly.");
      return;
    }
    if (!departure) {
      setSearchError("Please provide your departure date in the chat before searching.");
      return;
    }
    const dateMatch = /^\d{4}-\d{2}-\d{2}$/.test(departure);
    if (!dateMatch) {
      setSearchError("Departure date must be in YYYY-MM-DD format. Please share your travel date in the chat.");
      return;
    }

    const params = new URLSearchParams({
      origin,
      destination,
      departure,
      passengers,
      cabin: cabin || "economy",
    });
    setOpen(false);
    router.push(`/flights?${params.toString()}`);
  }, [router, userState]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.div
          initial={false}
          animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="relative group"
        >
          {/* Hover tooltip — just above robot, close to the image */}
          <div className="pointer-events-none absolute bottom-full left-1/2 z-50 hidden group-hover:block -translate-x-1/2 mb-1">
            <div className="rounded-xl border border-[#0B1F3B]/10 bg-[#0B1F3B] px-4 py-2.5 text-xs font-medium text-white shadow-xl whitespace-nowrap">
              Book now with ease of voice.
            </div>
          </div>
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center overflow-visible rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]/60 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Open EasyFlyNStay AI Concierge"
          >
            <span className="animate-float inline-block drop-shadow-lg [contain:layout]" style={{ mixBlendMode: "screen" }}>
              <Image
                src="/robot-chat.png"
                alt=""
                width={128}
                height={128}
                className="h-28 w-28 sm:h-32 sm:w-32 object-contain"
                priority
              />
            </span>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, x: 24, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24, y: 24 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 flex h-[680px] max-h-[85vh] w-[480px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border-2 border-[#0B1F3B]/30 bg-white shadow-2xl"
          >
            <div className="flex-shrink-0 flex items-center justify-end border-b border-[#0B1F3B]/20 bg-[#0B1F3B]/5 px-2 py-1.5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#0B1F3B] hover:bg-[#0B1F3B]/10"
                aria-label="Close chat"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <ChatWindow
                messages={messages}
                isLoading={isLoading}
                userState={userState}
                userStateSnapshots={userStateSnapshots}
                isSearchReady={isSearchReady}
                onSend={handleSend}
                onRestart={messages.length > 0 ? handleRestart : undefined}
                disabled={isLoading}
                languageCode={languageCode}
                onLanguageChange={setLanguageCode}
                onSearchFlights={handleSearchFlights}
                searchError={searchError}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
