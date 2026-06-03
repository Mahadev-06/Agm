"use client";

import { motion } from "framer-motion";
import { MorphingBlob, MorphingBlobBg } from "@/components/animations/MorphingBlob";

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

export function PurposeSection() {
  return (
    <section className="px-6 md:px-8 lg:px-16 py-12 md:py-24 w-full max-w-[1600px] mx-auto z-10 relative">
      <motion.div 
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Left Column */}
        <div className="lg:w-5/12 flex flex-col justify-between">
          <motion.div variants={itemVariants}>
            <h2 className="font-sans text-4xl md:text-[3.25rem] font-medium tracking-tight text-black mb-6 leading-[1.05] uppercase">
              Reimagining urban <br/> development with <br/> purpose
            </h2>
            <p className="font-sans text-gray-500 text-sm md:text-base leading-relaxed mb-8 md:mb-12 max-w-sm font-medium">
              AGM creates urban spaces with purpose, combining sustainable design, innovative architecture, and connected communities to enhance living and deliver lasting value.
            </p>
          </motion.div>
          
          {/* 4 Morphing Blob Decorative Shapes - Desktop Only */}
          <motion.div variants={itemVariants} className="hidden md:grid grid-cols-2 gap-3 w-48">
            <motion.div 
              className="w-20 h-20 bg-[#fef6d8] rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer relative group"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MorphingBlobBg variant="organic1" color="#f59e0b" size={90} opacity={0.25} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <motion.div 
              className="w-20 h-20 bg-[#e4efff] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-full flex items-center justify-center overflow-hidden cursor-pointer relative group"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MorphingBlobBg variant="organic2" color="#3b82f6" size={90} opacity={0.25} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <motion.div 
              className="w-20 h-20 bg-[#fceddf] rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer relative group"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MorphingBlobBg variant="organic3" color="#f97316" size={90} opacity={0.25} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
            <motion.div 
              className="w-20 h-20 bg-[#f5eaf0] rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer relative group"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <MorphingBlobBg variant="organic4" color="#a855f7" size={90} opacity={0.25} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column (Bento Grid) */}
        <div className="lg:w-7/12">
          
          {/* ───────────────── MOBILE VIEW BENTO GRID (2 COLUMNS) ───────────────── */}
          <div className="grid grid-cols-2 md:hidden gap-3 w-full">
            {/* Cell 1: Living smart */}
            <motion.div 
              variants={itemVariants} 
              className="bg-[#fef6d8] rounded-[1.5rem] p-4 flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
            >
              <MorphingBlobBg variant="organic1" color="#f59e0b" size={100} opacity={0.15} className="-top-6 -right-6" />
              <div className="w-6 h-6 flex items-center justify-center relative z-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-sans text-sm font-bold text-black mb-0.5 leading-tight">Living smart</h3>
                <p className="font-sans text-[9px] text-gray-600 leading-normal font-medium">
                  Green, energy-efficient buildings for better living.
                </p>
              </div>
            </motion.div>

            {/* Cell 2: Gray Blob 1 */}
            <motion.div 
              variants={itemVariants} 
              className="bg-gray-50 rounded-[1.5rem] rounded-tr-[4.5rem] h-44 flex items-center justify-center relative overflow-hidden"
            >
              <MorphingBlob variant="organic2" color="#cbd5e1" size={120} opacity={0.25} autoAnimate />
            </motion.div>

            {/* Cell 3: Gray Blob 2 */}
            <motion.div 
              variants={itemVariants} 
              className="bg-gray-50 rounded-[1.5rem] rounded-bl-[4.5rem] h-44 flex items-center justify-center relative overflow-hidden"
            >
              <MorphingBlob variant="organic4" color="#cbd5e1" size={120} opacity={0.25} autoAnimate />
            </motion.div>

            {/* Cell 4: Thriving together */}
            <motion.div 
              variants={itemVariants} 
              className="bg-[#e4efff] rounded-[1.5rem] p-4 flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
            >
              <MorphingBlobBg variant="organic3" color="#3b82f6" size={100} opacity={0.12} className="-top-6 -right-6" />
              <div className="w-6 h-6 flex items-center justify-center relative z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M18 20H6"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-sans text-sm font-bold text-black mb-0.5 leading-tight">Thriving together</h3>
                <p className="font-sans text-[9px] text-gray-600 leading-normal font-medium">
                  Neighborhoods designed for interaction and accessibility.
                </p>
              </div>
            </motion.div>

            {/* Cell 5: Iconic innovation */}
            <motion.div 
              variants={itemVariants} 
              className="bg-[#fceddf] rounded-[1.5rem] p-4 flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
            >
              <MorphingBlobBg variant="organic2" color="#f97316" size={100} opacity={0.12} className="-bottom-6 -left-6" />
              <div className="w-6 h-6 flex items-center justify-center relative z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div className="relative z-10">
                <h3 className="font-sans text-sm font-bold text-black mb-0.5 leading-tight">Iconic innovation</h3>
                <p className="font-sans text-[9px] text-gray-600 leading-normal font-medium">
                  Modern, functional, and inspiring architecture.
                </p>
              </div>
            </motion.div>

            {/* Cell 6: Gray Blob 3 */}
            <motion.div 
              variants={itemVariants} 
              className="bg-gray-50 rounded-[1.5rem] rounded-br-[4.5rem] h-44 flex items-center justify-center relative overflow-hidden"
            >
              <MorphingBlob variant="organic1" color="#cbd5e1" size={120} opacity={0.25} autoAnimate />
            </motion.div>
          </div>

          {/* ───────────────── DESKTOP VIEW BENTO GRID ───────────────── */}
          <div className="hidden md:flex flex-col gap-6">
            
            {/* Top Row */}
            <div className="grid grid-cols-2 gap-6 h-64">
              {/* Yellow Card */}
              <motion.div variants={itemVariants} className="bg-[#fef6d8] rounded-[2rem] p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group cursor-pointer">
                <MorphingBlobBg variant="organic1" color="#f59e0b" size={160} opacity={0.12} className="-top-8 -right-8 group-hover:scale-110" />
                <div className="w-10 h-10 flex items-center justify-center mb-0 relative z-10">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="relative z-10">
                  <h3 className="font-sans text-xl font-medium text-black mb-2">Living smart</h3>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed font-medium">
                    Green, energy-efficient buildings for better living.
                  </p>
                </div>
              </motion.div>

              {/* Gray Organic Shape */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-[2rem] rounded-tl-[10rem] h-full w-full flex items-center justify-center relative overflow-hidden">
                <MorphingBlob variant="organic2" color="#d1d5db" size={180} opacity={0.3} autoAnimate />
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-3 gap-6 h-64">
              {/* Blue Card */}
              <motion.div variants={itemVariants} className="bg-[#e4efff] rounded-[2rem] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group cursor-pointer">
                <MorphingBlobBg variant="organic3" color="#3b82f6" size={140} opacity={0.1} className="-top-6 -right-6 group-hover:scale-110" />
                <div className="w-8 h-8 flex items-center justify-center mb-0 relative z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M9 14h6"/><path d="M9 10h6"/><path d="M18 20H6"/></svg>
                </div>
                <div className="relative z-10">
                  <h3 className="font-sans text-lg font-medium text-black mb-2">Thriving together</h3>
                  <p className="font-sans text-[10px] text-gray-600 leading-relaxed font-medium">
                    Neighborhoods designed for interaction and accessibility.
                  </p>
                </div>
              </motion.div>

              {/* Gray Blob Shape */}
              <motion.div variants={itemVariants} className="bg-gray-50 rounded-[2rem] h-full w-full relative overflow-hidden flex items-center justify-center">
                <MorphingBlob variant="organic4" color="#9ca3af" size={150} opacity={0.2} autoAnimate />
              </motion.div>

              {/* Peach Card */}
              <motion.div variants={itemVariants} className="bg-[#fceddf] rounded-[2rem] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group cursor-pointer">
                <MorphingBlobBg variant="organic2" color="#f97316" size={140} opacity={0.1} className="-bottom-6 -left-6 group-hover:scale-110" />
                <div className="w-8 h-8 flex items-center justify-center mb-0 relative z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div className="relative z-10">
                  <h3 className="font-sans text-lg font-medium text-black mb-2">Iconic innovation</h3>
                  <p className="font-sans text-[10px] text-gray-600 leading-relaxed font-medium">
                    Modern, functional, and inspiring architecture.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}

