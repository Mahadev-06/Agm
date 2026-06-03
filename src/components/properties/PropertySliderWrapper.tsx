"use client";

import { Property } from "@/lib/data";
import { PropertySlider } from "./PropertySlider";

interface PropertySliderWrapperProps {
  properties: Property[];
}

export function PropertySliderWrapper({ properties }: PropertySliderWrapperProps) {
  return <PropertySlider properties={properties} />;
}
