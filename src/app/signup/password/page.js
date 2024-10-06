import React from "react";
import Input from "../../components/input";
import Header from "../../components/header";
import Link from "next/link";

const Password = () => {
  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Set Password</p>
        <div className="flex flex-col">
          <Input label="Create Password" type="password" />
          <Input label="Confirm Password" type="password" />
          <Link href="/admin">
            <button className="bg-[#61088E] w-24 h-10 rounded-md text-white">
              Submit
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Password;
