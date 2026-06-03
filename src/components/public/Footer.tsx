"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full max-w-[1600px] mx-auto px-4 md:px-8 pb-8 mt-auto z-10 relative bg-white rounded-b-[3rem]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left Column (Image & Orange Arrow) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          {/* Image Block */}
          <div className="bg-[#faebe0] rounded-3xl relative overflow-hidden h-[200px] lg:h-[300px] p-2 flex items-center justify-center">
             <img 
               src="https://images.unsplash.com/photo-1549471013-3364d7220b75?q=80&w=2800&auto=format&fit=crop" 
               alt="Modern Architecture"
               className="w-full h-full object-cover rounded-2xl"
             />
          </div>

          {/* Orange Arrow Block */}
          <div className="relative h-20 md:h-24 w-full flex-shrink-0 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-[#ff6b00] rounded-l-3xl transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                clipPath: "polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)"
              }}
            >
              <div className="flex items-center h-full pl-10 md:pl-12">
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-white tracking-widest uppercase">
                  AGM
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Text, Nav, Socials) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          
          {/* Big Text & Contact */}
          <div className="bg-[#f5f5f5] rounded-3xl flex-grow p-6 md:p-8 flex flex-col justify-between">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-medium text-black leading-[1.1] uppercase tracking-tight max-w-xl">
              We build tomorrow's landscapes today
            </h2>
            
            <div className="mt-8 w-full">
              <Link href="/contact" className="bg-white rounded-full p-2 pl-6 flex items-center justify-between group hover:shadow-md transition-shadow max-w-full">
                <span className="font-sans font-semibold text-sm text-gray-800">Contact us</span>
                <div className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transform transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation & Info */}
          <div className="bg-[#e6f0fa] rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h4 className="font-sans text-xs font-semibold text-gray-800 mb-2">Navigation</h4>
                </div>
                <ul className="space-y-2 font-sans text-xs text-gray-500 font-medium">
                  <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                </ul>
                <ul className="space-y-2 font-sans text-xs text-gray-500 font-medium">
                  <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
                  <li><Link href="/solutions" className="hover:text-primary transition-colors">Solutions</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-sans text-xs font-semibold text-gray-800 mb-2">Info</h4>
                <ul className="space-y-2 font-sans text-xs text-gray-500 font-medium">
                  <li><a href="mailto:info@agmhousing.com" className="hover:text-primary transition-colors">info@agmhousing.com</a></li>
                  <li><a href="tel:+12125558473" className="hover:text-primary transition-colors">+1 (212) 555-8473</a></li>
                </ul>
              </div>

            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#" className="flex-1 bg-[#faebe0] hover:bg-[#f5e0d0] transition-colors rounded-full h-12 flex items-center justify-center font-sans text-xs font-semibold text-gray-800">
              Instagram
            </a>
            <a href="#" className="w-full sm:w-20 bg-[#faebe0] hover:bg-[#f5e0d0] transition-colors rounded-full h-12 flex items-center justify-center font-sans text-base font-bold text-gray-800">
              𝕏
            </a>
            <a href="#" className="flex-1 bg-[#faebe0] hover:bg-[#f5e0d0] transition-colors rounded-full h-12 flex items-center justify-center font-sans text-xs font-semibold text-gray-800">
              Facebook
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
