"use client";

import { useState } from "react";
import { Save, Shield, Settings, Sliders, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "AGM Housing",
    supportEmail: "advisory@agmhousing.com",
    contactPhone: "+44 (0) 20 7123 4567",
    currency: "INR",
    maintenanceMode: false,
    sendNotifications: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-black uppercase tracking-tight font-sans mb-1">Portal Settings</h1>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Configure database defaults and administration panel defaults</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: System settings */}
        <div className="bg-[#f6f5f0] p-6 sm:p-8 rounded-[2rem] border border-[#eae6db] flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[#eae6db] pb-4">
            <Settings className="text-[#ff6b00]" size={18} />
            <h2 className="text-sm font-extrabold text-black uppercase tracking-widest">General Configuration</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Portal Brand Name</label>
                <input 
                  type="text" 
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Support Email Address</label>
                <input 
                  type="email" 
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Contact Hotline</label>
                <input 
                  type="text" 
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Primary Currency Format</label>
                <select 
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="INR">Indian Rupee (INR - ₹)</option>
                  <option value="USD">US Dollar (USD - $)</option>
                  <option value="EUR">Euro (EUR - €)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Toggle preferences */}
        <div className="bg-[#f6f5f0] p-6 sm:p-8 rounded-[2rem] border border-[#eae6db] flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-[#eae6db] pb-4">
            <Sliders className="text-[#ff6b00]" size={18} />
            <h2 className="text-sm font-extrabold text-black uppercase tracking-widest">Feature Controls</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#eae6db]">
              <div>
                <span className="block text-xs font-extrabold uppercase tracking-wide text-black mb-1">Maintenance Lock</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">RESTRICT CONSUMER ACCESS TO PORTFOLIO ROUTE TEMPORARILY</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                className="w-5 h-5 accent-[#ff6b00]"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#eae6db]">
              <div>
                <span className="block text-xs font-extrabold uppercase tracking-wide text-black mb-1">Inquiry Notifications</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">DISPATCH EMAIL NOTIFICATION WHENEVER CLIENT FORMS SUBMIT</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.sendNotifications}
                onChange={(e) => setSettings({...settings, sendNotifications: e.target.checked})}
                className="w-5 h-5 accent-[#ff6b00]"
              />
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex justify-end gap-4 border-t border-[#eae6db] pt-6">
          <button 
            type="submit" 
            className="bg-black hover:bg-[#ff6b00] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save size={14} />
            <span>Save Preferences</span>
          </button>
        </div>

      </form>
    </div>
  );
}
