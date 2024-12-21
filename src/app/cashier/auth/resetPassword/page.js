"use client";

import React from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import AdminContext from "@/app/context/adminContext";
import { useContext, useState } from "react";
import { useLogin } from "@/app/hooks/useLogin";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const { loginField, setLoginField } = useContext(AdminContext);
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Reset password</p>

        <div className="flex flex-col">
          <Input
            label="Enter new password"
            type="password"
            value={password}
            handler={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm password"
            type="password"
            value={password}
            handler={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full justify-between items-center">
            <button
              onClick={() => router.push("/cashier/auth/login")}
              className="bg-[#61088E] w-24 h-10 rounded-md text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
