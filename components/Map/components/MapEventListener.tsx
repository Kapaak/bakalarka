import { useMapEvents } from "react-leaflet";

import { LatLngLiteral } from "@/domains";
import { Map } from "leaflet";

interface MapEventListenerProps {
  onClick(coordinates: LatLngLiteral): void;
  openPopup?(map: Map): void;
}

export const MapEventListener = ({
  onClick,
  openPopup,
}: MapEventListenerProps) => {
  const map = useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    drag: (e) => {
      console.log("dd");
    },
    // dragend: (e) => {
    //   console.log(e, "dragend");
    // },
    // add: (e) => {
    //   console.log("added");
    // },
    // dragstart: (e) => {
    //   console.log("dragstart");
    // },
    // locationfound: (e) => {
    //   console.log(e, "found");
    // },
    add: (e) => {
      console.log("added");
    },
    // layeradd: (e) => {
    //   console.log(e, "layer");
    // },
    // layerremove: (e) => {
    //   console.log(e, "removed layer");
    // },
  });

  return null;
};
