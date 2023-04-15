import { useQuery } from "react-query";

import { Route } from "@/domains";
import { fetcher } from "@/utils";

export const useGetRoutes = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<Route[]>(
    ["routes"],
    () => fetcher("route"),
    {
      initialData: [],
    }
  );

  return {
    routes: data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
