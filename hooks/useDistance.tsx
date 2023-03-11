// import L from "leaflet";
import { LatLngLiteral } from "@/domains";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// const latLng = dynamic(
//   () => import("leaflet").then((module) => module.latLngBounds),
//   {
//     ssr: false,
//   }
// );

//todo -> tohle udelej pres mapbox zase asi
interface DistanceProps {
  coordinatesFrom: LatLngLiteral;
  coordinatesTo: LatLngLiteral;
}

export const useDistance = ({
  coordinatesFrom,
  coordinatesTo,
}: DistanceProps) => {
  // const fromLatLng = latLng(coordinatesFrom);
  // const toLatLng = latLng(coordinatesTo);

  // const dist = fromLatLng.distanceTo(toLatLng);
  // const fromLatLng = L.latLng(coordinatesFrom);
  // const toLatLng = L.latLng(coordinatesTo);

  return {
    data: [],
    // distance: "dsad",
    // distance: dist,
  };
};
