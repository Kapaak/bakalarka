import { useState } from "react";

import { LatLngLiteral, RoutePoint } from "@/domains";
import { reverseGeocoding } from "@/utils";
import { nanoid } from "nanoid";

export const useRoutePoints = () => {
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

  const getAddressName = async (coordinates: LatLngLiteral) => {
    const geocoding = await reverseGeocoding(coordinates);
    const data = geocoding.features[0];

    return data?.place_name ?? "";
  };

  const updatePointById = async (id: string, coordinates: LatLngLiteral) => {
    const targetPoint = structuredClone(
      routePoints.find((point) => point.id === id)
    );

    if (targetPoint) {
      targetPoint.coordinates = coordinates;

      targetPoint.value = await getAddressName(coordinates);

      setRoutePoints((prev) => [
        ...prev.map((pt) => (pt.id === id ? targetPoint : pt)),
      ]);
    }
  };

  const addPointBeforeLast = async (coordinates?: LatLngLiteral) => {
    if (routePoints.length > 0) {
      //by default has coordinates of last element, so that it doesnt break routing
      const newPoint: RoutePoint = {
        coordinates:
          coordinates ?? routePoints[routePoints.length - 1].coordinates,
        id: nanoid(),
        value: "",
      };

      if (coordinates) {
        newPoint.value = await getAddressName(coordinates);
      }

      const newRoutePoints = structuredClone(routePoints);

      const index = routePoints.length - 1;
      newRoutePoints.splice(index, 0, newPoint);

      setRoutePoints(newRoutePoints);
    }
  };

  const removePointById = (id: string) => {
    const newRoutePoints = structuredClone(routePoints)?.filter(
      (routePoint) => routePoint.id !== id
    );

    setRoutePoints(newRoutePoints);
  };

  return {
    updatePointById,
    removePointById,
    addPointBeforeLast,
    routePoints,
  };
};
