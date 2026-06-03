import { fetchFeaturedProperties } from "@/lib/data";
import { PropertySliderWrapper } from "@/components/properties/PropertySliderWrapper";
import { PurposeSection } from "@/components/public/PurposeSection";
import { HeroSection } from "@/components/public/HeroSection";
import { QualitySection } from "@/components/public/QualitySection";
import { CTASection } from "@/components/public/CTASection";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const featuredProperties = await fetchFeaturedProperties();

  return (
    <div className="flex flex-col w-full">
      {/* Animated Hero Section */}
      <HeroSection />

      {/* Purpose Bento Section with Scroll Animations */}
      <PurposeSection />

      {/* Featured Properties Slider */}
      <section className="px-4 md:px-8 lg:px-16 py-16 w-full max-w-[1600px] mx-auto z-10 relative">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="font-sans text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-3 block">
                Portfolio
              </span>
              <h2 className="font-sans text-3xl md:text-5xl font-medium text-black uppercase tracking-tighter">
                Featured Residences
              </h2>
            </div>
            <Link 
              href="/properties"
              className="hidden md:flex items-center gap-2 text-black font-sans text-xs font-bold uppercase tracking-widest hover:text-[#ff6b00] transition-colors"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>

        <PropertySliderWrapper properties={featuredProperties} />
        
        <div className="mt-10 md:hidden flex justify-center">
          <Link 
            href="/properties"
            className="bg-black text-white px-8 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </section>

      {/* Quality Section */}
      <QualitySection />

      {/* Call To Action Section */}
      <CTASection />
    </div>
  );
}

