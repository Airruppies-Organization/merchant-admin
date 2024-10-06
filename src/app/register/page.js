import React from "react";
import Input from "../components/input";
import Header from "../components/header";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <Header />
      <section className="w-[52vw] ml-auto mr-auto pt-8">
        <p className="text-3xl mb-8">Register Business</p>
        <div className="flex flex-col">
          <Input label="Name of organisation" type="text" />
          <Input label="Region/Country" type="text" />
          <Input label="State" type="select" />
          <Link href={"/register/upload"}>
            <button className="bg-[#61088E] w-24 h-10 rounded-md text-white">
              Next
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default index;
