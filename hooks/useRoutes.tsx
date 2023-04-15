import { useMemo } from "react";

import { RouteRow } from "@/domains";

import { useGetRoutes } from "@/adapters";

export const useGetAllRoutes = () => {
  const { routes, isLoading, isError, error, isSuccess } = useGetRoutes();

  const convertedRoutes = useMemo(
    (): RouteRow[] =>
      routes?.map((route) => ({
        id: route.id,
        name: route.name,
        value: "todo", //generate url from string
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
