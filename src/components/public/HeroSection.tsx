"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MorphingBlob } from "@/components/animations/MorphingBlob";

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  return (
    <section className="px-8 lg:px-16 pt-24 md:pt-16 pb-32 flex flex-col w-full max-w-[1600px] mx-auto overflow-hidden relative">
      {/* Ambient morphing blobs */}
      <div className="absolute -top-20 -left-20 z-0 opacity-40">
        <MorphingBlob variant="organic1" color="#ff6b00" size={400} opacity={0.06} autoAnimate />
      </div>
      <div className="absolute top-40 -right-32 z-0 opacity-30">
        <MorphingBlob variant="organic3" color="#3b82f6" size={350} opacity={0.05} autoAnimate />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-12 max-w-7xl mx-auto w-full">
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tighter text-black/90 max-w-3xl leading-[1.1] uppercase flex flex-col">
          <span className="overflow-hidden block">
            <motion.span 
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEase, delay: 0.1 }}
            >
              We build tomorrow's
            </motion.span>
          </span>
          <span className="overflow-hidden block">
            <motion.span 
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }}
            >
              landscapes today
            </motion.span>
          </span>
        </h1>
        <motion.p 
          className="font-sans text-gray-500 max-w-md text-sm md:text-base leading-relaxed pb-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
        >
          AGM transforms urban spaces with precision and vision. We design sustainable developments that connect communities and inspire future living.
        </motion.p>
      </div>

      {/* Large Image Block with Cutouts & Glassmorphism Hotspot */}
      <motion.div 
        className="relative w-full max-w-7xl mx-auto h-[500px] sm:h-[600px] md:h-[700px] bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: cinematicEase, delay: 0.3 }}
      >
         <motion.img 
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2800&auto=format&fit=crop" 
            alt="Architecture" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: cinematicEase, delay: 0.2 }}
         />
         
         {/* Simulate the Top Cutout */}
         <div className="absolute -top-[3px] left-[25%] w-24 h-11 md:-top-[4px] md:left-[30%] md:w-32 md:h-18 bg-white rounded-b-2xl md:rounded-b-[2rem] z-10"></div>
         
         {/* Simulate Left/Right Edge Cutouts */}
         <div className="absolute top-[25%] -left-[6px] w-7 h-12 md:top-[70%] md:-left-[8px] md:w-18 md:h-24 bg-white rounded-r-2xl md:rounded-r-[2rem] z-10"></div>
         <div className="absolute top-[40%] -right-[6px] w-7 h-12 md:top-[70%] md:-right-[8px] md:w-18 md:h-24 bg-white rounded-l-2xl md:rounded-l-[2rem] z-10"></div>

         {/* The Glassmorphism Hotspot */}
         <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[280px] sm:max-w-[320px] z-20 flex flex-col items-center md:bottom-[15%] md:left-[25%] md:translate-x-0 md:w-auto md:max-w-none md:flex-row md:items-center">
            
            {/* Card */}
            <motion.div 
              className="bg-white/15 backdrop-blur-lg border border-white/25 p-4 md:p-5 rounded-2xl md:rounded-3xl w-full md:w-64 shadow-2xl relative order-2 md:order-1 ml-0 md:mr-4 mt-3 md:mt-0 origin-bottom"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: cinematicEase, delay: 1 }}
            >
               <h3 className="text-white font-sans font-bold text-sm mb-1">Orange tower</h3>
               <p className="text-white/80 font-sans text-[10px] leading-relaxed mb-4">
                 The Orange Tower stands as a vibrant architectural landmark...
               </p>
               <button className="w-full bg-white text-primary font-sans text-[10px] font-bold rounded-full py-2.5 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors group/btn">
                  View more
                  <div className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center transform transition-transform group-hover/btn:scale-110">
                    <ArrowRight size={12} />
                  </div>
               </button>
            </motion.div>

            {/* Dot Connector */}
            <motion.div 
              className="relative flex items-center justify-center order-1 md:order-2 ml-0 md:ml-0 md:-mt-16"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: cinematicEase, delay: 0.8 }}
            >
               <motion.div 
                 className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm bg-white/10 shadow-lg"
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               >
                  <div className="w-2.5 h-2.5 bg-white rounded-full shadow-inner"></div>
               </motion.div>
            </motion.div>

         </div>
      </motion.div>
    </section>
  );
}
