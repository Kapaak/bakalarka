import { useQuery } from "react-query";

import { User } from "@/domains";
import axios from "axios";

export const useGetUsers = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery<User[]>(
    ["users"],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`)
        .then((val) => val.data),
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
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user?id=${userId}`)
        .then((val) => val.data),
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
