import Button from "@/components/ui/Button";
import { useState } from "react";

export const RestaurantMapButton = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return <Button onClick={() => setIsMapOpen(true)} text="Mapa" />;
};
