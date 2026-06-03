import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <section className="w-full px-8 lg:px-16 pt-24 pb-16 text-center max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="font-sans text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 block">
            About Us
          </span>
          <h1 className="font-sans text-5xl md:text-7xl font-medium text-black mb-8 leading-[1.1] tracking-tighter uppercase">
            Redefining Modern Luxury
          </h1>
          <p className="font-sans text-lg text-gray-500 font-medium">
            AGM Housing is a boutique real estate advisory firm specializing in architecturally significant properties and exclusive developments across the globe.
          </p>
        </ScrollReveal>
      </section>

      {/* Content Cards */}
      <section className="w-full px-8 lg:px-16 pb-32 max-w-6xl mx-auto flex flex-col gap-8">
        
        <ScrollReveal delay={0.2}>
          <div className="bg-[#f5f5f5] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="font-sans text-3xl font-medium text-black uppercase tracking-tight mb-6">The Curated Approach</h2>
              <p className="font-sans text-sm text-gray-600 mb-6 font-medium leading-relaxed">
                We believe that exceptional real estate is about more than just transactions; it's about curating a lifestyle. Our portfolio is meticulously selected to represent only the pinnacle of design, location, and amenity.
              </p>
              <p className="font-sans text-sm text-gray-600 font-medium leading-relaxed">
                Every property we represent has been vetted by our team of architectural historians, design experts, and market analysts to ensure it meets our exacting standards.
              </p>
            </div>
            <div className="md:w-1/2 w-full h-80 bg-[#faebe0] rounded-3xl flex items-center justify-center p-8 text-center relative overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2800&auto=format&fit=crop" 
                 alt="Luxury Interior"
                 className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
               <span className="relative z-10 font-sans text-4xl text-white font-medium uppercase tracking-tight">Architecture as Art</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ScrollReveal delay={0.3} className="h-full">
             <div className="bg-[#e6f0fa] rounded-3xl p-10 h-full flex flex-col items-center text-center">
                <span className="block font-sans text-6xl font-bold text-gray-300 mb-6">01</span>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-4">Discretion</h3>
                <p className="font-sans text-xs text-gray-600 font-medium leading-relaxed">Absolute confidentiality and private dealings for our high-net-worth clientele.</p>
             </div>
           </ScrollReveal>

           <ScrollReveal delay={0.4} className="h-full">
             <div className="bg-[#faebe0] rounded-3xl p-10 h-full flex flex-col items-center text-center">
                <span className="block font-sans text-6xl font-bold text-orange-200 mb-6">02</span>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-4">Curation</h3>
                <p className="font-sans text-xs text-gray-600 font-medium leading-relaxed">A hand-picked selection of properties that represent architectural significance.</p>
             </div>
           </ScrollReveal>

           <ScrollReveal delay={0.5} className="h-full">
             <div className="bg-[#f5f5f5] rounded-3xl p-10 h-full flex flex-col items-center text-center">
                <span className="block font-sans text-6xl font-bold text-gray-300 mb-6">03</span>
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-4">Expertise</h3>
                <p className="font-sans text-xs text-gray-600 font-medium leading-relaxed">Deep market knowledge backed by data and exclusive global networks.</p>
             </div>
           </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
