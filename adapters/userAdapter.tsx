import { useQuery } from "react-query";

import { User } from "@/domains";
import { fetcher } from "@/utils";

export const useGetUsers = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<User[]>(
    ["users"],
    () => fetcher("user"),
    { initialData: [] }
  );

  return {
    users: data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export const useGetUserByUserId = (userId: string) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<User>(
    ["user", userId],
    () => fetcher("user", `?id=${userId}`),
    { enabled: Boolean(userId) }
  );

  return {
    user: data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
