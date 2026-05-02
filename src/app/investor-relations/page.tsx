"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/section-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DISPLAY_PHONE, INVESTOR_EMAIL, OFFICES, TEL_HREF } from "@/lib/contact-info";
import { InvestorContactModal } from "@/components/investor/InvestorContactModal";

const investmentBenefits = [
  {
    title: "Premium travel tailwinds",
    text: "Positioned in business and first class—segments with resilient demand, pricing power, and global route depth.",
  },
  {
    title: "Differentiated supply",
    text: "Relationships and processes around unpublished fares create margin and repeat buyers beyond commodity OTAs.",
  },
  {
    title: "Service moat",
    text: "24/7 concierge and travel managers drive trust, referrals, and higher lifetime value per customer.",
  },
  {
    title: "Platform leverage",
    text: "Digital booking, accounts, and payments (wallet, gift cards, coupons) expand usable surface area without heavy fixed assets.",
  },
  {
    title: "India + global footprint",
    text: "Bengaluru-based operations with three local offices and clientele spanning India and international markets.",
  },
  {
    title: "Governance-ready narrative",
    text: "Published policies, structured bookings data, and a clear path to diligence for serious capital partners.",
  },
];

export default function InvestorRelationsPage() {
  const [investorFormOpen, setInvestorFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative min-h-[240px] overflow-hidden sm:min-h-[280px]">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=640&fit=crop&q=85"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex min-h-[240px] flex-col items-center justify-center px-4 py-12 text-center text-white sm:min-h-[280px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">EASYFLYNSTAY</p>
              <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Investor relations</h1>
              <p className="mt-3 text-sm text-white/85 md:text-base text-balance">
                For partners and investors arriving via QR or direct introduction—highlights and how to reach us.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-border py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
                Why invest in EASYFLYNSTAY
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                We operate at the intersection of premium air travel, technology, and high-touch service—built for travelers
                who expect more than a self-serve checkout.
              </p>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {investmentBenefits.map((item) => (
                  <li key={item.title} className="border border-border bg-card p-5 card-sharp">
                    <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </section>

        <section className="border-b border-border bg-primary py-12 text-primary-foreground sm:py-14">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">Operational highlights</h2>
              <p className="mt-3 max-w-2xl text-sm text-white/80 leading-relaxed">
                Snapshot of scale and service coverage. Further detail available under confidentiality for qualified
                conversations.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "2025", label: "Year founded" },
                  { value: "3", label: "Bengaluru offices" },
                  { value: "500+", label: "Destinations in network" },
                  { value: "24/7", label: "Concierge coverage" },
                ].map((s) => (
                  <div key={s.label} className="border border-white/20 bg-white/5 p-5 text-center">
                    <p className="font-heading text-2xl font-bold text-accent md:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Contact</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Investor, partnership, and media inquiries: email us or use Contact Now to send a structured message
                  to our investor mailbox.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li>
                    <span className="text-muted-foreground">Email: </span>
                    <a
                      href={`mailto:${INVESTOR_EMAIL}?subject=Investor%20inquiry`}
                      className="font-medium text-accent underline-offset-4 hover:underline"
                    >
                      {INVESTOR_EMAIL}
                    </a>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Phone: </span>
                    <a href={TEL_HREF} className="font-medium text-accent underline-offset-4 hover:underline">
                      {DISPLAY_PHONE}
                    </a>
                  </li>
                </ul>
                <div className="mt-8">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">Offices</h3>
                  <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm text-muted-foreground leading-relaxed">
                    {OFFICES.map((o) => (
                      <li key={o.title}>
                        <span className="font-medium text-foreground">{o.title}: </span>
                        {o.lines}
                      </li>
                    ))}
                  </ol>
                </div>
                <button
                  type="button"
                  className={cn(buttonVariants({ variant: "accent" }), "mt-8")}
                  onClick={() => setInvestorFormOpen(true)}
                >
                  Contact Now
                </button>
              </div>
              <div className="relative h-56 overflow-hidden border border-border sm:h-72 lg:min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=500&fit=crop&q=85"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
      <InvestorContactModal open={investorFormOpen} onClose={() => setInvestorFormOpen(false)} />
    </div>
  );
}
