"use client";

import React from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import AdminContext from "@/app/context/adminContext";
import { useContext } from "react";
import { useLogin } from "@/app/hooks/useLogin";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loginField, setLoginField, admin } = useContext(AdminContext);
  const { login, isLoading, error } = useLogin();
  const router = useRouter();

  const loginHandler = async () => {
    const success = await login(loginField.email, loginField.password);

    if (success && admin.hasMerch) {
      // admin.hasMerch is one of the keys that is served from the backend, used to check if the admin has a merchant_id
      router.push("/admin");
    } else if (success && !admin.hasMerch) {
      router.push("/onboard");
    }
  };

  /* Explanation: once an already signed up admin signs into the admin platform and doesnt have 
    a merchant_id, he will be redirected to the onboarding section, because it is assumed that 
    he wants to onboard a new business, if the admin already have a merchant_id, it means that 
    he belongs to a particular business, and is therefore directed to his dashboard for the business  */

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Login to your account</p>
        <div className="flex flex-col">
          <Input
            label="Email"
            type="email"
            value={loginField.email}
            handler={(e) =>
              setLoginField((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <Input
            label="Password"
            type="password"
            value={loginField.password}
            handler={(e) =>
              setLoginField((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />

          <div>
            <button
              onClick={loginHandler}
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

export default Login;
