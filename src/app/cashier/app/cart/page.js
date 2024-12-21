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
                <p className="text-xs">Wednesday, 21st May, 2024</p>
                <p className="text-xs">3:54 pm</p>
              </div>
            </div>

            {/* products */}
            <div className="mt-14 w-[60%]">
              <p className="w-full border-b border-b-black">Orders</p>
              <div className="w-full">
                {cart?.data?.length ? (
                  cart.data.map((item, index) => (
                    <Products
                      key={index}
                      id={item._id}
                      name={item.name}
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
              status={cart.status}
              method={cart.method}
              total={cart?.data?.reduce((a, b) => a + b.price, 0)}
            />
          </div>
        </section>
      </div>
      {voidModal && <ClearConfirm />}
    </div>
  );
};

export default Cart;
