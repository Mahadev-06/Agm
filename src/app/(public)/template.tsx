"use client";
import { motion } from "framer-motion";

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ease: cinematicEase, duration: 0.6 }}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}

