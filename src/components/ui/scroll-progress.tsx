"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-accent shadow-[0_0_12px_rgba(201,162,39,0.45)]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
