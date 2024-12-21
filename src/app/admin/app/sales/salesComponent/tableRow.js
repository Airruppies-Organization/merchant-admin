"use client";

import React, { useContext } from "react";
// import { Delete } from "../../../../../public/icon";
// import AdminContext from "@/app/context/adminContext";

const TableRow = ({ id, total, status, method, index }) => {
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
      <td className="pl-4">_{id}_</td>
      <td>{total}</td>
      <td>{method}</td>
      <td
        className={`${status === "Paid" ? "text-green-600" : "text-red-600"}`}
      >
        {status}
      </td>
    </tr>
  );
};

export default TableRow;
