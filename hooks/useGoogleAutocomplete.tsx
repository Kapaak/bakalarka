import { useMemo } from "react";

import { useLoadScript } from "@react-google-maps/api";

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

export const useGoogleAutocomplete = () => {
  const libraries = useMemo<Libraries>(() => ["places", "geometry"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS || "",
    libraries,
  });
  return {
    isLoaded,
  };
};
