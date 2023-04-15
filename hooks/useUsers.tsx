import { useGetUsers } from "@/adapters";

export const useGetAllUsers = () => {
  const { users, isLoading, isError, error, isSuccess } = useGetUsers();

  return {
    users,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
