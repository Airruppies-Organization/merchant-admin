"use client";
import { createContext, useEffect, useState } from "react";
import { useCashierAuthContext } from "../hooks/useCashierAuthContext";
import { usePathname, useRouter } from "next/navigation";

export const CashierContext = createContext();

export const CashierProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState({});
  const [getErr, setGetErr] = useState("");
  const [values, setValues] = useState(["", "", "", "", "", "", ""]);
  const [voidModal, setVoidModal] = useState(false);
  const [loginField, setLoginField] = useState({
    badge_id: "",
    password: "",
  });

  const router = useRouter();
  const pathname = usePathname();
  const { cashier } = useCashierAuthContext();

  // useEffect(() => {
  //   const currSession = localStorage.getItem("currSession");
  //   setCart(currSession ? JSON.parse(currSession) : []); // or any default value
  // }, []);

  useEffect(() => {
    // Only proceed if the current path is within the admin platform
    if (!pathname.startsWith("/cashier")) return; // This is the main gateway for the admin platform

    // Step 1: Check if the user is authenticated (verify token)
    const checkAuthentication = async () => {
      try {
        const res = await fetch(
          "http://localhost:7000/merchant/cashier/check-auth",
          {
            credentials: "include",
          }
        );

        const result = await res.json();

        console.log(result);

        if (result.success && res.ok) {
          if (!pathname.includes("/cashier/app")) {
            router.push("/cashier/app/codeInput");
          }

          setIsAuthenticated(true); // Token is valid
        }

        if (!res.ok) {
          throw new Error(result.error);
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/cashier/auth/login");
      }
    };

    checkAuthentication();
  }, [router]);

  // useEffect(() => {
  //   const localCashier = localStorage.getItem("cashier");
  //   if (
  //     !localCashier &&
  //     !pathname.includes("auth") &&
  //     pathname.includes("cashier") &&
  //     !pathname.includes("admin") // to be reviewed
  //   ) {
  //     router.push("/cashier/auth/login");
  //   }
  //   if (
  //     localCashier &&
  //     pathname.includes("auth") &&
  //     pathname.includes("cashier") &&
  //     !pathname.includes("admin") // to be reviewed
  //   ) {
  //     router.push("/cashier/app/codeInput");
  //   }
  // }, [cashier]);

  const cartItems = async () => {
    const code = values.join("");

    try {
      const response = await fetch(
        `http://localhost:7000/merchant/cashier/billData?code=${code}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = await response.json();
      console.log(result);

      // Store session data in localStorage and update state
      localStorage.setItem("currSession", JSON.stringify(result));
      setCart(result); // Update the cart state with the fetched data

      // Reset the form values
      setValues(["", "", "", "", "", "", ""]);

      // Navigate to the cart page
      router.push("/cashier/app/cart");
    } catch (error) {
      console.error("Error fetching session data:", error.message);
      alert(error.message);
      setValues(["", "", "", "", "", "", ""]);
    }
  };

  const clearItem = async () => {
    try {
      // POST request to save sales data
      const postResponse = await fetch(
        "http://localhost:7000/merchant/cashier/salesData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // authorization: `Bearer ${cashier.token}`,
          },
          body: JSON.stringify({
            bill_code: cart.bill_code,
            data: cart.orders,
            status: cart.paymentStatus,
            payment_method: cart.paymentMethod,
            total_price: cart.price,
          }),
          credentials: "include",
        }
      );

      // Handle POST response
      if (!postResponse.ok) {
        const error = await postResponse.json();
        throw new Error(`Error saving sales data: ${error.message}`);
      }

      console.log("Sales data saved successfully:", await postResponse.json());

      // DELETE request to clear session data
      const deleteResponse = await fetch(
        `http://localhost:7000/merchant/cashier/billData?code=${encodeURIComponent(
          cart.bill_code
        )}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${cashier.token}`,
          },
          credentials: "include",
        }
      );

      // Handle DELETE response
      if (!deleteResponse.ok) {
        const error = await deleteResponse.json();
        throw new Error(`Error clearing session data: ${error.message}`);
      }

      if (deleteResponse.ok) {
        await deleteResponse.json();

        // Notify the user and reset the session
        // alert("Cart items cleared successfully");
        localStorage.removeItem("currSession");
        router.push("/cashier/app/codeInput");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const voidHandler = (cond) => {
    if (cond === "no") {
      setVoidModal(() => false);
    } else if (cond === "yes") {
      clearItem("NIL", "Void");
      setVoidModal(() => false);
    }
  };

  return (
    <CashierContext.Provider
      value={{
        cart,
        setCart,
        values,
        setValues,
        cartItems,
        clearItem,
        voidModal,
        setVoidModal,
        voidHandler,
        loginField,
        setLoginField,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
};

export default CashierContext;
