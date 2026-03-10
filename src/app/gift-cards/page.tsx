"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useAuth } from "@/contexts/AuthContext";
import { formatInr } from "@/lib/currency";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Prime",
    tagline: "The Perfect Start",
    valueMin: 50000,
    valueMax: 100000,
    color: "from-slate-300 via-slate-200 to-slate-400",
    borderColor: "border-slate-300",
    textColor: "text-slate-700",
    accentColor: "text-slate-500",
    bgCard: "bg-gradient-to-br from-slate-50 to-white",
    chipBg: "bg-slate-100",
    features: [
      "Valid for 12 months",
      "Redeemable on any flight",
      "Transferable to friends & family",
      "Digital delivery via email",
    ],
    popular: false,
  },
  {
    name: "Elite",
    tagline: "Most Popular Choice",
    valueMin: 100000,
    valueMax: 250000,
    color: "from-amber-400 via-yellow-300 to-amber-500",
    borderColor: "border-accent",
    textColor: "text-amber-800",
    accentColor: "text-accent",
    bgCard: "bg-gradient-to-br from-amber-50/50 to-white",
    chipBg: "bg-accent/10",
    features: [
      "Valid for 24 months",
      "Redeemable on any flight",
      "Priority booking assistance",
      "Complimentary seat upgrade (when available)",
      "Elegant digital gift card design",
      "Personal message included",
    ],
    popular: true,
  },
  {
    name: "Signature",
    tagline: "Ultimate Luxury",
    valueMin: 250000,
    valueMax: 500000,
    color: "from-gray-900 via-gray-800 to-black",
    borderColor: "border-gray-800",
    textColor: "text-white",
    accentColor: "text-accent",
    bgCard: "bg-gradient-to-br from-gray-900 to-black",
    chipBg: "bg-white/10",
    features: [
      "Valid for 36 months",
      "Redeemable on any flight or hotel",
      "Dedicated personal travel concierge",
      //"Guaranteed first class upgrade",
      "Airport lounge access included",
      "Premium physical card with gift box",
      "VIP customer support line",
    ],
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardDesigns = [
  {
    name: "Prime",
    tierLabel: "EFS Prime",
    cardholderName: "Rahul Sharma",
    gradient: "from-slate-300 via-slate-200 to-slate-400",
    valueStr: `${formatInr(50000)} – ${formatInr(100000)}`,
    cardNumber: "XXXX XXXX XXXX 1234",
    validFrom: "03/26",
    validThru: "03/29",
    nameColor: "text-slate-700",
    subColor: "text-black/40",
    valColor: "text-black/50",
    valTextColor: "text-black/60",
    iconBg: "bg-black/10",
    iconColor: "text-black/40",
  },
  {
    name: "Elite",
    tierLabel: "EFS Elite",
    cardholderName: "Priya Mehta",
    gradient: "from-amber-400 via-yellow-300 to-amber-500",
    valueStr: `${formatInr(100000)} – ${formatInr(250000)}`,
    cardNumber: "XXXX XXXX XXXX 5678",
    validFrom: "03/26",
    validThru: "03/29",
    nameColor: "text-amber-950",
    subColor: "text-amber-950/70",
    valColor: "text-amber-950/85",
    valTextColor: "text-amber-950",
    iconBg: "bg-amber-950/15",
    iconColor: "text-amber-950/80",
  },
  {
    name: "Signature",
    tierLabel: "EFS Signature",
    cardholderName: "Arjun Kapoor",
    gradient: "from-gray-900 via-gray-800 to-black",
    valueStr: `${formatInr(250000)} – ${formatInr(500000)}`,
    cardNumber: "XXXX XXXX XXXX 9012",
    validFrom: "03/26",
    validThru: "03/29",
    nameColor: "text-white",
    subColor: "text-white/50",
    valColor: "text-white/60",
    valTextColor: "text-accent",
    iconBg: "bg-white/10",
    iconColor: "text-accent",
  },
];

function RotatingCards({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const getPosition = (index: number) => {
    const diff = (index - active + 3) % 3;
    if (diff === 0) return { x: 0, y: 0, scale: 1, zIndex: 30, rotate: 0, opacity: 1 };
    if (diff === 1) return { x: 200, y: 12, scale: 0.88, zIndex: 20, rotate: 5, opacity: 0.75 };
    return { x: -200, y: 12, scale: 0.88, zIndex: 10, rotate: -5, opacity: 0.75 };
  };

  return (
    <div className="relative h-[320px] w-[420px] mx-auto">
      {cardDesigns.map((card, i) => {
        const pos = getPosition(i);
        return (
          <motion.div
            key={card.name}
            animate={{
              x: pos.x,
              y: pos.y,
              scale: pos.scale,
              rotate: pos.rotate,
              opacity: pos.opacity,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={() => onSelect(i)}
            className={cn(
              "absolute left-1/2 top-0 -translate-x-1/2 w-[380px] h-[240px] cursor-pointer rounded-xl bg-gradient-to-br shadow-2xl border border-white/10 overflow-hidden",
              card.gradient
            )}
            style={{ zIndex: pos.zIndex }}
          >
            <div className="absolute inset-0 opacity-20 overflow-hidden">
              <svg className="h-full w-full" viewBox="0 0 400 240" fill="none">
                <circle cx="320" cy="40" r="140" fill="white" fillOpacity="0.12" />
                <circle cx="60" cy="200" r="100" fill="white" fillOpacity="0.08" />
              </svg>
            </div>
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className={cn("text-sm font-bold uppercase tracking-[0.2em]", card.subColor)}>EasyFlyNStay</p>
                  <p className={cn("font-heading text-lg font-bold mt-1", card.nameColor)}>{card.name}</p>
                </div>
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", card.iconBg)}>
                  <svg className={cn("h-4 w-4", card.iconColor)} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
              </div>
              <p className={cn("font-mono text-lg font-semibold tracking-widest", card.nameColor)}>{card.cardNumber}</p>
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <p className={cn("text-[9px] uppercase tracking-wider", card.valColor)}>Valid from {card.validFrom}</p>
                  <p className={cn("text-[9px] uppercase tracking-wider", card.valColor)}>Valid thru {card.validThru}</p>
                </div>
                <div>
                  <p className={cn("text-[10px] uppercase tracking-wider", card.valColor)}>Cardholder</p>
                  <p className={cn("font-heading text-sm font-bold", card.nameColor)}>{card.cardholderName}</p>
                </div>
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded", card.name === "Signature" ? "bg-white/20" : "bg-primary")}>
                  <span className="font-heading text-sm font-bold text-accent">E</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function GiftCardsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeCard, setActiveCard] = useState(1);

  const handlePurchaseClick = () => {
    if (user) {
      router.push("/dashboard/gift-cards");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero with rotating cards */}
        <section className="relative overflow-hidden bg-primary py-16 md:py-20">
          <Image
            src="https://images.unsplash.com/photo-1540339832862-474599807836?w=1920&h=700&fit=crop"
            alt="Premium gift"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary" />
          <div className="relative mx-auto max-w-5xl px-4">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 inline-flex items-center gap-2 border border-accent/50 bg-accent/10 px-4 py-1.5 backdrop-blur-sm"
                >
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                  <span className="text-xs font-semibold text-accent tracking-wider uppercase">The Gift of Travel</span>
                </motion.div>
                <h1 className="font-heading text-4xl font-bold md:text-5xl leading-tight">
                  Ease your struggles in<br />choosing the <span className="text-accent">perfect gift!</span>
                </h1>
                <p className="mt-4 text-lg text-white/70 max-w-md">Three exclusive tiers crafted for every occasion. Give the gift of luxury travel with Easyflynstay.</p>
                <div className="mt-6 flex gap-3">
                  <Button variant="accent" size="lg" className="text-primary font-semibold" onClick={handlePurchaseClick}>
                    Purchase Gift Card
                  </Button>
                </div>
              </motion.div>

              {/* Rotating cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <RotatingCards active={activeCard} onSelect={setActiveCard} />
              </motion.div>
            </div>

            {/* Dots indicator + card name */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {cardDesigns.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveCard(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === activeCard ? "bg-accent w-8" : "bg-white/30 w-2 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeCard}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-white/50 font-medium tracking-wider uppercase"
                >
                  {cardDesigns[activeCard].name} Card
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Gift Card Tiers */}
        <section className="py-20 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal className="text-center mb-16">
              <h2 className="font-heading text-3xl font-semibold text-foreground">Choose Your Tier</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Each tier unlocks exclusive benefits. Select the perfect gift card for your loved ones.</p>
            </SectionReveal>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 lg:grid-cols-3"
            >
              {tiers.map((tier) => (
                <motion.div key={tier.name} variants={itemVariants}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative flex flex-col overflow-hidden border-2 shadow-lg transition-shadow hover:shadow-2xl h-full",
                      tier.popular ? "border-accent" : tier.borderColor,
                      tier.name === "Signature" ? tier.bgCard : "bg-white"
                    )}
                  >
                    {tier.popular && (
                      <div className="absolute -right-8 top-6 rotate-45 bg-accent px-10 py-1 text-xs font-bold text-primary shadow-md">
                        POPULAR
                      </div>
                    )}

                    {/* Card visual */}
                    <div className={cn("relative h-56 overflow-hidden bg-gradient-to-br", tier.color)}>
                      <div className="absolute inset-0 opacity-20">
                        <svg className="h-full w-full" viewBox="0 0 400 200" fill="none">
                          <circle cx="350" cy="50" r="120" fill="white" fillOpacity="0.1" />
                          <circle cx="50" cy="180" r="80" fill="white" fillOpacity="0.08" />
                        </svg>
                      </div>
                      <div className="relative flex h-full flex-col justify-between p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={cn("text-sm font-bold uppercase tracking-[0.2em]", tier.name === "Signature" ? "text-white/70" : "text-black/50")}>EasyFlyNStay</p>
                            <p className={cn("font-heading text-2xl font-bold mt-1", tier.name === "Signature" ? "text-white" : "text-black/80")}>{tier.name}</p>
                          </div>
                          <div className={cn("flex h-10 w-10 items-center justify-center", tier.name === "Signature" ? "bg-white/10" : "bg-black/10")}>
                            <svg className={cn("h-5 w-5", tier.name === "Signature" ? "text-accent" : "text-black/50")} fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
                          </div>
                        </div>
                        <div>
                          <p className={cn("font-mono text-sm font-semibold tracking-widest", tier.name === "Signature" ? "text-white/80" : tier.name === "Elite" ? "text-amber-950/80" : "text-black/50")}>XXXX XXXX XXXX 1234</p>
                          <p className={cn("text-xs mt-1", tier.name === "Signature" ? "text-white/50" : tier.name === "Elite" ? "text-amber-950/80" : "text-black/30")}>Gift Card Value</p>
                          <p className={cn("font-heading text-xl font-bold", tier.name === "Signature" ? "text-accent" : tier.name === "Elite" ? "text-amber-950" : "text-black/70")}>{formatInr(tier.valueMin)} – {formatInr(tier.valueMax)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className={cn("flex flex-1 flex-col p-6", tier.name === "Signature" ? "text-white" : "")}>
                      <div className={cn("mb-4 inline-flex self-start items-center gap-1.5 px-3 py-1 text-xs font-semibold", tier.chipBg, tier.accentColor)}>
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {tier.tagline}
                      </div>

                      <ul className="flex-1 space-y-2.5">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <svg className={cn("mt-0.5 h-4 w-4 shrink-0", tier.accentColor)} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span className={tier.name === "Signature" ? "text-white/80" : "text-muted-foreground"}>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Button
                          variant={tier.popular ? "accent" : "outline"}
                          className={cn(
                            "w-full font-semibold",
                            tier.popular && "text-primary shadow-lg",
                            tier.name === "Signature" && !tier.popular && "border-white/30 text-white hover:bg-white hover:text-primary"
                          )}
                          size="lg"
                          onClick={handlePurchaseClick}
                        >
                          Purchase {tier.name} Card
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <SectionReveal className="text-center mb-12">
              <h2 className="font-heading text-3xl font-semibold text-foreground">How Gift Cards Work</h2>
            </SectionReveal>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: "01", title: "Choose & Purchase", desc: "Select your preferred tier and complete the purchase securely.", icon: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg> },
                { step: "02", title: "Send to Loved Ones", desc: "Gift card is delivered instantly via email with a personal message.", icon: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
                { step: "03", title: "Redeem & Fly", desc: "Apply the gift card code at checkout for any Easyflynstay booking.", icon: <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg> },
              ].map((s) => (
                <SectionReveal key={s.step}>
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-accent bg-accent/5 text-accent">
                      {s.icon}
                    </div>
                    <p className="mt-4 text-xs font-bold text-accent tracking-wider">STEP {s.step}</p>
                    <h3 className="mt-1 font-heading text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t border-border bg-muted/20">
          <div className="mx-auto max-w-3xl px-4">
            <SectionReveal className="text-center mb-10">
              <h2 className="font-heading text-3xl font-semibold">Frequently Asked Questions</h2>
            </SectionReveal>
            <div className="space-y-4">
              {[
                { q: "Can I use a gift card for any flight?", a: "Yes, all Easyflynstay gift cards can be redeemed on any flight booking — economy through first class." },
                { q: "Do gift cards expire?", a: "Prime cards are valid for 12 months, Elite for 24 months, and Signature for 36 months from the date of purchase." },
                { q: "Can I combine multiple gift cards?", a: "Absolutely. You can apply multiple gift card codes to a single booking." },
                { q: "Is there a physical card option?", a: "The Signature tier includes a premium physical card delivered in an exclusive gift box. Prime and Elite are digital-only." },
              ].map((item) => (
                <SectionReveal key={item.q}>
                  <div className="border border-border bg-white p-5">
                    <h3 className="font-heading font-semibold text-foreground">{item.q}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
