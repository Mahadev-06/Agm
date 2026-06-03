"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { properties as initialProperties, Property } from "@/lib/data";

const amenitiesList = [
  "Parking", "Lift", "Security", "Swimming Pool", "Gym",
  "Garden", "Power Backup", "Clubhouse", "Balcony", "CCTV"
];

function NewPropertyForm() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditing = !!editId;

  const [formData, setFormData] = useState({
    title: "",
    projectName: "",
    price: "",
    location: "",
    city: "Mumbai" as 'Mumbai' | 'Delhi' | 'Bangalore' | 'Bhubaneswar',
    area: "",
    landmark: "",
    type: "Apartment" as Property['type'],
    beds: "",
    baths: "",
    sqft: "",
    bhk: "2",
    status: "Ready to Move" as Property['status'],
    availability: "Buy" as Property['availability'],
    furnishing: "Unfurnished" as Property['furnishing'],
    facing: "East" as Property['facing'],
    vastuCompliant: "Yes",
    description: "",
    image: "",
    amenities: [] as string[]
  });

  // Load existing property data for editing
  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem("agm_properties");
      const existing: Property[] = saved ? JSON.parse(saved) : initialProperties;
      const found = existing.find(p => p.id === editId);
      if (found) {
        setFormData({
          title: found.title,
          projectName: found.projectName || "",
          price: String(found.price),
          location: found.location,
          city: found.city,
          area: found.area || "",
          landmark: found.landmark || "",
          type: found.type,
          beds: String(found.beds),
          baths: String(found.baths),
          sqft: String(found.sqft),
          bhk: String(found.bhk),
          status: found.status,
          availability: found.availability,
          furnishing: found.furnishing,
          facing: found.facing,
          vastuCompliant: found.vastuCompliant ? "Yes" : "No",
          description: found.description,
          image: found.image,
          amenities: found.amenities || []
        });
      }
    }
  }, [editId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const saved = localStorage.getItem("agm_properties");
    const existing: Property[] = saved ? JSON.parse(saved) : initialProperties;

    // Use absolute default if empty image is provided
    const finalImage = formData.image.trim() || "https://images.unsplash.com/photo-1613490908578-8318b76cecc1?q=80&w=1200";

    const payload: Property = {
      id: isEditing ? editId : `prop-${Date.now()}`,
      title: formData.title,
      projectName: formData.projectName,
      price: Number(formData.price),
      location: formData.location,
      city: formData.city,
      area: formData.area,
      landmark: formData.landmark,
      type: formData.type,
      beds: Number(formData.beds || 1),
      baths: Number(formData.baths || 1),
      sqft: Number(formData.sqft || 1000),
      bhk: Number(formData.bhk) as Property['bhk'],
      status: formData.status,
      availability: formData.availability,
      furnishing: formData.furnishing,
      facing: formData.facing,
      vastuCompliant: formData.vastuCompliant === "Yes",
      description: formData.description,
      image: finalImage,
      amenities: formData.amenities
    };

    let updated: Property[];
    if (isEditing) {
      updated = existing.map(p => p.id === editId ? payload : p);
    } else {
      updated = [payload, ...existing];
    }

    localStorage.setItem("agm_properties", JSON.stringify(updated));
    alert(isEditing ? "Listing updated successfully!" : "Property listed successfully!");
    window.location.href = "/admin";
  };

  const toggleAmenity = (name: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(name)
        ? prev.amenities.filter(a => a !== name)
        : [...prev.amenities, name]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header section */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-3 bg-[#f6f5f0] border border-[#eae6db] rounded-2xl text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-black uppercase tracking-tight font-sans mb-1">
            {isEditing ? "Edit Listing" : "Add New Property"}
          </h1>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {isEditing ? "Refine architectural listings for the database" : "Create a new luxury listing for the portfolio"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Editorial Details */}
        <div className="bg-[#f6f5f0] p-6 sm:p-8 rounded-[2rem] border border-[#eae6db] flex flex-col gap-6">
          <h2 className="text-sm font-extrabold text-black uppercase tracking-widest border-b border-[#eae6db] pb-4">Basic Information</h2>
          
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Property Name / Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. The Obsidian Horizon"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Project Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. CP Skycrest Tower"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Detailed Address / Location</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. Bandra West, Mumbai"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Price (INR)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. 85000000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                <select 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value as any})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Bhubaneswar">Bhubaneswar</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Area / Locality</label>
                <input 
                  type="text" 
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. Patia"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Nearby Landmark</label>
                <input 
                  type="text" 
                  required
                  value={formData.landmark}
                  onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. Near KIIT Square"
                />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: Dimensions & Configuration */}
        <div className="bg-[#f6f5f0] p-6 sm:p-8 rounded-[2rem] border border-[#eae6db] flex flex-col gap-6">
          <h2 className="text-sm font-extrabold text-black uppercase tracking-widest border-b border-[#eae6db] pb-4">Specifications</h2>
          
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Property Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Studio Apartment">Studio Apartment</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Newly Launched">Newly Launched</option>
                  <option value="Resale">Resale</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Availability</label>
                <select 
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value as any})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">BHK (Layout)</label>
                <select 
                  value={formData.bhk}
                  onChange={(e) => setFormData({...formData, bhk: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Bedrooms</label>
                <input 
                  type="number" 
                  required
                  value={formData.beds}
                  onChange={(e) => setFormData({...formData, beds: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. 4"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Bathrooms</label>
                <input 
                  type="number" 
                  required
                  value={formData.baths}
                  onChange={(e) => setFormData({...formData, baths: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. 4"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Square Feet</label>
                <input 
                  type="number" 
                  required
                  value={formData.sqft}
                  onChange={(e) => setFormData({...formData, sqft: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                  placeholder="e.g. 3200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Furnishing State</label>
                <select 
                  value={formData.furnishing}
                  onChange={(e) => setFormData({...formData, furnishing: e.target.value as any})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Facing Direction</label>
                <select 
                  value={formData.facing}
                  onChange={(e) => setFormData({...formData, facing: e.target.value as any})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="East">East Facing</option>
                  <option value="West">West Facing</option>
                  <option value="North">North Facing</option>
                  <option value="South">South Facing</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Vastu Compliance</label>
                <select 
                  value={formData.vastuCompliant}
                  onChange={(e) => setFormData({...formData, vastuCompliant: e.target.value})}
                  className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3.5 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors"
                >
                  <option value="Yes">Vastu Compliant</option>
                  <option value="No">Non-Vastu</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: Content & Imagery */}
        <div className="bg-[#f6f5f0] p-6 sm:p-8 rounded-[2rem] border border-[#eae6db] flex flex-col gap-6">
          <h2 className="text-sm font-extrabold text-black uppercase tracking-widest border-b border-[#eae6db] pb-4">Description & Imagery</h2>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Detailed Architectural Description</label>
              <textarea 
                rows={5}
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors resize-none leading-relaxed" 
                placeholder="Describe the architectural significance and key features..."
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Main Property Image (URL)</label>
              <input 
                type="text" 
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full bg-white border border-[#eae6db] rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#ff6b00] font-sans font-semibold transition-colors" 
                placeholder="e.g. https://images.unsplash.com/photo-..."
              />
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-wider">PROVIDE A DIRECT IMAGE URL OR LEAVE BLANK TO USE DEFAULT ARCHITECTURAL COVER PLACEHOLDER.</p>
            </div>
          </div>
        </div>

        {/* SECTION 4: Amenities checks */}
        <div className="bg-[#f6f5f0] p-6 sm:p-8 rounded-[2rem] border border-[#eae6db] flex flex-col gap-6">
          <h2 className="text-sm font-extrabold text-black uppercase tracking-widest border-b border-[#eae6db] pb-4">Select Amenities</h2>
          
          <div className="flex flex-wrap gap-2.5">
            {amenitiesList.map(amenity => {
              const isSelected = formData.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border uppercase tracking-wider transition-all flex items-center gap-2 ${
                    isSelected 
                      ? "bg-black border-black text-white" 
                      : "bg-white border-[#eae6db] text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                    isSelected ? "bg-white border-white text-black" : "border-gray-300"
                  }`}>
                    {isSelected && "✓"}
                  </span>
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex justify-end gap-4 border-t border-[#eae6db] pt-6">
          <Link 
            href="/admin" 
            className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="bg-black hover:bg-[#ff6b00] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-sm"
          >
            {isEditing ? <Save size={14} /> : <Plus size={14} />}
            <span>{isEditing ? "Save Changes" : "Create Listing"}</span>
          </button>
        </div>

      </form>
    </div>
  );
}

export default function NewPropertyPage() {
  return (
    <Suspense fallback={
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-100 border-t-[#ff6b00] rounded-full animate-spin" />
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mt-4 animate-pulse">Loading Workspace...</span>
      </div>
    }>
      <NewPropertyForm />
    </Suspense>
  );
}
