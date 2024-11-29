"use client";

import React from "react";
import Input from "@/app/components/input";
import Header from "@/app/components/header";
import Link from "next/link";
import AdminContext from "@/app/context/adminContext";
import { useContext } from "react";

const Signup = () => {
  const { adminField, setAdminField } = useContext(AdminContext);

  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Create Account</p>
        <div className="flex flex-col">
          <Input
            label="First Name"
            type="text"
            value={adminField.firstName}
            handler={(e) =>
              setAdminField((prev) => {
                return { ...prev, firstName: e.target.value };
              })
            }
          />
          <Input
            label="Last Name"
            type="text"
            value={adminField.lastName}
            handler={(e) =>
              setAdminField((prev) => {
                return { ...prev, lastName: e.target.value };
              })
            }
          />
          <Input
            label="Email"
            type="email"
            value={adminField.email}
            handler={(e) =>
              setAdminField((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <Link href={"/auth/password"}>
            <button className="bg-[#61088E] w-24 h-10 rounded-md text-white">
              Next
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;
