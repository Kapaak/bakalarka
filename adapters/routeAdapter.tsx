import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { GeneratedRouteWithAuthor, Route, RouteData } from "@/domains";
import { fetcher, fetcherPost } from "@/utils";
import axios from "axios";

export const useGetRoutes = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<
    GeneratedRouteWithAuthor[]
  >(["routes"], () => fetcher("route"), {
    initialData: [],
  });

  return {
    routes: data as GeneratedRouteWithAuthor[],
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export const useCreateRoute = () => {
  const { mutateAsync } = useMutation<Route[]>(["routes"], () =>
    fetcherPost("route", {})
  );

  const handleCreate = useCallback(async () => {
    await mutateAsync();
  }, [mutateAsync]);

  return {
    createTodo: handleCreate,
  };
};

export const useUpdateRouteById = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<
    Route,
    Error,
    {
      id: string;
      routeData: Partial<Route>;
    },
    any
  >(
    async ({ id, routeData }) =>
      axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/route?id=${id}`,
        routeData
      ),
    {
      onMutate: async ({ routeData, id }) => {
        console.log(routeData, "old routeData");

        await queryClient.cancelQueries(["route", id]);

        const previousTodo = queryClient.getQueryData(["route", id]);

        queryClient.setQueryData(["route", id], routeData);

        return {
          previousTodo,
          routeData,
        };
      },
      onError: (err, variables, context) => {
        console.log(context, "ctx");

        queryClient.setQueryData(
          ["route", context.todo.id],
          context.previousTodo
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries("route");
      },
    }
  );

  const handleUpdateRouteDetail = useCallback(
    (id: string, routeData: Partial<RouteData>) => {
      mutate({ id, routeData });
    },
    [mutate]
  );

  return {
    updateRouteDetail: handleUpdateRouteDetail,
    isLoading,
  };
};
