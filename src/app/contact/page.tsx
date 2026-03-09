"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionReveal } from "@/components/ui/section-reveal";

const contactInfo = [
  {
    title: "Phone",
    value: "888-668-0828",
    desc: "Mon - Sun, 24/7",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    ),
  },
  {
    title: "Email",
    value: "support@easyflynstay.com",
    desc: "We reply within 2 hours",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    ),
  },
  {
    title: "Office",
    value: "New York, NY",
    desc: "Visit us by appointment",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    ),
  },
];

export default function ContactPage() {
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
                      <p className="text-foreground">{c.value}</p>
                      <p className="text-xs text-muted-foreground">{c.desc}</p>
                    </div>
                  </motion.div>
                ))}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>First name</Label><Input className="mt-1" placeholder="John" /></div>
                    <div><Label>Last name</Label><Input className="mt-1" placeholder="Smith" /></div>
                  </div>
                  <div><Label>Email</Label><Input type="email" className="mt-1" placeholder="you@example.com" /></div>
                  <div><Label>Phone</Label><Input type="tel" className="mt-1" placeholder="+1 (555) 000-0000" /></div>
                  <div>
                    <Label>Message</Label>
                    <textarea
                      className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px]"
                      placeholder="Tell us about your travel plans..."
                    />
                  </div>
                  <Button variant="accent" className="w-full text-primary">Send Message</Button>
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
