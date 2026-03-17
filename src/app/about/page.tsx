"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/section-reveal";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "5K+", label: "Happy Travelers" },
  { value: "500+", label: "Destinations" },
  { value: "24/7", label: "Concierge Support" },
];

// Team section data — to be included when team block is re - enabled
const team = [
  { name: "Sarah Mitchell", role: "CEO & Founder", image: "..." },
  { name: "David Chen", role: "Head of Operations", image: "..." },
  { name: "Priya Sharma", role: "Travel Director", image: "..." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-72 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=1920&h=500&fit=crop"
            alt="Airplane wing at sunset"
            fill
            priority
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="font-heading text-4xl font-bold md:text-5xl">About Easyflynstay</h1>
              <p className="mt-3 text-lg text-white/80">Your trusted partner in premium air travel since 2014.</p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <SectionReveal>
                <h2 className="font-heading text-3xl font-semibold text-foreground">Our Mission</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  At Easyflynstay, we believe that premium travel should be accessible to everyone. Our team of expert travel
                  consultants leverages years of industry relationships to secure the best unpublished fares on business and
                  first class flights worldwide.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  We are trusted by thousands of travelers for reliable, personalized service, secure booking, and
                  unbeatable prices on premium cabin travel.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="border border-border bg-muted/30 p-4 text-center">
                      <p className="font-heading text-2xl font-bold text-accent">{s.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
              <SectionReveal>
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=500&fit=crop"
                    alt="Team at work"
                    fill
                    className="object-cover"
                  />
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Values with bg image */}
        <section className="relative py-20 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop"
            alt="Travel scenery"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <SectionReveal className="relative mx-auto max-w-7xl px-4 text-center text-white">
            <h2 className="font-heading text-3xl font-semibold">Our Values</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Transparency", desc: "No hidden fees. No surprises. Just honest pricing and genuine service." },
                { title: "Excellence", desc: "We go above and beyond to ensure every journey exceeds expectations." },
                { title: "Trust", desc: "Trust and credibility at each step. Your confidence is our foundation." },
              ].map((v) => (
                <motion.div
                  key={v.title}
                  whileHover={{ y: -5 }}
                  className="glass p-6"
                >
                  <h3 className="font-heading text-xl font-semibold text-accent">{v.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </section>

        {/* Team - hidden for now, to be included later */}
        <section className="py-16">
          <SectionReveal className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Meet Our Leadership</h2>
            <p className="mt-2 text-muted-foreground">Experienced professionals dedicated to your travel experience.</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {team.map((t) => (
                <motion.div key={t.name} whileHover={{ y: -5 }} className="group">
                  <div className="relative mx-auto h-48 w-48 overflow-hidden">
                    <Image src={t.image} alt={t.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold">{t.name}</h3>
                  <p className="text-sm text-accent">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
