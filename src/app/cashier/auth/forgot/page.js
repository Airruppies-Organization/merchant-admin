"use client";

import React from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import AdminContext from "@/app/context/adminContext";
import { useContext, useState } from "react";
import { useLogin } from "@/app/hooks/useLogin";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useRouter } from "next/navigation";

const Forgot = () => {
  const { loginField, setLoginField } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Forgot password</p>

        <div className="flex flex-col">
          <Input
            label="Enter your email"
            type="email"
            value={email}
            handler={(e) => setEmail(e.target.value)}
          />

          <div className="flex w-full justify-between items-center">
            <button className="bg-[#61088E] w-24 h-10 rounded-md text-white">
              Submit
            </button>

            <div className="flex space-x-1 text-sm font-semibold">
              <p>Code sent to you email. Did'nt recieve code? </p>
              <p className="text-[#61088E] cursor-pointer">Resend code</p>
            </div>
          </div>

          <div className="mt-12">
            <Input
              label="Enter your code"
              type="email"
              value={email}
              handler={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={() => router.push("/cashier/auth/resetPassword")}
              className="bg-[#61088E] px-4 py-2 rounded-md text-white"
            >
              Verify email
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgot;
