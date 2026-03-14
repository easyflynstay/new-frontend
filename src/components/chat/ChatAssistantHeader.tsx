"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export function ChatAssistantHeader() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary">
        <Player
          autoplay
          loop
          src="https://assets9.lottiefiles.com/packages/lf20_jcikwtux.json"
          style={{ height: "42px", width: "42px" }}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-sm font-semibold tracking-wide text-primary">
          EasyFlyNStay Assist
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Voice & text booking
        </span>
      </div>
    </div>
  );
}

