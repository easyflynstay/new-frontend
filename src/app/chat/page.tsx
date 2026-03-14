import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatContainer } from "@/components/chat/ChatContainer";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-2xl font-semibold text-primary">
              Chat with our flight expert
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer a guided experience? Tell the assistant your trip details
              and we&apos;ll help you get everything ready for booking.
            </p>
          </div>
          <ChatContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}

