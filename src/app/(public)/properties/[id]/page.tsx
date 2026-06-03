import { getPropertyById } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Derive some display data
  const completionDate = property.status === "Ready to Move" ? "Completed" : "Q4 2026";
  const constructionPct = property.status === "Ready to Move" ? 100 : property.status === "Resale" ? 85 : 40;
  const structure = property.type === "Penthouse" ? "Tower" : property.type === "Villa" ? "Villa Complex" : property.type === "Plot" ? "Land" : property.type;
  const siteArea = `${(property.sqft * 0.8).toLocaleString()} m²`;

  return (
    <div className="w-full min-h-screen bg-[#faf2ea]">
      
      {/* ───────────────── MOBILE VIEW (lg:hidden) ───────────────── */}
      <div className="lg:hidden px-5 pt-6 pb-16 flex flex-col w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/properties"
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors gap-2"
          >
            <ArrowLeft size={12} /> Back to Collection
          </Link>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="font-sans text-4xl font-bold tracking-tight text-black leading-[1.05] uppercase">
            {property.title}
          </h1>
          <p className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] mt-2">
            {property.type} / Premium / {property.vastuCompliant ? "Vastu" : "Urban"}
          </p>
        </div>

        {/* Image Container with Badges */}
        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] w-full shadow-sm bg-gray-100">
          <img
            src={property.image}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlaid Badges */}
          <div className="absolute bottom-5 left-5 flex gap-2">
            <span className="bg-black text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
              {property.type.toUpperCase()} CREST
            </span>
            <span className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm">
              {property.status}
            </span>
          </div>
        </div>

        {/* White Card Overlay details */}
        <div className="bg-white rounded-[2rem] p-6 mt-6 shadow-sm border border-white/80 flex flex-col gap-5">
          <div>
            <h2 className="font-sans text-lg font-bold text-black uppercase tracking-tight">
              {property.title}™
            </h2>
            <p className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
              {property.beds} Bed {property.type}s / Penthouses
            </p>
          </div>

          {/* Orange Price Range Badge */}
          <div className="bg-[#ff5500] rounded-2xl p-4 text-white flex flex-col gap-1 shadow-sm">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] opacity-90">Price Range</span>
            <span className="font-sans text-xl font-bold tracking-tight">
              {formatCurrency(property.price)} — {formatCurrency(property.price * 1.3)}
            </span>
          </div>

          {/* Completion row */}
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1.5">
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400">Completion date</span>
              <span className="font-sans text-sm font-bold text-black">{completionDate}</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1.5">
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400">Status</span>
              <span className="font-sans text-sm font-bold text-black">Active Listing</span>
            </div>
          </div>
        </div>

        {/* Location overlay */}
        <div className="bg-white rounded-[2rem] p-6 mt-4 shadow-sm border border-white/80 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#ff6b00] shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400 block">Location</span>
              <span className="font-sans text-xs font-semibold text-black leading-tight block mt-0.5">{property.location}</span>
            </div>
          </div>
        </div>

        {/* Description & specs below the white card */}
        <div className="bg-white rounded-[2rem] p-6 mt-4 shadow-sm border border-white/80 flex flex-col gap-6">
          <div>
            <h3 className="font-sans text-sm font-bold text-black uppercase tracking-wider mb-2">About this Property</h3>
            <p className="font-sans text-xs text-gray-500 leading-relaxed font-medium">
              {property.description}
            </p>
          </div>

          {/* Core Specs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col">
              <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Bedrooms</span>
              <span className="font-sans text-lg font-bold text-black">{property.beds}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col">
              <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Bathrooms</span>
              <span className="font-sans text-lg font-bold text-black">{property.baths}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col">
              <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Area</span>
              <span className="font-sans text-lg font-bold text-black">{property.sqft.toLocaleString()} ft²</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col">
              <span className="font-sans text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Vastu</span>
              <span className="font-sans text-lg font-bold text-black">{property.vastuCompliant ? "Yes" : "No"}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button className="bg-black text-white py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-colors shadow-sm">
              Schedule Viewing
            </button>
            <button className="bg-gray-50 text-black py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────── DESKTOP VIEW (hidden lg:block) ───────────────── */}
      <div className="hidden lg:block px-12 pt-6 pb-20 max-w-[1600px] mx-auto bg-[#e0ecf5] min-h-screen">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/properties"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors gap-2"
          >
            <ArrowLeft size={14} /> Back to Collection
          </Link>
        </div>

        {/* Main Grid: Image Left + Info Right */}
        <div className="flex flex-row gap-8">
          
          {/* LEFT COLUMN: Title + Image */}
          <div className="w-[58%] flex flex-col">
            {/* Title Block */}
            <div className="mb-6">
              <h1 className="font-sans text-5xl md:text-6xl lg:text-[5rem] font-medium text-black leading-[0.92] tracking-tighter uppercase mb-4">
                {property.title.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
              <p className="font-sans text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                {property.type} / Premium / {property.vastuCompliant ? "Vastu" : "Urban"}
              </p>
            </div>

            {/* Image Block with Location Overlay */}
            <div className="relative rounded-3xl overflow-hidden flex-1 min-h-[450px]">
              <img
                src={property.image}
                alt={property.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Location Card Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 max-w-xs shadow-lg">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Location</span>
                <p className="font-sans text-sm font-semibold text-black flex items-start gap-1.5">
                  <MapPin size={14} className="text-[#ff6b00] mt-0.5 shrink-0" />
                  {property.location}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info Cards */}
          <div className="w-[42%] flex flex-col gap-4">
            
            {/* Top Row: Completion + Status */}
            <div className="bg-white rounded-[1.5rem] p-0 grid grid-cols-2 overflow-hidden shadow-sm">
              <div className="p-6 border-r border-gray-100">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Completion date</span>
                <span className="font-sans text-2xl font-bold text-black">{completionDate}</span>
              </div>
              <div className="p-6">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Status</span>
                <span className="font-sans text-xl font-bold text-black">{property.status}</span>
              </div>
            </div>

            {/* Middle Card: Site Area + Construction + Type + Structure + Developer */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm flex flex-col gap-4">
              {/* Row 1: Site Area + Construction */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Site Area</span>
                  <span className="font-sans text-lg font-bold text-black">{siteArea}</span>
                </div>
                <div className="bg-[#ff6b00] rounded-xl px-5 py-4 text-white">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-90">Construction Stage</span>
                  <span className="font-sans text-2xl font-bold">{constructionPct}%</span>
                </div>
              </div>

              {/* Row 2: Type + Structure */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border-t border-gray-100 pt-4">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Type</span>
                  <span className="font-sans text-base font-bold text-black">{property.type}</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Structure</span>
                  <span className="font-sans text-base font-bold text-black">{structure}</span>
                </div>
              </div>

              {/* Row 3: Developer */}
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Developer</span>
                  <span className="font-sans text-base font-bold text-black uppercase">AGM Group™</span>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                  <span className="font-sans text-lg font-bold text-[#ff6b00]">A</span>
                </div>
              </div>
            </div>

            {/* Bottom Card: Price + Unit Info */}
            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm flex flex-row gap-6">
              {/* Floor Plan Placeholder */}
              <div className="w-2/5 bg-gray-50 rounded-xl p-4 flex items-center justify-center min-h-[140px]">
                <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300">
                  <rect x="5" y="5" width="40" height="70" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="55" y="5" width="40" height="35" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <rect x="55" y="50" width="40" height="25" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="25" y1="5" x2="25" y2="45" stroke="currentColor" strokeWidth="1" />
                  <line x1="5" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="1" />
                  <rect x="10" y="50" width="15" height="20" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="75" cy="22" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Price + Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Starting Price</span>
                  <span className="font-sans text-3xl font-bold text-black">{formatCurrency(property.price)}</span>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                      {property.furnishing} ({property.beds}BR)
                    </span>
                    <span className="font-sans text-base font-bold text-black">{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                      <ArrowLeft size={14} />
                    </button>
                    <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-[2rem] p-12 mt-8 shadow-sm">
          <div className="max-w-3xl mb-16">
            <h2 className="font-sans text-2xl font-bold text-black mb-4 uppercase tracking-tight">About this property</h2>
            <p className="font-sans text-sm text-gray-500 leading-relaxed font-medium">
              {property.description}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-50 rounded-2xl p-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Bedrooms</span>
              <span className="font-sans text-3xl font-bold text-black">{property.beds}</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Bathrooms</span>
              <span className="font-sans text-3xl font-bold text-black">{property.baths}</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Interior Area</span>
              <span className="font-sans text-3xl font-bold text-black">{property.sqft.toLocaleString()}<span className="text-base ml-1 text-gray-400">ft²</span></span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Vastu</span>
              <span className="font-sans text-3xl font-bold text-black">{property.vastuCompliant ? "Yes" : "No"}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-16">
            <h2 className="font-sans text-2xl font-bold text-black mb-6 uppercase tracking-tight">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {property.amenities.map((amenity, i) => (
                <span
                  key={i}
                  className="bg-gray-50 border border-gray-100 text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-row gap-4 max-w-md">
            <button className="bg-black text-white flex-1 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-colors shadow-md">
              Schedule Viewing
            </button>
            <button className="bg-gray-100 text-black flex-1 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
