"use client";

import React from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";
import { useSignup } from "@/app/hooks/useSignup";
import { useRouter } from "next/navigation";

const Password = () => {
  const { adminField, setAdminField } = useContext(AdminContext);
  const { signup, isLoading, error } = useSignup();
  const router = useRouter();

  const signupHandler = async (e) => {
    e.preventDefault();

    const success = await signup(
      adminField.firstName,
      adminField.lastName,
      adminField.email,
      adminField.password,
      adminField.merchant_id
    );

    // if (success) {
    //   router.push("/admin/onboard");
    // }

    if (success.hasMerch) {
      router.push("/admin/app");
    } else router.push("/admin/onboard");
  };

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Set Password</p>
        <form onSubmit={signupHandler} className="flex flex-col">
          <Input
            label="Create Password"
            type="password"
            value={adminField.password}
            handler={(e) =>
              setAdminField((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
          <Input label="Confirm Password" type="password" />
          <div className="flex justify-between w-full">
            <button
              type="submit"
              onClick={signupHandler}
              className="bg-[#61088E] w-24 h-10 rounded-md text-white"
            >
              Submit
            </button>

            <p>{error}</p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Password;
