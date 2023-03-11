import { LatLngLiteral } from "@/domains";
import { useState } from "react";

export const useRoute = () => {
  const [startPoint, setStartPoint] = useState({ lat: null, lng: null });
  const [finishPoint, setFinishPoint] = useState({ lat: null, lng: null });

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
