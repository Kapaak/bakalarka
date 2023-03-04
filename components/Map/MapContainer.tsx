import { useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { Map } from "./Map";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

export const MapContainer = () => {
  const libraries = useMemo<Libraries>(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || "",
    libraries,
  });

  if (!isLoaded) return <div>Načítá....</div>;
  return (
    <div className="h-full ">
      <Map />
    </div>
  );
};
