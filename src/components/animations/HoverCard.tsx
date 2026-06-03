"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export function HoverCard({ children, className, scale = 1.02 }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("transition-shadow duration-300 hover:shadow-2xl", className)}
    >
      {children}
    </motion.div>
  );
}
