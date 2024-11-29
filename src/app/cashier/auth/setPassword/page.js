"use client";

import React, { useState } from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CashierContext from "@/app/context/cashierContext";

const SetPassword = () => {
  const [error, setError] = useState();
  const [passwordField, setPasswordField] = useState({
    password: "",
    confirm: "",
    badge: "",
  });

  const router = useRouter();

  const updatePassword = async () => {
    const res = await fetch(
      "http://localhost:7000/merchant/cashier/auth/createPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed typo here
        },
        body: JSON.stringify({
          badge_id: passwordField.badge,
          password: passwordField.password,
        }),
      }
    );

    const result = await res.json();

    if (res.ok) {
      router.push("/cashier/app/codeInput");
    }

    if (!res.ok) {
      console.log(result.error);
      setError(result.error);
    }
  };

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Create your password</p>
        <Input
          label="Enter BadgeID"
          type="text"
          value={passwordField.badge}
          handler={(e) =>
            setPasswordField((prev) => {
              return { ...prev, badge: e.target.value };
            })
          }
        />
        <div className="flex flex-col">
          <Input
            label="Enter new password"
            type="password"
            value={passwordField.password}
            handler={(e) =>
              setPasswordField((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
          <Input
            label="Confirm new Password"
            type="password"
            value={passwordField.confirm}
            handler={(e) =>
              setPasswordField((prev) => {
                return { ...prev, confirm: e.target.value };
              })
            }
          />

          <div>
            <button
              onClick={updatePassword}
              className="bg-[#61088E] w-24 h-10 rounded-md text-white"
            >
              Submit
            </button>
            <p>{error}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SetPassword;
