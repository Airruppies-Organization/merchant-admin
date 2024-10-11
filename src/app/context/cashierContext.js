"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const CashierContext = createContext();

export const CashierProvider = ({ children }) => {
  const [cart, setCart] = useState({
    data: [],
    status: "",
    method: "",
  });
  const [getErr, setGetErr] = useState("");
  const [values, setValues] = useState(["", "", ""]);
  const [voidModal, setVoidModal] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const sessData = localStorage.getItem("currSession");

  //   try {
  //     const parsedData = sessData ? JSON.parse(sessData) : null;
  //     if (!parsedData) {
  //       router.push("/cashier");
  //     } else {
  //       setCart(parsedData);
  //     }
  //   } catch (error) {
  //     console.error("Invalid session data:", error);
  //     localStorage.removeItem("currSession");
  //     router.push("/cashier");
  //   }
  // }, []);

  const cartItems = async () => {
    const code = values.join("");

    try {
      const response = await fetch(
        `http://localhost:7000/api/sessionData?code=${code}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = await response.json();
      // Store session data in localStorage and update state
      localStorage.setItem("currSession", JSON.stringify(result));
      setCart(result); // Update the cart state with the fetched data

      // Reset the form values
      setValues(["", "", ""]);

      // Navigate to the cart page
      router.push("/cashier/cart");
    } catch (error) {
      console.error("Error fetching session data:", error.message);
      alert(error.message);
      setValues(["", "", ""]);
    }
  };

  const clearItem = async (meth, vod) => {
    const post = await fetch("http://localhost:7000/api/salesData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cart,
        status: !vod ? "Paid" : vod,
        method: meth,
        total: cart.data.reduce((prev, curr) => prev + curr.price, 0),
      }),
    });

    await post.json();

    alert("Cart items cleared successfully");

    const response = await fetch(
      `http://localhost:7000/api/sessionData?code=${cart.code}`,
      {
        method: "DELETE",
      }
    );

    await response.json();

    localStorage.removeItem("currSession");
    router.push("/cashier");
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
      }}
    >
      {children}
    </CashierContext.Provider>
  );
};

export default CashierContext;
