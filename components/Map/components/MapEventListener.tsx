import { useMapEvents } from "react-leaflet";

import { LatLngLiteral } from "@/domains";
import { Map } from "leaflet";

interface MapEventListenerProps {
  onClick(coordinates: LatLngLiteral): void;
  onDoubleClick(): void;
  openPopup?(map: Map): void;
}

export const MapEventListener = ({
  onClick,
  openPopup,
  onDoubleClick,
}: MapEventListenerProps) => {
  const map = useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    dblclick(e) {
      onDoubleClick();
    },
    add: (e) => {
      console.log("added");
    },
    // layeradd: (e) => {
    //   console.log(e, "layer");
    // },
    layerremove: (e) => {
      console.log(e, "removed layer");
    },
  });

  return null;
};
