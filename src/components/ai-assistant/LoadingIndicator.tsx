"use client";

import { COLORS } from "@/lib/theme";

export function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div
        className="rounded-2xl rounded-bl-md shadow-sm px-4 py-3 flex items-center gap-1.5"
        style={{
          border: `1px solid ${COLORS.borderPlum}`,
          background: COLORS.bubbleBg,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              background: COLORS.plum,
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
