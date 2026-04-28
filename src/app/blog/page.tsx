"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/section-reveal";

const featuredPost = {
  title: "The Ultimate Guide to Flying Business Class on a Budget",
  excerpt: "Discover insider secrets on how to save up to 70% on premium cabin fares. Our travel experts share their top strategies for booking luxury flights without breaking the bank.",
  image: "https://images.unsplash.com/photo-1540339832862-474599807836?w=1200&h=600&fit=crop",
  date: "Mar 5, 2026",
  category: "Travel Tips",
  readTime: "8 min read",
};

const posts = [
  {
    title: "Top 10 Business Class Lounges Around the World",
    excerpt: "From the Emirates lounge in Dubai to the Qantas First Lounge in Sydney, here are the most luxurious airport lounges.",
    image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=600&h=400&fit=crop",
    date: "Mar 1, 2026",
    category: "Lounges",
    readTime: "6 min read",
  },
  {
    title: "Singapore Airlines vs Emirates: A First Class Comparison",
    excerpt: "We compare the two most popular first class products in the sky. Which airline truly offers the best premium experience?",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&h=400&fit=crop",
    date: "Feb 25, 2026",
    category: "Reviews",
    readTime: "10 min read",
  },
  {
    title: "5 Hidden Gem Destinations for 2026",
    excerpt: "Tired of the usual tourist spots? These under-the-radar destinations offer breathtaking experiences and great value.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    date: "Feb 20, 2026",
    category: "Destinations",
    readTime: "5 min read",
  },
  {
    title: "How to Maximize Your Airline Miles in 2026",
    excerpt: "Strategic tips for earning and redeeming frequent flyer miles to get the most value from your loyalty programs.",
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=400&fit=crop",
    date: "Feb 15, 2026",
    category: "Travel Tips",
    readTime: "7 min read",
  },
  {
    title: "The Best Time to Book International Flights",
    excerpt: "Data-driven insights on when to book for the lowest fares. Timing can save you thousands on premium cabin tickets.",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&h=400&fit=crop",
    date: "Feb 10, 2026",
    category: "Travel Tips",
    readTime: "4 min read",
  },
  {
    title: "Gift Cards: The Perfect Present for Travel Lovers",
    excerpt: "Why an EASYFLYNSTAY gift card is the ideal gift for birthdays, weddings, and holidays. Three premium tiers explained.",
    image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&h=400&fit=crop",
    date: "Feb 5, 2026",
    category: "Promotions",
    readTime: "3 min read",
  },
];

const categories = ["All", "Travel Tips", "Destinations", "Reviews", "Lounges", "Promotions"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-64 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&h=500&fit=crop"
            alt="Travel blog"
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
              <h1 className="font-heading text-4xl font-bold md:text-5xl">Travel Journal</h1>
              <p className="mt-2 text-white/80">Insights, guides, and inspiration from our travel experts.</p>
            </motion.div>
          </div>
        </section>

        {/* Category pills */}
        <section className="border-b border-border bg-white py-4 sticky top-[140px] z-30">
          <div className="mx-auto max-w-7xl px-4 flex gap-2 overflow-x-auto">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 px-4 py-2 text-sm font-medium transition-colors ${i === 0 ? "bg-primary text-white" : "border border-border text-muted-foreground hover:bg-muted"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Featured post */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <SectionReveal>
              <Link href="#" className="group block">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-accent px-3 py-1 text-xs font-bold text-primary">FEATURED</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="border border-accent/50 bg-accent/5 px-2 py-0.5 font-semibold text-accent">{featuredPost.category}</span>
                      <span>{featuredPost.date}</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <h2 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{featuredPost.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Read article
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          </div>
        </section>

        {/* Post grid */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-8">Latest Articles</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <motion.div key={post.title} variants={itemVariants}>
                  <Link href="#" className="group block h-full">
                    <motion.div whileHover={{ y: -5 }} className="flex h-full flex-col overflow-hidden border border-border bg-white shadow-card transition-shadow hover:shadow-card-hover">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">{post.category}</div>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{post.date}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{post.title}</h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                          Read more
                          <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
