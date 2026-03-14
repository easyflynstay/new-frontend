"use client";

import { useTypewriterOnce } from "@/hooks/useTypewriterOnce";
import { COLORS } from "@/lib/theme";

const WELCOME_TEXT =
  "Hi, Welcome to EasyFlyNStay. Please enter all of your details so that we can process your flight booking request";

const BRAND = "EasyFlyNStay";
const BRAND_START = WELCOME_TEXT.indexOf(BRAND);
const BRAND_END = BRAND_START + BRAND.length;

const DETAILS_INTRO =
  "As for the Next steps I'll be needing these following details. Please help me with the same,";

const DETAILS_ITEMS = [
  "**Origin** — where you're flying from",
  "**Destination** — where you're flying to",
  "**Departure** — your departure date",
  "**Passengers** — number of passengers",
  "**Cabin** — cabin class (Economy, Business,First,Premium Economy)",
];

const bubbleStyle: React.CSSProperties = {
  maxWidth: "92%",
  fontSize: "clamp(11px, 1.5vw + 10px, 13px)",
  lineHeight: 1.5,
  border: `1px solid ${COLORS.borderPlum}`,
  boxShadow: "0 4px 20px rgba(11, 31, 59, 0.2), 0 2px 8px rgba(0,0,0,0.15)",
};

export function WelcomeMessage() {
  const { displayText, isComplete } = useTypewriterOnce(WELCOME_TEXT, true, 50);

  const before = displayText.slice(0, BRAND_START);
  const brandPart = displayText.slice(
    BRAND_START,
    Math.min(BRAND_END, displayText.length)
  );
  const after = displayText.slice(BRAND_END);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-3 md:px-4 pb-2 flex flex-col">
      <div className="flex justify-start mb-3">
        <div
          className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-bl-md font-sans min-w-0"
          style={{
            ...bubbleStyle,
            background: COLORS.bubbleBg,
            color: COLORS.textDark,
          }}
        >
          <span>{before}</span>
          {brandPart ? (
            <span
              className="font-serif"
              style={{
                color: COLORS.plum,
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {brandPart}
            </span>
          ) : null}
          <span>{after}</span>
          {!isComplete ? (
            <span
              className="animate-caret-blink inline-block ml-0.5 align-middle"
              style={{
                width: "2px",
                height: "1em",
                background: COLORS.plum,
                verticalAlign: "text-bottom",
              }}
            />
          ) : null}
        </div>
      </div>

      {isComplete ? (
        <div className="flex justify-start mb-3 animate-chat-slide-up">
          <div
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-bl-md font-sans min-w-0"
            style={{
              ...bubbleStyle,
              background: COLORS.bubbleBg,
              color: COLORS.textDark,
              maxWidth: "95%",
            }}
          >
            <p style={{ margin: 0 }}>{DETAILS_INTRO}</p>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.25rem",
                margin: "0.5rem 0 0",
                color: COLORS.textDark,
              }}
            >
              {DETAILS_ITEMS.map((item, i) => {
                const parts = item.split("**");
                return (
                  <li key={i} style={{ marginBottom: "0.35rem" }}>
                    {parts.length >= 3 ? (
                      <>
                        {parts[0]}
                        <strong style={{ color: COLORS.plum }}>
                          {parts[1]}
                        </strong>
                        {parts[2]}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
