"use client";

import React, { useState, useRef, useContext } from "react";
import AdminContext from "@/app/context/adminContext";
import { Cancel } from "../../../../../public/icon";
import ModalInput from "../modalInput";

const Modal = ({ setModal, modal }) => {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [badge, setBadge] = useState(Math.round(Math.random() * 100000));

  const { addCashier } = useContext(AdminContext);
  const date = new Date();
  const [day, month, year] = [
    date.getDate(),
    date.getMonth(),
    date.getFullYear(),
  ];

  return (
    <div
      onClick={() => setModal(!modal)}
      className="absolute top-0 left-0 w-screen h-screen bg-neutral-900 bg-opacity-30 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[30vw] h-[80vh] bg-white rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Add Cashier</p>
          <div onClick={() => setModal(!modal)}>
            <Cancel className="stroke-black text-xl cursor-pointer" />
          </div>
        </div>
        <div className="mb-10">
          <ModalInput
            label={"Name"}
            type="text"
            func={(e) => setName(e.target.value)}
            value={name}
          />
          <ModalInput
            label={"Email"}
            type="email"
            func={(e) => setEmail(e.target.value)}
            value={email}
          />
          <ModalInput
            label={"Contact"}
            type="text"
            func={(e) => setContact(e.target.value)}
            value={contact}
          />
        </div>
        <div>
          <div className="mb-1 text-sm flex justify-between">
            <p>Badge Id: #{badge}</p>
            <p>Registered: {`${day}/${month}/${year}`}</p>
          </div>
          <button
            onClick={() => addCashier(name, email, contact, badge)}
            className="w-full h-12 rounded-md bg-[#61088E] text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
