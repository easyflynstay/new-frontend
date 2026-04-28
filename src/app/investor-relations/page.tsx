"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/section-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navAnchors = [
  { id: "overview", label: "Overview" },
  { id: "market", label: "Market" },
  { id: "model", label: "Business model" },
  { id: "traction", label: "Highlights" },
  { id: "governance", label: "Governance" },
  { id: "contact-ir", label: "Contact IR" },
];

const snapshotRows = [
  { label: "Legal name", value: "Easyflynstay (brand)" },
  { label: "Headquarters", value: "Bengaluru, Karnataka, India" },
  { label: "Founded", value: "2014 (5+ years scaled operations)" },
  { label: "Sector", value: "Premium travel & concierge flight retail" },
  { label: "Service footprint", value: "Global routes; India & international clientele" },
  { label: "Support", value: "24/7 concierge & booking operations" },
];

const milestones = [
  { year: "2014", text: "Founded with a focus on transparent, high-touch premium cabin bookings." },
  { year: "Growth", text: "Expanded supplier relationships and unpublished fare access across major carriers." },
  { year: "Today", text: "Full-stack booking, changes, and after-sales support with dedicated travel managers." },
];

const differentiators = [
  {
    title: "Unpublished & negotiated fares",
    desc: "Access to privately negotiated business and first class pricing not available on public OTAs.",
  },
  {
    title: "Human-led concierge",
    desc: "Travel managers and 24/7 support for complex itineraries, changes, and premium traveler expectations.",
  },
  {
    title: "Trust & compliance posture",
    desc: "Clear terms, privacy, and refund policies; secure payment flows aligned with customer protection.",
  },
];

