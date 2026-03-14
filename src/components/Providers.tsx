"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ChatWidget } from "@/components/ai-assistant";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <ChatWidget />
    </AuthProvider>
  );
}
