"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSearch } from "@/components/hero/HeroSearch";
import { DealCard } from "@/components/deals/DealCard";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import { formatUsdAsInr } from "@/lib/currency";
import { GIFT_CARD_DEMO, giftCardVariantFromTier } from "@/lib/gift-card-tiers";
import { GiftCardVisual, giftCardClassName } from "@/components/gift-card";
import { DestinationCarousel } from "@/components/home/DestinationCarousel";
import { DestinationQuoteModal } from "@/components/home/DestinationQuoteModal";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";

const deals = [
  { title: "India", description: "Privately negotiated business class. Save 50–77% off retail fares.", priceUsd: 1529, badge: "BIZ CLASS", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=500&fit=crop&q=85" },
  { title: "Italy", description: "Exclusive business class deals to Rome, Milan & Venice.", priceUsd: 1919, badge: "30% OFF", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop&q=85" },
  { title: "United Kingdom", description: "Save up to 50% on premium fares to London & beyond.", priceUsd: 1879, badge: "BIZ CLASS", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop&q=85" },
  { title: "France", description: "Business class to Paris for less. Enjoy the City of Light.", priceUsd: 1039, badge: "30% OFF", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop&q=85" },
];

const whyChoose = [
  {
    title: "Personal Travel Manager",
    desc: "Your own dedicated flight designer focused entirely on your needs and preferences.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "24/7 Live Concierge",
    desc: "Round-the-clock expert support for changes, cancellations, and travel assistance.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Best Unpublished Fares",
    desc: "Access to privately negotiated rates not available on any public booking platform.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: "Trusted by Thousands",
    desc: "Trusted by over 50,000 satisfied travelers worldwide. Secure payments and dedicated support.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const airlines = [
  { name: "Emirates", code: "EK", color: "bg-red-600", text: "text-white" },
  { name: "Qatar Airways", code: "QR", color: "bg-[#5C0632]", text: "text-white" },
  { name: "Singapore Airlines", code: "SQ", color: "bg-[#00256C]", text: "text-yellow-400" },
  { name: "Air India", code: "AI", color: "bg-[#E31837]", text: "text-white" },
  { name: "Turkish Airlines", code: "TK", color: "bg-[#C70A0C]", text: "text-white" },
  { name: "British Airways", code: "BA", color: "bg-[#075AAA]", text: "text-white" },
  { name: "Lufthansa", code: "LH", color: "bg-[#05164D]", text: "text-yellow-400" },
  { name: "Air France", code: "AF", color: "bg-[#002157]", text: "text-white" },
];

/** Airline logo from Kiwi CDN (internet). Fallback to code badge if image fails. */
function AirlineLogo({ name, code, color, text }: { name: string; code: string; color: string; text: string }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = `https://images.kiwi.com/airlines/64/${code}.png`;
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex h-20 items-center justify-center gap-3 border border-border bg-white px-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded">
        {!imgError ? (
          <Image
            src={logoUrl}
            alt={name}
            width={40}
            height={40}
            className="object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`flex h-10 w-10 items-center justify-center ${color} ${text} text-xs font-bold`}>
            {code}
          </div>
        )}
      </div>
      <span className="font-heading text-sm font-semibold text-primary">{name}</span>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const [quoteDestination, setQuoteDestination] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[900px] overflow-visible">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1000&fit=crop&q=90&auto=format"
            alt="Aircraft wing above clouds at sunset — premium air travel"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-block border border-accent/50 bg-accent/10 px-4 py-2 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-accent">PREMIUM TRAVEL EXPERIENCE</span>
            </motion.div>
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-tight">
              Fly and Stay - With Class, Luxury and Ease
              <br />
              <span className="text-accent">For Less</span>
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Expert first & business class travel management by EASYFLYNSTAY.
              Save 30–70% on premium cabin fares worldwide.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex justify-center pb-48"
            >
              <Suspense fallback={<div className="h-64 flex items-center justify-center text-muted-foreground">Loading search…</div>}>
                <HeroSearch />
              </Suspense>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust badges */}
        <section className="relative border-b border-border bg-white py-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-7xl px-4 text-center"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Trusted by travelers worldwide</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-8">
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-semibold text-primary">
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                Best Price Guarantee
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-semibold text-primary">
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                Secure Booking
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-semibold text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                24/7 LIVE CONCIERGE
              </motion.span>
            </div>
          </motion.div>
        </section>

        {/* Deals grid */}
        <section className="py-16">
          <SectionReveal className="mx-auto max-w-7xl px-4">
            <div className="flex items-end justify-between mb-2">
              <div>
                <h2 className="font-heading text-3xl font-semibold text-foreground">Best-Selling Business Class Deals</h2>
                <p className="mt-2 text-muted-foreground">Save 30–70%* on business class flights to popular destinations.</p>
              </div>
              <Link href="/" className="hidden sm:block text-sm font-medium text-accent hover:underline">View all deals →</Link>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {deals.map((d) => (
                <motion.div key={d.title} variants={itemVariants}>
                  <DealCard title={d.title} description={d.description} price={`${formatUsdAsInr(d.priceUsd)}*`} badge={d.badge} image={d.image} />
                </motion.div>
              ))}
            </motion.div>
          </SectionReveal>
        </section>

        {/* Popular destinations gallery */}
        <section className="relative py-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&h=700&fit=crop&q=90"
            alt="Travel destinations"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <SectionReveal className="relative mx-auto max-w-7xl px-4 text-center text-white">
            <h2 className="font-heading text-3xl font-semibold">Explore the World in Luxury</h2>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">From the streets of Paris to the beaches of Maldives, EASYFLYNSTAY connects you to 500+ destinations in premium comfort.</p>
            <DestinationCarousel onCardClick={setQuoteDestination} />
          </SectionReveal>
        </section>

        {/* Why choose us */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-3xl font-semibold text-foreground text-center">Why Choose EASYFLYNSTAY</h2>
              <p className="mt-2 text-muted-foreground text-center">We&apos;re not just a booking platform — we&apos;re your travel partner.</p>
            </SectionReveal>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {whyChoose.map((w) => (
                <motion.div
                  key={w.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="flex h-14 w-14 items-center justify-center border-2 border-accent/30 bg-accent/5 text-accent transition-colors group-hover:bg-accent group-hover:text-primary">
                    {w.icon}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-primary group-hover:text-accent transition-colors">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative border-t border-border py-16 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1920&h=800&fit=crop&q=85"
            alt="Travel background"
            fill
            className="object-cover opacity-5"
          />
          <div className="relative mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-3xl font-semibold text-foreground text-center">What Travelers Say</h2>
              <p className="mt-2 text-center text-muted-foreground">Trusted by travelers across India — from metros to every corner of the country.</p>
            </SectionReveal>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Premium Gift Cards - same design as gift-cards page */}
        <section className="relative overflow-hidden bg-primary py-16">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 1200 400" fill="none">
              <circle cx="1100" cy="100" r="250" fill="white" fillOpacity="0.15" />
              <circle cx="100" cy="350" r="180" fill="white" fillOpacity="0.1" />
            </svg>
          </div>
          <SectionReveal className="relative mx-auto max-w-5xl px-4">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div className="text-white">
                <div className="mb-4 inline-flex items-center gap-2 border border-accent/50 bg-accent/10 px-4 py-1.5 backdrop-blur-sm">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                  <span className="text-xs font-semibold text-accent tracking-wider uppercase">The Gift of Travel</span>
                </div>
                <h2 className="font-heading text-3xl font-bold md:text-4xl">Premium Gift Cards</h2>
                <p className="mt-4 text-lg text-white/70 max-w-md">Give the gift of luxury travel. Three exclusive tiers — Prime, Signature & Elite — crafted for every occasion.</p>
                <Link href="/gift-cards" className="mt-6 inline-block">
                  <Button className="h-12 border-2 border-accent bg-accent px-8 text-base font-semibold text-primary hover:bg-accent/90">
                    Explore Gift Cards
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center w-full max-w-[380px] mx-auto">
                <GiftCardVisual
                  variant={giftCardVariantFromTier("Signature")}
                  tier="Signature"
                  cardNumber={GIFT_CARD_DEMO.Signature.cardNumber}
                  cardHolder={GIFT_CARD_DEMO.Signature.cardholderName}
                  validFrom={GIFT_CARD_DEMO.Signature.validFrom}
                  validThru={GIFT_CARD_DEMO.Signature.validThru}
                  className={giftCardClassName.marketing}
                />
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Ready to Fly CTA */}
        <section className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&h=600&fit=crop&q=90"
            alt="Sunset flight"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl px-4 py-20 text-center text-white"
          >
            <h2 className="font-heading text-3xl font-semibold md:text-4xl">Ready to Fly?</h2>
            <p className="mt-4 text-white/90 text-lg">Get the best fares on business and first class with EASYFLYNSTAY. Track your booking anytime.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/">
                <Button className="h-12 border-2 border-accent bg-accent px-8 text-base font-semibold text-primary shadow-lg hover:bg-accent/90">Search Flights</Button>
              </Link>
              <Link href="/track-booking">
                <Button className="h-12 border-2 border-white bg-transparent px-8 text-base text-white hover:bg-white hover:text-primary">Track Booking</Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Airline partners */}
        <section className="py-16 bg-white border-t border-border">
          <SectionReveal className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Our Airline Partners</h2>
            <p className="mt-2 text-muted-foreground">We work with the world&apos;s best airlines to bring you premium fares.</p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {airlines.map((a) => (
                <AirlineLogo key={a.name} name={a.name} code={a.code} color={a.color} text={a.text} />
              ))}
            </div>
          </SectionReveal>
        </section>

      </main>
      <Footer />
      <DestinationQuoteModal
        open={quoteDestination !== null}
        destination={quoteDestination ?? ""}
        onClose={() => setQuoteDestination(null)}
      />
    </div>
  );
}
