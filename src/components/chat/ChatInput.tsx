"use client";

import { useState, KeyboardEvent, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { transcribeAudio } from "@/lib/speech";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  languageCode?: string;
}

export function ChatInput({
  onSend,
  disabled,
  languageCode = "en-IN",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = useCallback(async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        try {
          const transcript = await transcribeAudio(blob, languageCode);
          if (transcript) {
            onSend(transcript);
          }
        } catch (err) {
          setMicError(
            (err as Error).message || "Speech-to-text failed. Please try again."
          );
        }
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      setMicError(
        (err as Error).message || "Microphone access denied. Check browser permissions."
      );
    }
  }, [languageCode, onSend]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
  }, [isRecording]);

  const handleMicClick = () => {
    if (disabled) return;
    if (isRecording) stopRecording();
    else void startRecording();
  };

  return (
    <div className="flex flex-col gap-1 border-t border-border bg-card px-3 py-3">
      {micError && (
        <p className="text-[11px] text-red-600">{micError}</p>
      )}
      <div className="flex items-center gap-2">
        <Input
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me to help with your flight booking…"
          className="flex-1 text-sm"
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={handleMicClick}
          disabled={disabled}
          aria-label={isRecording ? "Stop recording" : "Voice input"}
        >
          {isRecording ? (
            <span className="h-3 w-3 rounded-[2px] bg-red-600" />
          ) : (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-14 0m7 7v3"
              />
            </svg>
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

