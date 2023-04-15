import { useGetUserByUserId } from "@/adapters";

export const useGetUserById = (id: string) => {
  const { user, isLoading, isError, error, isSuccess } = useGetUserByUserId(id);

  return {
    user,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
