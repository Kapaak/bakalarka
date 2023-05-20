import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { LatLngLiteral, RoutePoint } from "@/domains";
import { reverseGeocoding } from "@/utils";
import { nanoid } from "nanoid";

import { useGetRouteById } from "./useRoute";

const defaultPoints = [
  {
    id: "0",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    value: "",
  },
  {
    id: "1",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    value: "",
  },
];

export const useRoutePoints = () => {
  const [allowAddCrossingPts, setAllowAddCrossingPts] = useState(false);
  const [distance, setDistance] = useState(0);

  const { query } = useRouter();
  const { route } = useGetRouteById(query.routeId as string);

  const [routePoints, setRoutePoints] = useState(route?.routePoints);

  useEffect(() => {
    //when creating new rote I get undefined from useGetRouteById
    if (route) setRoutePoints(route?.routePoints);
    else setRoutePoints(defaultPoints);
  }, [route]);

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

  const toggleAddCrossingPts = () => {
    setAllowAddCrossingPts((prev) => !prev);
  };

  const changeDistance = (newDistance: number) => {
    setDistance(newDistance);
  };

  return {
    distance,
    changeDistance,
    allowAddCrossingPts,
    toggleAddCrossingPts,
    updatePointById,
    removePointById,
    addPointBeforeLast,
    routePoints,
  };
};
