"use client";

import { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageItem } from "./ChatMessage";

export interface ChatMessageData {
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  messages: ChatMessageData[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/40 px-3 py-3 space-y-3">
      {!hasMessages && (
        <div className="mt-4 rounded-lg border border-dashed border-border bg-card/80 px-4 py-5 text-sm text-muted-foreground shadow-sm">
          <p className="font-heading text-sm font-semibold text-primary">
            Plan your trip with AI
          </p>
          <p className="mt-1">
            Tell me where you&apos;re flying from, destination, dates and how many
            travellers. I&apos;ll collect the details and search flights for you.
          </p>
        </div>
      )}
      {messages.map((m, idx) => (
        <ChatMessageItem key={idx} role={m.role} content={m.content} />
      ))}
      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
          Finding the best way to summarise your trip…
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}

