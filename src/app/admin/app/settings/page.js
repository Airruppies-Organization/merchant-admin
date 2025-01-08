"use client";

import CustomToggle from "@/app/components/toggle";
import React from "react";
import { useState, useContext } from "react";
import AdminContext from "@/app/context/adminContext";

const Settings = () => {
  const {
    urlField,
    setUrlField,
    schemaDef,
    setSchemaDef,
    paySetting,
    setPaySetting,
    settingsHandler,
    paymentTypes,
    setPaymentTypes,
    activePaymentTypes,
    setActivePaymentTypes,
    paymentTypesHandler,
  } = useContext(AdminContext);

  return (
    <div className="px-16 py-10">
      <div className="py-4 border-b border-b-neutral-300 w-full px-5 flex items-center justify-between">
        <p className="text-2xl font-semibold text-neutral-600">
          Configurations
        </p>

        <button
          onClick={settingsHandler}
          className="mt-3 bg-purple-500 px-4 py-2 rounded-md cursor-pointer text-white transition-colors hover:bg-[#61088E]"
        >
          Save
        </button>
      </div>
      <section className="py-3 px-5 border-b border-b-neutral-300">
        <div>
          <p className="text-xl text-neutral-600 font-medium">
            Endpoints setup
          </p>
          <p className="text-xs text-netrual-600 font-semibold">
            For a seamless cooperation with your platform, provide necessary
            endpoints to fetch products from our database
          </p>
        </div>

        <div className="mt-5 flex flex-col space-y-5">
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="getProduct">
              Product get request endpoint
            </label>
            <p className="text-xs font-light">
              This endpoint is needed to fetch products via their barcodes when
              the shoppers scan the items in the merchant's inventory
            </p>
            <div className="flex space-x-2 items-center mt-2">
              <input
                className="focus:outline-none border-2 border-neutral-300 h-12 w-[70%] rounded-lg px-3 transition-all focus:border-[#61088E] duration-200"
                placeholder="Enter api endpoint here"
                value={urlField.get_api}
                onChange={(e) => {
                  setUrlField((prev) => ({ ...prev, get_api: e.target.value }));
                }}
                id="getProduct"
                type="text"
              />
              <p className="text-neutral-500">Method: GET</p>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="getProduct">
              Inventory patch/put request endpoint
            </label>
            <p className="text-xs font-light">
              This endpoint is needed responsible for updating the business'
              inventory after a particular sale
            </p>
            <div className="flex space-x-2 items-center mt-2">
              <input
                className="focus:outline-none border-2 border-neutral-300 h-12 w-[70%] rounded-lg px-3 transition-all focus:border-[#61088E] duration-200"
                placeholder="Enter api endpoint here"
                value={urlField.update_api.url}
                onChange={(e) => {
                  setUrlField((prev) => ({
                    ...prev,
                    update_api: { ...prev.update_api, url: e.target.value },
                  }));
                }}
                id="getProduct"
                type="text"
              />
              <div className="flex space-x-2 items-center">
                <p className="text-neutral-500">Method:</p>
                <select
                  onChange={(e) =>
                    setUrlField((prev) => ({
                      ...prev,
                      update_api: {
                        ...prev.update_api,
                        method: e.target.value,
                      },
                    }))
                  }
                  className="focus:outline-none cursor-pointer border-b-2 transition-all border-b-neutral-300 focus:border-b-[#61088E]"
                >
                  <option className="p-2 text-xs" value="put">
                    PUT
                  </option>
                  <option className="p-2 text-xs" value="patch">
                    PATCH
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-3 px-5 border-b border-b-neutral-300">
        <div>
          <p className="text-xl text-neutral-600 font-medium">
            Schema definitions
          </p>
          <p className="text-xs text-netrual-600 font-semibold">
            To ensure the smooth integration and functionality of your database,
            please provide the schema definitions for each item. The schema
            definitions should include the names of the fields (attributes)
            without any actual values.
          </p>
          <p className="text-xs text-[#61088E] font-bold">
            Please make sure you follow your organization's naming conventions
            (e.g., camelCase, snake_case).
          </p>
        </div>

        <table className="w-[60%] px-5 mt-5 text-sm">
          <thead>
            <tr className="border-b border-b-neutral-600 h-12 text-neutral-600 font-semibold">
              <td>Name of field</td>
              <td>Merchant's naming conventions</td>
            </tr>
          </thead>
          <tbody>
            <tr className="h-12 text-neutral-600 font-semibold space-x-2">
              <td className="w-[40%]">Name</td>
              <td>
                <input
                  type="text"
                  value={schemaDef.name}
                  onChange={(e) =>
                    setSchemaDef((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Eg. nameOfProduct, itemName, name, e.t.c"
                  className="h-10 rounded-lg border-2 border-netural-300 focus:outline-none focus:border-[#61088E] w-full px-3 text-xs"
                />
              </td>
            </tr>
            <tr className="h-12 text-neutral-600 font-semibold">
              <td>Price</td>
              <td>
                <input
                  type="text"
                  value={schemaDef.price}
                  onChange={(e) =>
                    setSchemaDef((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Eg. price, itemPrice, e.t.c"
                  className="h-10 rounded-lg border-2 border-netural-300 focus:outline-none focus:border-[#61088E] w-full px-3 text-xs"
                />
              </td>
            </tr>
            <tr className="h-12 text-neutral-600 font-semibold">
              <td>Quantity</td>
              <td>
                <input
                  type="text"
                  value={schemaDef.quantity}
                  onChange={(e) =>
                    setSchemaDef((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }
                  placeholder="Eg. quantity, qty, itemQty e.t.c"
                  className="h-10 rounded-lg border-2 border-netural-300 focus:outline-none focus:border-[#61088E] w-full px-3 text-xs"
                />
              </td>
            </tr>
            <tr className="h-12 text-neutral-600 font-semibold">
              <td>GTIN code (eg. ean_8 code, ean_13, upc-A, upc-E...)</td>
              <td>
                <input
                  type="text"
                  value={schemaDef.gtin}
                  onChange={(e) =>
                    setSchemaDef((prev) => ({ ...prev, gtin: e.target.value }))
                  }
                  placeholder="Eg. tinCode, bar_code, product_code e.t.c"
                  className="h-10 rounded-lg border-2 border-netural-300 focus:outline-none focus:border-[#61088E] w-full px-3 text-xs"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="py-3 px-5 border-b border-b-neutral-300">
        <div className="flex items-center justify-between">
          <p className="text-xl text-neutral-600 font-medium">
            Payment methods setup
          </p>

          <button
            onClick={paymentTypesHandler}
            className="mt-3 bg-purple-500 px-4 py-2 rounded-md cursor-pointer text-white transition-colors hover:bg-[#61088E]"
          >
            Update
          </button>
        </div>

        <table className="w-[60%] px-5 mt-5 text-sm">
          <tbody>
            {paymentTypes?.map((paymentType, index) => {
              const toggleHandler = () => {
                if (activePaymentTypes.includes(paymentType._id)) {
                  setActivePaymentTypes((prev) =>
                    prev.filter((id) => id !== paymentType._id)
                  );
                } else {
                  setActivePaymentTypes((prev) => [...prev, paymentType._id]);
                }
              };

              return (
                <tr
                  key={index}
                  className="h-12 text-neutral-600 font-semibold space-x-2"
                >
                  <td className="w-[40%]">{paymentType.paymentType}</td>
                  <td>
                    <CustomToggle
                      // initialState={paySetting.cash}
                      initialState={activePaymentTypes.includes(
                        paymentType._id
                      )}
                      onToggle={toggleHandler}
                    />
                  </td>
                </tr>
              );
            })}

            {/* <tr className="h-12 text-neutral-600 font-semibold">
              <td>Card</td>
              <td>
                <CustomToggle
                  initialState={paySetting.card}
                  onToggle={() =>
                    setPaySetting((prev) => ({ ...prev, card: !prev.card }))
                  }
                />
              </td>
            </tr>
            <tr className="h-12 text-neutral-600 font-semibold">
              <td>Transfer</td>
              <td>
                <CustomToggle
                  initialState={paySetting.transfer}
                  onToggle={() =>
                    setPaySetting((prev) => ({
                      ...prev,
                      transfer: !prev.transfer,
                    }))
                  }
                />
              </td>
            </tr> */}
          </tbody>
        </table>
      </section>
      <section className="py-3 px-5 border-b border-b-neutral-300">
        <div>
          <p className="text-xl text-red-600 font-medium">Danger zone</p>
        </div>
        <button className="mt-3 bg-red-300 px-4 py-2 rounded-md cursor-pointer text-red-800 transition-colors hover:bg-red-400">
          Deactivate merchant
        </button>
      </section>
    </div>
  );
};

export default Settings;
