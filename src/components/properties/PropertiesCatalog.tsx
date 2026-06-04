"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Property } from "@/lib/data";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, X, MapPin, Building2, Check,
  ChevronDown, RefreshCw, Calendar, Sparkles, Compass, Key, IndianRupee, Eye, ArrowUpRight,
  Home
} from "lucide-react";

const cinematicEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface DropdownFilterProps {
  label: string;
  icon: React.ReactNode;
  activeDropdown: string | null;
  setActiveDropdown: (val: string | null) => void;
  dropdownKey: string;
  options: string[];
  selectedVal: string;
  setSelectedVal: (val: string) => void;
  allLabel?: string;
  customRenderOption?: (opt: string) => string;
  scrollable?: boolean;
}

function DropdownFilter({
  label,
  icon,
  activeDropdown,
  setActiveDropdown,
  dropdownKey,
  options,
  selectedVal,
  setSelectedVal,
  allLabel = "All",
  customRenderOption,
  scrollable = false,
}: DropdownFilterProps) {
  const isOpen = activeDropdown === dropdownKey;
  
  return (
    <div className="flex flex-col gap-2 relative">
      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</label>
      <button 
        type="button"
        onClick={() => setActiveDropdown(isOpen ? null : dropdownKey)}
        className="flex justify-between items-center bg-gray-50/50 hover:bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl text-xs font-semibold text-black transition-all duration-300 focus:ring-2 focus:ring-[#ff6b00]/10 focus:border-[#ff6b00]/30 outline-none w-full cursor-pointer hover:shadow-sm"
      >
        <span className="flex items-center gap-2 truncate">
          {icon}
          {selectedVal === "All" ? allLabel : (customRenderOption ? customRenderOption(selectedVal) : selectedVal)}
        </span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 transform-gpu flex-shrink-0 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-[105%] left-0 w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-30 flex flex-col gap-1 ${
              scrollable ? "max-h-60 overflow-y-auto" : ""
            }`}
          >
            {options.map(opt => (
              <button
                type="button"
                key={opt}
                onClick={() => {
                  setSelectedVal(opt);
                  setActiveDropdown(null);
                }}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-xs font-semibold transition-colors w-full cursor-pointer ${
                  selectedVal === opt ? "bg-[#ff6b00]/10 text-[#ff6b00]" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{opt === "All" ? allLabel : (customRenderOption ? customRenderOption(opt) : opt)}</span>
                {selectedVal === opt && <Check size={12} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PropertiesCatalogProps {
  initialProperties: Property[];
}

export function PropertiesCatalog({ initialProperties }: PropertiesCatalogProps) {
  // --- Filter states ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedBhk, setSelectedBhk] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000000]); // 0 to 20 Cr
  const [selectedVastu, setSelectedVastu] = useState<string>("All");
  const [selectedFurnishing, setSelectedFurnishing] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedFacing, setSelectedFacing] = useState<string>("All");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("All");

  // UI state
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Custom dropdown open states (desktop)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCity("All");
    setSelectedType("All");
    setSelectedBhk("All");
    setPriceRange([0, 200000000]);
    setSelectedVastu("All");
    setSelectedFurnishing("All");
    setSelectedStatus("All");
    setSelectedAmenities([]);
    setSelectedSize("All");
    setSelectedFacing("All");
    setSelectedAvailability("All");
  };

  // Trigger loading effect on filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [
    searchQuery, selectedCity, selectedType, selectedBhk, priceRange,
    selectedVastu, selectedFurnishing, selectedStatus, selectedAmenities,
    selectedSize, selectedFacing, selectedAvailability
  ]);

  // List of constants for filter selections
  const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Bhubaneswar"];
  const propertyTypes = ["All", "Apartment", "House", "Villa", "Penthouse", "Plot", "Commercial", "Office Space", "Studio Apartment"];
  const bhkOptions = ["All", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
  const vastuOptions = ["All", "Vastu Compliant", "Non-Vastu"];
  const furnishingOptions = ["All", "Furnished", "Semi-Furnished", "Unfurnished"];
  const statusOptions = ["All", "Ready to Move", "Under Construction", "Newly Launched", "Resale"];
  const sizeOptions = ["All", "500-1000 sq.ft", "1000-2000 sq.ft", "2000+ sq.ft"];
  const facingOptions = ["All", "East", "West", "North", "South"];
  const availabilityOptions = ["All", "Buy", "Rent", "Lease"];
  const amenitiesList = [
    "Parking", "Lift", "Security", "Swimming Pool", "Gym",
    "Garden", "Power Backup", "Clubhouse", "Balcony", "CCTV"
  ];

  // Helper to toggle amenities
  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return initialProperties.filter(property => {
      // 1. Search Query (Matches location, title, project name, area)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = property.title.toLowerCase().includes(query);
        const matchLocation = property.location.toLowerCase().includes(query);
        const matchProject = property.projectName.toLowerCase().includes(query);
        const matchArea = property.area.toLowerCase().includes(query);
        if (!matchTitle && !matchLocation && !matchProject && !matchArea) {
          return false;
        }
      }

      // 2. City
      if (selectedCity !== "All" && property.city !== selectedCity) {
        return false;
      }

      // 3. Property Type
      if (selectedType !== "All" && property.type !== selectedType) {
        return false;
      }

      // 4. BHK
      if (selectedBhk !== "All") {
        if (selectedBhk === "5+ BHK") {
          if (property.bhk < 5) return false;
        } else {
          const bhkNum = parseInt(selectedBhk);
          if (property.bhk !== bhkNum) return false;
        }
      }

      // 5. Price Range
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }

      // 6. Vastu
      if (selectedVastu !== "All") {
        const wantsVastu = selectedVastu === "Vastu Compliant";
        if (property.vastuCompliant !== wantsVastu) return false;
      }

      // 7. Furnishing
      if (selectedFurnishing !== "All" && property.furnishing !== selectedFurnishing) {
        return false;
      }

      // 8. Property Status
      if (selectedStatus !== "All" && property.status !== selectedStatus) {
        return false;
      }

      // 9. Facing
      if (selectedFacing !== "All" && property.facing !== selectedFacing) {
        return false;
      }

      // 10. Availability
      if (selectedAvailability !== "All" && property.availability !== selectedAvailability) {
        return false;
      }

      // 11. Size / Area
      if (selectedSize !== "All") {
        if (selectedSize === "500-1000 sq.ft") {
          if (property.sqft < 500 || property.sqft > 1000) return false;
        } else if (selectedSize === "1000-2000 sq.ft") {
          if (property.sqft < 1000 || property.sqft > 2000) return false;
        } else if (selectedSize === "2000+ sq.ft") {
          if (property.sqft < 2000) return false;
        }
      }

      // 12. Amenities (Must match all selected)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [
    initialProperties, searchQuery, selectedCity, selectedType, selectedBhk,
    priceRange, selectedVastu, selectedFurnishing, selectedStatus,
    selectedSize, selectedFacing, selectedAvailability, selectedAmenities
  ]);

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; onClear: () => void }[] = [];
    
    if (selectedCity !== "All") {
      chips.push({ key: "city", label: `City: ${selectedCity}`, onClear: () => setSelectedCity("All") });
    }
    if (selectedType !== "All") {
      chips.push({ key: "type", label: `Type: ${selectedType}`, onClear: () => setSelectedType("All") });
    }
    if (selectedBhk !== "All") {
      chips.push({ key: "bhk", label: selectedBhk, onClear: () => setSelectedBhk("All") });
    }
    if (selectedVastu !== "All") {
      chips.push({ key: "vastu", label: selectedVastu, onClear: () => setSelectedVastu("All") });
    }
    if (selectedFurnishing !== "All") {
      chips.push({ key: "furnishing", label: selectedFurnishing, onClear: () => setSelectedFurnishing("All") });
    }
    if (selectedStatus !== "All") {
      chips.push({ key: "status", label: selectedStatus, onClear: () => setSelectedStatus("All") });
    }
    if (selectedFacing !== "All") {
      chips.push({ key: "facing", label: `${selectedFacing} Facing`, onClear: () => setSelectedFacing("All") });
    }
    if (selectedAvailability !== "All") {
      chips.push({ key: "availability", label: `For ${selectedAvailability}`, onClear: () => setSelectedAvailability("All") });
    }
    if (selectedSize !== "All") {
      chips.push({ key: "size", label: selectedSize, onClear: () => setSelectedSize("All") });
    }
    if (priceRange[0] > 0 || priceRange[1] < 200000000) {
      const minText = priceRange[0] >= 10000000 ? `₹${priceRange[0]/10000000} Cr` : priceRange[0] >= 100000 ? `₹${priceRange[0]/100000} L` : "₹0";
      const maxText = priceRange[1] >= 10000000 ? `₹${priceRange[1]/10000000} Cr` : priceRange[1] >= 100000 ? `₹${priceRange[1]/100000} L` : "₹20Cr+";
      chips.push({ key: "price", label: `${minText} - ${maxText}`, onClear: () => setPriceRange([0, 200000000]) });
    }
    selectedAmenities.forEach(amenity => {
      chips.push({ key: `amenity-${amenity}`, label: amenity, onClear: () => toggleAmenity(amenity) });
    });

    return chips;
  }, [
    selectedCity, selectedType, selectedBhk, selectedVastu, selectedFurnishing,
    selectedStatus, selectedFacing, selectedAvailability, selectedSize, priceRange, selectedAmenities
  ]);

  // Format Helper for Indian Rupee Ranges
  const formatRupee = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
    return `₹${value.toLocaleString("en-IN")}`;
  };

  // Handle outside click to close dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ───────────────── HEADER & SEARCH BAR ───────────────── */}
      <div className="w-full bg-[#f6f5f0] py-16 px-6 md:px-8 lg:px-16 rounded-[2.5rem] md:rounded-[3.5rem] max-w-[1600px] mx-auto border border-[#eae6db] relative shadow-sm overflow-hidden">
        {/* Abstract background decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b00]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
          <div className="flex-grow">
            <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-[0.35em] block mb-3">AGM PORTFOLIO</span>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-medium text-black uppercase tracking-tighter leading-none mb-4">
              THE COLLECTION
            </h1>
            <p className="font-sans text-xs md:text-sm text-gray-500 font-medium max-w-lg leading-relaxed">
              Browse our architectural listings across premium locations. Refine by Vastu, BHK, property type, or amenities to discover spaces shaped with absolute purpose.
            </p>
          </div>

          {/* Search container */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            
            {/* Search Input Box */}
            <div 
              className={`relative bg-white/90 backdrop-blur-md rounded-full px-5 py-3 shadow-md border flex items-center flex-grow sm:w-72 transition-all duration-300 ${
                isSearchFocused 
                  ? "border-[#ff6b00]/30 shadow-lg shadow-[#ff6b00]/5 ring-2 ring-[#ff6b00]/10" 
                  : "border-gray-100 shadow-black/5"
              }`}
            >
              <Search size={16} className={`mr-3 transition-colors duration-300 ${isSearchFocused ? "text-[#ff6b00]" : "text-gray-400"}`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search by city, project, area..." 
                className="bg-transparent border-none focus:ring-0 text-black w-full text-xs font-sans font-semibold outline-none placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-black transition-colors ml-2 cursor-pointer">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button 
              onClick={() => {
                setIsAdvancedOpen(!isAdvancedOpen);
                setIsMobileDrawerOpen(true);
              }}
              className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] hover:-translate-y-0.5 shadow-md cursor-pointer ${
                isAdvancedOpen 
                  ? "bg-[#ff6b00] text-white shadow-[#ff6b00]/25" 
                  : "bg-white hover:bg-gray-50 text-black border border-gray-100"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {activeChips.length > 0 && (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isAdvancedOpen ? "bg-white text-[#ff6b00]" : "bg-[#ff6b00] text-white"
                }`}>
                  {activeChips.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────── DESKTOP FILTER INTERFACE ───────────────── */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-6 hidden md:block" ref={dropdownRef}>
        <AnimatePresence>
          {isAdvancedOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: cinematicEase }}
              className="bg-white/80 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 shadow-xl shadow-black/[0.03] flex flex-col gap-8 relative overflow-hidden"
            >
              {/* Filter selections grid */}
              <div className="grid grid-cols-4 gap-6 relative z-10">
                
                {/* 1. Location Selection */}
                <DropdownFilter
                  label="Location / City"
                  icon={<MapPin size={14} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="city"
                  options={cities}
                  selectedVal={selectedCity}
                  setSelectedVal={setSelectedCity}
                  allLabel="All Locations"
                />

                {/* 2. Property Type Selection */}
                <DropdownFilter
                  label="Property Type"
                  icon={<Building2 size={14} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="type"
                  options={propertyTypes}
                  selectedVal={selectedType}
                  setSelectedVal={setSelectedType}
                  allLabel="All Types"
                  scrollable
                />

                {/* 3. BHK Selection */}
                <DropdownFilter
                  label="BHK / Bedrooms"
                  icon={<Building2 size={14} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="bhk"
                  options={bhkOptions}
                  selectedVal={selectedBhk}
                  setSelectedVal={setSelectedBhk}
                  allLabel="All BHKs"
                />

                {/* 4. Price range slide/custom input */}
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 flex justify-between">
                    <span>Price Range</span>
                    <span className="text-[#ff6b00] font-bold">{formatRupee(priceRange[0])} - {formatRupee(priceRange[1])}</span>
                  </label>
                  <div className="flex flex-col gap-3 pt-2">
                    <input 
                      type="range" 
                      min="0"
                      max="200000000"
                      step="500000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-[#ff6b00]"
                    />
                    <div className="flex gap-2 justify-between">
                      <button 
                        onClick={() => setPriceRange([0, 5000000])}
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          priceRange[0] === 0 && priceRange[1] === 5000000
                            ? "bg-black border-black text-white" 
                            : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        ₹50L Below
                      </button>
                      <button 
                        onClick={() => setPriceRange([5000000, 10000000])}
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          priceRange[0] === 5000000 && priceRange[1] === 10000000
                            ? "bg-black border-black text-white" 
                            : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        ₹50L – ₹1Cr
                      </button>
                      <button 
                        onClick={() => setPriceRange([10000000, 200000000])}
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${
                          priceRange[0] === 10000000 && priceRange[1] === 200000000
                            ? "bg-black border-black text-white" 
                            : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                        }`}
                      >
                        ₹1Cr+
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className="h-[1px] bg-gray-100 w-full my-1"></div>

              {/* Advanced Filter options (Vastu, Furnishing, Status, Size, Facing, Availability) */}
              <div className="grid grid-cols-6 gap-4">
                
                {/* 5. Vastu */}
                <DropdownFilter
                  label="Vastu Compliance"
                  icon={<Sparkles size={11} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="vastu"
                  options={vastuOptions}
                  selectedVal={selectedVastu}
                  setSelectedVal={setSelectedVastu}
                  allLabel="Doesn't Matter"
                />

                {/* 6. Furnishing */}
                <DropdownFilter
                  label="Furnishing"
                  icon={<Home size={11} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="furnish"
                  options={furnishingOptions}
                  selectedVal={selectedFurnishing}
                  setSelectedVal={setSelectedFurnishing}
                  allLabel="Any Furnishing"
                />

                {/* 7. Status */}
                <DropdownFilter
                  label="Construction Status"
                  icon={<Calendar size={11} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="status"
                  options={statusOptions}
                  selectedVal={selectedStatus}
                  setSelectedVal={setSelectedStatus}
                  allLabel="Any Status"
                />

                {/* 8. Size */}
                <DropdownFilter
                  label="Area / Size"
                  icon={<Building2 size={11} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="size"
                  options={sizeOptions}
                  selectedVal={selectedSize}
                  setSelectedVal={setSelectedSize}
                  allLabel="Any Size"
                />

                {/* 9. Facing */}
                <DropdownFilter
                  label="Facing"
                  icon={<Compass size={11} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="facing"
                  options={facingOptions}
                  selectedVal={selectedFacing}
                  setSelectedVal={setSelectedFacing}
                  allLabel="Any Facing"
                  customRenderOption={(opt) => opt === "All" ? "Any Facing" : `${opt} Facing`}
                />

                {/* 10. Availability */}
                <DropdownFilter
                  label="Availability"
                  icon={<Key size={11} className="text-gray-400" />}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  dropdownKey="avail"
                  options={availabilityOptions}
                  selectedVal={selectedAvailability}
                  setSelectedVal={setSelectedAvailability}
                  allLabel="Buy/Rent/Lease"
                />

              </div>

              <div className="h-[1px] bg-gray-100 w-full my-1"></div>

              {/* 11. Amenities Checkboxes */}
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Amenities</span>
                <div className="flex flex-wrap gap-2.5">
                  {amenitiesList.map(amenity => {
                    const isSelected = selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected 
                            ? "bg-black border-black text-white shadow-md shadow-black/5" 
                            : "bg-gray-50/50 border-gray-100 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                          isSelected ? "bg-white border-white text-black" : "border-gray-300 bg-white"
                        }`}>
                          {isSelected && <Check size={10} strokeWidth={3} />}
                        </span>
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───────────────── ACTIVE FILTERS CHIPS & RESULTS COUNT ───────────────── */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-6 flex flex-col gap-4">
        {/* Count and Clear Block */}
        <div className="flex justify-between items-center">
          <div className="font-sans text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <span>Results:</span>
            <span className="text-black font-extrabold">{filteredProperties.length} Properties found</span>
          </div>
          
          {activeChips.length > 0 && (
            <button 
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#ff6b00] hover:text-[#ff6b00]/80 transition-colors focus:outline-none"
            >
              <RefreshCw size={12} />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Chips display */}
        <div className="flex flex-wrap gap-2 pt-1">
          <AnimatePresence mode="popLayout">
            {activeChips.map((chip) => (
              <motion.div 
                key={chip.key}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, ease: cinematicEase }}
                className="bg-gray-50 border border-gray-100 rounded-full px-3.5 py-1.5 flex items-center gap-2 text-[10px] font-bold text-gray-700 uppercase tracking-wider"
              >
                <span>{chip.label}</span>
                <button 
                  onClick={chip.onClear}
                  className="w-4 h-4 bg-gray-200/60 hover:bg-gray-200 text-gray-500 hover:text-black rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ───────────────── LISTINGS GRID WITH SMOOTH TRANSITIONS ───────────────── */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-10 relative min-h-[400px]">
        
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-start pt-32"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                className="w-12 h-12 border-4 border-gray-100 border-t-[#ff6b00] rounded-full shadow-md"
              />
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mt-4 animate-pulse">Filtering Listings...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results Fallback */}
        {filteredProperties.length === 0 && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-400">
              <Building2 size={28} />
            </div>
            <h3 className="font-sans text-xl font-bold text-black uppercase tracking-tight mb-2">No Properties Found</h3>
            <p className="font-sans text-xs text-gray-500 font-medium mb-6">
              We couldn't find any listings matching your active criteria. Try broadening your location, BHK layout, or price range.
            </p>
            <button 
              onClick={clearAllFilters}
              className="bg-black text-white px-8 py-3.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#ff6b00] transition-colors shadow-md"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Properties Listings */}
        <div className="flex flex-col gap-12 w-full">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: cinematicEase }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* ───────────────── MOBILE STICKY FILTER BAR & BOTTOM DRAWER ───────────────── */}
      
      {/* Sticky Bottom Trigger Bar (Mobile Only) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative border border-white/10 active:scale-95 transition-transform"
        >
          <SlidersHorizontal size={20} />
          {activeChips.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#ff6b00] text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white">
              {activeChips.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer (Modal) */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Bottom Drawer Sheet */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-[2.5rem] z-50 px-6 py-6 overflow-y-auto flex flex-col gap-6 md:hidden shadow-[0_-15px_40px_rgba(0,0,0,0.15)] border-t border-gray-100"
            >
              
              {/* Header inside drawer */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-lg font-bold text-black uppercase tracking-tight">Refine Properties</h3>
                  <span className="text-[10px] text-gray-400 font-semibold">{filteredProperties.length} Matches Found</span>
                </div>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content options */}
              <div className="flex flex-col gap-5 pb-8">
                
                {/* City */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">City / Location</span>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map(city => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                          selectedCity === city 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white shadow-md shadow-[#ff6b00]/10" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {city === "All" ? "All Locations" : city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BHK */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">BHK Configuration</span>
                  <div className="grid grid-cols-3 gap-2">
                    {bhkOptions.map(bhk => (
                      <button
                        key={bhk}
                        onClick={() => setSelectedBhk(bhk)}
                        className={`px-2 py-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                          selectedBhk === bhk 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white shadow-md shadow-[#ff6b00]/10" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {bhk === "All" ? "All BHKs" : bhk}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Property Type</span>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {propertyTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                          selectedType === type 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white shadow-md shadow-[#ff6b00]/10" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {type === "All" ? "All Types" : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Price Ceiling</span>
                    <span className="text-xs font-bold text-[#ff6b00]">{formatRupee(priceRange[1])}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0"
                    max="200000000"
                    step="1000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#ff6b00] mt-1"
                  />
                  <div className="flex justify-between gap-1.5 mt-2">
                    {[[0, 5000000], [5000000, 10000000], [10000000, 200000000]].map(([min, max], i) => (
                      <button
                        key={i}
                        onClick={() => setPriceRange([min, max])}
                        className={`flex-1 py-2 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border transition-all ${
                          priceRange[0] === min && priceRange[1] === max
                            ? "bg-black border-black text-white"
                            : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}
                      >
                        {i === 0 ? "Under ₹50L" : i === 1 ? "₹50L - ₹1Cr" : "₹1Cr+"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vastu */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Vastu Compliance</span>
                  <div className="grid grid-cols-3 gap-2">
                    {["All", "Vastu Compliant", "Non-Vastu"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVastu(opt)}
                        className={`px-2 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all uppercase tracking-widest ${
                          selectedVastu === opt 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {opt === "All" ? "Any" : opt.replace(" Compliant", "")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</span>
                  <div className="grid grid-cols-2 gap-2">
                    {statusOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedStatus(opt)}
                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all uppercase tracking-widest ${
                          selectedStatus === opt 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {opt === "All" ? "Any" : opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnishing */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Furnishing</span>
                  <div className="grid grid-cols-3 gap-2">
                    {furnishingOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedFurnishing(opt)}
                        className={`px-2 py-2.5 rounded-xl text-[9px] font-bold text-center border transition-all uppercase tracking-widest ${
                          selectedFurnishing === opt 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {opt === "All" ? "Any" : opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Facing */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Facing</span>
                  <div className="grid grid-cols-4 gap-2">
                    {facingOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedFacing(opt)}
                        className={`px-1 py-2.5 rounded-xl text-[9px] font-bold text-center border transition-all uppercase tracking-widest ${
                          selectedFacing === opt 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Size / Area</span>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedSize(opt)}
                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all uppercase tracking-widest ${
                          selectedSize === opt 
                            ? "bg-[#ff6b00] border-[#ff6b00] text-white" 
                            : "bg-gray-50 border-gray-100 text-gray-700"
                        }`}
                      >
                        {opt === "All" ? "Any Size" : opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities Checkbox (Accordion-like or list) */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">Amenities Select</span>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 bg-gray-50 rounded-2xl">
                    {amenitiesList.map(amenity => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <button
                          key={amenity}
                          onClick={() => toggleAmenity(amenity)}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border transition-all ${
                            isSelected 
                              ? "bg-black border-black text-white" 
                              : "bg-white border-gray-200 text-gray-500"
                          }`}
                        >
                          {amenity}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Apply / Reset actions */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={clearAllFilters}
                  className="flex-1 py-4 bg-gray-50 hover:bg-gray-100 text-black font-sans text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex-1 py-4 bg-[#ff6b00] hover:bg-[#ff6b00]/95 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md shadow-[#ff6b00]/10"
                >
                  Show ({filteredProperties.length})
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
