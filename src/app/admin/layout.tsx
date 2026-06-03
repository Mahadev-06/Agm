"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, PlusCircle, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Add Property", href: "/admin/properties/new", icon: PlusCircle },
    { name: "View Live Site", href: "/", icon: Home },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#faf2ea] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#eae6db] bg-[#f6f5f0] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#eae6db]">
          <h2 className="font-sans text-2xl font-semibold text-black tracking-tighter uppercase">AGM Admin</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors",
                  isActive 
                    ? "bg-[#eae6db] text-black" 
                    : "text-gray-500 hover:bg-[#eae6db]/40 hover:text-black"
                )}
              >
                <Icon size={18} className={isActive ? "text-black" : "text-gray-400"} />
                <span className="font-semibold text-xs uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-[#eae6db]">
          <button 
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
          >
            <LogOut size={18} />
            <span className="font-semibold text-xs uppercase tracking-wider">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-[#eae6db] flex items-center justify-between px-8 bg-[#f6f5f0] shrink-0">
          <h1 className="font-sans text-sm font-bold uppercase tracking-widest text-black">Property Management</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff6b00] flex items-center justify-center text-white text-xs font-black shadow-sm shadow-[#ff6b00]/20">
              A
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
