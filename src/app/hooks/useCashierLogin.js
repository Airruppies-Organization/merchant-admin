import { useState } from "react";
import { useCashierAuthContext } from "./useCashierAuthContext";

export const useCashierLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useCashierAuthContext();

  const login = async (badge_id, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:7000/merchant/cashier/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ badge_id, password }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(result.error);
    }

    if (response.ok) {
      localStorage.setItem("cashier", JSON.stringify(result));
      // alert(`${result}`);
      dispatch({ type: "SIGNUP", payload: result });
      setIsLoading(false);
      return true;
    }
  };

  return { login, isLoading, error };
};
