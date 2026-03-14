"use client";

import { useState } from "react";
import Image from "next/image";
import { ChatContainer } from "@/components/chat/ChatContainer";

export function ChatFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating E button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center justify-center rounded-full overflow-hidden border border-accent bg-primary text-accent shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 animate-float"
            style={{
              width: "72px",
              height: "48px",
            }}
            aria-label="Open EasyFlyNStay chat assistant"
          >
            <Image src="/logo.svg" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          </button>
          {/* Tooltip */}
          <div className="pointer-events-none absolute right-full top-1/2 z-40 hidden -translate-y-1/2 pr-3 group-hover:block">
            <div className="max-w-xs rounded-full bg-black/80 px-4 py-1.5 text-xs text-white shadow-lg">
              Ask our AI to help book your flight
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div className="relative flex h-[420px] max-h-[75vh] w-full overflow-hidden rounded-lg border border-border bg-card shadow-card-hover">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-xs text-muted-foreground hover:bg-black/10"
              aria-label="Close chat"
            >
              ×
            </button>
            <ChatContainer mode="widget" onSearchFlights={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

