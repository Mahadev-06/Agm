"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Property } from "@/lib/data";
import { motion } from "framer-motion";
import { Car, Shield, Waves, Dumbbell, Zap, Video, Home, Leaf, Compass } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

const getAmenityIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "parking": return <Car size={12} className="text-gray-400" />;
    case "security": return <Shield size={12} className="text-gray-400" />;
    case "swimming pool": return <Waves size={12} className="text-gray-400" />;
    case "gym": return <Dumbbell size={12} className="text-gray-400" />;
    case "power backup": return <Zap size={12} className="text-gray-400" />;
    case "cctv": return <Video size={12} className="text-gray-400" />;
    case "clubhouse": return <Home size={12} className="text-gray-400" />;
    case "garden": return <Leaf size={12} className="text-gray-400" />;
    default: return <Compass size={12} className="text-gray-400" />;
  }
};

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PropertyCard({ property }: PropertyCardProps) {
  // Split title for editorial stack effect
  const titleWords = property.title.split(" ");
  const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(" ");
  const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(" ");

  return (
    <Link href={`/properties/${property.id}`} className="block w-full group">
      <motion.div 
        className="relative bg-[#f0ece4] rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 min-h-[480px] md:min-h-[500px] lg:min-h-[540px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: cinematicEase }}
      >
        
        {/* Left Side: Editorial Typography & Image */}
        <div className="lg:w-[55%] flex flex-col justify-between relative z-10">
          <div className="mb-4 md:mb-6">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium text-black leading-[0.95] tracking-tighter uppercase mb-3 md:mb-4">
              {firstLine}<br />
              {secondLine || <>&nbsp;</>}
            </h2>
            <p className="font-sans text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
              {property.type} / {property.location} / Luxury
            </p>
          </div>

          <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-full object-cover object-center transition-transform duration-[1.5s] group-hover:scale-110"
            />
          </div>
        </div>

        {/* Right Side: Floating Info Card */}
        <div className="lg:w-[45%] flex items-center justify-center lg:justify-end relative z-20">
          <div className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] w-full max-w-md transition-transform duration-500 group-hover:-translate-y-1">
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              <span className="bg-white border border-gray-200 text-gray-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm font-sans">
                {property.city}
              </span>
              <span className="bg-gray-100 text-gray-500 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest font-sans">
                {property.bhk} BHK
              </span>
              {property.vastuCompliant && (
                <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest font-sans">
                  Vastu Compliant
                </span>
              )}
            </div>

            {/* Content */}
            <div className="mb-4 md:mb-6">
              <h3 className="font-sans text-lg md:text-xl font-bold text-black mb-1.5 md:mb-2 flex items-start uppercase tracking-tight">
                {property.title.toUpperCase()}
                <span className="text-[10px] ml-1 mt-0.5 font-sans">™</span>
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                {property.baths} Baths / {property.sqft.toLocaleString()} Sq Ft / {property.facing} Facing
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
              <div className="bg-[#ff6b00] rounded-xl md:rounded-2xl p-4 md:p-5 text-white flex flex-col justify-center">
                <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 opacity-90">Price Range</span>
                <span className="font-sans text-base md:text-lg font-bold leading-tight">{formatCurrency(property.price)}</span>
              </div>
              
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col justify-center">
                <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 text-gray-500">Type</span>
                <span className="font-sans text-xs md:text-sm font-bold text-black">{property.type}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 mb-4">
              <span className="font-sans text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 md:mb-1 block text-gray-500">Status</span>
              <span className="font-sans text-xs md:text-sm font-bold text-black">{property.status}</span>
            </div>

            {/* Amenities Preview */}
            <div className="border-t border-gray-100 pt-4">
              <span className="font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-widest block text-gray-400 mb-2">Amenities Preview</span>
              <div className="flex flex-wrap gap-2.5">
                {property.amenities.slice(0, 5).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md text-[9px] text-gray-600 font-medium" title={amenity}>
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {property.amenities.length > 5 && (
                  <div className="bg-gray-50 px-2 py-1 rounded-md text-[8px] text-gray-400 font-bold">
                    +{property.amenities.length - 5} More
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </Link>
  );
}
