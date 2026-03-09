"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSearch } from "@/components/hero/HeroSearch";
import { DealCard } from "@/components/deals/DealCard";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/ui/section-reveal";

const deals = [
  {
    title: "India",
    description: "Privately negotiated business class. Save 50–77% off retail fares.",
    price: "$1,529*",
    badge: "BIZ CLASS",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=500&fit=crop&q=85",
  },
  {
    title: "Italy",
    description: "Exclusive business class deals to Rome, Milan & Venice.",
    price: "$1,919*",
    badge: "30% OFF",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop&q=85",
  },
  {
    title: "United Kingdom",
    description: "Save up to 50% on premium fares to London & beyond.",
    price: "$1,879*",
    badge: "BIZ CLASS",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop&q=85",
  },
  {
    title: "France",
    description: "Business class to Paris for less. Enjoy the City of Light.",
    price: "$1,039*",
    badge: "30% OFF",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop&q=85",
  },
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
    desc: "ARC accredited & BBB A+ rated. Over 50,000 satisfied travelers worldwide.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const steps = [
  {
    n: 1, title: "Search", desc: "Enter your route, dates and cabin class.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    n: 2, title: "Select", desc: "Choose from curated premium flight options.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    n: 3, title: "Book", desc: "Complete passenger details and secure payment.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    n: 4, title: "Fly", desc: "Receive confirmation and travel with confidence.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    text: "Incredible service! Saved over $3,000 on my business class flight to London. The team at Easyflynstay went above and beyond with every detail.",
    from: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Christine Mueller",
    text: "From booking to boarding, everything was seamless. The concierge team helped me change my dates last minute with zero hassle.",
    from: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    text: "Will book again without a second thought. Professional, reliable, and the fares were genuinely the best I could find anywhere online.",
    from: "Delhi, India",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "James O'Connor",
    text: "Easyflynstay found me a first class deal to Tokyo that was 60% cheaper than what I found on my own. Absolutely phenomenal.",
    from: "London, UK",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "Priya Menon",
    text: "Their 24/7 concierge is the real deal. Had an issue at 2 AM and they resolved it within minutes. Premium service all the way.",
    from: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
  },
  {
    name: "David Chen",
    text: "Been using Easyflynstay for two years now. Every single booking has been flawless. My go-to for all business travel.",
    from: "Singapore",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=85",
    rating: 5,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1000&fit=crop&q=90"
            alt="Travel adventure"
            fill
            priority
            className="object-cover"
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
              Fly Business & First Class
              <br />
              <span className="text-accent">For Less</span>
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Expert first & business class travel management by Easyflynstay.
              Save 30–70% on premium cabin fares worldwide.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <HeroSearch />
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
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                ARC ACCREDITED
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-semibold text-primary">
                <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0l-4.725 2.885a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>
                BBB A+
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-semibold text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
              <Link href="/booking" className="hidden sm:block text-sm font-medium text-accent hover:underline">View all deals →</Link>
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
                  <DealCard title={d.title} description={d.description} price={d.price} badge={d.badge} image={d.image} />
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
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">From the streets of Paris to the beaches of Maldives, Easyflynstay connects you to 500+ destinations in premium comfort.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { dest: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=450&fit=crop&q=85", tag: "From $899" },
                { dest: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=450&fit=crop&q=85", tag: "From $1,299" },
                { dest: "Singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=450&fit=crop&q=85", tag: "From $1,099" },
              ].map((item) => (
                <motion.div
                  key={item.dest}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group relative h-72 overflow-hidden cursor-pointer"
                >
                  <Image src={item.img} alt={item.dest} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-heading text-xl font-semibold">{item.dest}</h3>
                    <span className="text-sm text-accent font-medium">{item.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </section>

        {/* Why choose us */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-3xl font-semibold text-foreground text-center">Why Choose Easyflynstay</h2>
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

        {/* How booking works */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-3xl font-semibold text-foreground text-center">How Booking Works</h2>
            </SectionReveal>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  variants={itemVariants}
                  className="relative flex gap-4 border border-border bg-card p-6"
                >
                  {i < steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 hidden lg:block w-6 h-0.5 bg-accent" />
                  )}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-accent bg-accent/10 text-accent">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-accent uppercase tracking-wider">Step {s.n}</p>
                    <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
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
              <p className="mt-2 text-center text-muted-foreground">Over 50,000 happy travelers trust Easyflynstay worldwide.</p>
            </SectionReveal>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t.name}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="border border-border bg-card p-6 shadow-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-accent/30">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.from}</p>
                    </div>
                  </div>
                  <div className="mb-3 flex text-accent">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground italic text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Airline partners */}
        <section className="py-16 bg-white border-t border-border">
          <SectionReveal className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Our Airline Partners</h2>
            <p className="mt-2 text-muted-foreground">We work with the world&apos;s best airlines to bring you premium fares.</p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {airlines.map((a) => (
                <motion.div
                  key={a.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex h-20 items-center justify-center gap-3 border border-border bg-white px-5 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center ${a.color} ${a.text} text-xs font-bold`}>
                    {a.code}
                  </div>
                  <span className="font-heading text-sm font-semibold text-primary">{a.name}</span>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </section>

        {/* Gift Cards Banner */}
        <section className="relative overflow-hidden bg-primary py-16">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 1200 400" fill="none">
              <circle cx="1100" cy="100" r="250" fill="white" fillOpacity="0.15"/>
              <circle cx="100" cy="350" r="180" fill="white" fillOpacity="0.1"/>
            </svg>
          </div>
          <SectionReveal className="relative mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1 mb-4">
                <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                <span className="text-xs font-semibold text-accent tracking-wider uppercase">Gift of Travel</span>
              </div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Premium Gift Cards</h2>
              <p className="mt-3 text-white/80 max-w-md">Give the gift of luxury travel. Three exclusive tiers — Silver, Gold & Black — crafted for every occasion.</p>
              <Link href="/gift-cards" className="mt-6 inline-block">
                <Button variant="accent" size="lg" className="text-primary font-semibold">
                  Explore Gift Cards
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Button>
              </Link>
            </div>
            <div className="relative w-72 h-44">
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 shadow-2xl p-5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">Easyflynstay</p>
                    <p className="font-heading text-xl font-bold text-black/80">Gold</p>
                  </div>
                  <svg className="h-6 w-6 text-black/30" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                </div>
                <div>
                  <p className="text-[9px] text-black/30">Gift Card Value</p>
                  <p className="font-heading text-lg font-bold text-black/70">$500 – $2,500</p>
                </div>
              </motion.div>
            </div>
          </SectionReveal>
        </section>

        {/* CTA */}
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
            <p className="mt-4 text-white/90 text-lg">Get the best fares on business and first class with Easyflynstay. Track your booking anytime.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking">
                <Button variant="accent" size="lg" className="text-primary font-semibold shadow-lg">Search Flights</Button>
              </Link>
              <Link href="/track-booking">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">Track Booking</Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
