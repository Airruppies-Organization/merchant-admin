"use client";

import React, { Suspense, useContext } from "react";
import Header from "@/app/app_component/header";
import TableRow from "./salesComponent/tableRow";
import Sub from "./sub";
import AdminContext from "@/app/context/adminContext";

const Sales = () => {
  const {
    sales,
    salesSearch,
    setSalesSearch,
    handleSearchSale,
    paymentMethodFilter,
  } = useContext(AdminContext);

  return (
    <div className="px-16 pt-10">
      <section className="w-full">
        <Suspense fallback={<p>Loading filters...</p>}>
          <Sub
            salesSearch={salesSearch}
            setSalesSearch={setSalesSearch}
            handleSearchSale={handleSearchSale}
            paymentMethodFilter={paymentMethodFilter}
          />
        </Suspense>

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
              <Suspense fallback={<p>Loading sales data...</p>}>
                {sales?.map((item, index) => (
                  <TableRow
                    key={item._id}
                    index={index}
                    id={item.bill_code}
                    total={item.total_price}
                    status={item.status}
                    method={item.payment_method}
                  />
                ))}
              </Suspense>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Sales;
