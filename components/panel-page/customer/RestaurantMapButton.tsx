"use client";
import Button from "@/components/ui/Button";
import { useState } from "react";
import MapModal from "@/components/modals/MapModal";
export const RestaurantMapButton = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsMapOpen(true)} text="Plan" />
      {isMapOpen && (
        <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
      )}
    </>
  );
};
