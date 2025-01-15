"use client";
import React, { useState } from "react";
import Header from "@/app/app_component/header";
import TableRow from "./cashierComponents/tableRow";
import Sub from "./sub";
import Modal from "./cashierComponents/modal";
import DeleteModal from "./cashierComponents/deleteModal";
import { useContext } from "react";
import AdminContext from "@/app/context/adminContext";

const Cashiers = () => {
  const {
    modal,
    cashiers,
    setModal,
    deleteModal,
    cashierSearch,
    setCashierSearch,
    handleSearchCashier,
    handleActiveCashier,
  } = useContext(AdminContext);

  return (
    <div className="px-16 pt-10">
      <section className="w-full">
        <Sub
          setModal={setModal}
          modal={modal}
          cashierSearch={cashierSearch}
          setCashierSearch={setCashierSearch}
          handleSearchCashier={handleSearchCashier}
          handleActiveCashier={handleActiveCashier}
        />
        <div className="w-full">
          <table className="w-full text-left text-sm">
            <thead className="h-10">
              <tr>
                <th className="pl-4">Badge ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cashiers?.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    index={index}
                    id={item.badge_id}
                    name={item.fullName}
                    contact={item.phoneNumber}
                    status={item.status}
                  />
                );
              })}
            </tbody>
          </table>

          {/* PAGINATION */}
          {/* <div className="w-full h-12 flex items-center justify-center">
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
          </div> */}
        </div>
      </section>
      {modal ? <Modal setModal={setModal} modal={modal} /> : ""}
      {deleteModal ? <DeleteModal /> : ""}
    </div>
  );
};

export default Cashiers;
