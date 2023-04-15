import { useGetRoutes } from "@/adapters";

export const useGetAllRoutes = () => {
  const { routes, isLoading, isError, error, isSuccess } = useGetRoutes();

  return {
    routes,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
