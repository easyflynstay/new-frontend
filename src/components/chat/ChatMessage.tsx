"use client";

type ChatRole = "user" | "assistant";

export interface ChatMessageProps {
  role: ChatRole;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={[
          "max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-white text-foreground border border-border",
        ].join(" ")}
      >
        {content}
      </div>
    </div>
  );
}

