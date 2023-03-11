import { LatLngLiteral } from "@/domains";
import { useState } from "react";

export const useRoute = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [crossingPoints, setCrossingPoints] = useState<LatLngLiteral[]>([]);
  const [finishPoint, setFinishPoint] = useState({ lat: 0, lng: 0 });

  const updateStartPoint = (coordinates: LatLngLiteral) => {
    setStartPoint(coordinates);
  };

  const updateFinishPoint = (coordinates: LatLngLiteral) => {
    setFinishPoint(coordinates);
  };

  const addCrossingPoint = (coordinates: LatLngLiteral) => {
    setCrossingPoints((prev) => [...prev, coordinates]);
  };

  const removeCrossingPointByIndex = (index: number) => {
    const newCrossingPoints = crossingPoints?.filter((_, i) => i !== index);

    setCrossingPoints(newCrossingPoints);
  };

  return {
    startPoint,
    finishPoint,
    crossingPoints,
    updateStartPoint,
    updateFinishPoint,
    addCrossingPoint,
    removeCrossingPointByIndex,
  };
};
