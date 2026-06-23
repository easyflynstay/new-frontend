"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ChatWidget } from "@/components/ai-assistant";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ScrollProgress />
      {children}
      <ChatWidget />
    </AuthProvider>
  );
}
