"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionReveal } from "@/components/ui/section-reveal";
import { DISPLAY_PHONE, OFFICES, SUPPORT_EMAIL, TEL_HREF } from "@/lib/contact-info";
import { filterDigitsOnly } from "@/lib/input-filters";

const CONTACT_PHONE_DIGIT_MAX = 15;

const contactInfo = [
  {
    title: "Phone",
    value: DISPLAY_PHONE,
    desc: "Mon - Sun, 24/7",
    href: TEL_HREF,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    ),
  },
  {
    title: "Email",
    value: SUPPORT_EMAIL,
    desc: "We reply within 2 hours",
    href: `mailto:${SUPPORT_EMAIL}`,
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    ),
  },
];

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError(
        "Contact form is not configured. Add NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to the frontend .env.local, then restart the dev server (or rebuild and redeploy for production)."
      );
      return;
    }
    setError(null);
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${firstName.trim()} ${lastName.trim()}`.trim() || "Contact form",
          from_email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setError((err as Error).message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-64 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1920&h=400&fit=crop"
            alt="Customer service"
            fill
            className="object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-white"
            >
              <h1 className="font-heading text-4xl font-bold">Get in Touch</h1>
              <p className="mt-2 text-white/80">We&apos;re here to help with your travel needs.</p>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact info */}
            <SectionReveal>
              <h2 className="font-heading text-2xl font-semibold text-foreground">Contact Information</h2>
              <p className="mt-2 text-muted-foreground">Reach out to our team anytime. We&apos;re available 24/7.</p>
              <div className="mt-8 space-y-6">
                {contactInfo.map((c) => (
                  <motion.div key={c.title} whileHover={{ x: 5 }} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10 text-accent">
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold">{c.title}</h3>
                      <p className="text-foreground">
                        {"href" in c && c.href ? (
                          <a href={c.href} className="text-accent underline-offset-4 hover:underline">
                            {c.value}
                          </a>
                        ) : (
                          c.value
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.desc}</p>
                    </div>
                  </motion.div>
                ))}
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent/10 text-accent">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Offices</h3>
                    <ul className="mt-1 list-decimal space-y-2 pl-5 text-sm text-foreground">
                      {OFFICES.map((o) => (
                        <li key={o.title}>
                          <span className="font-medium">{o.title}: </span>
                          {o.lines}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground mt-1">Visit us by appointment</p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-8 relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=250&fit=crop"
                  alt="Office"
                  fill
                  className="object-cover"
                />
              </div>
            </SectionReveal>

            {/* Form */}
            <SectionReveal>
              <Card className="border-2 overflow-hidden">
                <CardHeader className="bg-primary text-white">
                  <h2 className="font-heading text-lg font-semibold">Send us a message</h2>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  {sent && (
                    <div className="rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-3 text-sm">
                      Thank you! Your message has been sent. We&apos;ll get back to you soon.
                    </div>
                  )}
                  {error && (
                    <div className="rounded-lg bg-red-50 text-red-700 border border-red-200 px-4 py-3 text-sm">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label htmlFor="contact-first">First name</Label><Input id="contact-first" className="mt-1" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
                      <div><Label htmlFor="contact-last">Last name</Label><Input id="contact-last" className="mt-1" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
                    </div>
                    <div><Label htmlFor="contact-email">Email</Label><Input id="contact-email" type="email" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                    <div><Label htmlFor="contact-phone">Phone</Label><Input id="contact-phone" type="tel" inputMode="numeric" className="mt-1" value={phone} onChange={(e) => setPhone(filterDigitsOnly(e.target.value, CONTACT_PHONE_DIGIT_MAX))} /></div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <textarea
                        id="contact-message"
                        className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px] rounded-md"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" variant="accent" className="w-full text-primary" disabled={sending}>
                      {sending ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
