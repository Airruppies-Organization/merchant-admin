import React from "react";
import Image from "next/image";

const Products = ({ name, quantity, price, id }) => {
  return (
    <div key={id} className="h-20 py-1 flex border-b border-b-black w-full">
      <div className="flex flex-col justify-between ml-2">
        <div>
          <p className="text-xs font-semibold w-[100%]">{name}</p>
          <p className="text-[0.8em]">x{quantity}</p>
        </div>
        <p className="text-md font-semibold">N {price}</p>
      </div>
    </div>
  );
};

export default Products;
