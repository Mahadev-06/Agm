import { Mail, MapPin, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full px-8 lg:px-16 pt-24 pb-16 text-center max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="font-sans text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-6 block">
            Get in Touch
          </span>
          <h1 className="font-sans text-3xl sm:text-5xl md:text-7xl font-medium text-black mb-8 leading-[1.1] tracking-tighter uppercase">
            Private Consultations
          </h1>
          <p className="font-sans text-lg text-gray-500 font-medium">
            Connect with our advisory team to discuss your real estate portfolio, acquisitions, or to arrange a private viewing.
          </p>
        </ScrollReveal>
      </section>

      <section className="w-full px-8 lg:px-16 pb-32 max-w-6xl mx-auto">
        <ScrollReveal delay={0.2}>
          <div className="bg-white border border-gray-100 shadow-sm rounded-[3rem] overflow-hidden flex flex-col md:flex-row">
            
            {/* Contact Info */}
            <div className="md:w-5/12 bg-[#faebe0] p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <h3 className="font-sans text-2xl sm:text-3xl font-medium text-black uppercase tracking-tight mb-8">Global Offices</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-orange-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2">London (HQ)</h4>
                      <p className="font-sans text-sm text-gray-600 font-medium">45 Park Lane<br/>Mayfair, London<br/>W1K 1PN</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="text-orange-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2">Dubai</h4>
                      <p className="font-sans text-sm text-gray-600 font-medium">Building 4, D3<br/>Dubai Design District<br/>UAE</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 space-y-4">
                <div className="flex items-center gap-4 text-black font-sans text-sm font-bold tracking-wider">
                  <Phone size={16} className="text-orange-500" /> +44 (0) 20 7123 4567
                </div>
                <div className="flex items-center gap-4 text-black font-sans text-sm font-bold tracking-wider">
                  <Mail size={16} className="text-orange-500" /> advisory@agmhousing.com
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-7/12 bg-[#f5f5f5] p-12 lg:p-16">
              <h3 className="font-sans text-2xl font-medium text-black uppercase tracking-tight mb-8">Send an Inquiry</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                    <input type="text" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-sans font-medium focus:ring-2 focus:ring-[#ff6b00]/50 outline-none transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-sans font-medium focus:ring-2 focus:ring-[#ff6b00]/50 outline-none transition-all shadow-sm" />
                  </div>
                </div>
                
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-white border-none rounded-2xl p-4 text-sm font-sans font-medium focus:ring-2 focus:ring-[#ff6b00]/50 outline-none transition-all shadow-sm" />
                </div>
                
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-white border-none rounded-2xl p-4 text-sm font-sans font-medium focus:ring-2 focus:ring-[#ff6b00]/50 outline-none transition-all shadow-sm"></textarea>
                </div>
                
                <button type="button" className="bg-black text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-colors shadow-md mt-4 w-full md:w-auto">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
