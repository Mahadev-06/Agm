export default function CustomRequestPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full px-8 lg:px-16 pt-24 pb-16 text-center max-w-4xl mx-auto">
        <span className="font-sans text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-6 block">
          Bespoke Service
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-light text-primary mb-8 leading-[1.1] tracking-tight">
          Commission a Search.
        </h1>
        <p className="font-sans text-lg text-gray-500 font-light">
          Cannot find exactly what you are looking for? Detail your requirements and our acquisitions team will locate off-market opportunities.
        </p>
      </section>

      <section className="w-full px-8 lg:px-16 pb-32 max-w-3xl mx-auto">
         <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/30 p-10 md:p-16 border border-gray-100">
            <form className="space-y-8">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Target Locations</label>
                <input type="text" placeholder="e.g. Mayfair, Palm Jumeirah, Beverly Hills" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 text-sm font-sans focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/10 focus:border-[#ff6b00]/30 outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm focus:shadow-md" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Property Type</label>
                  <select className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 text-sm font-sans focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/10 focus:border-[#ff6b00]/30 outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-primary appearance-none shadow-sm focus:shadow-md cursor-pointer">
                    <option>Penthouse</option>
                    <option>Villa / Estate</option>
                    <option>Urban Apartment</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Budget Range</label>
                  <select className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 text-sm font-sans focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/10 focus:border-[#ff6b00]/30 outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] text-primary appearance-none shadow-sm focus:shadow-md cursor-pointer">
                    <option>$2M - $5M</option>
                    <option>$5M - $10M</option>
                    <option>$10M - $25M</option>
                    <option>$25M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Specific Requirements</label>
                <textarea rows={5} placeholder="Describe any mandatory features, architectural styles, or amenities..." className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-5 text-sm font-sans focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/10 focus:border-[#ff6b00]/30 outline-none transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm focus:shadow-md"></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100">
                 <button type="button" className="bg-[#1a1a1a] text-white w-full py-5 rounded-full font-sans text-sm font-bold uppercase tracking-widest hover:bg-[#ff6b00] active:scale-[0.98] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-lg hover:shadow-[#ff6b00]/10 cursor-pointer">
                    Initiate Search
                 </button>
                 <p className="text-center font-sans text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                   A senior advisor will contact you within 24 hours.
                 </p>
              </div>
            </form>
         </div>
      </section>
    </div>
  );
}
