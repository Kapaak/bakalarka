import { useCallback } from "react";
import { useMutation } from "react-query";

import { fetcherPost } from "@/utils";

import type { RegisterUser } from "@/domains";

export const useRegisterUser = () => {
  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation<RegisterUser>(["register-user"], (data) =>
      fetcherPost("user", data)
    );

  const handleRegister = useCallback(
    async (data: RegisterUser) => {
      //@ts-ignore
      return await mutateAsync(data);
    },
    [mutateAsync]
  );

  return {
    isLoading,
    isError,
    error,
    isSuccess,
    registerUser: handleRegister,
  };
};
