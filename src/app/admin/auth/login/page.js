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
  const { loginField, setLoginField } = useContext(AdminContext);
  const { login, isLoading, error } = useLogin();
  const router = useRouter();

  const loginHandler = async () => {
    const success = await login(loginField.email, loginField.password);
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (success && admin.hasMerch) {
      setLoginField({
        badge_id: "",
        password: "",
      });
      // admin.hasMerch is one of the keys that is served from the backend, used to check if the admin has a merchant_id
      router.push("/admin/app");
    } else if (success && !admin.hasMerch) {
      setLoginField({
        badge_id: "",
        password: "",
      });
      router.push("/onboard");
    } else {
      setLoginField({
        badge_id: "",
        password: "",
      });
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

          <div className="flex space-x-1 justify-between items-center">
            <button
              onClick={loginHandler}
              className="bg-[#61088E] w-24 h-10 rounded-md text-white"
            >
              Submit
            </button>
            <div className="flex space-x-1">
              <p
                onClick={() => router.push("/admin/auth/forgot")}
                className="text-[#61088E] cursor-pointer"
              >
                Forgot password?
              </p>
            </div>
          </div>
          <p>{error}</p>
        </div>
      </section>
    </div>
  );
};

export default Login;
