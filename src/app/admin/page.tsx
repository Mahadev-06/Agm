"use client";

import { useState, useEffect } from "react";
import { properties as initialProperties, Property } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  useEffect(() => {
    const saved = localStorage.getItem("agm_properties");
    if (saved) {
      setProperties(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const updated = properties.filter(p => p.id !== id);
      setProperties(updated);
      localStorage.setItem("agm_properties", JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title & Add CTA */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-black uppercase tracking-tight font-sans mb-1">Dashboard</h1>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Manage your luxury real estate portfolio</p>
        </div>
        <Link 
          href="/admin/properties/new" 
          className="bg-black hover:bg-[#ff6b00] text-white px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-colors shadow-sm"
        >
          Add New Property
        </Link>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f6f5f0] p-6 rounded-[2rem] border border-[#eae6db]">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Properties</p>
          <p className="text-3xl font-bold text-black font-sans">{properties.length}</p>
        </div>
        
        <div className="bg-[#f6f5f0] p-6 rounded-[2rem] border border-[#eae6db]">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Portfolio Value</p>
          <p className="text-3xl font-bold text-black font-sans">
            {formatCurrency(properties.reduce((sum, p) => sum + p.price, 0))}
          </p>
        </div>
        
        <div className="bg-[#f6f5f0] p-6 rounded-[2rem] border border-[#eae6db]">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Active Requests</p>
          <p className="text-3xl font-bold text-black font-sans">14</p>
        </div>
      </div>

      {/* Listings Table Container */}
      <div className="bg-[#f6f5f0] rounded-[2rem] border border-[#eae6db] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#eae6db] bg-[#fcfbfa]">
          <h2 className="text-base font-bold text-black uppercase tracking-widest font-sans">Property Listings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fcfbfa] border-b border-[#eae6db] text-gray-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae6db]/60 text-xs font-semibold text-gray-800">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-white/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-[#eae6db] shrink-0">
                        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-black font-sans text-sm">{property.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{property.location}</td>
                  <td className="px-6 py-4 text-black font-bold font-sans text-sm">{formatCurrency(property.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                      property.status === "Ready to Move" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : property.status === "Under Construction"
                        ? "bg-orange-50 text-[#ff6b00] border-orange-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3.5">
                      <Link 
                        href={`/properties/${property.id}`} 
                        target="_blank" 
                        className="text-gray-400 hover:text-black transition-colors"
                        title="View Property"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link 
                        href={`/admin/properties/new?id=${property.id}`} 
                        className="text-gray-400 hover:text-black transition-colors"
                        title="Edit Property"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(property.id)} 
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
