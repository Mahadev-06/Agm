"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CTASection() {
  return (
    <section className="px-8 lg:px-16 py-24 w-full max-w-[1600px] mx-auto z-10 relative">
      <div className="relative w-full max-w-7xl mx-auto h-[500px] md:h-[600px]">
        
        {/* Top Edge Cutouts (Placed outside overflow-hidden to prevent anti-alias bleeding) */}
        <div className="absolute -top-[3px] left-[5%] w-20 h-10 md:-top-[4px] md:left-[10%] md:w-48 md:h-18 bg-white rounded-b-xl md:rounded-b-[2rem] z-20"></div>
        <div className="absolute -top-[3px] left-[50%] -translate-x-1/2 w-16 h-10 md:-top-[4px] md:w-24 md:h-18 bg-white rounded-b-xl md:rounded-b-[2rem] z-20"></div>
        <div className="absolute -top-[3px] right-[5%] w-16 h-10 md:-top-[4px] md:right-[10%] md:w-32 md:h-18 bg-white rounded-b-xl md:rounded-b-[2rem] z-20"></div>

        {/* Bottom Edge Cutouts */}
        <div className="absolute -bottom-[3px] left-[5%] w-16 h-12 md:-bottom-[4px] md:left-[15%] md:w-32 md:h-22 bg-white rounded-t-xl md:rounded-t-[2rem] z-20"></div>
        <div className="absolute -bottom-[3px] left-[35%] w-28 h-10 md:-bottom-[4px] md:left-[40%] md:w-64 md:h-18 bg-white rounded-t-xl md:rounded-t-[2rem] z-20"></div>
        <div className="absolute -bottom-[3px] right-[10%] w-12 h-14 md:-bottom-[4px] md:right-[20%] md:w-24 md:h-26 bg-white rounded-t-xl md:rounded-t-[2rem] z-20"></div>

        <motion.div 
          className="w-full h-full bg-white rounded-[3rem] overflow-hidden group shadow-sm flex flex-col items-center justify-start pt-20 md:pt-32 relative z-10"
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: cinematicEase }}
        >
          {/* Background Image */}
          <motion.img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2800&auto=format&fit=crop" 
            alt="Modern Architecture" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: cinematicEase }}
          />
          
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-black/10 z-0"></div>

          {/* Content */}
          <div className="relative z-20 text-center px-4">
            <motion.h2 
              className="font-sans text-4xl md:text-5xl lg:text-[5rem] font-medium text-white tracking-tighter uppercase leading-[1.1] mb-8 drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.2 }}
            >
              Invest in spaces<br />that matter
            </motion.h2>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: cinematicEase, delay: 0.4 }}
            >
              <Link href="/contact" className="px-8 py-3 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm text-white font-sans text-xs font-bold tracking-widest hover:bg-white/20 hover:border-white active:scale-[0.98] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] uppercase shadow-lg inline-block">
                Book a call
              </Link>
              <Link href="/contact" className="px-10 py-3 rounded-full bg-white text-gray-900 font-sans text-xs font-bold tracking-widest hover:bg-gray-100 active:scale-[0.98] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg shadow-black/10 uppercase inline-block">
                Invest
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
