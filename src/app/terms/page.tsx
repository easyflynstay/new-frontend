import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsDocument } from "./TermsDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions | EasyFlyNStay",
  description:
    "Read the EasyFlyNStay Terms & Conditions: platform use, bookings, payments, cancellations, liability, and governing law.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        {/* Wide legal column (~90–94% viewport cap) — readable like established travel sites */}
        <div className="mx-auto w-full max-w-[min(90rem,94vw)] px-5 sm:px-8 lg:px-12 xl:px-16">
          <TermsDocument />
        </div>
      </main>
      <Footer />
    </div>
  );
}
