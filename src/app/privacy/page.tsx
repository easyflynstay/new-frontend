import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrivacyDocument } from "./PrivacyDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | EasyFlyNStay",
  description:
    "EasyFlyNStay Privacy Policy: how we collect, use, store, share, and protect your personal data on our travel platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[min(90rem,94vw)] px-5 sm:px-8 lg:px-12 xl:px-16">
          <PrivacyDocument />
        </div>
      </main>
      <Footer />
    </div>
  );
}
