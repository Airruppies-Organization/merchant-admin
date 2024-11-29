"use client";

import React from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import CashierContext from "@/app/context/cashierContext";
import Link from "next/link";
import { useCashierLogin } from "@/app/hooks/useCashierLogin";

const Login = () => {
  const { loginField, setLoginField } = useContext(CashierContext);
  const { login, isLoading, error } = useCashierLogin();

  const router = useRouter();

  const checkIn = async () => {
    const success = await login(loginField.badge_id, loginField.password);

    if (success) {
      // admin.hasMerch is one of the keys that is served from the backend, used to check if the admin has a merchant_id
      router.push("/cashier/app/codeInput");
    }
  };

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Login to your account</p>
        <div className="flex flex-col">
          <Input
            label="Enter your BadgeID"
            type="text"
            value={loginField.badge_id}
            handler={(e) =>
              setLoginField((prev) => {
                return { ...prev, badge_id: e.target.value };
              })
            }
          />
          <Input
            label="Enter your password"
            type="password"
            value={loginField.password}
            handler={(e) =>
              setLoginField((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />

          <div className="w-full border-b border-b-neutral-400 mb-1 pb-2">
            <button
              onClick={checkIn}
              className="bg-[#61088E] w-24 h-10 rounded-md text-white"
            >
              Submit
            </button>
            <p>{error}</p>
          </div>
          <div className="flex ">
            If you dont have a password,
            <Link href={"/cashier/auth/setPassword"}>
              <p className="cursor-pointer text-[#61088E] mx-1">set password</p>
            </Link>
            here
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
