"use client";

import { motion } from "framer-motion";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: revealEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
