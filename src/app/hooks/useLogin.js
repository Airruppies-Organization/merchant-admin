import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // const [redirect, setRedirect] = useState("");
  // const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:7000/merchant/admin/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    }

    if (response.ok) {
      // setRedirect(result.redirect);
      // alert(`${result}`);
      // dispatch({ type: "SIGNUP", payload: result });
      setIsLoading(false);
      return result;
    }
  };

  return { login, isLoading, error };
};
