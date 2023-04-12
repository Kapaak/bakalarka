import { useCallback, useEffect, useState } from "react";

import { LatLngLiteral, TranslatedPoints } from "@/domains";
import { isEqualCoords, reverseGeocoding } from "@/utils";

export const useRoute = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [crossingPoints, setCrossingPoints] = useState<LatLngLiteral[]>([]);
  const [finishPoint, setFinishPoint] = useState({ lat: 0, lng: 0 });
  const [translatedPoints, setTranslatedPoints] = useState<TranslatedPoints>({
    startPoint: "",
    finishPoint: "",
    crossingPoints: [],
  });

  const updateStartAndFinishPoints = useCallback(
    (start: LatLngLiteral, finish: LatLngLiteral) => {
      console.log(start, "start");
      console.log(finish, "finish");

      if (start.lat !== startPoint.lat && start.lng !== startPoint.lng) {
        setStartPoint(start);
        console.log("start se zmenil");
      }

      //todo add ability to update crossing here too, it blinks too much at this time of writing

      if (finish.lat !== finishPoint.lat && finish.lng !== finishPoint.lng) {
        setFinishPoint(finish);
        console.log("finish se zmenil");
      }
    },
    [finishPoint.lat, finishPoint.lng, startPoint.lat, startPoint.lng]
  );

  const updateStartPoint = useCallback((coordinates: LatLngLiteral) => {
    setStartPoint(coordinates);
  }, []);

  const updateFinishPoint = useCallback((coordinates: LatLngLiteral) => {
    setFinishPoint(coordinates);
  }, []);

  const addCrossingPoint = useCallback((coordinates: LatLngLiteral) => {
    setCrossingPoints((prev) => [...prev, coordinates]);
  }, []);

  const removePointByCoordinates = useCallback(
    (coordinates: LatLngLiteral) => {
      const index = crossingPoints.findIndex((crossingPoint) =>
        isEqualCoords(coordinates, crossingPoint)
      );

      console.log("remove");
      if (index > -1) {
        console.log("rsrly");
        const newCrossingPoints = [...crossingPoints];
        newCrossingPoints.splice(index, 1);
        const newTranslatedPoints = [...translatedPoints.crossingPoints];
        newTranslatedPoints.splice(index, 1);

        setCrossingPoints(newCrossingPoints);
        setTranslatedPoints((prev) => ({
          ...prev,
          crossingPoints: newTranslatedPoints,
        }));
      }
    },
    [crossingPoints, translatedPoints.crossingPoints]
  );

  const removeCrossingPointByIndex = (index: number) => {
    const newCrossingPoints = crossingPoints?.filter((_, i) => i !== index);

    setCrossingPoints(newCrossingPoints);
  };

  useEffect(() => {
    reverseGeocoding(startPoint).then((val) => {
      val?.features[0] &&
        setTranslatedPoints((prev) => ({
          ...prev,
          startPoint: val?.features[0]?.place_name,
        }));
    });
  }, [startPoint]);

  useEffect(() => {
    console.log("crossing", crossingPoints);

    reverseGeocoding(crossingPoints[crossingPoints.length - 1]).then((val) => {
      val?.features &&
        crossingPoints.length > 0 &&
        setTranslatedPoints((prev) => ({
          ...prev,
          crossingPoints: [
            ...prev?.crossingPoints,
            val?.features[0]?.place_name,
          ],
        }));
    });
  }, [crossingPoints]);

  useEffect(() => {
    reverseGeocoding(finishPoint).then((val) => {
      val?.features[0] &&
        setTranslatedPoints((prev) => ({
          ...prev,
          finishPoint: val?.features[0]?.place_name,
        }));
    });
  }, [finishPoint]);

  return {
    startPoint,
    finishPoint,
    crossingPoints,
    updateStartPoint,
    updateFinishPoint,
    updateStartAndFinishPoints,
    addCrossingPoint,
    removePointByCoordinates,
    removeCrossingPointByIndex,
    translatedPoints,
  };
};
