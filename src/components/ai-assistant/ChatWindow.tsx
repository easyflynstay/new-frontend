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

/** Format YYYY-MM-DD for display (e.g. "Apr 17, 2026"). */
function formatDeparture(iso: string | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso + "T12:00:00");
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

/** Simple SVG icons for trip summary (calendar, people, plane) – compact size. */
const iconSize = 14;
const IconCalendar = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconPeople = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconPlane = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2l-1.8-8.2L16 11l-1.8 8.2z" />
  </svg>
);
const IconRoute = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <path d="M8 12h8" />
    <path d="m12 10 2 2-2 2" />
  </svg>
);

/** Row with header + value, optional icon. Renders only when value is present. */
function SummaryRow({
  header,
  value,
  icon: Icon,
}: { header: string; value: string; icon?: () => JSX.Element }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 py-1.5 first:pt-0 border-b border-[rgba(0,0,0,0.06)] last:border-b-0 last:pb-0">
      {Icon ? (
        <span className="flex-shrink-0 text-[#0B1F3B]/65" aria-hidden>
          <Icon />
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <div
          className="text-[11px] uppercase font-semibold"
          style={{
            color: "rgba(11, 31, 59, 0.72)",
            letterSpacing: "0.12em",
          }}
        >
          {header}
        </div>
        <div className="text-xs font-medium mt-0.5" style={{ color: COLORS.textDark }}>
          {value}
        </div>
      </div>
    </div>
  );
}

/** True only when all five booking fields are present (show booking details only then). */
function isBookingComplete(state: UserState | undefined): boolean {
  if (!state) return false;
  return Boolean(
    state.origin &&
      state.destination &&
      state.departure &&
      state.passengers &&
      state.cabin
  );
}

/** Trip summary card: one row below the other, headers (From – To, Date, etc.), greyish transparent background. */
function TripSummary({ userState }: { userState: UserState }) {
  const route = userState.origin && userState.destination
    ? `${userState.origin} → ${userState.destination}`
    : null;
  const departure = userState.departure ? formatDeparture(userState.departure) : null;
  const passengers = userState.passengers
    ? `${userState.passengers} passenger${userState.passengers !== "1" ? "s" : ""}`
    : null;
  const cabin = userState.cabin || null;

  if (!route && !departure && !passengers && !cabin) return null;

  return (
    <div
      className="rounded-xl overflow-hidden mb-2 border max-w-[320px]"
      style={{
        background: "rgba(120, 120, 128, 0.08)",
        borderColor: "rgba(0, 0, 0, 0.08)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="px-3 py-2 sm:px-3.5 sm:py-2.5">
        <SummaryRow header="From – To" value={route ?? ""} icon={IconRoute} />
        <SummaryRow header="Date" value={departure ?? ""} icon={IconCalendar} />
        <SummaryRow header="Passengers" value={passengers ?? ""} icon={IconPeople} />
        <SummaryRow header="Cabin" value={cabin ?? ""} icon={IconPlane} />
      </div>
    </div>
  );
}

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
  /** One snapshot per user message so initial and updated booking UIs both persist. */
  userStateSnapshots: UserState[];
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
  userStateSnapshots,
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

  // Build turns: each turn is (user, assistant) + optional snapshot. Show LLM responses except when
  // search button is enabled — then hide the last assistant message so we show search UI instead.
  const turns: { user: ChatMessageData; assistant: ChatMessageData | null; snapshot: UserState | undefined }[] = [];
  for (let i = 0; i < messages.length; i += 2) {
    const userMsg = messages[i];
    const assistantMsg = messages[i + 1] ?? null;
    if (userMsg?.role !== "user") break;
    const snapshot = userStateSnapshots[turns.length];
    turns.push({ user: userMsg, assistant: assistantMsg?.role === "assistant" ? assistantMsg : null, snapshot });
  }
  const lastTurnIndex = turns.length - 1;

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
        <div className="flex items-center min-w-0 flex-1">
          <Image
            src="/logo-full.svg"
            alt="EasyFlyNStay"
            width={200}
            height={50}
            className="object-contain shrink-0 h-9 sm:h-10 w-auto"
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
          {turns.map((turn, idx) => (
            <React.Fragment key={idx}>
              <ChatMessage message={turn.user} />
              {/* Show assistant (LLM) response unless search button is enabled on the last turn; hide empty last bubble while loading */}
              {turn.assistant &&
                !(isSearchReady && idx === lastTurnIndex) &&
                (idx !== lastTurnIndex || (turn.assistant.content ?? "") !== "" || !isLoading) ? (
                <ChatMessage message={turn.assistant} />
              ) : null}
              {turn.snapshot && isBookingComplete(turn.snapshot) ? (
                <div className="mt-4 mb-1 px-1">
                  <p
                    className="text-[11px] uppercase font-semibold tracking-[0.12em] mb-2"
                    style={{ color: COLORS.plum }}
                  >
                    Booking details
                  </p>
                  <TripSummary userState={turn.snapshot} />
                </div>
              ) : null}
            </React.Fragment>
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
