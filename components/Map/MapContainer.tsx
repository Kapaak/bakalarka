import { useLoadScript } from "@react-google-maps/api";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Map } from "./Map";
// const Map = dynamic<{}>(() => import("./Map").then((module) => module.Map), {
//   ssr: false,
// });

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
