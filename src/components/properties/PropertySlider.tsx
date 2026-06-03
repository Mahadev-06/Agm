"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Property } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

interface PropertySliderProps {
  properties: Property[];
}

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const textLineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.77, 0, 0.175, 1] as const,
      delay: 0.2 + i * 0.1,
    },
  }),
  exit: {
    y: "-80%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.77, 0, 0.175, 1] as const },
  },
};

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PropertySlider({ properties }: PropertySliderProps) {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setProgress(0);
      progressRef.current = 0;
      const nextIndex =
        (currentIndex + newDirection + properties.length) % properties.length;
      setSlide([nextIndex, newDirection]);
    },
    [currentIndex, properties.length, isAnimating]
  );

  // Auto-play with requestAnimationFrame for smooth progress
  useEffect(() => {
    if (isHovered || isAnimating) {
      lastTimeRef.current = 0;
      return;
    }

    const tick = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      progressRef.current += delta;
      const pct = Math.min(progressRef.current / AUTOPLAY_INTERVAL, 1);
      setProgress(pct);

      if (pct >= 1) {
        // Auto advance
        progressRef.current = 0;
        setProgress(0);
        setIsAnimating(true);
        const nextIndex = (currentIndex + 1) % properties.length;
        setSlide([nextIndex, 1]);
        return; // stop this loop, next effect cycle will restart
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered, isAnimating, currentIndex, properties.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  const property = properties[currentIndex];

  // Split title for editorial effect
  const titleWords = property.title.split(" ");
  const firstLine = titleWords
    .slice(0, Math.ceil(titleWords.length / 2))
    .join(" ");
  const secondLine = titleWords
    .slice(Math.ceil(titleWords.length / 2))
    .join(" ");

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        lastTimeRef.current = 0;
      }}
    >
      {/* Slide Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] will-change-transform">
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: cinematicEase }}
            className="will-change-transform"
          >
            <Link
              href={`/properties/${property.id}`}
              className="block w-full group"
            >
              <div className="relative bg-[#f0ece4] rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 min-h-[480px] md:min-h-[520px] lg:min-h-[580px]">
                {/* Left Side: Editorial Typography & Image */}
                <div className="lg:w-[55%] flex flex-col justify-between relative z-10">
                  {/* Title Block */}
                  <div className="mb-4 md:mb-6">
                    <h2 className="font-sans text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium text-black leading-[0.95] tracking-tighter uppercase mb-3 md:mb-4">
                      <AnimatePresence mode="wait">
                        <motion.span key={`title-${currentIndex}`}>
                          <span className="block overflow-hidden">
                            <motion.span
                              className="block will-change-transform"
                              variants={textLineVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              custom={0}
                            >
                              {firstLine}
                            </motion.span>
                          </span>
                          {secondLine && (
                            <span className="block overflow-hidden">
                              <motion.span
                                className="block will-change-transform"
                                variants={textLineVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                custom={1}
                              >
                                {secondLine}
                              </motion.span>
                            </span>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </h2>
                    <motion.p
                      className="font-sans text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      {property.type} / {property.location} / Luxury
                    </motion.p>
                  </div>

                  {/* Image Block */}
                  <motion.div
                    className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden will-change-transform"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: cinematicEase }}
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                </div>

                {/* Right Side: Floating Info Card */}
                <div className="lg:w-[45%] flex items-center justify-center lg:justify-end relative z-20">
                  <motion.div
                    className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] w-full max-w-md transition-transform duration-500 group-hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5, ease: cinematicEase }}
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                      <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm font-sans">
                        {property.location.split(",")[0]}
                      </span>
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest font-sans">
                        {property.beds} Beds
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mb-4 md:mb-8">
                      <h3 className="font-sans text-lg md:text-xl font-bold text-black mb-1.5 md:mb-2 flex items-start uppercase tracking-tight">
                        {property.title.toUpperCase()}
                        <span className="text-[10px] ml-1 mt-0.5 font-sans">
                          ™
                        </span>
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                        {property.baths} Baths / {property.sqft.toLocaleString()}{" "}
                        Sq Ft / Vastu{" "}
                        {property.vastuCompliant ? "Compliant" : "Friendly"}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                      <div className="bg-[#ff6b00] rounded-xl md:rounded-2xl p-4 md:p-5 text-white flex flex-col justify-center">
                        <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 opacity-90">
                          Price Range
                        </span>
                        <span className="font-sans text-base md:text-lg font-bold leading-tight">
                          {formatCurrency(property.price)}
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col justify-center">
                        <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 text-gray-500">
                          Type
                        </span>
                        <span className="font-sans text-xs md:text-sm font-bold text-black">
                          {property.type}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5">
                      <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 block text-gray-500">
                        Status
                      </span>
                      <span className="font-sans text-xs md:text-sm font-bold text-black">
                        {property.status}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {properties.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setProgress(0);
              progressRef.current = 0;
              setSlide([i, i > currentIndex ? 1 : -1]);
            }}
            className={`rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-8 h-2 bg-[#ff6b00]"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
