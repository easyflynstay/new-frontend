import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RefundCancellationDocument } from "./RefundCancellationDocument";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | EasyFlyNStay",
  description:
    "EasyFlyNStay Refund & Cancellation Policy: flight cancellations, amendments, no-shows, refunds, gift cards, chargebacks, and timelines.",
};

export default function RefundCancellationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[min(90rem,94vw)] px-5 sm:px-8 lg:px-12 xl:px-16">
          <RefundCancellationDocument />
        </div>
      </main>
      <Footer />
    </div>
  );
}
