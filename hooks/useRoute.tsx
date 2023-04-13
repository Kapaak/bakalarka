import { useCallback, useEffect, useState } from "react";

import { LatLngLiteral, RoutePoint, TranslatedPoints } from "@/domains";
import { isEqualCoords, reverseGeocoding } from "@/utils";
import { nanoid } from "nanoid";

export const useRoute = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [crossingPoints, setCrossingPoints] = useState<LatLngLiteral[]>([]);
  const [finishPoint, setFinishPoint] = useState({ lat: 0, lng: 0 });
  const [translatedPoints, setTranslatedPoints] = useState<TranslatedPoints>({
    startPoint: "",
    finishPoint: "",
    crossingPoints: [],
  });
  const [routePoints, setRoutePoints] = useState([
    {
      id: "0",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      value: "",
      //pointType:"start" //start | finish | crossingPoint
    },
    {
      id: "1",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      value: "",
    },
  ]);

  const updatePointById = async (id: string, coordinates: LatLngLiteral) => {
    const targetPoint = structuredClone(
      routePoints.find((point) => point.id === id)
    );
    console.log(targetPoint, "found");

    if (targetPoint) {
      targetPoint.coordinates = coordinates;

      const geocoding = await reverseGeocoding(targetPoint.coordinates);
      const data = geocoding.features[0];

      targetPoint.value = data?.place_name ?? "";

      console.log(targetPoint, "tarpo");

      setRoutePoints((prev) => [
        ...prev.map((pt) => (pt.id === id ? targetPoint : pt)),
      ]);
    }
  };

  const addPointBeforeLast = (coordinates?: LatLngLiteral) => {
    if (routePoints.length > 0) {
      //by default has coordinates of last element, so that it doesnt break routing
      const newPoint: RoutePoint = {
        coordinates:
          coordinates ?? routePoints[routePoints.length - 1].coordinates,
        id: nanoid(),
        value: "",
      };

      const newRoutePoints = structuredClone(routePoints);

      const index = routePoints.length - 1;
      newRoutePoints.splice(index, 0, newPoint);

      setRoutePoints(newRoutePoints);
    }
  };

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
    updatePointById,
    updateStartPoint,
    updateFinishPoint,
    updateStartAndFinishPoints,
    addCrossingPoint,
    addPointBeforeLast,
    removePointByCoordinates,
    removeCrossingPointByIndex,
    translatedPoints,
    routePoints,
  };
};
