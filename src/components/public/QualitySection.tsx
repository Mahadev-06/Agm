"use client";

import { motion } from "framer-motion";
import { MorphingBlobBg } from "@/components/animations/MorphingBlob";

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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: cinematicEase },
  },
};

// Custom SVG Icons mimicking the geometric node style
const GridIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 md:mb-12 relative z-10">
    <path d="M12 12H36M12 24H36M12 36H24" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12V36M24 12V36M36 12V24" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="12" r="3" fill="#2C2C2C"/>
    <circle cx="36" cy="12" r="3" fill="#2C2C2C"/>
    <circle cx="12" cy="24" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="24" r="3" fill="#2C2C2C"/>
    <circle cx="36" cy="24" r="3" fill="#2C2C2C"/>
    <circle cx="12" cy="36" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="36" r="3" fill="#2C2C2C"/>
  </svg>
);

const StarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 md:mb-12 relative z-10">
    <path d="M24 8V40M8 24H40M12.686 12.686L35.314 35.314M12.686 35.314L35.314 12.686" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="4" fill="#2C2C2C"/>
    <circle cx="24" cy="8" r="2.5" fill="#2C2C2C"/>
    <circle cx="24" cy="40" r="2.5" fill="#2C2C2C"/>
    <circle cx="8" cy="24" r="2.5" fill="#2C2C2C"/>
    <circle cx="40" cy="24" r="2.5" fill="#2C2C2C"/>
    <circle cx="12.686" cy="12.686" r="2.5" fill="#2C2C2C"/>
    <circle cx="35.314" cy="35.314" r="2.5" fill="#2C2C2C"/>
    <circle cx="12.686" cy="35.314" r="2.5" fill="#2C2C2C"/>
    <circle cx="35.314" cy="12.686" r="2.5" fill="#2C2C2C"/>
  </svg>
);

const PathIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 md:mb-12 relative z-10">
    <path d="M12 14H36V24H12V34H36" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="14" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="14" r="3" fill="#2C2C2C"/>
    <circle cx="36" cy="14" r="3" fill="#2C2C2C"/>
    <circle cx="12" cy="24" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="24" r="3" fill="#2C2C2C"/>
    <circle cx="36" cy="24" r="3" fill="#2C2C2C"/>
    <circle cx="12" cy="34" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="34" r="3" fill="#2C2C2C"/>
    <circle cx="36" cy="34" r="3" fill="#2C2C2C"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 md:mb-12 relative z-10">
    <path d="M24 10L36 22L24 34L12 22Z" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 16L30 28M18 28L30 16" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="10" r="3" fill="#2C2C2C"/>
    <circle cx="36" cy="22" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="34" r="3" fill="#2C2C2C"/>
    <circle cx="12" cy="22" r="3" fill="#2C2C2C"/>
    <circle cx="24" cy="22" r="3" fill="#2C2C2C"/>
    <circle cx="18" cy="16" r="2.5" fill="#2C2C2C"/>
    <circle cx="30" cy="16" r="2.5" fill="#2C2C2C"/>
    <circle cx="18" cy="28" r="2.5" fill="#2C2C2C"/>
    <circle cx="30" cy="28" r="2.5" fill="#2C2C2C"/>
  </svg>
);

type BlobVariant = "organic1" | "organic2" | "organic3" | "organic4";

const cards: {
  title: string;
  description: string;
  bgColor: string;
  blobColor: string;
  blobVariant: BlobVariant;
  icon: React.ReactNode;
}[] = [
  {
    title: "Sustainable living",
    description: "Eco-friendly designs and green technologies that reduce impact and enhance comfort.",
    bgColor: "bg-[#fbf5d4]",
    blobColor: "#f59e0b",
    blobVariant: "organic1",
    icon: <GridIcon />
  },
  {
    title: "Smart investments",
    description: "Maximize returns with properties designed for long-term growth and strong market value.",
    bgColor: "bg-[#e6f0fa]",
    blobColor: "#3b82f6",
    blobVariant: "organic2",
    icon: <StarIcon />
  },
  {
    title: "Connected people",
    description: "Thoughtfully planned neighborhoods that foster interaction, accessibility, and vibrant city life.",
    bgColor: "bg-[#faebe0]",
    blobColor: "#f97316",
    blobVariant: "organic3",
    icon: <PathIcon />
  },
  {
    title: "Premium design",
    description: "Superior construction, innovative architecture, and attention to detail in every project.",
    bgColor: "bg-[#f5eaf0]",
    blobColor: "#a855f7",
    blobVariant: "organic4",
    icon: <DiamondIcon />
  }
];

export function QualitySection() {
  return (
    <section className="px-6 md:px-8 lg:px-16 py-16 md:py-24 w-full max-w-[1600px] mx-auto z-10 relative bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-start md:items-center">
        
        {/* Title */}
        <motion.h2 
          className="font-sans text-4xl md:text-5xl lg:text-6xl font-medium text-black text-left md:text-center mb-12 md:mb-20 max-w-2xl leading-[1.1] tracking-tighter uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: cinematicEase }}
        >
          Where quality meets<br />opportunity
        </motion.h2>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className={`${card.bgColor} rounded-[2rem] p-6 md:p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden group cursor-pointer hover:-translate-y-1`}
            >
              {/* Morphing blob behind the icon */}
              <MorphingBlobBg 
                variant={card.blobVariant} 
                color={card.blobColor} 
                size={180} 
                opacity={0.08} 
                className="-top-10 -right-10 group-hover:scale-125 transition-transform duration-700" 
              />
              
              {card.icon}
              <h3 className="font-sans text-xl font-medium text-black mb-3 relative z-10">{card.title}</h3>
              <p className="font-sans text-xs text-black/60 leading-relaxed font-medium relative z-10">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

