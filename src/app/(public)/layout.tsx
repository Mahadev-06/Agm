import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ambient-bg flex flex-col items-center pt-0 pb-0 px-0 md:pt-8 md:pb-12 md:px-8">
      <SmoothScroll />
      {/* Central Container: Edge-to-edge on mobile, floating container on desktop */}
      <div className="w-full max-w-[1600px] bg-white rounded-none md:rounded-[3rem] shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.03)] border-none md:border md:border-white/80 flex flex-col min-h-screen md:min-h-[90vh] relative">
        <Navbar />
        <main className="flex-grow rounded-none md:rounded-[3rem] overflow-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
