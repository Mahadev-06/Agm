"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const menuTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Estates", href: "/properties" },
    { name: "Philosophy", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "sticky top-0 md:top-2 z-50 transition-all duration-500 w-full md:mx-auto md:w-[calc(100%-2rem)] md:max-w-6xl md:rounded-full md:mt-6",
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 py-4 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.02)] md:border md:border-white/50"
            : "bg-white/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-gray-100/30 md:border-transparent py-4 md:py-6"
        )}
      >
        <div className="flex justify-between items-center px-6 md:px-8 lg:px-16 w-full mx-auto">
          {/* Logo V (mockup style) */}
          <Link
            href="/"
            className="group flex items-center gap-3 font-display font-light text-primary focus:outline-none"
          >
            <div className="font-sans font-black text-2xl tracking-tighter text-black select-none transition-transform group-hover:scale-105">
              A
            </div>
            <div className="hidden md:flex flex-col border-l border-gray-200 pl-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-black">Agm</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-medium text-gray-400">Urban Crest</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/custom-request"
              className="bg-primary text-white px-8 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-md hover:shadow-lg inline-block"
            >
              Bespoke Request
            </Link>
          </div>

          {/* Mobile Menu Toggle: Premium "=" Icon */}
          <button
            className="md:hidden text-primary p-2 focus:outline-none flex flex-col gap-1.5 justify-center items-end w-8 h-8"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <span className="w-6 h-[1.5px] bg-black rounded-full transition-all"></span>
            <span className="w-4 h-[1.5px] bg-black rounded-full transition-all"></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Slide-down Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={menuTransition}
            className="fixed inset-0 z-[60] bg-white flex flex-col justify-between pt-24 px-8 pb-12"
          >
            <div className="flex justify-between items-center absolute top-6 left-6 right-6">
              {/* Logo in Menu */}
              <div className="font-sans font-black text-2xl tracking-tighter text-black">A</div>
              
              {/* Close Button */}
              <button
                className="text-primary p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Links */}
            <motion.div 
              className="flex flex-col space-y-6 mt-16"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={staggerItem}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-4xl font-medium tracking-tight text-black hover:text-secondary transition-colors inline-block uppercase"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div variants={staggerItem} className="pt-6">
                <Link
                  href="/custom-request"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-black text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-colors shadow-md text-center block w-full max-w-sm"
                >
                  Bespoke Request
                </Link>
              </motion.div>
            </motion.div>

            {/* Footer inside mobile menu */}
            <motion.div 
              className="border-t border-gray-100 pt-6 flex flex-col gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400 font-bold">AGM GROUP</p>
              <p className="font-sans text-[11px] text-gray-500 font-medium">Reimagining urban spaces with purpose since Q3 2026.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
