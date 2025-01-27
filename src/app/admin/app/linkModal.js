"use client";

import React from "react";
import { useState } from "react";

const LinkModal = ({ setLinkModal }) => {
  const [value, setValue] = useState("");

  const inviteAdmin = async () => {
    const res = await fetch(
      "http://localhost:7000/merchant/api/inviteNewAdmin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value }),
        credentials: "include",
      }
    );

    const result = await res.json();

    if (res.ok) {
      alert(result.message);
    }
  };

  return (
    <div className="z-30 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" bg-white rounded-lg p-5 w-[40vw] ">
        <p className="text-lg mb-3 font-semibold">Invite New Admin</p>
        <form
          onSubmit={inviteAdmin}
          className="w-full h-20 text-xs text-wrap mb-10"
        >
          <input
            className="w-full focus:outline-none border h-12 mb-3 px-3 rounded-lg focus:border-2 focus:border-[#61088E]"
            id="emailInput"
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor="emailInput">
            Enter email of admin you want to invite
          </label>
        </form>
        <div className="flex space-x-5 w-full justify-end items-center">
          <div
            onClick={() => setLinkModal((prev) => !prev)}
            className="cursor-pointer font-semibold text-[#61088E]"
          >
            Cancel
          </div>
          <div
            onClick={inviteAdmin}
            className="cursor-pointer bg-[#61088E] px-4 py-2 rounded-lg text-white"
          >
            Invite
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
