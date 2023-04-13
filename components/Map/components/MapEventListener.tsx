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
  onDoubleClick,
}: MapEventListenerProps) => {
  const map = useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    dblclick(e) {
      onDoubleClick();
    },
  });

  return null;
};
