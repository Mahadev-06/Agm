export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Apartment' | 'House' | 'Villa' | 'Penthouse' | 'Plot' | 'Commercial' | 'Office Space' | 'Studio Apartment';
  image: string;
  images?: string[];
  status: 'Ready to Move' | 'Under Construction' | 'Newly Launched' | 'Resale';
  description: string;
  amenities: string[];
  vastuCompliant: boolean;
  furnishing: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  featured?: boolean;
  
  // Advanced filters metadata
  city: 'Mumbai' | 'Delhi' | 'Bangalore' | 'Bhubaneswar';
  area: string;
  landmark: string;
  bhk: 1 | 2 | 3 | 4 | 5; // 5 stands for 5+ BHK
  facing: 'East' | 'West' | 'North' | 'South';
  availability: 'Buy' | 'Rent' | 'Lease';
  projectName: string;
}

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "The Obsidian Horizon",
    location: "Bandra West, Mumbai",
    price: 85000000,
    beds: 4,
    baths: 4,
    sqft: 3200,
    type: "Penthouse",
    status: "Ready to Move",
    featured: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200"
    ],
    description: "A breathtaking contemporary penthouse situated in Bandra West, Mumbai, boasting double-height ceilings, a private infinity pool deck, and glass-paneled walls offering scenic sea views. Designed to perfection with a modern aesthetic.",
    amenities: ["Parking", "Lift", "Security", "Swimming Pool", "Gym", "Power Backup", "Balcony", "CCTV"],
    vastuCompliant: true,
    furnishing: "Furnished",
    city: "Mumbai",
    area: "Bandra West",
    landmark: "Near Carter Road",
    bhk: 4,
    facing: "East",
    availability: "Buy",
    projectName: "Obsidian Horizon Towers"
  },
  {
    id: "prop-2",
    title: "Temple View Royal Villa",
    location: "Patia, Bhubaneswar",
    price: 18000000,
    beds: 5,
    baths: 5,
    sqft: 4500,
    type: "Villa",
    status: "Newly Launched",
    featured: true,
    image: "https://images.unsplash.com/photo-1613490908578-8318b76cecc1?q=80&w=1200",
    description: "An elegant, architectural masterpiece of a villa in Patia, Bhubaneswar, showcasing beautiful stone pillars and modern landscaping. Built strictly in compliance with Vastu Shastra principles.",
    amenities: ["Parking", "Security", "Swimming Pool", "Garden", "Clubhouse", "CCTV"],
    vastuCompliant: true,
    furnishing: "Unfurnished",
    city: "Bhubaneswar",
    area: "Patia",
    landmark: "Near KIIT Square",
    bhk: 5,
    facing: "North",
    availability: "Buy",
    projectName: "Temple View Enclave"
  },
  {
    id: "prop-3",
    title: "Delhi Skycrest Heights",
    location: "Connaught Place, Delhi",
    price: 120000000,
    beds: 3,
    baths: 4,
    sqft: 2800,
    type: "Apartment",
    status: "Under Construction",
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    description: "A luxury apartment located in the prime commercial zone of Connaught Place, New Delhi. Featuring smart automated climate controls and private elevator access.",
    amenities: ["Parking", "Lift", "Security", "Gym", "Power Backup", "Clubhouse", "CCTV"],
    vastuCompliant: false,
    furnishing: "Semi-Furnished",
    city: "Delhi",
    area: "Connaught Place",
    landmark: "Near India Gate",
    bhk: 3,
    facing: "West",
    availability: "Lease",
    projectName: "CP Skycrest Tower"
  },
  {
    id: "prop-4",
    title: "Koramangala Green Estate",
    location: "Koramangala, Bangalore",
    price: 25000000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: "Apartment",
    status: "Resale",
    featured: true,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200",
    description: "A serene residential apartment in Koramangala, Bangalore, surrounded by trees. Perfectly suitable for young tech executives looking for peaceful living.",
    amenities: ["Parking", "Lift", "Security", "Garden", "Power Backup", "Balcony", "CCTV"],
    vastuCompliant: true,
    furnishing: "Furnished",
    city: "Bangalore",
    area: "Koramangala",
    landmark: "Near Wipro Park",
    bhk: 2,
    facing: "East",
    availability: "Rent",
    projectName: "Garden City Heights"
  },
  {
    id: "prop-5",
    title: "Juhu Beachside Studio",
    location: "Juhu, Mumbai",
    price: 4500000,
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "Studio Apartment",
    status: "Ready to Move",
    featured: false,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200",
    description: "A beautiful sea-facing studio loft apartment in Juhu, Mumbai, a minute away from Juhu Beach. Equipped with modern interior fittings.",
    amenities: ["Lift", "Security", "Power Backup", "Balcony", "CCTV"],
    vastuCompliant: true,
    furnishing: "Furnished",
    city: "Mumbai",
    area: "Juhu",
    landmark: "Near Juhu Beach",
    bhk: 1,
    facing: "South",
    availability: "Rent",
    projectName: "Juhu Beach Condominiums"
  },
  {
    id: "prop-6",
    title: "Saheed Nagar Residency",
    location: "Saheed Nagar, Bhubaneswar",
    price: 7500000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Apartment",
    status: "Ready to Move",
    featured: false,
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200",
    description: "A highly affordable yet premium apartment block in Saheed Nagar, Bhubaneswar. Perfect location with close proximity to popular shopping centers.",
    amenities: ["Parking", "Lift", "Security", "Power Backup", "CCTV"],
    vastuCompliant: true,
    furnishing: "Semi-Furnished",
    city: "Bhubaneswar",
    area: "Saheed Nagar",
    landmark: "Near BMC Mall",
    bhk: 2,
    facing: "East",
    availability: "Buy",
    projectName: "BMC Residency"
  },
  {
    id: "prop-7",
    title: "Jayadev Royal Plot",
    location: "Jayadev Vihar, Bhubaneswar",
    price: 3500000,
    beds: 1,
    baths: 0,
    sqft: 2400,
    type: "Plot",
    status: "Newly Launched",
    featured: false,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
    description: "A prime residential plot of land ready for immediate registration and villa construction in Jayadev Vihar, Bhubaneswar.",
    amenities: ["Security", "Garden", "CCTV"],
    vastuCompliant: true,
    furnishing: "Unfurnished",
    city: "Bhubaneswar",
    area: "Jayadev Vihar",
    landmark: "Near Pal Heights Mall",
    bhk: 1,
    facing: "East",
    availability: "Buy",
    projectName: "Jayadev Royal Enclave"
  },
  {
    id: "prop-8",
    title: "GK Corporate Office",
    location: "Greater Kailash, Delhi",
    price: 45000000,
    beds: 3,
    baths: 3,
    sqft: 3500,
    type: "Office Space",
    status: "Ready to Move",
    featured: false,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    description: "A highly functional corporate office space in Greater Kailash, Delhi, with premium workstation partitions and manager cabins.",
    amenities: ["Parking", "Lift", "Security", "Power Backup", "CCTV"],
    vastuCompliant: true,
    furnishing: "Semi-Furnished",
    city: "Delhi",
    area: "Greater Kailash",
    landmark: "Near M-Block Market",
    bhk: 3,
    facing: "North",
    availability: "Lease",
    projectName: "GK Corporate Hub"
  },
  {
    id: "prop-9",
    title: "Whitefield Innovation Center",
    location: "Whitefield, Bangalore",
    price: 150000000,
    beds: 5,
    baths: 6,
    sqft: 12000,
    type: "Commercial",
    status: "Under Construction",
    featured: false,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    description: "A state-of-the-art commercial park situated in the technical corridor of Whitefield, Bangalore. Excellent investment yielding high rental returns.",
    amenities: ["Parking", "Lift", "Security", "Gym", "Power Backup", "Clubhouse", "CCTV"],
    vastuCompliant: true,
    furnishing: "Unfurnished",
    city: "Bangalore",
    area: "Whitefield",
    landmark: "Near ITPL Main Road",
    bhk: 5,
    facing: "South",
    availability: "Buy",
    projectName: "Whitefield Innovation Hub"
  },
  {
    id: "prop-10",
    title: "Malabar Hill Manor",
    location: "Malabar Hill, Mumbai",
    price: 250000000,
    beds: 5,
    baths: 6,
    sqft: 6800,
    type: "Villa",
    status: "Ready to Move",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
    description: "A colossal luxury estate mansion in Malabar Hill, Mumbai. Offers absolute privacy, a personal pool, multi-car parking space, and customized premium interiors.",
    amenities: ["Parking", "Security", "Swimming Pool", "Gym", "Garden", "Power Backup", "Clubhouse", "Balcony", "CCTV"],
    vastuCompliant: true,
    furnishing: "Furnished",
    city: "Mumbai",
    area: "Malabar Hill",
    landmark: "Near Raj Bhavan",
    bhk: 5,
    facing: "East",
    availability: "Buy",
    projectName: "Malabar Mansions"
  },
  {
    id: "prop-11",
    title: "Vasant Vihar Townhouse",
    location: "Vasant Vihar, Delhi",
    price: 65000000,
    beds: 4,
    baths: 4,
    sqft: 3800,
    type: "House",
    status: "Newly Launched",
    featured: false,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    description: "A luxury multi-level house in Vasant Vihar, Delhi, featuring private security, lawn, terrace, and modular kitchen set.",
    amenities: ["Parking", "Security", "Garden", "Power Backup", "Balcony", "CCTV"],
    vastuCompliant: true,
    furnishing: "Semi-Furnished",
    city: "Delhi",
    area: "Vasant Vihar",
    landmark: "Near Priya Cinema Market",
    bhk: 4,
    facing: "North",
    availability: "Buy",
    projectName: "Vasant Vihar Townhomes"
  },
  {
    id: "prop-12",
    title: "Indiranagar Executive Studio",
    location: "Indiranagar, Bangalore",
    price: 3500000,
    beds: 1,
    baths: 1,
    sqft: 500,
    type: "Studio Apartment",
    status: "Ready to Move",
    featured: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200",
    description: "A compact studio apartment for executives located directly in the bustling restaurant hub of Indiranagar, Bangalore.",
    amenities: ["Security", "Power Backup", "CCTV"],
    vastuCompliant: true,
    furnishing: "Furnished",
    city: "Bangalore",
    area: "Indiranagar",
    landmark: "Near 100 Feet Road",
    bhk: 1,
    facing: "South",
    availability: "Rent",
    projectName: "Indiranagar Suites"
  }
];

export async function fetchAllProperties(): Promise<Property[]> {
  return properties;
}

export async function fetchFeaturedProperties(): Promise<Property[]> {
  return properties.filter(p => p.featured);
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  return properties.find(p => p.id === id);
}
