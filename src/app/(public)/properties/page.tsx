import { fetchAllProperties } from "@/lib/data";
import { PropertiesCatalog } from "@/components/properties/PropertiesCatalog";

export default async function PropertiesPage() {
  const properties = await fetchAllProperties();

  return (
    <div className="w-full bg-[#faf2ea] py-10 min-h-screen">
      <PropertiesCatalog initialProperties={properties} />
    </div>
  );
}
