"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useTypewriter } from "@/hooks/useTypewriter";
import { COLORS } from "@/lib/theme";
import { buildApiUrl } from "@/lib/api-base";

const PLACEHOLDER_TEXT = "Please enter your details";
const STT_URL = buildApiUrl("/speech/transcribe");

interface ChatInputProps {
  onSend: (text: string) => void;
  onRestart?: () => void;
  disabled?: boolean;
  languageCode?: string;
}

export function ChatInput({
  onSend,
  onRestart,
  disabled,
  languageCode = "en-IN",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const showTypewriter = value === "" && !isFocused;
  const { displayText } = useTypewriter(PLACEHOLDER_TEXT, showTypewriter);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSend(trimmed);
      setValue("");
    },
    [value, disabled, onSend]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const startRecording = useCallback(async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", blob, "recording.webm");
        formData.append("language_code", languageCode);
        try {
          const res = await fetch(STT_URL, { method: "POST", body: formData });
          if (!res.ok) throw new Error(res.statusText);
          const data = (await res.json()) as { transcript?: string };
          if (data.transcript) onSend(data.transcript);
        } catch (err) {
          setMicError((err as Error).message || "Speech-to-text failed");
        }
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      setMicError((err as Error).message || "Microphone access denied");
    }
  }, [languageCode, onSend]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  }, [isRecording]);

  const handleMicClick = useCallback(() => {
    if (disabled) return;
    if (isRecording) stopRecording();
    else startRecording();
  }, [disabled, isRecording, startRecording, stopRecording]);

  return (
    <div className="flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2">
      {micError ? (
        <p className="text-xs text-red-600 mb-1 px-2">{micError}</p>
      ) : null}
      <div
        className="rounded-full min-w-0"
        style={{
          background: `linear-gradient(${COLORS.bubbleBg}, ${COLORS.bubbleBg}) padding-box, linear-gradient(90deg, ${COLORS.plumDark} 0%, ${COLORS.plum} 40%, ${COLORS.plumLight} 70%, rgba(250,250,249,0.9) 100%) border-box`,
          border: "3px solid transparent",
        }}
      >
        <div
          className="flex items-center gap-1 sm:gap-1.5 pl-2 pr-0.5 py-0.5 sm:pl-3 sm:pr-1 sm:py-1 rounded-full min-w-0"
          style={{ background: COLORS.bubbleBg }}
        >
          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="w-full min-w-0 bg-transparent text-[#1F2937] text-xs sm:text-sm outline-none placeholder-transparent"
              style={{ fontSize: "clamp(13px, 2vw + 11px, 14px)" }}
              placeholder={PLACEHOLDER_TEXT}
              aria-label="Type a message"
            />
            {showTypewriter ? (
              <div
                className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
                onClick={() => inputRef.current?.focus()}
              >
                <span
                  className="truncate"
                  style={{
                    fontSize: "clamp(13px, 2vw + 11px, 14px)",
                    color: "#1a1a1a",
                    letterSpacing: "0.01em",
                  }}
                >
                  {displayText}
                </span>
                <span
                  className="animate-caret-blink inline-block ml-px"
                  style={{ width: "2px", height: "1em", background: COLORS.plum }}
                />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleMicClick}
            disabled={disabled}
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all hover:opacity-90 p-0 w-8 h-8 sm:w-9 sm:h-9"
            title={isRecording ? "Stop recording" : "Voice input"}
            aria-label={isRecording ? "Stop recording" : "Voice input"}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={isRecording ? { color: "#dc2626" } : { color: COLORS.plum }}
              aria-hidden
            >
              <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3z" />
            </svg>
          </button>

          {onRestart ? (
            <button
              type="button"
              onClick={onRestart}
              className="flex-shrink-0 flex items-center justify-center rounded-full text-gray-500 hover:text-[#0B1F3B] hover:bg-[#0B1F3B]/10 transition-colors w-8 h-8 sm:w-9 sm:h-9 p-1.5 sm:p-2"
              aria-label="Restart conversation"
            >
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!value.trim() || !!disabled}
            className="flex-shrink-0 flex items-center justify-center transition-opacity hover:opacity-90 w-8 h-8 sm:w-9 sm:h-9"
            style={{ opacity: !value.trim() || disabled ? 0.5 : 1 }}
            aria-label="Send message"
          >
            <Image
              src="/send.svg"
              alt="Send"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
