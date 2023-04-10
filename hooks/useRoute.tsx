import { useEffect, useState } from "react";

import { LatLngLiteral, TranslatedPoints } from "@/domains";
import { handleAddressFromCoordinates } from "@/utils";

export const useRoute = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [crossingPoints, setCrossingPoints] = useState<LatLngLiteral[]>([]);
  const [finishPoint, setFinishPoint] = useState({ lat: 0, lng: 0 });
  const [translatedPoints, setTranslatedPoints] = useState<TranslatedPoints>({
    startPoint: "",
    finishPoint: "",
    crossingPoints: [],
  });

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

  useEffect(() => {
    handleAddressFromCoordinates(startPoint).then(
      (val) =>
        val[0] &&
        setTranslatedPoints((prev) => ({
          ...prev,
          startPoint: val?.[0]?.formatted_address,
        }))
    );
  }, [startPoint]);

  useEffect(() => {
    handleAddressFromCoordinates(
      crossingPoints[crossingPoints.length - 1]
    ).then((val) => {
      console.log(val?.[0], "xx");

      val?.[0] &&
        setTranslatedPoints((prev) => ({
          ...prev,
          crossingPoints: [
            ...prev?.crossingPoints,
            val?.[0]?.formatted_address,
          ],
        }));
    });
  }, [crossingPoints]);

  useEffect(() => {
    handleAddressFromCoordinates(finishPoint).then(
      (val) =>
        val[0] &&
        setTranslatedPoints((prev) => ({
          ...prev,
          finishPoint: val?.[0]?.formatted_address,
        }))
    );
  }, [finishPoint]);

  return {
    startPoint,
    finishPoint,
    crossingPoints,
    updateStartPoint,
    updateFinishPoint,
    addCrossingPoint,
    removeCrossingPointByIndex,
    translatedPoints,
  };
};
