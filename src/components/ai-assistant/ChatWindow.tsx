"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { LoadingIndicator } from "./LoadingIndicator";
import { WelcomeMessage } from "./WelcomeMessage";
import { COLORS } from "@/lib/theme";
import { SARVAM_LANGUAGE_DROPDOWN_OPTIONS } from "@/lib/languageMapper";
import type { ChatMessageData, UserState } from "./types";

const CHAT_BG = `
  radial-gradient(
    ellipse 120% 55% at 100% 100%,
    rgba(11, 31, 59, 0.95) 0%,
    rgba(11, 31, 59, 0.85) 15%,
    rgba(26, 51, 82, 0.45) 45%,
    rgba(11, 31, 59, 0.2) 75%,
    rgba(250, 250, 249, 0.4) 90%,
    transparent 100%
  ),
  #ffffff
`;

interface ChatWindowProps {
  messages: ChatMessageData[];
  isLoading: boolean;
  userState: UserState | null;
  isSearchReady: boolean;
  onSend: (text: string) => void;
  onRestart?: () => void;
  disabled?: boolean;
  languageCode: string;
  onLanguageChange: (code: string) => void;
  onSearchFlights?: () => void;
}

export function ChatWindow({
  messages,
  isLoading,
  userState,
  isSearchReady,
  onSend,
  onRestart,
  disabled,
  languageCode,
  onLanguageChange,
  onSearchFlights,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  const lastMsg = messages[messages.length - 1];
  const isLastEmptyAssistant =
    isLoading && lastMsg?.role === "assistant" && (lastMsg?.content ?? "") === "";
  const messagesToShow = isLastEmptyAssistant ? messages.slice(0, -1) : messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      className="flex flex-col min-h-0 w-full overflow-hidden rounded-2xl flex-1"
      style={{
        background: CHAT_BG,
        border: `1px solid ${COLORS.borderPlum}`,
        boxShadow:
          "0 12px 48px rgba(11, 31, 59, 0.35), 0 6px 20px rgba(0,0,0,0.2)",
      }}
    >
      <header className="flex-shrink-0 flex items-center justify-between w-full px-3 py-2.5 sm:px-4 sm:py-3 gap-2 sm:gap-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0B1F3B]/40 bg-white">
            <Image
              src="/robot-chat.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-cover object-center"
              style={{ mixBlendMode: "lighten" }}
            />
          </div>
          <Image
            src="/logo.svg"
            alt="EasyFlyNStay"
            width={100}
            height={28}
            className="object-contain shrink-0"
            style={{
              maxHeight: "28px",
              width: "auto",
              height: "auto",
              filter: "brightness(0) saturate(100%) opacity(0.82)",
            }}
          />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <label
            htmlFor="lang-select"
            className="text-xs sm:text-sm font-medium whitespace-nowrap"
            style={{ color: COLORS.textDark }}
          >
            Language
          </label>
          <select
            id="lang-select"
            value={languageCode}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="rounded-lg border px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm outline-none focus:ring-2 max-w-[140px] sm:max-w-none"
            style={{
              borderColor: COLORS.borderPlum,
              background: COLORS.bubbleBg,
              color: COLORS.textDark,
              minWidth: "80px",
            }}
          >
            {SARVAM_LANGUAGE_DROPDOWN_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {hasMessages ? (
        <div
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 sm:px-3 md:px-4 pb-2"
          style={{ scrollbarGutter: "stable" }}
        >
          {messagesToShow.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          {isLoading ? <LoadingIndicator /> : null}
          {isSearchReady && userState ? (
            <div className="flex justify-center mt-3 mb-2 px-1">
              <button
                type="button"
                onClick={onSearchFlights}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #0B1F3B 0%, #1a3352 50%, #C9A227 100%)",
                  color: "#F9FAFB",
                  border: `1px solid ${COLORS.borderPlum}`,
                }}
              >
                <span>Search flights</span>
              </button>
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-hidden">
          <WelcomeMessage />
        </div>
      )}

      {/* Text box always pinned to bottom */}
      <div className="flex-shrink-0 mt-auto">
        <ChatInput
          onSend={onSend}
          onRestart={onRestart}
          disabled={disabled}
          languageCode={languageCode}
        />
      </div>
    </div>
  );
}
