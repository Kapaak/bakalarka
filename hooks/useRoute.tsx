import { LatLngLiteral } from "@/domains";
import { useState } from "react";

export const useRoute = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [finishPoint, setFinishPoint] = useState({ lat: 0, lng: 0 });

  const updateStartPoint = (coordinates: LatLngLiteral) => {
    setStartPoint(coordinates);
  };

  return {
    startPoint,
    updateStartPoint,
    setFinishPoint,
    finishPoint,
  };
};
