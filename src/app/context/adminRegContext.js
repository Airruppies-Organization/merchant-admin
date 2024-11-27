"use client";

import { useReducer, createContext, useEffect } from "react";

export const AdminAuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      return {
        admin: action.payload,
      };

    case "LOGOUT":
      return { admin: null };

    default:
      return state;
  }
};

export const AdminRegContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { admin: null });

  useEffect(() => {
    const checker = () => {
      const storedAdmin = localStorage.getItem("admin");
      const admin = storedAdmin ? JSON.parse(storedAdmin) : null;

      if (admin) {
        dispatch({ type: "SIGNUP", payload: admin });
      }
    };

    checker();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
