"use client";

import React, { useState } from "react";
import Header from "@/app/app_component/header";
import TableRow from "./salesComponent/tableRow";
import Sub from "./sub";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";

const Sales = () => {
  const { sales } = useContext(AdminContext);

  return (
    <div className="pl-28 pr-48">
      <Header name="Victor K. Okafor" role="Admin" />

      <section className="w-full">
        <Sub />
        <div className="w-full">
          <table className="w-full text-left text-sm">
            <thead className="h-10">
              <tr>
                <th className="pl-4">Session Code</th>
                <th>Total</th>
                <th>Method</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {sales?.map((item, index) => {
                return (
                  <TableRow
                    key={item._id}
                    index={index}
                    id={item.code}
                    total={item.total}
                    status={item.status}
                    method={item.method}
                  />
                );
              })}
            </tbody>
          </table>
          <div className="w-full h-12 flex items-center justify-center">
            <p className="mr-2 text-sm cursor-pointer">Previous</p>
            <div className="w-7 h-7 rounded-lg bg-[#61088E] text-white flex items-center justify-center mr-2 text-sm cursor-pointer">
              1
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#E0E0E0] text-black flex items-center justify-center mr-2 text-sm cursor-pointer">
              2
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#E0E0E0] text-black flex items-center justify-center mr-2 text-sm cursor-pointer">
              3
            </div>
            <p className="text-sm cursor-pointer">Next</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sales;
