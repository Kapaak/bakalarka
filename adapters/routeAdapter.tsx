import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { GeneratedRoute, GeneratedRouteWithAuthor, RouteData } from "@/domains";
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

export const useGetRouteByRouteId = (routeId: string) => {
  const { data, isLoading, isError, error, isSuccess } =
    useQuery<GeneratedRouteWithAuthor>(["route", routeId], () =>
      fetcher("route", `?id=${routeId}`)
    );

  return {
    route: data as GeneratedRouteWithAuthor,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export const useCreateRoute = () => {
  const { mutateAsync } = useMutation<GeneratedRoute>(["routes"], (data) =>
    fetcherPost("route", data)
  );

  const handleCreate = useCallback(
    async (data: GeneratedRoute) => {
      console.log(data, "dd");

      await mutateAsync(data);
    },
    [mutateAsync]
  );

  return {
    createTodo: handleCreate,
  };
};

// export const useUpdateRouteById = () => {
//   const { mutateAsync, isLoading } = useMutation<GeneratedRoute[]>(
//     ["routes"],
//     () => fetcherPost("route",{},``)
//   );

//   const handleUpdateRouteDetail = useCallback(
//     async (id: string, routeData: Partial<RouteData>) => {
//       await mutateAsync({ id, routeData });
//     },
//     [mutateAsync]
//   );

//   return {
//     updateRouteDetail: handleUpdateRouteDetail,
//     isLoading,
//   };
// };

export const useUpdateRouteById = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation<
    GeneratedRoute,
    Error,
    {
      id: string;
      routeData: Partial<GeneratedRoute>;
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
      mutateAsync({ id, routeData });
    },
    [mutateAsync]
  );

  return {
    updateRouteDetail: handleUpdateRouteDetail,
    isLoading,
  };
};
