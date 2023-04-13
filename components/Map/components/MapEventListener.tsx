import { useMapEvents } from "react-leaflet";

import { LatLngLiteral } from "@/domains";

interface MapEventListenerProps {
  onClick(coordinates: LatLngLiteral): void;
  onDoubleClick(): void;
  onReset(): void;
}

export const MapEventListener = ({
  onClick,
  onDoubleClick,
  onReset,
}: MapEventListenerProps) => {
  const map = useMapEvents({
    click(e) {
      onReset();

      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
    dblclick(e) {
      onDoubleClick();
    },
  });

  return null;
};
