import React from "react";
import Input from "../components/input";
import Header from "../components/header";
import Link from "next/link";

const Signup = () => {
  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Create Account</p>
        <div className="flex flex-col">
          <Input label="First Name" type="text" />
          <Input label="Last Name" type="text" />
          <Input label="Email" type="email" />
          <Link href={"/signup/password"}>
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
