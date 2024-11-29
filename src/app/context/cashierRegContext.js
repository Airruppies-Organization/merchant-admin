"use client";

import { useReducer, createContext, useEffect } from "react";

export const CashierAuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      return {
        cashier: action.payload,
      };

    case "LOGOUT":
      return { cashier: null };

    default:
      return state;
  }
};

export const CashierRegContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { cashier: null });

  useEffect(() => {
    const checker = () => {
      const storedCashier = localStorage.getItem("cashier");
      const cashier = storedCashier ? JSON.parse(storedCashier) : null;

      if (cashier) {
        dispatch({ type: "SIGNUP", payload: cashier });
      }
    };

    checker();
  }, []);

  return (
    <CashierAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CashierAuthContext.Provider>
  );
};
