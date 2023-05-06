import { useMemo } from "react";

import { useGetRoutesByRouteLocation } from "@/adapters";
import { RouteRow } from "@/domains";
import { convertDateToString } from "@/utils";

export const useGetAllRoutes = (location: string) => {
  const { routes, isLoading, isError, error, isSuccess } =
    useGetRoutesByRouteLocation(location);

  const convertedRoutes = useMemo(
    (): RouteRow[] =>
      routes?.map((route) => ({
        id: route.id,
        name: route?.detail?.name,
        distance: route?.detail?.distance,
        likes: 0, //todo
        elevation: route?.detail?.elevation,
        authorName: route?.author?.name ?? "",
        createdAt: convertDateToString(route?.createdAt) ?? "",
        interestingPlaces: route?.detail?.interestingPlaces,
      })),
    [routes]
  );

  return {
    routes: convertedRoutes,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
