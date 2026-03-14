"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { COLORS } from "@/lib/theme";
import type { ChatMessageData } from "./types";

const serifHeading = {
  fontFamily: "'Playfair Display', Georgia, serif",
};
const themeBorder = "rgba(11, 31, 59, 0.25)";

const markdownComponents: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  strong: ({ children }) => (
    <strong style={{ fontWeight: 600, color: COLORS.plumDark }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em style={{ fontStyle: "italic", color: COLORS.textMuted }}>{children}</em>
  ),
  code: ({ className, children, ...props }) => {
    const inline = !className;
    if (inline) {
      return (
        <code
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: "0.9em",
            background: "rgba(11, 31, 59, 0.1)",
            color: COLORS.plumDark,
            borderRadius: "6px",
            padding: "0.15em 0.4em",
            fontWeight: 500,
          }}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.875rem" }} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre
      style={{
        fontFamily: "ui-monospace, monospace",
        fontSize: "0.875rem",
        background: "rgba(11, 31, 59, 0.06)",
        color: COLORS.textDark,
        border: `1px solid ${themeBorder}`,
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        overflowX: "auto",
        margin: "0.5em 0",
      }}
    >
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: COLORS.plum,
        textDecoration: "none",
        borderBottom: "1px solid transparent",
      }}
    >
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h1 style={{ ...serifHeading, fontWeight: 600, color: COLORS.plumDark, margin: "0.75em 0 0.35em", fontSize: "1.25em" }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ ...serifHeading, fontWeight: 600, color: COLORS.textDark, margin: "0.75em 0 0.35em", fontSize: "1.15em" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ ...serifHeading, fontWeight: 600, color: COLORS.textDark, margin: "0.75em 0 0.35em", fontSize: "1.05em" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => <p style={{ margin: "0.35em 0" }}>{children}</p>,
  ul: ({ children }) => (
    <ul style={{ listStyleType: "disc", paddingLeft: "1.25rem", margin: "0.35em 0" }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ listStyleType: "decimal", paddingLeft: "1rem", margin: "0.25em 0" }}>{children}</ol>
  ),
  li: ({ children }) => <li style={{ marginBottom: "0.35rem" }}>{children}</li>,
};

const BULLET_SEP = /\s*[•·]\s*|\s+\*\s+/;

function normalizeBulletList(content: string): string {
  if (!content || typeof content !== "string") return content;
  return content
    .split("\n")
    .map((line) => {
      const parts = line
        .split(BULLET_SEP)
        .map((s) => s.trim().replace(/^\*+|\*+$/g, "").trim().replace(/^-\s*/, ""))
        .filter(Boolean);
      if (parts.length <= 1) return line;
      return parts.map((p) => `- ${p}`).join("\n");
    })
    .join("\n");
}

export function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";
  const rawContent = message.content ?? "";
  const displayContent = isUser ? rawContent : normalizeBulletList(rawContent);

  const bubbleStyle: React.CSSProperties = {
    maxWidth: "92%",
    fontSize: "clamp(14px, 2.5vw + 12px, 15px)",
    lineHeight: 1.625,
    border: `1px solid ${COLORS.borderPlum}`,
    boxShadow: "0 4px 16px rgba(11, 31, 59, 0.18), 0 2px 8px rgba(0,0,0,0.08)",
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 px-0.5 sm:px-0`}>
      <div
        className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl min-w-0 ${isUser ? "rounded-br-md" : "rounded-bl-md"}`}
        style={{
          ...bubbleStyle,
          background: isUser ? COLORS.bubbleUserBg : COLORS.bubbleBg,
        }}
      >
        {isUser ? (
          <span style={{ color: COLORS.textDark }}>{message.content}</span>
        ) : (
          <div className="prose-sm" style={{ color: COLORS.textDark }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {displayContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
