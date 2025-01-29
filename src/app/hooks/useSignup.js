import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password, merchant_id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/merchant/admin/auth/createAdmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          merchant_id,
        }),
      }
    );

    const result = await response.json();

    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(result.error);
    //   return false;
    // }
    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    }

    if (response.ok) {
      // localStorage.setItem("admin", JSON.stringify(result));
      // dispatch({ type: "SIGNUP", payload: result });
      setIsLoading(false);
      return result;
    }
  };

  return { signup, isLoading, error };
};
