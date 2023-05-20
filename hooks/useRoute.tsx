import {
  useCreateRoute,
  useGetRouteByRouteId,
  useUpdateRouteById,
} from "@/adapters";

export const useUpdateRouteDetail = () => {
  const { updateRouteDetail, isLoading } = useUpdateRouteById();

  return {
    updateRouteDetail,
    isLoading,
  };
};

export const useGetRouteById = (id: string) => {
  const { route, isLoading } = useGetRouteByRouteId(id);

  return {
    route,
    isLoading,
  };
};

export const useCreateNewRoute = () => {
  const { createRoute } = useCreateRoute();

  return {
    createRoute,
  };
};
