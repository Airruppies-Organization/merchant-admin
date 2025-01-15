import React from "react";

const Card = ({ name, icon, value, sub, type, suffix }) => {
  return (
    <div className="h-36 w-56 rounded-lg bg-white shadow-md p-3 mr-5 flex flex-col justify-between pb-14">
      <div className="flex items-start mb-6">
        <div className=" w-6 rounded-full bg-[#61088E] mr-2 aspect-square"></div>
        <div className="text-[#61088E] text-sm font-semibold">{name}</div>
      </div>
      <div>
        <div className={`flex ${type === "amount" && "items-baseline"}`}>
          {type === "price" && (
            <p className="text-sm pt-[2px] text-[#61088E]">N</p>
          )}
          <p className="text-2xl">{value}</p>
          {type === "amount" && (
            <p className="text-sm pt-[2px] text-[#61088E] ml-1">{suffix}</p>
          )}
        </div>
        {/* <div className="text-[8px] flex">
          <p className="mr-1 text-[#0FBD00]">{sub}</p>
          <p>vs N296.8k yesterday</p>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
