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
import { cn } from "@/lib/utils";
import {
  GIFT_TIER_MARKETING,
  GIFT_CARD_DEMO,
  tierValueRangeLine,
  giftCardVariantFromTier,
  type GiftCardTier,
} from "@/lib/gift-card-tiers";
import { GiftCardVisual, giftCardClassName } from "@/components/gift-card";

const TIER_ORDER: GiftCardTier[] = ["Prime", "Signature", "Elite"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function RotatingCards({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const getPosition = (index: number) => {
    const diff = (index - active + 3) % 3;
    if (diff === 0) return { x: 0, y: 0, scale: 1, zIndex: 30, rotate: 0, opacity: 1 };
    if (diff === 1) return { x: 200, y: 12, scale: 0.88, zIndex: 20, rotate: 5, opacity: 0.75 };
    return { x: -200, y: 12, scale: 0.88, zIndex: 10, rotate: -5, opacity: 0.75 };
  };

  return (
    <div className="relative h-[320px] w-[420px] mx-auto">
      {TIER_ORDER.map((tier, i) => {
        const demo = GIFT_CARD_DEMO[tier];
        const pos = getPosition(i);
        return (
          <motion.div
            key={tier}
            animate={{
              x: pos.x,
              y: pos.y,
              scale: pos.scale,
              rotate: pos.rotate,
              opacity: pos.opacity,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onClick={() => onSelect(i)}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[380px] cursor-pointer"
            style={{ zIndex: pos.zIndex }}
          >
            <GiftCardVisual
              variant={giftCardVariantFromTier(tier)}
              tier={tier}
              cardNumber={demo.cardNumber}
              cardHolder={demo.cardholderName}
              validFrom={demo.validFrom}
              validThru={demo.validThru}
              className={giftCardClassName.marketingCarousel}
            />
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
                {TIER_ORDER.map((name, i) => (
                  <button
                    key={name}
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
                  {TIER_ORDER[activeCard]} Card
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
              {GIFT_TIER_MARKETING.map((tier) => {
                const vari = giftCardVariantFromTier(tier.name);
                return (
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
                      <div className="absolute -right-8 top-6 rotate-45 bg-accent px-10 py-1 text-xs font-bold text-primary shadow-md z-10">
                        POPULAR
                      </div>
                    )}

                    <GiftCardVisual
                      variant={vari}
                      tier={tier.name}
                      cardNumber={GIFT_CARD_DEMO[tier.name].cardNumber}
                      cardHolder={GIFT_CARD_DEMO[tier.name].cardholderName}
                      validFrom={GIFT_CARD_DEMO[tier.name].validFrom}
                      validThru={GIFT_CARD_DEMO[tier.name].validThru}
                      rounded="top"
                      promoSlot={
                        <div>
                          <p
                            className={cn(
                              "text-xs font-medium",
                              vari === "platinum" && "text-zinc-400",
                              vari === "gold" && "text-amber-950/80",
                              vari === "silver" && "text-slate-600"
                            )}
                          >
                            Gift Card Value
                          </p>
                          <p
                            className={cn(
                              "mt-0.5 font-serif text-lg font-bold sm:text-xl",
                              vari === "platinum" && "text-[#C9A227]",
                              vari === "gold" && "text-amber-950",
                              vari === "silver" && "text-slate-800"
                            )}
                          >
                            {tierValueRangeLine(tier)}
                          </p>
                        </div>
                      }
                      className={giftCardClassName.tierFace}
                    />

                    {/* Details - always on light bg (white or amber-50), so use dark text for readability */}
                    <div className="flex flex-1 flex-col p-6 text-foreground">
                      <div className={cn("mb-4 inline-flex self-start items-center gap-1.5 px-3 py-1 text-xs font-semibold", tier.chipBg, tier.accentColor)}>
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {tier.tagline}
                      </div>

                      <ul className="flex-1 space-y-2.5">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <svg className={cn("mt-0.5 h-4 w-4 shrink-0", tier.accentColor)} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Button
                          variant={tier.popular ? "accent" : "outline"}
                          className={cn(
                            "w-full font-semibold",
                            tier.popular && "text-primary shadow-lg"
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
                );
              })}
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
