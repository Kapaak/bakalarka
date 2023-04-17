import { useMemo } from "react";

import { useGetRoutes } from "@/adapters";
import { RouteRow } from "@/domains";

export const useGetAllRoutes = () => {
  const { routes, isLoading, isError, error, isSuccess } = useGetRoutes();

  const convertedRoutes = useMemo(
    (): RouteRow[] =>
      routes?.map((route) => ({
        id: route.id,
        name: route.name,
        value: route.value,
        distance: route.distance,
        likes: 0, //todo
        elevation: route?.elevation,
        author: route.author.name ?? "", //todo oprav, aby vracelo jen authorName
        createdAt: route.createdAt,
        interestingPlaces: route.interestingPlaces,
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
