"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChatInput } from "./ChatInput";
import { ChatWindow, ChatMessageData } from "./ChatWindow";
import { ChatAssistantHeader } from "./ChatAssistantHeader";

const CHAT_STREAM_URL = "/api/chat/message/stream";

type ChatContainerMode = "page" | "widget";

interface ChatContainerProps {
  mode?: ChatContainerMode;
  onSearchFlights?: () => void;
}

export function ChatContainer({ mode = "page", onSearchFlights }: ChatContainerProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => crypto.randomUUID());
  const abortRef = useRef<AbortController | null>(null);
  const [languageCode] = useState<string>("en-IN");
  const [extracted, setExtracted] = useState<{
    origin: string;
    destination: string;
    departure: string;
    passengers: string;
    cabin: string;
  } | null>(null);

  const appendToLastAssistant = useCallback((chunk: string) => {
    setMessages((prev) => {
      const next = [...prev];
      const lastIdx = next.length - 1;
      if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
        next[lastIdx] = {
          ...next[lastIdx],
          content: next[lastIdx].content + chunk,
        };
      }
      return next;
    });
  }, []);

  const fetchExtractedParams = useCallback(async () => {
    try {
      const res = await fetch(`/api/chat/session/${sessionId}/params`);
      if (!res.ok) {
        setExtracted(null);
        return;
      }
      const data = (await res.json()) as {
        params?: {
          origin?: string;
          destination?: string;
          departure?: string;
          passengers?: string;
          cabin?: string;
        };
        complete?: boolean;
      };
      if (!data.params || data.complete === false) {
        setExtracted(null);
        return;
      }
      const p = data.params;
      if (!p.origin || !p.destination || !p.departure) {
        setExtracted(null);
        return;
      }
      setExtracted({
        origin: p.origin,
        destination: p.destination,
        departure: p.departure,
        passengers: p.passengers || "1",
        cabin: p.cabin || "business",
      });
    } catch {
      setExtracted(null);
    }
  }, [sessionId]);

  const streamResponse = useCallback(
    async (userMessage: string, historyWithAssistant: ChatMessageData[]) => {
      setIsLoading(true);
      try {
        const controller = new AbortController();
        abortRef.current = controller;

        const response = await fetch(CHAT_STREAM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            message: userMessage,
            history: historyWithAssistant.slice(0, -1),
          }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`HTTP ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        // Simple SSE loop: split by newline, look for "data:" lines with JSON
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const jsonStr = trimmed.slice(5).trim();
            if (!jsonStr) continue;
            try {
              const parsed = JSON.parse(jsonStr) as {
                content?: string;
                done?: boolean;
              };
              if (parsed.done) {
                setIsLoading(false);
                void fetchExtractedParams();
                return;
              }
              if (parsed.content) {
                appendToLastAssistant(parsed.content.toString());
              }
            } catch {
              // ignore malformed SSE data
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          appendToLastAssistant(
            "\n\n*Sorry, something went wrong. Please try again.*"
          );
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [appendToLastAssistant, sessionId, fetchExtractedParams]
  );

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: ChatMessageData = { role: "user", content: trimmed };
      const assistantPlaceholder: ChatMessageData = {
        role: "assistant",
        content: "",
      };

      setMessages((prev) => {
        const next = [...prev, userMsg, assistantPlaceholder];
        void streamResponse(trimmed, next);
        return next;
      });
    },
    [streamResponse]
  );

  const handleRestart = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setMessages([]);
    setIsLoading(false);
    setSessionId(crypto.randomUUID());
    setExtracted(null);
  }, []);

  const normalizeCabin = (raw: string | undefined): string => {
    const v = (raw || "").toLowerCase().trim();
    if (v === "economy") return "economy";
    if (v === "business") return "business";
    if (v === "first" || v === "first class") return "first";
    if (v === "premium" || v === "premium economy" || v === "premiumeconomy") {
      return "premium";
    }
    // Fallback to business to keep API happy
    return "business";
  };

  const handleSearchFlights = () => {
    if (!extracted) return;
    const params = new URLSearchParams({
      origin: extracted.origin,
      destination: extracted.destination,
      departure: extracted.departure,
      passengers: extracted.passengers || "1",
      cabin: normalizeCabin(extracted.cabin),
    });
    router.push(`/flights?${params.toString()}`);
    onSearchFlights?.();
  };

  if (mode === "widget") {
    return (
      <div className="flex h-full flex-col bg-card text-foreground">
        <div className="flex items-center border-b border-border bg-white/95 px-4 py-2.5">
          <ChatAssistantHeader />
        </div>
        <div className="flex flex-1 flex-col bg-background">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <div className="border-t border-border bg-card">
            {extracted && (
              <div className="flex items-center justify-between gap-2 px-3 pt-2 text-[11px] text-muted-foreground">
                <div className="flex flex-col">
                  <span>
                    {extracted.origin} → {extracted.destination}
                  </span>
                  <span>{extracted.departure} · {extracted.passengers} pax · {extracted.cabin}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSearchFlights}
                  className="whitespace-nowrap rounded-sm bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Search flights
                </button>
              </div>
            )}
            <ChatInput
              onSend={handleSend}
              disabled={isLoading}
              languageCode={languageCode}
            />
            {messages.length > 0 && (
              <div className="flex items-center justify-between px-3 pb-2 text-[10px] text-muted-foreground">
                <button
                  type="button"
                  className="underline-offset-2 hover:underline"
                  onClick={handleRestart}
                >
                  New conversation
                </button>
                <span>EasyFlyNStay</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="mx-auto flex h-[560px] max-w-3xl flex-col border border-border shadow-card">
      <CardHeader className="border-b border-border bg-primary/5 px-4 py-3">
        <h1 className="font-heading text-lg font-semibold text-primary">
          Flight Booking Assistant
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Share your route, dates and passengers. I’ll help you finalise the
          details before you book.
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <div className="border-t border-border bg-card">
          {extracted && (
            <div className="flex items-center justify-between gap-2 px-3 pt-2 text-[11px] text-muted-foreground">
              <div className="flex flex-col">
                <span>
                  {extracted.origin} → {extracted.destination}
                </span>
                <span>{extracted.departure} · {extracted.passengers} pax · {extracted.cabin}</span>
              </div>
              <button
                type="button"
                onClick={handleSearchFlights}
                className="whitespace-nowrap rounded-sm bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Search flights
              </button>
            </div>
          )}
          <ChatInput
            onSend={handleSend}
            disabled={isLoading}
            languageCode={languageCode}
          />
          {messages.length > 0 && (
            <div className="flex items-center justify-between px-3 pb-2 text-[11px] text-muted-foreground">
              <button
                type="button"
                className="underline-offset-2 hover:underline"
                onClick={handleRestart}
              >
                Start a new conversation
              </button>
              <span>Powered by EasyFlyNStay</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

