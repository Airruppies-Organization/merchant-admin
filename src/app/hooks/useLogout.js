import { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
// import DataContext from "@/context/context";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  // const { setOrders, setCart } = useContext(DataContext);

  const logout = async () => {
    const res = await fetch("http://localhost:7000/merchant/api/signout");

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      return result;
    }

    // dispatch({ type: "LOGOUT" });

    return false;
    // setOrders([]);
    // setCart([]);
  };

  return { logout };
};
