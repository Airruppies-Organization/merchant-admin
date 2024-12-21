import { useState } from "react";
import { useCashierAuthContext } from "./useCashierAuthContext";

export const useSetCashierPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useCashierAuthContext();

  const setPassword = async (badge_id, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:7000/merchant/cashier/auth/createPassword",
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

  return { setPassword, isLoading, error };
};
