"use client";
import React, { useContext, useEffect } from "react";
import Sub from "../codeInput/sub";
import Header from "@/app/app_component/header";
import Products from "./product";
import Detail from "./detail";
import CashierContext from "@/app/context/cashierContext";
import ClearConfirm from "./clearConfirm";

const Cart = () => {
  const { cart, voidModal } = useContext(CashierContext);

  const date = new Date(cart.createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "pm" : "am";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeekNumber = date.getDay();
  const dayOfWeek = daysOfWeek[dayOfWeekNumber];

  const formattedDate = `${dayOfWeek}, ${day} ${months[month]}, ${year}`;
  const formattedTime = `${(hours % 12 || 12)
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${meridiem}`;
  return (
    <div>
      <div className="w-[70vw] mr-auto ml-auto relative">
        <Header name="Samuel T. Kayode" role="Cashier" />
        <Sub />

        <section className="flex justify-between">
          <div className="w-full mr-10">
            <div className="flex justify-between mt-5 w-full">
              <div>
                <p className="text-xs font-semibold">
                  Customer: Mr Okoro Obinna
                </p>
                <p className="text-xs">Order ID: 947482789432</p>
              </div>
              <div>
                <p className="text-xs">{formattedDate}</p>
                <p className="text-xs">{formattedTime}</p>
              </div>
            </div>

            {/* products */}
            <div className="mt-14 w-[60%]">
              <p className="w-full border-b border-b-black">Orders</p>
              <div className="w-full">
                {cart?.orders?.length ? (
                  cart.orders.map((item, index) => (
                    <Products
                      key={index}
                      id={item._id}
                      name={item.product_name}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  ))
                ) : (
                  <p>No items in the cart.</p> // A fallback message when the cart is empty
                )}
              </div>
            </div>
          </div>
          <div>
            <Detail
              status={cart.paymentStatus}
              method={cart.paymentMethod}
              total={cart?.price}
            />
          </div>
        </section>
      </div>
      {voidModal && <ClearConfirm />}
    </div>
  );
};

export default Cart;
