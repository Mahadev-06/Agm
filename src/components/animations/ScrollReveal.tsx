"use client";

import { motion } from "framer-motion";
import { ReactNode, memo } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ScrollReveal = memo(function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      style={{ willChange: "opacity, transform" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        ease: cinematicEase,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
});