export default function InvestorRelationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative min-h-[320px] overflow-hidden sm:min-h-[380px]">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=640&fit=crop&q=85"
            alt="Modern city skyline representing growth and global connectivity"
            fill
            priority
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex min-h-[320px] flex-col items-center justify-center px-4 py-16 text-center text-white sm:min-h-[380px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Easyflynstay</p>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Investor relations
              </h1>
              <p className="mt-4 text-base text-white/85 md:text-lg text-balance">
                Welcome. This page is the primary destination for partners and investors who connect with us via QR or
                direct outreach—company snapshot, strategy, and how to reach our team.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="sticky top-[52px] z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav aria-label="On this page" className="flex gap-2 overflow-x-auto pb-1 text-sm scrollbar-thin">
              {navAnchors.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  className="shrink-0 rounded-none border border-border bg-secondary/80 px-3 py-1.5 text-primary transition-colors hover:border-accent hover:bg-accent/10"
                >
                  {a.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <section id="overview" className="scroll-mt-28 border-b border-border py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Company overview</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                Easyflynstay is a premium travel retailer specializing in business and first class air travel. We combine
                proprietary fare sourcing, long-standing airline and consolidator relationships, and high-touch service to
                deliver value and reliability for discerning travelers and corporate buyers.
              </p>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                Our operating hub in Bengaluru anchors product, partnerships, and customer operations while we serve
                clients globally—reflecting both India&apos;s outbound premium travel growth and worldwide demand for
                better premium cabin pricing and support.
              </p>
            </SectionReveal>

            <SectionReveal className="mt-10">
              <h3 className="font-heading text-lg font-semibold text-foreground">At a glance</h3>
              <div className="mt-4 overflow-hidden border border-border bg-card card-sharp">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {snapshotRows.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "bg-muted/40" : "bg-background"}>
                        <th scope="row" className="w-[40%] max-w-[200px] border-b border-border px-4 py-3 font-medium text-foreground">
                          {row.label}
                        </th>
                        <td className="border-b border-border px-4 py-3 text-muted-foreground">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionReveal>

            <SectionReveal className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { k: "Mission", v: "Make premium travel more accessible through expert sourcing, transparent pricing, and relentless customer care." },
                { k: "Vision", v: "Become a trusted global name for business and first class bookings—known for fares, service, and integrity." },
                { k: "Values", v: "Transparency, operational excellence, and long-term trust with travelers, suppliers, and capital partners." },
              ].map((item) => (
                <div key={item.k} className="border border-border bg-muted/20 p-5 card-sharp">
                  <p className="font-heading text-sm font-semibold uppercase tracking-wide text-accent">{item.k}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.v}</p>
                </div>
              ))}
            </SectionReveal>
          </div>
        </section>

        <section id="market" className="scroll-mt-28 border-b border-border bg-secondary/40 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Market opportunity</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    Premium cabin demand continues to recover and grow across business travel, relocation, and
                    high-net-worth leisure. Travelers increasingly expect personalized service, flexibility, and pricing
                    that reflects real inventory—not only published retail fares.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    India&apos;s outbound market and global Indian diaspora create strong tailwinds for a specialist
                    retailer with local presence and global route expertise. Consolidation in online travel has also left
                    room for differentiated, service-heavy models in the premium segment.
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Long-term shift toward premium cabins on key corporate and long-haul routes.",
                    "Fragmented supply of true unpublished fares vs. commoditized economy OTA experiences.",
                    "Regulatory and consumer expectations favor clear refund, privacy, and support standards.",
                    "Technology + human concierge as a defensible hybrid—not pure self-serve, not pure offline agency.",
                  ].map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="model" className="scroll-mt-28 border-b border-border py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Business model</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                We earn revenue primarily from premium flight bookings and related services. Our model pairs margin from
                differentiated inventory with service fees or markups that reflect the value of sourcing, ticketing, and
                ongoing trip support. Ancillary lines—such as gift cards and corporate programs—extend brand reach and
                customer lifetime value.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Sourcing", body: "Airline, consolidator, and partner contracts; continuous fare intelligence." },
                  { title: "Sales & service", body: "Consultative selling, 24/7 concierge, changes, and post-ticketing care." },
                  { title: "Technology", body: "Booking flows, customer accounts, and operational tooling for scale." },
                  { title: "Brand & trust", body: "Premium positioning, reviews, and policy transparency to reduce friction." },
                ].map((card) => (
                  <div key={card.title} className="border border-border bg-card p-5 card-sharp">
                    <h3 className="font-heading text-base font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="traction" className="scroll-mt-28 border-b border-border bg-primary py-14 text-primary-foreground sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">Operational highlights</h2>
              <p className="mt-3 max-w-3xl text-sm text-white/80 leading-relaxed">
                The figures below reflect public-facing brand positioning and operational scope. For diligence, we
                provide additional detail under appropriate confidentiality.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "5+", label: "Years in market" },
                  { value: "50K+", label: "Travelers served (brand)" },
                  { value: "500+", label: "Destinations covered" },
                  { value: "24/7", label: "Concierge coverage" },
                ].map((s) => (
                  <div key={s.label} className="border border-white/20 bg-white/5 p-5 text-center">
                    <p className="font-heading text-2xl font-bold text-accent md:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 border-t border-white/20 pt-10">
                <h3 className="font-heading text-lg font-semibold">Milestones</h3>
                <ul className="mt-6 space-y-6">
                  {milestones.map((m) => (
                    <li key={m.year + m.text} className="flex gap-4 text-sm text-white/85">
                      <span className="shrink-0 font-heading font-semibold text-accent">{m.year}</span>
                      <span className="leading-relaxed">{m.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="border-b border-border py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Competitive strengths</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {differentiators.map((d) => (
                  <motion.div
                    key={d.title}
                    whileHover={{ y: -4 }}
                    className="border border-border bg-muted/20 p-6 card-sharp"
                  >
                    <h3 className="font-heading text-lg font-semibold text-foreground">{d.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="governance" className="scroll-mt-28 border-b border-border bg-secondary/40 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Governance, policies & disclosures</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                We maintain published policies for terms of use, privacy, and refunds so customers and partners understand
                how we operate. Investors reviewing this page should note that unless stated otherwise, information here is
                descriptive and not an offer to sell or a solicitation to buy any security.
              </p>
              <div className="mt-8 rounded-none border border-amber-200/80 bg-amber-50/90 p-5 text-sm text-foreground">
                <p className="font-medium">Forward-looking statements</p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Statements about market opportunity, growth, and strategy involve risks and uncertainties. Actual results
                  may differ. We undertake no obligation to update this page except as we deem appropriate for our
                  business and regulatory context.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/terms" className={cn(buttonVariants({ variant: "outline" }))}>
                  Terms &amp; conditions
                </Link>
                <Link href="/privacy" className={cn(buttonVariants({ variant: "outline" }))}>
                  Privacy policy
                </Link>
                <Link href="/refund-cancellation" className={cn(buttonVariants({ variant: "outline" }))}>
                  Refund &amp; cancellation
                </Link>
                <Link href="/about" className={cn(buttonVariants({ variant: "outline" }))}>
                  About the company
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section id="contact-ir" className="scroll-mt-28 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Contact investor relations</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  For investment, strategic partnership, media, or diligence requests, please reach out with your
                  organization, context, and preferred timeline. We route qualified inquiries to the appropriate
                  leadership and respond as promptly as volume allows.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li>
                    <span className="text-muted-foreground">Email: </span>
                    <a
                      href="mailto:support@easyflynstay.com?subject=Investor%20relations%20inquiry"
                      className="font-medium text-accent underline-offset-4 hover:underline"
                    >
                      support@easyflynstay.com
                    </a>
                    <span className="text-muted-foreground"> (subject: Investor relations inquiry)</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Phone: </span>
                    <a href="tel:+917090005700" className="font-medium text-accent underline-offset-4 hover:underline">
                      +91 7090005700
                    </a>
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    Registered office: Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield,
                    Bengaluru, Karnataka 560066, India
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "accent" }), "mt-8")}
                >
                  Use the contact form
                </Link>
              </div>
              <div className="relative h-64 overflow-hidden border border-border md:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=500&fit=crop&q=85"
                  alt="Professional meeting and partnership"
                  fill
                  className="object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
