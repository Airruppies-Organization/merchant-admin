"use client";

import React, { useContext } from "react";
import AdminContext from "@/app/context/adminContext";
import { Cancel } from "../../../../../../public/icon";

const DeleteModal = () => {
  const {
    deleteModal,
    setDeleteModal,
    deleteCashier,
    curr,
    setCurr,
    cashiers,
  } = useContext(AdminContext);

  return (
    <div
      onClick={() => setDeleteModal(!deleteModal)}
      className="fixed top-0 left-0 w-screen h-screen bg-neutral-900 bg-opacity-30 flex items-center justify-center z-30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[30vw] h-[50vh] bg-white relative rounded-xl p-5 z-[-2]"
      >
        <div className="flex items-center justify-between mb-4 z-10">
          <p className="text-xl font-semibold">Remove Cashier</p>
          <div
            onClick={() => setDeleteModal(!deleteModal)}
            className="border hover:cursor-pointer"
          >
            <Cancel className="stroke-black text-lg" />
          </div>
        </div>

        <div className="w-full h-full top-0 left-0 flex flex-col items-center absolute justify-center z-[-1]">
          <p className="text-md text-center w-[70%]">
            Are you sure you want to remove this cashier?
          </p>
          <div className="flex w-[40%] mt-8 justify-between items-center">
            <div
              className="text-md underline text-[#61088E] cursor-pointer"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </div>
            <button
              className="text-md text-white bg-[#61088E] rounded-md flex items-center justify-center px-4 py-2 cursor-pointer"
              onClick={() => deleteCashier(curr)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
