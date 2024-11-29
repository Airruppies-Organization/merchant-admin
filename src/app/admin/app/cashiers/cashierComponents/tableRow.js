"use client";

import React, { useContext } from "react";
import { Delete } from "../../../../../public/icon";
import AdminContext from "@/app/context/adminContext";

const TableRow = ({ id, name, contact, status, index }) => {
  const { setDeleteModal, deleteModal, setCurr } = useContext(AdminContext);

  const handleDelete = () => {
    setCurr(id);
    setDeleteModal(!deleteModal);
  };
  return (
    <tr
      className={`h-12 cursor-pointer hover:bg-[#ebdcf1] ${
        index % 2 === 0 ? "bg-[#F7F6FE]" : ""
      }`}
    >
      <td className="pl-4">#{id}</td>
      <td>{name}</td>
      <td>{contact}</td>
      <td>
        <div
          className={`text-[0.8em] ${
            status ? "text-[#1F9254]" : "text-[#CD6200]"
          } h-7 flex items-center justify-center w-16 rounded-full ${
            status ? "bg-[#EBF9F1]" : "bg-[#FEF2E5]"
          }`}
        >
          {status ? "Active" : "inActive"}
        </div>
      </td>
      <td onClick={() => handleDelete()}>
        {/* <Delete className="stroke-[#A30D11] text-base" /> */}
        <p className="text-xs underline underline-offset-1 text-red-500">
          Delete Cashier
        </p>
      </td>
    </tr>
  );
};

export default TableRow;
