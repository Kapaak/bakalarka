import { useUpdateRouteById } from "@/adapters";

export const useUpdateRouteDetail = () => {
  const { updateRouteDetail, isLoading } = useUpdateRouteById();

  return {
    updateRouteDetail,
    isLoading,
  };
};
